export const FILE_SIZE = {
  KB: 1024,
  MB: 1024 * 1024,
} as const



export const UPLOAD_CONFIGS = {
  image: {
    maxSize: 5 * FILE_SIZE.MB,
    accept: { "image/*": [] },
    maxFiles: 1,
    multipe: false
  },
  avatar: {
    maxSize: 4 * FILE_SIZE.MB,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
  },
  images: {
    maxSize: 5 * FILE_SIZE.MB,
    accept: { "image/*": [] },
    maxFiles: 5,
    multiple: true,
  },
} as const
