"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Activity,
  Calendar,
  FileIcon,
  ListTodo,
  Paperclip,
  UploadCloud,
  Zap,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import {
  Attachment,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@/components/ai-elements/attachments";
import {
  Context,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextTrigger,
} from "@/components/ai-elements/context";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@/components/ai-elements/model-selector";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { AI_MODELS, DEFAULT_CHAT_MODEL_ID, getAllowedModel } from "@/lib/ai";

type QuickStartTab = "your-activity" | "from-tasks" | "upcoming";

const QUICK_START_TABS: {
  id: QuickStartTab;
  label: string;
  icon: ReactNode;
}[] = [
  {
    id: "your-activity",
    label: "Your Activity",
    icon: <Activity className="size-4" />,
  },
  {
    id: "from-tasks",
    label: "From Tasks",
    icon: <ListTodo className="size-4" />,
  },
  {
    id: "upcoming",
    label: "Upcoming",
    icon: <Calendar className="size-4" />,
  },
];

type QuickCard = { label: string; prompt: string };

const QUICK_START_CARDS: Record<QuickStartTab, QuickCard[]> = {
  "your-activity": [
    {
      label: "Follow up on the switchgear submittal",
      prompt:
        "The switchgear submittal for Tower B has been pending review for a week. Draft a follow-up to the GC and check the approval status.",
    },
    {
      label: "Schedule crews for the Phase 2 rough-in",
      prompt:
        "Phase 2 rough-in starts Monday. Assign electricians and confirm the material is staged on site.",
    },
    {
      label: "Chase the late conduit delivery",
      prompt:
        "The conduit order for the parking structure is two days late. Contact the supplier and get a firm delivery date.",
    },
  ],
  "from-tasks": [
    {
      label: "Order panelboards for the 3rd floor",
      prompt:
        "My open task 'Procure 3rd floor panelboards' is due Friday. Find a distributor with stock and request pricing.",
    },
    {
      label: "Book the service-upgrade inspection",
      prompt:
        "I have an in-progress task to schedule the electrical inspection for the main service upgrade. Coordinate with the AHJ and book a slot.",
    },
    {
      label: "Resolve the lighting RFI",
      prompt:
        "The RFI on fixture types for the lobby has been open for a week. Follow up with the engineer for a response.",
    },
  ],
  upcoming: [
    {
      label: "Prep for the Tower B energization",
      prompt:
        "Tower B energization is in two weeks. Build a readiness checklist and confirm utility coordination.",
    },
    {
      label: "Plan the data center cable pulls",
      prompt:
        "Cable pulls for the data center start next month. Sequence the crews and confirm the cable is on order.",
    },
    {
      label: "Stage materials for the hospital wing",
      prompt:
        "The hospital wing fit-out kicks off next month. Source gear and schedule deliveries to match the install sequence.",
    },
  ],
};

const PromptAttachmentsPreview = () => {
  const attachments = usePromptInputAttachments();

  if (attachments.files.length === 0) {
    return null;
  }

  return (
    <PromptInputHeader>
      <Attachments variant="inline">
        {attachments.files.map((file) => (
          <Attachment
            data={file}
            key={file.id}
            onRemove={() => attachments.remove(file.id)}
          >
            <AttachmentPreview />
            <AttachmentInfo />
            <AttachmentRemove />
          </Attachment>
        ))}
      </Attachments>
    </PromptInputHeader>
  );
};

export const AgentChat = () => {
  const [text, setText] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_CHAT_MODEL_ID);
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
  const [activeQuickTab, setActiveQuickTab] =
    useState<QuickStartTab>("your-activity");
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);

  const modelIdRef = useRef(selectedModelId);
  modelIdRef.current = selectedModelId;

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ modelId: modelIdRef.current }),
    }),
  });

  const selectedModel = getAllowedModel(selectedModelId);
  const usedTokens = messages.reduce(
    (acc, m) =>
      acc +
      m.parts.reduce((s, p) => s + (p.type === "text" ? p.text.length : 0), 0),
    0,
  );
  const isStreaming = status === "streaming" || status === "submitted";

  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      if (!e.dataTransfer?.types?.includes("Files")) {
        return;
      }
      dragCounterRef.current += 1;
      if (dragCounterRef.current === 1) {
        setIsDragging(true);
      }
    };
    const onDragLeave = () => {
      dragCounterRef.current -= 1;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    };
    const onDrop = () => {
      dragCounterRef.current = 0;
      setIsDragging(false);
    };
    document.addEventListener("dragenter", onDragEnter);
    document.addEventListener("dragleave", onDragLeave);
    document.addEventListener("drop", onDrop);
    return () => {
      document.removeEventListener("dragenter", onDragEnter);
      document.removeEventListener("dragleave", onDragLeave);
      document.removeEventListener("drop", onDrop);
    };
  }, []);

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim() && message.files.length === 0) {
      return;
    }
    sendMessage({ text: message.text, files: message.files });
    setText("");
  };

  const promptInputJsx = (placeholder: string, className?: string) => (
    <PromptInput
      accept="image/*,application/pdf,text/plain,text/csv,.md,.docx,.xlsx"
      className={className ?? "mx-auto w-full max-w-3xl"}
      globalDrop
      multiple
      onSubmit={handleSubmit}
    >
      <PromptAttachmentsPreview />
      <PromptInputBody>
        <PromptInputTextarea
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          value={text}
        />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger
              className="text-muted-foreground"
              tooltip="Attach files"
            >
              <Paperclip className="size-4" />
            </PromptInputActionMenuTrigger>
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments label="Upload image or file" />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
          <ModelSelector
            onOpenChange={setModelSelectorOpen}
            open={modelSelectorOpen}
          >
            <ModelSelectorTrigger asChild>
              <Button
                className="gap-1.5 text-muted-foreground text-sm"
                size="sm"
                type="button"
                variant="ghost"
              >
                <ModelSelectorLogo provider={selectedModel.provider} />
                {selectedModel.name}
              </Button>
            </ModelSelectorTrigger>
            <ModelSelectorContent>
              <ModelSelectorInput placeholder="Search models..." />
              <ModelSelectorList>
                <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
                <ModelSelectorGroup heading="Models">
                  {AI_MODELS.map((model) => (
                    <ModelSelectorItem
                      key={model.id}
                      onSelect={() => {
                        setSelectedModelId(model.id);
                        setModelSelectorOpen(false);
                      }}
                      value={model.id}
                    >
                      <ModelSelectorLogo provider={model.provider} />
                      <ModelSelectorName>{model.name}</ModelSelectorName>
                    </ModelSelectorItem>
                  ))}
                </ModelSelectorGroup>
              </ModelSelectorList>
            </ModelSelectorContent>
          </ModelSelector>
          <Context
            maxTokens={selectedModel.maxTokens}
            modelId={selectedModel.id}
            usedTokens={usedTokens}
          >
            <ContextTrigger className="text-sm" size="sm" />
            <ContextContent>
              <ContextContentHeader />
              <ContextContentBody>
                <ContextInputUsage />
                <ContextOutputUsage />
              </ContextContentBody>
              <ContextContentFooter />
            </ContextContent>
          </Context>
        </PromptInputTools>
        <PromptInputSubmit status={isStreaming ? "streaming" : "ready"} />
      </PromptInputFooter>
    </PromptInput>
  );

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col">
      {isDragging && (
        <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
          <UploadCloud className="size-12 text-primary" />
          <p className="font-semibold text-lg">Drop files to attach</p>
          <p className="text-muted-foreground text-sm">
            Images, PDFs, and documents
          </p>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-4">
          <div className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
            <h1 className="flex items-center gap-2 font-bold text-4xl tracking-tight">
              <Zap className="size-7 text-primary" />
              How can I help run your jobsite today?
            </h1>
            <p className="text-muted-foreground">
              Coordinate crews, chase submittals, schedule inspections, and
              unblock procurement — all in one place.
            </p>
            <div className="mt-2 w-full max-w-3xl">
              {promptInputJsx(
                "Describe what you need — project, scope, crew, due date…",
                "w-full",
              )}
            </div>
          </div>

          <div className="w-full max-w-3xl shrink-0 pb-8">
            <p className="mb-3 font-medium text-sm">Quick start</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {QUICK_START_TABS.map((tab) => (
                <button
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    activeQuickTab === tab.id
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                  key={tab.id}
                  onClick={() => setActiveQuickTab(tab.id)}
                  type="button"
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {QUICK_START_CARDS[activeQuickTab].map((card) => (
                <button
                  className="flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors hover:border-foreground/30 hover:bg-muted/40"
                  key={card.label}
                  onClick={() => setText(card.prompt)}
                  type="button"
                >
                  <span className="font-medium text-muted-foreground text-sm">
                    {activeQuickTab === "your-activity" && "Recent activity"}
                    {activeQuickTab === "from-tasks" && "From tasks"}
                    {activeQuickTab === "upcoming" && "Upcoming"}
                  </span>
                  <p className="text-sm leading-snug">{card.label}</p>
                  <span className="mt-auto text-muted-foreground text-sm">
                    Try this →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="mx-auto w-full max-w-3xl px-4 py-6">
              {messages.map((msg) => (
                <Message from={msg.role} key={msg.id}>
                  <MessageContent>
                    {msg.parts.map((part, i) => {
                      if (part.type === "text") {
                        return (
                          <MessageResponse key={`${msg.id}-${i}`}>
                            {part.text}
                          </MessageResponse>
                        );
                      }
                      if (part.type === "file") {
                        if (part.mediaType?.startsWith("image/")) {
                          return (
                            // biome-ignore lint/performance/noImgElement: attachment previews are local blob URLs, not optimizable by next/image
                            <img
                              alt={part.filename ?? "attachment"}
                              className="max-h-64 max-w-full rounded-lg object-contain"
                              key={`${msg.id}-${i}`}
                              src={part.url}
                            />
                          );
                        }
                        return (
                          <div
                            className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm"
                            key={`${msg.id}-${i}`}
                          >
                            <FileIcon className="size-4 shrink-0 text-muted-foreground" />
                            <span className="truncate">
                              {part.filename ?? "file"}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </Message>
              ))}
              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer>Thinking…</Shimmer>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t bg-background px-4 py-4">
            {promptInputJsx("Message…")}
          </div>
        </>
      )}
    </div>
  );
};
