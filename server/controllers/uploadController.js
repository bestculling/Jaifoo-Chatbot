import { imagekit } from '../utils/imageKit.js';

export const upload = (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
}