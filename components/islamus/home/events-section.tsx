"use client";

import Image from "next/image";
import { events } from "@/data/islamus/content";
import { EventFoldCard } from "@/components/islamus/ui/event-fold-card";
import { SecTitle } from "@/components/islamus/ui/sec-title";

export function EventsSection() {
  return (
    <section id="events" className="is-event-section is-pt-120 is-pb-80">
      <Image
        src="/theme/icon/obj-img-3.png"
        alt=""
        width={80}
        height={80}
        className="is-bounce-y pointer-events-none absolute left-0 top-0 opacity-10 hidden lg:block"
      />
      <Image
        src="/theme/icon/obj-img-4.png"
        alt=""
        width={80}
        height={80}
        className="is-bounce-y pointer-events-none absolute bottom-0 right-0 opacity-10 hidden lg:block"
        style={{ animationDuration: "12s" }}
      />
      <div className="is-container">
        <SecTitle
          subTitle="Events"
          title="Upcoming Events & Activities"
          text="Join us in our upcoming gatherings and activities to strengthen faith and unity."
        />
        <div className="is-event-wrapper is-panel-pin-area">
          {events.map((event) => (
            <div key={event.slug} className="is-event-block is-panel-pin">
              <EventFoldCard {...event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
