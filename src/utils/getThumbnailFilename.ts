const TECHOLOGIES_IMAGES_NAME = {
  react: "react-thumb.png",
  typescript: "typescript-thumb.png",
  javascript: "javascript-thumb.png",
  nextjs: "nextJS-thumb.png",
};

type IGetThumbnailFilename = (thumbnailName: string) => string;

export const getThumbnailFilename: IGetThumbnailFilename = (thumbnailName) => TECHOLOGIES_IMAGES_NAME[thumbnailName || "react"];
