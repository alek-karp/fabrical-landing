"use client";

import { FileText, FolderOpen, LayoutGrid, List, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import type { Project } from "@/lib/projects";

const DOCUMENT_VIEW_MODES = {
  Cards: "cards",
  List: "list",
} as const;

type DocumentViewMode =
  (typeof DOCUMENT_VIEW_MODES)[keyof typeof DOCUMENT_VIEW_MODES];

type ProjectDocument = Project["documents"][number];

type ProjectDocumentsTabProps = {
  documents: Project["documents"];
};

const getSearchableText = (document: ProjectDocument) =>
  document.name.toLowerCase();

const getDocumentCountLabel = (count: number) =>
  `${count} ${count === 1 ? "file" : "files"}`;

const getExtension = (fileName: string) => {
  const extension = fileName.split(".").pop();

  return extension && extension !== fileName ? extension.toUpperCase() : "FILE";
};

const DocumentCard = ({ document }: { document: ProjectDocument }) => (
  <button
    className="group flex h-32 min-w-0 flex-col overflow-hidden border border-border bg-background text-left transition-colors hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    type="button"
  >
    <div className="flex flex-1 items-center justify-center bg-muted/30 p-3">
      <div className="flex size-12 items-center justify-center border border-border bg-background shadow-xs">
        <span className="text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
          {getExtension(document.name)}
        </span>
      </div>
    </div>
    <div className="flex min-w-0 items-start gap-2 border-t border-border px-3 py-2">
      <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <p className="truncate text-sm font-medium">{document.name}</p>
    </div>
  </button>
);

const DocumentRow = ({ document }: { document: ProjectDocument }) => (
  <button
    className="flex w-full min-w-0 items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    type="button"
  >
    <FileText className="size-4 shrink-0 text-muted-foreground" />
    <span className="truncate font-medium">{document.name}</span>
    <span className="ml-auto shrink-0 text-xs font-medium text-muted-foreground">
      {getExtension(document.name)}
    </span>
  </button>
);

export const ProjectDocumentsTab = ({
  documents,
}: ProjectDocumentsTabProps) => {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<DocumentViewMode>(
    DOCUMENT_VIEW_MODES.List,
  );

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return documents;
    }

    return documents.filter((document) =>
      getSearchableText(document).includes(normalizedQuery),
    );
  }, [documents, query]);

  return (
    <section className="border border-border bg-card text-card-foreground">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-4">
        <div className="flex items-start gap-3">
          <FolderOpen className="mt-0.5 size-5 text-muted-foreground" />
          <div>
            <h2 className="text-lg font-semibold tracking-normal">Documents</h2>
            <p className="text-sm text-muted-foreground">
              Project files, submittals, drawings, and release records
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative md:max-w-sm md:flex-1">
            <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
            <Input
              aria-label="Search documents"
              className="pl-9"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search documents"
              value={query}
            />
          </div>

          <div className="flex items-center justify-between gap-3 md:justify-end">
            <span className="text-sm text-muted-foreground">
              {getDocumentCountLabel(filteredDocuments.length)}
            </span>
            <ButtonGroup>
              <Button
                aria-label="Show documents as list"
                onClick={() => setViewMode(DOCUMENT_VIEW_MODES.List)}
                size="icon-sm"
                variant={
                  viewMode === DOCUMENT_VIEW_MODES.List
                    ? "secondary"
                    : "outline"
                }
              >
                <List className="size-4" />
              </Button>
              <Button
                aria-label="Show documents as cards"
                onClick={() => setViewMode(DOCUMENT_VIEW_MODES.Cards)}
                size="icon-sm"
                variant={
                  viewMode === DOCUMENT_VIEW_MODES.Cards
                    ? "secondary"
                    : "outline"
                }
              >
                <LayoutGrid className="size-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <div className="p-5">
        {filteredDocuments.length > 0 ? (
          viewMode === DOCUMENT_VIEW_MODES.Cards ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,12rem))] gap-3">
              {filteredDocuments.map((document) => (
                <DocumentCard document={document} key={document.name} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border border border-border">
              {filteredDocuments.map((document) => (
                <DocumentRow document={document} key={document.name} />
              ))}
            </div>
          )
        ) : (
          <div className="border border-border p-10 text-center text-sm text-muted-foreground">
            No documents match your search.
          </div>
        )}
      </div>
    </section>
  );
};
