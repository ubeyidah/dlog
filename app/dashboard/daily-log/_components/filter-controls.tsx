"use client";

import { useQueryState, parseAsString, parseAsIsoDateTime } from "nuqs";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import {
  Search01Icon,
  Cancel01Icon,
  PlusSignIcon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { LOG_MOODS } from "@/lib/validation/daily-log.schema";
import { moodEmojis } from "@/lib/moods";

const FilterControls = () => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [mood, setMood] = useQueryState("mood", parseAsString);
  const [startDate, setStartDate] = useQueryState(
    "startDate",
    parseAsIsoDateTime,
  );
  const [endDate, setEndDate] = useQueryState("endDate", parseAsIsoDateTime);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startDate || undefined,
    to: endDate || undefined,
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setStartDate(range?.from || null);
    setEndDate(range?.to || null);
  };

  return (
    <div className="space-y-3 py-4 mt-2 gap-2 md:flex md:justify-between md:items-center md:space-y-0">
      <div className="md:max-w-md w-full md:flex-1">
        <InputGroup>
          <InputGroupAddon>
            <HugeiconsIcon icon={Search01Icon} className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search logs by title, content, or #tags"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <InputGroupButton onClick={() => setSearch(null)}>
              <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
            </InputGroupButton>
          )}
        </InputGroup>
      </div>

      <div className="flex space-y-1 md:space-y-0 gap-2 md:items-center max-md:flex-col">
        <Select
          value={mood || ""}
          onValueChange={(value) => setMood(value || null)}
        >
          <SelectTrigger className="w-full md:w-48 ">
            <SelectValue>
              {mood ? `${moodEmojis[mood]} ${mood.toLowerCase()}` : "All moods"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All moods</SelectItem>
            {LOG_MOODS.map((m) => (
              <SelectItem key={m} value={m}>
                {moodEmojis[m]} {m.toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className="w-full md:w-64 justify-start"
              >
                <HugeiconsIcon icon={Calendar03Icon} className="h-4 w-4 mr-2" />
                <span className="flex-1 text-left">
                  {dateRange?.from
                    ? dateRange.to
                      ? `${dayjs(dateRange.from).format("MMM DD")} - ${dayjs(dateRange.to).format("MMM DD")}`
                      : dayjs(dateRange.from).format("MMM DD YY")
                    : "Select date range"}
                </span>
                {dateRange?.from && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDateSelect(undefined);
                    }}
                    className="z-10 cursor-pointer"
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </div>
                )}
              </Button>
            }
          />
          <PopoverContent align="center" className="w-auto p-0">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Button className="md:w-fit">
          <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4" />
          Create Log
        </Button>
      </div>
    </div>
  );
};

export { FilterControls };
