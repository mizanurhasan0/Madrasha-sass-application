"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

type MutationResult = {
  success: boolean;
  message?: string;
};

type UseCrudModalOptions<T> = {
  onCreate?: (values: unknown) => Promise<MutationResult>;
  onUpdate?: (id: string, values: unknown) => Promise<MutationResult>;
  onDelete?: (item: T) => Promise<MutationResult>;
  onSuccess?: () => void;
  messages?: {
    create?: string;
    update?: string;
    delete?: string;
    error?: string;
  };
};

export function useCrudModal<T extends { id: string; name?: string }>({
  onCreate,
  onUpdate,
  onDelete,
  onSuccess,
  messages = {},
}: UseCrudModalOptions<T>) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const openCreate = useCallback(() => {
    setEditing(null);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((item: T) => {
    setEditing(item);
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setFormOpen(false);
    setEditing(null);
  }, []);

  const openDelete = useCallback((item: T) => {
    setDeleteTarget(item);
  }, []);

  const closeDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleSubmit = useCallback(
    async (values: unknown) => {
      setSubmitting(true);
      try {
        const result = editing
          ? await onUpdate?.(editing.id, values)
          : await onCreate?.(values);

        if (result?.success) {
          toast.success(
            editing
              ? (messages.update ?? "Updated successfully")
              : (messages.create ?? "Created successfully")
          );
          closeForm();
          onSuccess?.();
        } else {
          toast.error(result?.message ?? messages.error ?? "Operation failed");
        }
      } catch {
        toast.error(messages.error ?? "Operation failed");
      } finally {
        setSubmitting(false);
      }
    },
    [editing, onCreate, onUpdate, onSuccess, closeForm, messages]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget || !onDelete) return;

    setSubmitting(true);
    try {
      const result = await onDelete(deleteTarget);
      if (result.success) {
        toast.success(messages.delete ?? "Deleted successfully");
        closeDelete();
        onSuccess?.();
      } else {
        toast.error(result.message ?? messages.error ?? "Delete failed");
      }
    } catch {
      toast.error(messages.error ?? "Delete failed");
    } finally {
      setSubmitting(false);
    }
  }, [deleteTarget, onDelete, onSuccess, closeDelete, messages]);

  return {
    formOpen,
    setFormOpen,
    editing,
    openCreate,
    openEdit,
    closeForm,
    deleteTarget,
    openDelete,
    closeDelete,
    submitting,
    handleSubmit,
    handleDelete,
  };
}
