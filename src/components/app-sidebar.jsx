import {
  Calendar,
  Home,
  Inbox,
  ChartNoAxesGantt,
  PackageSearch,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useTheme } from "@/components/theme-provider";

// Menu items.
const itemsUser = [
  {
    title: "หน้าหลัก",
    url: "/",
    icon: Home,
  },
  {
    title: "สมาชิก",
    url: "/member",
    icon: User,
  },
  {
    title: "รายจ่าย",
    url: "/products",
    icon: PackageSearch,
  },
];
const itemsAdmin = [
  {
    title: "จัดสรรทรัพยากร",
    url: "/admin",
    icon: ChartNoAxesGantt,
  },
];
export function AppSidebar({ logoChange }) {
  return (
    <Sidebar>
      <SidebarContent className="flex">
        <SidebarGroup>
          {logoChange === "dark" ? (
            <img src="../../public/tmgLogow.png" alt="" />
          ) : (
            <img src="../../public/tmgLogob.png" alt="" />
          )}
          <hr className=" my-2" />
          <SidebarGroupLabel>Application Member</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsUser.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <hr className=" my-2" />
          <SidebarGroupLabel>Admin Manager</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsAdmin.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
