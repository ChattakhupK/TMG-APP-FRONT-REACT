import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "./components/mode-toggle";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          <ModeToggle />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
