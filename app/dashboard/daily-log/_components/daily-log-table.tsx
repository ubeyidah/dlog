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
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import dayjs from "dayjs"
import { moodEmojis } from "@/lib/moods"

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

// Define the data type
export type DailyLog = {
  id: string
  createdAt: Date
  mood: string
  title: string
  tags: string[]
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
        <DropdownMenuTrigger>
          <Button variant="ghost" size="sm">
            <HugeiconsIcon icon={MoreHorizontalIcon} className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
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

interface DailyLogTableProps {
  data: DailyLog[]
}

export function DailyLogTable({ data }: DailyLogTableProps) {
  "use no memo"

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
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
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
