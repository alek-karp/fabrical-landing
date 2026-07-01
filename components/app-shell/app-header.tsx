import { BotIcon } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { routes } from "@/lib/routes";

type AppHeaderProps = {
  title: string;
};

export const AppHeader = ({ title }: AppHeaderProps) => (
  <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border">
    <div className="flex w-full items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Button asChild variant="outline" size="xs">
        <Link href={routes.app.agent}>
          <BotIcon />
          <span>Agent</span>
        </Link>
      </Button>
    </div>
  </header>
);
