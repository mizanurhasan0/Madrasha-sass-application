"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { Event } from "@/types/notice";
import { eventSlug } from "@/lib/events";
import { EmptyState } from "@/components/common/empty-state";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { useT } from "@/lib/i18n/locale-provider";
import { Reveal, wowStaggerDelay } from "./reveal";

type EventsListProps = {
  events: Event[];
};

export function EventsList({ events }: EventsListProps) {
  const t = useT();
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const filters = [
    { value: "all" as const, label: t("eventsPage.allEvents") },
    { value: "upcoming" as const, label: t("common.all") === "All" ? "Upcoming" : "Upcoming" },
    { value: "completed" as const, label: "Completed" },
  ];

  const filtered = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => e.status === filter);
  }, [events, filter]);

  if (events.length === 0) {
    return <EmptyState title={t("common.noEvents")} />;
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event, i) => (
          <Reveal key={event.id} delay={wowStaggerDelay(i)}>
            <Link href={`/events/${eventSlug(event)}`}>
              <Card className="h-full overflow-hidden border-border/60 pt-0 shadow-soft transition-shadow hover:shadow-md">
              {event.image && (
                <div className="relative aspect-video">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge status={event.status} />
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Calendar className="size-4" /> {formatDate(event.date)}
                </p>
                {event.time && (
                  <p className="flex items-center gap-2">
                    <Clock className="size-4" /> {event.time}
                  </p>
                )}
                {event.location && (
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4" /> {event.location}
                  </p>
                )}
              </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
