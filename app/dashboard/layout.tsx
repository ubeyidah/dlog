import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import AppSidebar from "./_components/app-sidebar";
import SiteHeader from "@/components/shared/site-header";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <SidebarProvider>
    <AppSidebar />
    <main>
      <SiteHeader />
      {children}
    </main>
  </SidebarProvider>;
}


export default DashboardLayout;
