"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { CalendarIcon, Chart02FreeIcons, GlobalSearchIcon, GooglePhotosIcon, Home, SettingsIcon, TaskDaily01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavUser } from "./user-nav"
import QuickLog from "@/components/shared/qucik-log"


const links = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Home",
  },
  {
    href: "/dashboard/daily-log",
    icon: TaskDaily01Icon,
    label: "Daily Log",
  },
  {
    href: "/dashboard/photos",
    icon: GooglePhotosIcon,
    label: "Photos",
  },
  {
    href: "/dashboard/stats",
    icon: Chart02FreeIcons,
    label: "Stats",
  },
  {
    href: "/dashboard/goals",
    icon: GlobalSearchIcon,
    label: "Goals",
  },
  {
    href: "/dashboard/calendar",
    icon: CalendarIcon,
    label: "Calendar",
  },
  {
    href: "/dashboard/settings",
    icon: SettingsIcon,
    label: "Settings",
  },
];




function isSidebarItemActive(itemUrl: string, pathname: string) {
  if (itemUrl === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname.startsWith(itemUrl);
}

const AppSidebar = () => {
  const { open } = useSidebar()
  const pathname = usePathname()
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="flex flex-row justify-between items-center border-b">
        {
          open ? <>
            <Link
              href="/"
              aria-label="home"
              className="flex w-fit items-center">
              <Image src={"/logo.svg"} width={20} height={10} alt='dlog logo' className='h-8 w-full' />
            </Link>
            <QuickLog />
          </> : <Link
            href="/"
            aria-label="home"
            className="flex w-fit items-center">
            <Image src={"/logo-icon.svg"} width={20} height={10} alt='dlog logo' className='h-8 w-full' />
          </Link>
        }
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {
                links.map(link => {
                  const isActive = isSidebarItemActive(link.href, pathname)
                  return (<SidebarMenuItem key={link.href}>
                    <Link href={link.href}>
                      <SidebarMenuButton tooltip={link.label} className={cn("hover:bg-primary/10 hover:text-primary transition-all duration-300", isActive && "bg-primary/10 text-primary")} >
                        <HugeiconsIcon icon={link.icon} strokeWidth={2} />
                        {link.label}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>)
                })
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
