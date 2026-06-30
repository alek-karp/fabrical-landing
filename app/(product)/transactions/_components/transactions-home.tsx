import {
  CarIcon,
  CoffeeIcon,
  CreditCardIcon,
  MoreHorizontalIcon,
  ShoppingCartIcon,
  TvIcon,
} from "lucide-react";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const transactions = [
  {
    name: "Blue Bottle Coffee",
    category: "Food & Drink",
    date: "Today, 10:24 AM",
    amount: -6.5,
    icon: <CoffeeIcon className="size-5" />,
  },
  {
    name: "Whole Foods Market",
    category: "Groceries",
    date: "Yesterday",
    amount: -142.3,
    icon: <ShoppingCartIcon className="size-5" />,
  },
  {
    name: "Stripe Payout",
    category: "Income",
    date: "Oct 12",
    amount: 4200.0,
    icon: <CreditCardIcon className="size-5" />,
  },
  {
    name: "Uber Technologies",
    category: "Transport",
    date: "Oct 11",
    amount: -24.1,
    icon: <CarIcon className="size-5" />,
  },
  {
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "Oct 10",
    amount: -19.99,
    icon: <TvIcon className="size-5" />,
  },
];

const formatAmount = (amount: number) => {
  const abs = Math.abs(amount).toFixed(2);
  return amount >= 0 ? `+$${abs}` : `-$${abs}`;
};

export const TransactionsHome = () => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="min-h-svh bg-background text-foreground">
      <AppHeader title="Transactions" />

      <div className="flex flex-col gap-6 px-6 py-6 md:px-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold">Recent Transactions</h1>
            <p className="text-sm text-muted-foreground">
              Your latest account activity.
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="flex flex-col">
          {transactions.map((tx, i) => (
            <div key={tx.name}>
              <div className="flex items-center gap-4 py-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  {tx.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{tx.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tx.category}
                  </p>
                </div>
                <p className="hidden flex-1 text-sm text-muted-foreground sm:block">
                  {tx.date}
                </p>
                <p
                  className={`font-medium tabular-nums ${tx.amount >= 0 ? "text-green-500" : ""}`}
                >
                  {formatAmount(tx.amount)}
                </p>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </div>
              {i < transactions.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
);
