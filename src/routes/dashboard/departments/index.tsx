import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons';
import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon, SearchIcon } from 'lucide-react';
import * as React from 'react';

export const Route = createFileRoute('/dashboard/departments/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const renderCell = (data: Department, columnKey: ColumnKey) => {
    switch (columnKey) {
      case 'department_name':
        return data.department_name;
      case 'leader':
        return data.leader;
      case 'members':
        return data.members;
      case 'meeting_day':
        return data.meeting_day;
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
            <Tooltip color="danger" content="Delete department">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl bg-background p-4">
        <h3>Departments</h3>

        <div className="flex items-center gap-x-4">
          <Input
            labelPlacement="outside"
            placeholder="Search departments"
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
            <span className="mr-6">Add Department</span>
          </Button>
        </div>
      </div>
      <Table aria-label="Departments table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={departments}>
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
  );
}

type ColumnKey = (typeof columns)[number]['uid'];
const columns = [
  { name: 'DEPARTMENT NAME', uid: 'department_name' },
  { name: 'LEADER', uid: 'leader' },
  { name: 'MEMBERS', uid: 'members' },
  { name: 'MEETING DAY', uid: 'meeting_day' },
];
/* eg data for view details: date established, contact email, contact number */

type Department = (typeof departments)[number];
const departments = [
  {
    id: 1,
    department_name: 'Worship Ministry',
    leader: 'Pastor Mark',
    members: 25,
    meeting_day: 'Sunday',
  },
  {
    id: 2,
    department_name: 'Youth Ministry',
    leader: 'Sarah Johnson',
    members: 15,
    meeting_day: 'Friday',
  },
  {
    id: 3,
    department_name: 'Outreach Ministry',
    leader: 'David Kim',
    members: 30,
    meeting_day: 'Saturday',
  },
  {
    id: 4,
    department_name: "Children's Ministry",
    leader: 'Emily Carter',
    members: 20,
    meeting_day: 'Sunday',
  },
  {
    id: 5,
    department_name: 'Bible Study Group',
    leader: 'Michael Johnson',
    members: 12,
    meeting_day: 'Wednesday',
  },
  {
    id: 6,
    department_name: 'Hospitality Team',
    leader: 'Olivia Brown',
    members: 10,
    meeting_day: 'Monday',
  },
  {
    id: 7,
    department_name: 'Prayer Ministry',
    leader: 'Grace Martinez',
    members: 8,
    meeting_day: 'Thursday',
  },
  {
    id: 9,
    department_name: 'Media Team',
    leader: 'Liam Thompson',
    members: 18,
    meeting_day: 'Friday',
  },
];
