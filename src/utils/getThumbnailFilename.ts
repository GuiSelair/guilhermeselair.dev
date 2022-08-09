export const TECHOLOGIES_IMAGES_NAME = {
	reactjs: "reactjs.png",
	typescript: "typescript.png",
	javascript: "javascript.png",
	nextjs: "nextjs.png",
	graphcms: "graphcms.png",
	graphql: "graphql.png",
	reactnative: "reactnative.png",
	nodejs: "nodejs.png",
	axios: "axios.png",
	firebase: "firebase.png",
	faunadb: "faunadb.png",
	stripe: "stripe.png",
	prismic: "prismic.png",
	express: "express.png",
	mongodb: "mongodb.png",
	typeorm: "typeorm.png",
	redis: "redis.png",
	styledcomponent: "styled-component.png",
};

type IGetThumbnailFilename = (thumbnailName: string) => string;

export const getThumbnailFilename: IGetThumbnailFilename = (thumbnailName) =>
	TECHOLOGIES_IMAGES_NAME[thumbnailName || "reactjs"];
