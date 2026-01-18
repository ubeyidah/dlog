import z from "zod";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, "file name is required"),
  contentType: z.string().min(1, "content type is required"),
  size: z.number().min(1, "file size is required"),
})
