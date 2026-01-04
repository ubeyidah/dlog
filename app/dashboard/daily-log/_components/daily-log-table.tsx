'use client'


import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  MoreHorizontalIcon,
  ViewIcon,
  Edit02Icon,
  Delete01Icon,
  CalendarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import dayjs from "dayjs"
import { moodEmojis } from "@/lib/moods"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { DailyLog } from "@/lib/types"
import { useQueryState, parseAsString } from 'nuqs'

// Mood colors mapping
const moodColors: Record<string, string> = {
  PRODUCTIVE: 'bg-green-600/5 text-green-700',
  INSPIRED: 'bg-blue-600/5 text-blue-700',
  GRATEFUL: 'bg-purple-600/5 text-purple-700',
  ENERGIZED: 'bg-yellow-600/5 text-yellow-700',
  PEACEFUL: 'bg-indigo-600/5 text-indigo-700',
  NEUTRAL: 'bg-gray-600/5 text-gray-700',
  REFLECTIVE: 'bg-slate-600/5 text-slate-700',
  CURIOUS: 'bg-teal-600/5 text-teal-700',
  STRUGGLING: 'bg-amber-600/5 text-amber-700',
  TIRED: 'bg-red-600/5 text-red-700',
  OVERWHELMED: 'bg-orange-600/5 text-orange-700',
  DISTRACTED: 'bg-pink-600/5 text-pink-700',
  DOUBTFUL: 'bg-cyan-600/5 text-cyan-700',
  SPIRITUAL: 'bg-violet-600/5 text-violet-700',
  PATIENT: 'bg-emerald-600/5 text-emerald-700',
}

// Column definitions
const columns: ColumnDef<DailyLog>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return (
        <div className="text-left">
          {dayjs(date).format('MMM DD, YYYY')}
        </div>
      )
    },
  },

  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return (
        <div className="truncate max-w-xs" title={title}>
          {title}
        </div>
      )
    },
  },
  {
    accessorKey: "mood",
    header: "Mood",
    cell: ({ row }) => {
      const mood = row.getValue("mood") as string
      return (
        <Badge className={`${moodColors[mood]} rounded-md text-xs uppercase`}>
          {moodEmojis[mood]} {mood.toLowerCase()}
        </Badge>
      )
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[]
      return (
        <div>
          {tags.map((tag, index) => (
            <span key={index} className="text-sm text-muted-foreground mr-2">
              {tag}
            </span>
          ))}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="ghost" size="sm">
            <HugeiconsIcon icon={MoreHorizontalIcon} className="h-4 w-4" />
          </Button>
        } />

        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <HugeiconsIcon icon={ViewIcon} className="h-4 w-4 mr-2" />
            Read
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Edit02Icon} className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <HugeiconsIcon icon={Delete01Icon} className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]


export function DailyLogTable() {
  "use no memo"
  const trpc = useTRPC()
  const [search] = useQueryState('search', parseAsString.withDefault(''))
  const { data }: { data: DailyLog[] } = useSuspenseQuery(trpc.daily_log.getAll.queryOptions({ search }));

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-card rounded-xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 py-16 text-center">
                <Empty className="border-none bg-transparent p-0">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <HugeiconsIcon icon={CalendarIcon} className="h-6 w-6" />
                    </EmptyMedia>
                    <EmptyTitle>No Daily Logs Yet</EmptyTitle>
                    <EmptyDescription>
                      Start your journaling journey by creating your first daily log entry.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button>Create First Log</Button>
                  </EmptyContent>
                </Empty>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
