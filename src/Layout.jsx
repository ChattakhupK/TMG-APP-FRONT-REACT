import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "./components/mode-toggle";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  const [logoChange, setLogoChange] = useState("dark");
  console.log(logoChange);
  return (
    <SidebarProvider>
      <AppSidebar logoChange={logoChange} />
      <main className="w-full">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          <ModeToggle setLogoChange={setLogoChange} />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
