import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons'
import {
  Button,
  Chip,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon, SearchIcon } from 'lucide-react'
import * as React from 'react'

export const Route = createFileRoute('/(app)/dashboard/elders')({
  component: RouteComponent,
})

function RouteComponent() {
  const [currentPage, setCurrentPage] = React.useState(1)

  const renderCell = (data: Elder, columnKey: ColumnKey) => {
    switch (columnKey) {
      case 'name':
        return data.name
      case 'age':
        return data.age
      case 'years_served':
        return data.years_served
      case 'email':
        return data.email
      case 'phone':
        return data.phone
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColor[data.status as StatusKey]}
            size="sm"
            variant="flat"
          >
            {data.status}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Details">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit details">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete elder">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl bg-background p-4">
        <h3>Elders</h3>

        <div className="flex items-center gap-x-4">
          <Input
            labelPlacement="outside"
            placeholder="Search elders"
            variant="bordered"
            startContent={
              <SearchIcon className="pointer-events-none size-5 flex-shrink-0 text-default-400" />
            }
            type="search"
          />
          <Button
            color="primary"
            fullWidth
            className="inline-grid grid-cols-[auto,1fr] md:w-fit"
            startContent={<PlusIcon className="ml-5 size-4" />}
          >
            <span className="mr-6">Add Elder</span>
          </Button>
        </div>
      </div>
      <Table aria-label="Elders table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={elders}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as ColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        page={currentPage}
        total={10}
        onChange={setCurrentPage}
        showControls
        className="ml-auto"
        variant="bordered"
      />
    </div>
  )
}

type ColumnKey = (typeof columns)[number]['uid']
const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'AGE', uid: 'age' },
  { name: 'YEARS SERVED', uid: 'years_served' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'CONTACT NUMBER', uid: 'phone' },
  { name: 'STATUS', uid: 'status' },
]
/* eg data for view details: date established, contact email, contact number */

type Elder = (typeof elders)[number]
const elders = [
  {
    id: '1',
    name: 'John Smith',
    age: 65,
    years_served: 15,
    phone: '123-456-7890',
    email: 'john.smith@church.org',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Mary Johnson',
    age: 58,
    years_served: 10,
    phone: '234-567-8901',
    email: 'mary.johnson@church.org',
    status: 'Active',
  },
]

type StatusKey = keyof typeof statusColor
const statusColor = {
  Active: 'success',
  Inactive: 'warning',
} as const
