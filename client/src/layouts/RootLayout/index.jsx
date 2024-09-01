import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./RootLayout.css"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

// ถูกสร้างขึ้นและจัดการการทำงานต่าง ๆ ที่เกี่ยวข้องกับการดึงข้อมูลในแอปพลิเคชัน
const queryClient = new QueryClient();


const RootLayout = () => {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            {/* ใช้เพื่อให้บริการ QueryClient ให้กับคอมโพเนนต์ภายในที่ต้องการเข้าถึง React Query */}
            <QueryClientProvider client={queryClient}>
                <div className="rootLayout">
                    <header>
                        <Link to="/" className="logo">
                            <img src="/logo.png" alt="" />
                            <span>JAIFOO</span>
                        </Link>
                        <div className='user'>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </QueryClientProvider>
        </ClerkProvider>
    )
}

export default RootLayout