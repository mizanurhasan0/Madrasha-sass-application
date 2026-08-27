"use client";

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { Money } from "@/components/common/format-display";
import { cn } from "@/lib/utils";
import type { SubscriptionPlan } from "@/types/madrasa";

type PlanCardsProps = {
  plans: SubscriptionPlan[];
  activeCounts?: Record<string, number>;
};

export function PlanCards({ plans, activeCounts }: PlanCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan, index) => (
        <Card
          key={plan.id}
          className={cn(index === 1 && "ring-2 ring-primary/20")}
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  Up to {plan.maxStudents.toLocaleString()} students
                </CardDescription>
              </div>
              <StatusBadge status={plan.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Money amount={plan.price} />
              <span className="text-sm text-muted-foreground"> / {plan.interval}</span>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          {activeCounts && (
            <CardFooter className="text-sm text-muted-foreground">
              {activeCounts[plan.id] ?? 0} active subscription
              {(activeCounts[plan.id] ?? 0) === 1 ? "" : "s"}
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
