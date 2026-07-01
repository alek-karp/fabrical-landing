import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

type AppShellProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  bare?: boolean;
};

export const AppShell = ({
  title,
  children,
  className,
  bare,
}: AppShellProps) => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset
      className={cn(
        "bg-background text-foreground",
        bare ? "flex min-h-svh flex-col" : "min-h-svh",
      )}
    >
      <AppHeader title={title} />
      {bare ? (
        children
      ) : (
        <div
          className={cn(
            "mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 md:px-10",
            className,
          )}
        >
          {children}
        </div>
      )}
    </SidebarInset>
  </SidebarProvider>
);
