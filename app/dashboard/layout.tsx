import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import AppSidebar from "./_components/app-sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 w-full p-2 px-4 lg:px-6">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
