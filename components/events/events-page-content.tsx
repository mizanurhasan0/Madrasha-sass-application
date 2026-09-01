"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { FormModal } from "@/components/common/form-modal";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { TableSkeleton } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { EventForm, type EventFormData } from "@/components/events/event-form";
import { useResourceList } from "@/hooks/use-resource-list";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { eventService } from "@/services/notice.service";
import type { Event } from "@/types/notice";

export function EventsPageContent() {
  const {
    data: events,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    isInitialLoad,
    refetch,
  } = useResourceList({
    fetchFn: (params) => eventService.getEvents(params),
  });

  const crud = useCrudModal<Event>({
    onCreate: async (values) => {
      const res = await eventService.createEvent(values as EventFormData);
      return { success: res.success, message: res.message };
    },
    onUpdate: async (id, values) => {
      const res = await eventService.updateEvent(id, values as EventFormData);
      return { success: res.success, message: res.message };
    },
    onDelete: async (item) => {
      const res = await eventService.deleteEvent(item.id);
      return { success: res.success, message: res.message };
    },
    onSuccess: refetch,
    messages: {
      create: "Event created",
      update: "Event updated",
      delete: "Event deleted",
    },
  });

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
          <Button variant="ghost" size="icon" onClick={() => crud.openEdit(row)}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => crud.openDelete(row)}>
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  if (isInitialLoad) {
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
          <Button onClick={crud.openCreate}>
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
        onSearchChange={setSearch}
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
              <Button variant="outline" size="sm" onClick={() => crud.openEdit(row)}>
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => crud.openDelete(row)}>
                Delete
              </Button>
            </div>
          </div>
        )}
      />

      <FormModal
        open={crud.formOpen}
        onOpenChange={crud.setFormOpen}
        title={crud.editing ? "Edit Event" : "Create Event"}
        description="Add event details for the madrasa calendar and public website."
      >
        <EventForm
          initial={crud.editing ?? undefined}
          onSubmit={crud.handleSubmit}
          onCancel={crud.closeForm}
          submitting={crud.submitting}
        />
      </FormModal>

      <ConfirmDialog
        open={!!crud.deleteTarget}
        onOpenChange={(open) => !open && crud.closeDelete()}
        title="Delete Event"
        description={`Are you sure you want to delete "${crud.deleteTarget?.title}"?`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={crud.handleDelete}
      />
    </div>
  );
}
