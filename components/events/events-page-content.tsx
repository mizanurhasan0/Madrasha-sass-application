"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, useTableState, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { FormModal } from "@/components/common/form-modal";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { TableSkeleton } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { EventForm, type EventFormData } from "@/components/events/event-form";
import { eventService } from "@/services/notice.service";
import type { Event } from "@/types/notice";

export function EventsPageContent() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { search, setSearch, page, setPage } = useTableState();

  const loadEvents = async () => {
    setLoading(true);
    const res = await eventService.getEvents({
      page,
      limit: 10,
      search: search || undefined,
    });
    if (res.success) {
      setEvents(res.data.data);
      setTotalPages(res.data.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, [page, search]);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditing(event);
    setModalOpen(true);
  };

  const handleSubmit = async (data: EventFormData) => {
    setSubmitting(true);
    if (editing) {
      const res = await eventService.updateEvent(editing.id, data);
      if (res.success) {
        toast.success("Event updated");
        setModalOpen(false);
        loadEvents();
      } else {
        toast.error(res.message ?? "Failed to update event");
      }
    } else {
      const res = await eventService.createEvent(data);
      if (res.success) {
        toast.success("Event created");
        setModalOpen(false);
        loadEvents();
      } else {
        toast.error("Failed to create event");
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await eventService.deleteEvent(deleteTarget.id);
    if (res.success) {
      toast.success("Event deleted");
      setDeleteTarget(null);
      loadEvents();
    } else {
      toast.error("Failed to delete event");
    }
  };

  const columns: Column<Event>[] = [
    {
      key: "title",
      header: "Event",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{row.location}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (row) => (
        <div className="text-sm">
          <DateDisplay date={row.date} />
          <p className="text-xs text-muted-foreground">{row.time}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row)}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(row)}>
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading && events.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title="Events" description="Manage madrasa events and programs." />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        description="Create and manage upcoming events, programs, and celebrations."
        actions={
          <Button onClick={handleCreate}>
            <Plus className="mr-1.5 size-4" />
            New Event
          </Button>
        }
      />

      <DataTable
        data={events}
        columns={columns}
        searchPlaceholder="Search events..."
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="No events yet"
        emptyDescription="Create your first event to share with the community."
        mobileCard={(row) => (
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{row.title}</p>
              <StatusBadge status={row.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              <DateDisplay date={row.date} /> · {row.time}
            </p>
            <p className="text-xs text-muted-foreground">{row.location}</p>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => handleEdit(row)}>
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDeleteTarget(row)}>
                Delete
              </Button>
            </div>
          </div>
        )}
      />

      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editing ? "Edit Event" : "Create Event"}
        description="Add event details for the madrasa calendar and public website."
      >
        <EventForm
          initial={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitting={submitting}
        />
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Event"
        description={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
