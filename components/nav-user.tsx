"use client";

import {
  BadgeCheckIcon,
  BellIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  SparklesIcon,
  SunIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/routes";
import { getInitials } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

type NavUserData = {
  name: string;
  email: string;
  avatar: string;
};

type ThemeMode = "system" | "light" | "dark";

const themeModes: ThemeMode[] = ["system", "light", "dark"];

const themeLabels: Record<ThemeMode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const getNextTheme = (value: string | undefined): ThemeMode => {
  const current = themeModes.includes(value as ThemeMode)
    ? (value as ThemeMode)
    : "system";
  const currentIndex = themeModes.indexOf(current);
  return themeModes[(currentIndex + 1) % themeModes.length];
};

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [user, setUser] = useState<NavUserData | null>(null);
  const currentTheme = themeModes.includes(theme as ThemeMode)
    ? (theme as ThemeMode)
    : "system";
  const ThemeIcon =
    currentTheme === "light"
      ? SunIcon
      : currentTheme === "dark"
        ? MoonIcon
        : MonitorIcon;

  useEffect(() => {
    const supabase = createClient();

    const toNavUser = (
      authUser: Awaited<
        ReturnType<typeof supabase.auth.getUser>
      >["data"]["user"],
    ): NavUserData | null => {
      if (!authUser) return null;
      const metadata = authUser.user_metadata ?? {};
      const email = authUser.email ?? "";
      return {
        name: metadata.full_name ?? metadata.name ?? email.split("@")[0] ?? "",
        email,
        avatar: metadata.avatar_url ?? metadata.picture ?? "",
      };
    };

    supabase.auth.getUser().then(({ data }) => {
      setUser(toNavUser(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toNavUser(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(routes.auth.login);
  };

  const name = user?.name ?? "";
  const email = user?.email ?? "";
  const avatar = user?.avatar ?? "";
  const initials = getInitials(name || email);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SparklesIcon />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheckIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => setTheme(getNextTheme(theme))}>
                <ThemeIcon />
                Theme: {themeLabels[currentTheme]}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
