import ImageKit from "imagekit";
import {
    IMAGE_KIT_ENDPOINT,
    IMAGE_KIT_PUBLIC_KEY,
    IMAGE_KIT_PRIVATE_KEY
} from "./config.js"

export const imagekit = new ImageKit({
    urlEndpoint: IMAGE_KIT_ENDPOINT,
    publicKey: IMAGE_KIT_PUBLIC_KEY,
    privateKey: IMAGE_KIT_PRIVATE_KEY,
});