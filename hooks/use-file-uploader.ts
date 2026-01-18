import { UPLOAD_CONFIGS } from "@/lib/constants";
import { bytesToMB } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type FileType = "image";
interface FileState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  fileKey?: string | null;
  error: string | null;
  fileType: FileType;
  objectUrl: string | null;
}

interface iAppProps {
  fileType: FileType;
  onUpload: (fileKey: string) => void;
  onError: (error: Error) => void;
}

export const useFileUploader = ({
  fileType = "image",
  onUpload,
  onError,
}: iAppProps) => {
  const initalFileState: FileState = {
    error: null,
    file: null,
    fileType,
    id: null,
    objectUrl: null,
    progress: 0,
    uploading: false,
    fileKey: null,
  };
  const trpc = useTRPC();
  const { mutateAsync } = useMutation(trpc.s3.getUploadUrl.mutationOptions());
  const { mutateAsync: DeleteMutateAsync } = useMutation(
    trpc.s3.deleteFile.mutationOptions(),
  );

  const [fileState, setFileState] = useState<FileState>(initalFileState);

  const onFileRemove = async () => {
    if (!fileState.objectUrl || !fileState.fileKey) return;
    const backupFileUrl = { ...fileState };
    try {
      setFileState({ ...initalFileState });
      await DeleteMutateAsync({ fileKey: fileState.fileKey });
    } catch {
      setFileState(backupFileUrl);
      toast.error("Failed to delete the file. Please try again.");
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
      const file = acceptedFiles[0];
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl); // clean up the prev blob object before uploading
      }
      setFileState({
        ...initalFileState,
        id: uuidv4(),
        uploading: true,
      });
      try {
        const fileRes = await mutateAsync({
          contentType: file.type,
          fileName: file.name,
          size: file.size,
        });
        await new Promise<void>((res, rej) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const percent = (e.loaded / e.total) * 100;
              setFileState((prev) => ({
                ...prev,
                progress: Math.round(percent),
              }));
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              setFileState((prev) => ({
                ...prev,
                progress: 0,
                uploading: false,
                fileKey: fileRes.fileKey,
                objectUrl: URL.createObjectURL(file),
              }));
              onUpload(fileRes.fileKey);
              res();
            } else {
              onError(new Error("failed to upload file"));
              rej(new Error("failed to upload file."));
            }
          };

          xhr.onerror = (err) => {
            onError(
              new Error(
                err instanceof Error
                  ? err.message
                  : "something went wrong while uploading file",
              ),
            );
            rej(err);
          };
          xhr.open("PUT", fileRes.url);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      } catch (err) {
        onError(
          new Error(
            err instanceof Error
              ? err.message
              : "something went wrong while uploading file",
          ),
        );
        setFileState((prev) => ({
          ...prev,
          progress: 0,
          uploading: false,
          error: "file upload failed",
        }));
      }
    },
    [onError, onUpload, fileState.objectUrl, mutateAsync],
  );

  const rejectedFiles = (fileRejection: FileRejection[]) => {
    if (!fileRejection.length) return;

    const config = UPLOAD_CONFIGS[fileType];

    const hasError = (code: string) =>
      fileRejection.some((rejection) =>
        rejection.errors.some((e) => e.code === code),
      );

    if (hasError("too-many-files")) {
      toast.error(
        `You can upload up to ${config.maxFiles} file${
          config.maxFiles > 1 ? "s" : ""
        }.`,
      );
    }

    if (hasError("file-too-large")) {
      toast.error(
        `File is too large. Maximum size is ${bytesToMB(config.maxSize)}MB.`,
      );
    }

    if (hasError("file-invalid-type")) {
      toast.error("Invalid file type. Please upload a supported file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...UPLOAD_CONFIGS[fileType],
    onDropRejected: rejectedFiles,
    disabled: fileState.uploading,
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    onFileRemove,
    ...fileState,
  };
};
