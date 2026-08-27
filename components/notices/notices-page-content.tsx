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
import { Badge } from "@/components/ui/badge";
import { NoticeForm, type NoticeFormData } from "@/components/notices/notice-form";
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
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { search, setSearch, page, setPage, filters, setFilter } = useTableState();

  const loadNotices = async () => {
    setLoading(true);
    const res = await noticeService.getNotices({
      page,
      limit: 10,
      search: search || undefined,
      category: filters.category || undefined,
    });
    if (res.success) {
      setNotices(res.data.data);
      setTotalPages(res.data.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNotices();
  }, [page, search, filters.category]);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (notice: Notice) => {
    setEditing(notice);
    setModalOpen(true);
  };

  const handleSubmit = async (data: NoticeFormData) => {
    setSubmitting(true);
    if (editing) {
      const res = await noticeService.updateNotice(editing.id, data);
      if (res.success) {
        toast.success("Notice updated");
        setModalOpen(false);
        loadNotices();
      } else {
        toast.error(res.message ?? "Failed to update notice");
      }
    } else {
      const res = await noticeService.createNotice(data);
      if (res.success) {
        toast.success("Notice created");
        setModalOpen(false);
        loadNotices();
      } else {
        toast.error("Failed to create notice");
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await noticeService.deleteNotice(deleteTarget.id);
    if (res.success) {
      toast.success("Notice deleted");
      setDeleteTarget(null);
      loadNotices();
    } else {
      toast.error("Failed to delete notice");
    }
  };

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

  if (loading && notices.length === 0) {
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
          <Button onClick={handleCreate}>
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
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
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
        title={editing ? "Edit Notice" : "Create Notice"}
        description="Fill in the notice details and choose who should see it."
      >
        <NoticeForm
          initial={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitting={submitting}
        />
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Notice"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
