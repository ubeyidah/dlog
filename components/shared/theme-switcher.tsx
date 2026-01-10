"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun, SunMoon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  return (
    <Select value={theme} onValueChange={(value) => setTheme(value as string)}>
      <SelectTrigger className="w-45">
        <SelectValue aria-placeholder="theme">{theme}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">
            <HugeiconsIcon icon={Sun} /> light
          </SelectItem>
          <SelectItem value="dark">
            <HugeiconsIcon icon={Moon} /> Dark
          </SelectItem>
          <SelectItem value="system">
            <HugeiconsIcon icon={SunMoon} /> System
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ThemeSwitcher;
