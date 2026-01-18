import { fileUploadSchema } from "@/lib/validation/upload.schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/s3-client";

export const s3BucketRoute = createTRPCRouter({
  getUploadUrl: protectedProcedure
    .input(fileUploadSchema)
    .mutation(async ({ ctx, input }) => {
      // TODO: check if the user has already uploaded the image
      const uniqeKey = `daily-log/${uuidv4()}-${input.fileName}`;
      const command = new PutObjectCommand({
        Bucket: "dlog",
        Key: uniqeKey,
        ContentType: input.contentType,
        ContentLength: input.size,
      });
      const EXPIRES_IN = 360; // url expiresIn 6 min

      const preSignedUrl = await getSignedUrl(S3, command, {
        expiresIn: EXPIRES_IN,
      });
      return {
        fileKey: uniqeKey,
        url: preSignedUrl,
      };
    }),
});
