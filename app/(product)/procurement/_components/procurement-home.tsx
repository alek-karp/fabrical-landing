import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CalendarClockIcon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  PackageCheckIcon,
  TruckIcon,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const procurementStats = [
  {
    label: "Open material actions",
    value: "18",
    detail: "6 due before install week",
    icon: <PackageCheckIcon />,
  },
  {
    label: "Submittal readiness",
    value: "82%",
    detail: "4 packages need comments cleared",
    icon: <ClipboardCheckIcon />,
  },
  {
    label: "Delivery confidence",
    value: "74%",
    detail: "3 vendors need confirmation",
    icon: <TruckIcon />,
  },
];

const materialPackages = [
  {
    name: "Switchgear lineup",
    owner: "A. Miller",
    needDate: "Jul 12",
    status: "At risk",
    readiness: 52,
  },
  {
    name: "Level 04 feeder cable",
    owner: "J. Patel",
    needDate: "Jul 15",
    status: "Ready",
    readiness: 96,
  },
  {
    name: "Lighting controls",
    owner: "M. Chen",
    needDate: "Jul 18",
    status: "Quote gap",
    readiness: 63,
  },
  {
    name: "Panelboards P2-P7",
    owner: "S. Reyes",
    needDate: "Jul 22",
    status: "Submittal hold",
    readiness: 41,
  },
];

const actionItems = [
  {
    title: "Escalate switchgear approval comments",
    meta: "Due today",
    icon: <AlertTriangleIcon />,
  },
  {
    title: "Confirm feeder cable ship date",
    meta: "Vendor follow-up",
    icon: <TruckIcon />,
  },
  {
    title: "Release lighting controls alternate review",
    meta: "PM approval",
    icon: <CalendarClockIcon />,
  },
];

export const ProcurementHome = () => (
  <AppShell title="Procurement">
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">Procurement control</Badge>
        <Badge variant="outline">Data Center West</Badge>
      </div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
            Material readiness
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Track procurement actions against installation need dates, submittal
            holds, vendor commitments, and release readiness.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            Export actions
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button>
            Add material action
            <PackageCheckIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>

    <section className="grid gap-4 md:grid-cols-3">
      {procurementStats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-3xl">{stat.value}</CardTitle>
            <CardAction>{stat.icon}</CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{stat.detail}</p>
          </CardContent>
        </Card>
      ))}
    </section>

    <section className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <Card>
        <CardHeader>
          <CardTitle>Material packages</CardTitle>
          <CardDescription>
            Current procurement status by install dependency
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {materialPackages.map((item) => (
            <div className="flex flex-col gap-3" key={item.name}>
              <div className="grid gap-3 md:grid-cols-[1fr_8rem_7rem_8rem] md:items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Owner: {item.owner}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Need date
                  </p>
                  <p className="text-sm">{item.needDate}</p>
                </div>
                <Badge className="w-fit" variant="outline">
                  {item.status}
                </Badge>
                <div className="flex items-center gap-2">
                  <Progress
                    aria-label={`${item.name} readiness`}
                    value={item.readiness}
                  />
                  <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                    {item.readiness}%
                  </span>
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>

      <aside className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Priority actions</CardTitle>
            <CardDescription>Items most likely to block crews</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {actionItems.map((item) => (
              <div className="flex gap-3" key={item.title}>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium leading-5">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.meta}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Release window</CardTitle>
            <CardDescription>Next seven days</CardDescription>
            <CardAction>
              <CheckCircle2Icon />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold">11</p>
                <p className="text-sm text-muted-foreground">
                  packages can release
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold">4</p>
                <p className="text-sm text-muted-foreground">need escalation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </section>
  </AppShell>
);
