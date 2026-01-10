import { HugeiconsIcon } from "@hugeicons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Search } from "@hugeicons/core-free-icons";
import QuickLog from "./qucik-log";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface iAppProps {
  children?: ReactNode;
  label: string;
}

function SiteHeader({ children, label }: iAppProps) {
  return (
    <header className="flex h-(--header-height) w-full shrink-0 items-center gap-2 rounded-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1  py-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4 mt-1.5"
          />
          <h1 className="text-base font-medium">{label || "Dashboard"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {children ? (
            children
          ) : (
            <>
              <div className="md:hidden flex items-center gap-2">
                <QuickLog />
                <Button variant="outline" className="rounded-xl" size={"icon"}>
                  <HugeiconsIcon icon={Search} />
                </Button>
              </div>
              <div className="md:flex hidden">
                <InputGroup>
                  <InputGroupInput placeholder="Search..." />
                  <InputGroupAddon>
                    <HugeiconsIcon icon={Search} />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
