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

export const Route = createFileRoute('/(app)/dashboard/members')({
  component: RouteComponent,
})

function RouteComponent() {
  const [currentPage, setCurrentPage] = React.useState(1)

  const renderCell = (data: Member, columnKey: ColumnKey) => {
    switch (columnKey) {
      case 'name':
        return data.name
      case 'age':
        return data.age
      case 'email':
        return data.email
      case 'phone':
        return data.phone
      case 'birthday':
        return data.birthday
      case 'location':
        return data.location
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
      case 'ministry':
        return data.ministry
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
            <Tooltip color="danger" content="Delete member">
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
        <h3>Members</h3>

        <div className="flex items-center gap-x-4">
          <Input
            labelPlacement="outside"
            placeholder="Search members"
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
            <span className="mr-6">Add Member</span>
          </Button>
        </div>
      </div>
      <Table aria-label="Members table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={members}>
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
  { name: 'EMAIL', uid: 'email' },
  { name: 'CONTACT NUMBER', uid: 'phone' },
  { name: 'DATE OF BIRTH', uid: 'birthday' },
  { name: 'LOCATION', uid: 'location' },
  { name: 'STATUS', uid: 'status' },
  { name: 'MINISTRY', uid: 'ministry' },
  { name: 'ACTIONS', uid: 'actions' },
]
/* eg data for view details: image, title, gender, department */

type Member = (typeof members)[number]
const members = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    birthday: '2022-01-15',
    age: 45,
    location: 'Haatso',
    status: 'Active',
    ministry: 'Worship',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '234-567-8901',
    birthday: '2021-05-20',
    age: 32,
    location: 'Dansoman',
    status: 'Active',
    ministry: 'Children',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '345-678-9012',
    birthday: '2023-03-10',
    age: 67,
    location: 'Ashongman',
    status: 'Inactive',
    ministry: 'Outreach',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '456-789-0123',
    birthday: '2022-11-05',
    age: 28,
    location: 'Tema',
    status: 'Active',
    ministry: 'Prayer',
  },
  {
    id: 5,
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    phone: '567-890-1234',
    birthday: '2023-01-30',
    age: 51,
    location: 'Haatso',
    status: 'Active',
    ministry: 'Youth',
  },
]

type StatusKey = keyof typeof statusColor
const statusColor = {
  Active: 'success',
  Inactive: 'warning',
} as const
