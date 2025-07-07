"use client";

import AppLayout from "@/components/AppLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen>
            <AppLayout>
                {children}
            </AppLayout>
        </SidebarProvider>
    );
}
