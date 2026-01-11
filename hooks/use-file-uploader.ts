import { UPLOAD_CONFIGS } from '@/lib/constants'
import { bytesToMB } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

type FileType = "image"
interface FileState {
  id: string | null
  file: File | null
  uploading: boolean
  progress: number
  fileKey?: string | null
  error: string | null
  fileType: FileType
  objectUrl: string | null
}

interface iAppProps {
  fileType: FileType
}




export const useFileUploader = ({ fileType = "image" }: iAppProps) => {
  const [fileState, setFileState] = useState<FileState>({
    error: null,
    file: null,
    fileType,
    id: null,
    objectUrl: null,
    progress: 0,
    uploading: false,
    fileKey: null
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles)
  }, [])

  const rejectedFiles = (fileRejection: FileRejection[]) => {
    if (!fileRejection.length) return

    const config = UPLOAD_CONFIGS[fileType]

    const hasError = (code: string) =>
      fileRejection.some(
        (rejection) => rejection.errors.some((e) => e.code === code)
      )

    if (hasError("too-many-files")) {
      toast.error(
        `You can upload up to ${config.maxFiles} file${config.maxFiles > 1 ? "s" : ""
        }.`
      )
    }

    if (hasError("file-too-large")) {
      toast.error(
        `File is too large. Maximum size is ${bytesToMB(
          config.maxSize
        )}MB.`
      )
    }

    if (hasError("file-invalid-type")) {
      toast.error(
        "Invalid file type. Please upload a supported file."
      )
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...UPLOAD_CONFIGS[fileType],
    onDropRejected: rejectedFiles
  })


  return {
    getRootProps,
    getInputProps,
    isDragActive
  }
}
