"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  MessageCircleQuestion,
  SlidersHorizontal,
  ShieldAlert,
  Mic,
  Lock,
  PanelLeft,
} from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';


const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/qa', label: 'Financial Q&A', icon: MessageCircleQuestion },
  { href: '/simulations', label: 'Simulations', icon: SlidersHorizontal },
  { href: '/anomalies', label: 'Anomaly Detection', icon: ShieldAlert },
  { href: '/voice', label: 'Voice Assistant', icon: Mic },
  { href: '/privacy', label: 'Privacy', icon: Lock },
];

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-primary"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      <span className="font-headline font-bold text-xl text-foreground group-data-[collapsible=icon]:hidden">
        FinPilot AI
      </span>
    </Link>
  );
}

function MainNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
            className="font-body"
            tooltip={{children: item.label}}
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <PanelLeft />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-card">
                <ScrollArea className="h-full">
                    <div className="p-4 border-b">
                        <Logo />
                    </div>
                    <div className="p-4">
                        <MainNav />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            user@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  const getPageTitle = (path: string) => {
    if (path === '/dashboard') return 'Dashboard';
    const item = navItems.find(i => i.href !== '/dashboard' && path.startsWith(i.href));
    return item ? item.label : 'Dashboard';
  }

  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <>
      <Sidebar variant="sidebar" className="bg-card border-r dark:border-sidebar-border">
        <SidebarHeader className="p-3">
           <Logo />
        </SidebarHeader>
        <SidebarContent className="p-3">
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-4">
                {isMobile ? <MobileNav /> : <SidebarTrigger />}
                <h1 className="text-lg font-headline font-semibold">{pageTitle}</h1>
            </div>
            <div className="flex items-center gap-4">
                <UserMenu />
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
            {children}
        </main>
      </SidebarInset>
    </>
  );
}
