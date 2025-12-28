"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth-client"
import { Check, Logout01Icon, MoreVerticalIcon, Notification01Icon, RefreshCw, SettingsIcon, UserCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

function UserNavSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32 mt-1" />
          </div>
          <Skeleton className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function UserNavError({ onRetry }: { onRetry: () => void }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Card className="w-full p-3">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-sm">Error Loading Profile</CardTitle>
            <CardDescription className="text-xs">
              Unable to load user information
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="w-full"
            >
              <HugeiconsIcon icon={RefreshCw} className="mr-2 size-3" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function NavUser() {
  const { data, error, isPending, refetch } = authClient.useSession()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        },
        onError: () => {
          toast.error('Error logging out. Please try again.', {
            action: {
              label: 'Retry',
              onClick: handleLogout,
            }
          })
        }
      }
    })
  }
  if (isPending) return <UserNavSkeleton />
  if (error) return <UserNavError onRetry={refetch} />
  const userName = data?.user.name || data?.user.email?.split('@')[0]
  const fallbackImage = `https://avatar.vercel.sh/${userName}?rounded=60`
  const user = { avatar: data?.user.image || fallbackImage, name: userName, email: data?.user.email }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">{user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
            <HugeiconsIcon icon={MoreVerticalIcon} strokeWidth={2} className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="top"
            align="end"
            sideOffset={-40}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{user.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <HugeiconsIcon icon={UserCircleIcon} strokeWidth={2} />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
                  Setting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HugeiconsIcon icon={Notification01Icon} strokeWidth={2} />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HugeiconsIcon icon={Notification01Icon} strokeWidth={2} />
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className="flex items-center justify-between gap-2" onClick={() => setTheme("light")}>Light {theme == "light" && <HugeiconsIcon icon={Check} />}</DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-between gap-2" onClick={() => setTheme("dark")}>Dark {theme == "dark" && <HugeiconsIcon icon={Check} />}</DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-between gap-2" onClick={() => setTheme("system")}>System {theme == "system" && <HugeiconsIcon icon={Check} />}</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} variant="destructive">
                <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

