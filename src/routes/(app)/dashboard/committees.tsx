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

export const Route = createFileRoute('/(app)/dashboard/committees')({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const renderCell = (data: Committee, columnKey: ColumnKey) => {
    switch (columnKey) {
      case 'committee_name':
        return data.committee_name;
      case 'chairperson':
        return data.chairperson;
      case 'members':
        return data.members;
      case 'meeting_frequency':
        return data.meeting_frequency;
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
            <Tooltip color="danger" content="Delete committee">
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
        <h3>Committees</h3>

        <div className="flex items-center gap-x-4">
          <Input
            labelPlacement="outside"
            placeholder="Search committees"
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
            <span className="mr-6">Add Committee</span>
          </Button>
        </div>
      </div>
      <Table aria-label="Committees table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={committees}>
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
  { name: 'COMMITTEE NAME', uid: 'committee_name' },
  { name: 'CHAIRPERSON', uid: 'chairperson' },
  { name: 'MEMBERS', uid: 'members' },
  { name: 'MEETING FREQUENCY', uid: 'meeting_frequency' },
];
/* eg data for view details: date established, contact email, contact number */

type Committee = (typeof committees)[number];
const committees = [
  {
    id: '1',
    committee_name: 'Welfare',
    chairperson: 'John Doe',
    members: 10,
    meeting_frequency: 'Monthly',
  },
  {
    id: '2',
    committee_name: 'Welfare',
    chairperson: 'Emily Davis',
    members: 8,
    meeting_frequency: 'Weekly',
  },
];
