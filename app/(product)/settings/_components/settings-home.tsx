import {
  BellIcon,
  Building2Icon,
  CheckCircle2Icon,
  SaveIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  UserRoundIcon,
} from "lucide-react";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";

const notificationSettings = [
  {
    title: "Approval blockers",
    description: "Alert when submittals or field releases need PM review.",
    defaultChecked: true,
  },
  {
    title: "Procurement changes",
    description: "Notify when vendor dates, pricing, or alternates change.",
    defaultChecked: true,
  },
  {
    title: "Daily field digest",
    description: "Send a morning summary of crew readiness and open risks.",
    defaultChecked: false,
  },
];

const workspaceSettings = [
  {
    label: "Default project",
    value: "Data Center West",
  },
  {
    label: "Crew planning window",
    value: "Next 14 days",
  },
  {
    label: "Material risk threshold",
    value: "7 days before need date",
  },
];

export const SettingsHome = () => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="min-h-svh bg-background text-foreground">
      <AppHeader title="Settings" />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 md:px-10">
        <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Workspace settings</Badge>
              <Badge variant="outline">Fabrical</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal md:text-4xl">
              Settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage account details, project defaults, notifications, and
              access controls for the product workspace.
            </p>
          </div>
          <Button>
            Save changes
            <SaveIcon data-icon="inline-end" />
          </Button>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Profile information shown across project activity.
                </CardDescription>
                <CardAction>
                  <UserRoundIcon />
                </CardAction>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="settings-name">Name</FieldLabel>
                    <Input id="settings-name" defaultValue="Site PM" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="settings-email">Email</FieldLabel>
                    <Input
                      id="settings-email"
                      defaultValue="pm@fabrical.ai"
                      type="email"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="settings-role">Role</FieldLabel>
                    <Select defaultValue="pm">
                      <SelectTrigger id="settings-role" className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="pm">Project manager</SelectItem>
                          <SelectItem value="foreman">Foreman</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </CardContent>
              <CardFooter className="justify-between border-t">
                <p className="text-sm text-muted-foreground">
                  Last profile sync completed today.
                </p>
                <CheckCircle2Icon />
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project defaults</CardTitle>
                <CardDescription>
                  Configure how the app prioritizes active construction work.
                </CardDescription>
                <CardAction>
                  <SlidersHorizontalIcon />
                </CardAction>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="settings-project">
                      Default project
                    </FieldLabel>
                    <Select defaultValue="dc-west">
                      <SelectTrigger id="settings-project" className="w-full">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="dc-west">
                            Data Center West
                          </SelectItem>
                          <SelectItem value="advanced-manufacturing">
                            Advanced Manufacturing
                          </SelectItem>
                          <SelectItem value="campus-upgrade">
                            Campus Upgrade
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="settings-risk-window">
                      Risk review window
                    </FieldLabel>
                    <Select defaultValue="14">
                      <SelectTrigger
                        id="settings-risk-window"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="7">Next 7 days</SelectItem>
                          <SelectItem value="14">Next 14 days</SelectItem>
                          <SelectItem value="30">Next 30 days</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="settings-timezone">
                      Time zone
                    </FieldLabel>
                    <Select defaultValue="pacific">
                      <SelectTrigger id="settings-timezone" className="w-full">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="pacific">Pacific Time</SelectItem>
                          <SelectItem value="mountain">
                            Mountain Time
                          </SelectItem>
                          <SelectItem value="central">Central Time</SelectItem>
                          <SelectItem value="eastern">Eastern Time</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>

          <aside className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose which workspace events need attention.
                </CardDescription>
                <CardAction>
                  <BellIcon />
                </CardAction>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  {notificationSettings.map((setting) => (
                    <Field orientation="horizontal" key={setting.title}>
                      <Switch
                        aria-label={setting.title}
                        defaultChecked={setting.defaultChecked}
                      />
                      <FieldContent>
                        <FieldTitle>{setting.title}</FieldTitle>
                        <FieldDescription>
                          {setting.description}
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  ))}
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workspace</CardTitle>
                <CardDescription>
                  Current operating defaults for the app.
                </CardDescription>
                <CardAction>
                  <Building2Icon />
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {workspaceSettings.map((setting, index) => (
                  <div className="flex flex-col gap-3" key={setting.label}>
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm text-muted-foreground">
                        {setting.label}
                      </p>
                      <p className="max-w-40 text-right text-sm font-medium">
                        {setting.value}
                      </p>
                    </div>
                    {index < workspaceSettings.length - 1 ? (
                      <Separator />
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access</CardTitle>
                <CardDescription>
                  Admin approval is required for workspace role changes.
                </CardDescription>
                <CardAction>
                  <ShieldCheckIcon />
                </CardAction>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Manage access
                </Button>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </SidebarInset>
  </SidebarProvider>
);
