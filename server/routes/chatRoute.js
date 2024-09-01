import express from 'express';
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { 
    createNewChat, 
    getChats, 
    getUserChats, 
    updateChat 
} from '../controllers/chatController.js';

const router = express.Router();

// สร้าง chat ใหม่
router.post("/chats", ClerkExpressRequireAuth(), createNewChat);

// แสดงผล RECENT CHATS
router.get("/userchats", ClerkExpressRequireAuth(), getUserChats);

// ประวัติการ chat ตาม id
router.get("/chats/:id", ClerkExpressRequireAuth(), getChats);

// บันทึกการ chat และ นำมา update history
router.put("/chats/:id", ClerkExpressRequireAuth(), updateChat);

export default router;