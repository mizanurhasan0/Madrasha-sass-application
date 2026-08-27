"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/format";

const notifications = [
  {
    id: "1",
    title: "New payment received",
    message: "Monthly fee payment from Yusuf Ahmed",
    time: "2025-08-25T10:30:00",
    read: false,
  },
  {
    id: "2",
    title: "Exam schedule published",
    message: "Annual Examination 2025 schedule is now available",
    time: "2025-08-25T09:15:00",
    read: false,
  },
  {
    id: "3",
    title: "Attendance marked",
    message: "Today's attendance has been submitted for Hifz (1st Year)",
    time: "2025-08-24T16:00:00",
    read: true,
  },
  {
    id: "4",
    title: "New notice posted",
    message: "Parent-Teacher Meeting scheduled for September 5",
    time: "2025-08-24T14:20:00",
    read: true,
  },
  {
    id: "5",
    title: "Subscription renewed",
    message: "Al-Noor Islamic Academy renewed Professional plan",
    time: "2025-08-23T11:00:00",
    read: true,
  },
];

export function NotificationDropdown() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notifications" />
        }
      >
        <Bell className="size-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 py-2">
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-sm font-medium">{notification.title}</span>
              {!notification.read && (
                <span className="size-2 shrink-0 rounded-full bg-primary" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{notification.message}</span>
            <span className="text-xs text-muted-foreground">
              {formatDateTime(notification.time)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
