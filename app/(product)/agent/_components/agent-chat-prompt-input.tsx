"use client";

import { Paperclip } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { AI_MODELS, type AiModelId, getAllowedModel } from "@/lib/ai";

type AgentChatPromptInputProps = {
  className?: string;
  isStreaming: boolean;
  modelSelectorOpen: boolean;
  onModelSelect: (modelId: AiModelId) => void;
  onModelSelectorOpenChange: (open: boolean) => void;
  onSubmit: (message: PromptInputMessage) => void;
  onTextChange: (text: string) => void;
  placeholder: string;
  selectedModelId: AiModelId;
  text: string;
  usedTokens: number;
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

export const AgentChatPromptInput = ({
  className,
  isStreaming,
  modelSelectorOpen,
  onModelSelect,
  onModelSelectorOpenChange,
  onSubmit,
  onTextChange,
  placeholder,
  selectedModelId,
  text,
  usedTokens,
}: AgentChatPromptInputProps) => {
  const selectedModel = getAllowedModel(selectedModelId);

  return (
    <PromptInput
      accept="image/*,application/pdf,text/plain,text/csv,.md,.docx,.xlsx"
      className={className ?? "mx-auto w-full max-w-3xl"}
      globalDrop
      multiple
      onSubmit={onSubmit}
    >
      <PromptAttachmentsPreview />
      <PromptInputBody>
        <PromptInputTextarea
          onChange={(event) => onTextChange(event.target.value)}
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
            onOpenChange={onModelSelectorOpenChange}
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
                      onSelect={() => onModelSelect(model.id)}
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
};
