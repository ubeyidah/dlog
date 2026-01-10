"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logId: string;
  logTitle: string;
}

export function DeleteDialog({ open, onOpenChange, logId, logTitle }: DeleteDialogProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation(
    trpc.daily_log.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Daily log deleted successfully!");
        onOpenChange(false);
        queryClient.invalidateQueries(trpc.daily_log.getAll.queryOptions({}));
        queryClient.invalidateQueries(trpc.daily_log.stats.queryOptions());
      },
      onError: (error) => {
        toast.error("Failed to delete daily log: " + error.message);
      },
    }),
  );

  const handleDelete = () => {
    mutate({ id: logId });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center py-2 flex-col gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <HugeiconsIcon icon={Delete02Icon} className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-center space-y-2">
              <DialogTitle>Delete Daily Log</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>&quot;{logTitle}&quot;</strong>? This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
