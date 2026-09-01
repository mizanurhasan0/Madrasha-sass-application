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
import { Badge } from "@/components/ui/badge";
import { NoticeForm, type NoticeFormData } from "@/components/notices/notice-form";
import { useResourceList } from "@/hooks/use-resource-list";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { noticeService } from "@/services/notice.service";
import type { Notice, NoticeCategory } from "@/types/notice";

const categoryOptions = [
  { label: "All Categories", value: "" },
  { label: "General", value: "general" },
  { label: "Academic", value: "academic" },
  { label: "Exam", value: "exam" },
  { label: "Holiday", value: "holiday" },
  { label: "Fee", value: "fee" },
  { label: "Admission", value: "admission" },
];

export function NoticesPageContent() {
  const {
    data: notices,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    filters,
    setFilter,
    isInitialLoad,
    refetch,
  } = useResourceList<Notice, { category: string }>({
    fetchFn: ({ page, limit, search, category }) =>
      noticeService.getNotices({
        page,
        limit,
        search: search || undefined,
        category: category || undefined,
      }),
    initialFilters: { category: "" },
  });

  const crud = useCrudModal<Notice>({
    onCreate: async (values) => {
      const res = await noticeService.createNotice(values as NoticeFormData);
      return { success: res.success, message: res.message };
    },
    onUpdate: async (id, values) => {
      const res = await noticeService.updateNotice(id, values as NoticeFormData);
      return { success: res.success, message: res.message };
    },
    onDelete: async (item) => {
      const res = await noticeService.deleteNotice(item.id);
      return { success: res.success, message: res.message };
    },
    onSuccess: refetch,
    messages: {
      create: "Notice created",
      update: "Notice updated",
      delete: "Notice deleted",
    },
  });

  const columns: Column<Notice>[] = [
    {
      key: "title",
      header: "Title",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{row.description}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (row) => (
        <Badge variant="secondary" className="capitalize">
          {row.category}
        </Badge>
      ),
    },
    {
      key: "audience",
      header: "Audience",
      cell: (row) => <span className="capitalize">{row.audience}</span>,
    },
    {
      key: "date",
      header: "Date",
      cell: (row) => <DateDisplay date={row.publishDate} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <StatusBadge status={row.published ? "active" : "pending"} />
      ),
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
        <PageHeader title="Notices" description="Create and manage madrasa notices." />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notices"
        description="Create, edit, and publish notices for teachers, guardians, and students."
        actions={
          <Button onClick={crud.openCreate}>
            <Plus className="mr-1.5 size-4" />
            New Notice
          </Button>
        }
      />

      <DataTable
        data={notices}
        columns={columns}
        searchPlaceholder="Search notices..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            key: "category",
            label: "Category",
            options: categoryOptions,
            value: filters.category ?? "",
            onChange: (v) => setFilter("category", v),
          },
        ]}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="No notices yet"
        emptyDescription="Create your first notice to inform the madrasa community."
        mobileCard={(row) => (
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{row.title}</p>
              <StatusBadge status={row.published ? "active" : "pending"} />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="capitalize">
                {row.category as NoticeCategory}
              </Badge>
              <span className="text-xs text-muted-foreground capitalize">{row.audience}</span>
            </div>
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
        title={crud.editing ? "Edit Notice" : "Create Notice"}
        description="Fill in the notice details and choose who should see it."
      >
        <NoticeForm
          initial={crud.editing ?? undefined}
          onSubmit={crud.handleSubmit}
          onCancel={crud.closeForm}
          submitting={crud.submitting}
        />
      </FormModal>

      <ConfirmDialog
        open={!!crud.deleteTarget}
        onOpenChange={(open) => !open && crud.closeDelete()}
        title="Delete Notice"
        description={`Are you sure you want to delete "${crud.deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={crud.handleDelete}
      />
    </div>
  );
}
