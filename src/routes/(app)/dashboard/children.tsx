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

export const Route = createFileRoute('/(app)/dashboard/children')({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const renderCell = (data: Children, columnKey: ColumnKey) => {
    switch (columnKey) {
      case 'name':
        return data.name;
      case 'age':
        return data.age;
      case 'birthday':
        return data.birthday;
      case 'guardian':
        return data.guardian;
      case 'contact':
        return data.contact;
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl bg-background p-4">
        <h3>Children</h3>

        <div className="flex items-center gap-x-4">
          <Input
            labelPlacement="outside"
            placeholder="Search children"
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
            <span className="mr-6">Add Child</span>
          </Button>
        </div>
      </div>
      <Table aria-label="Children table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={children}>
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
  { name: 'NAME', uid: 'name' },
  { name: 'AGE', uid: 'age' },
  { name: 'DATE OF BIRTH', uid: 'birthday' },
  { name: 'GUARDIAN/PARENT', uid: 'guardian' },
  { name: 'CONTACT NUMBER', uid: 'contact' },
  { name: 'ACTIONS', uid: 'actions' },
];
/* eg data for view details: image, gender */

type Children = (typeof children)[number];
const children = [
  {
    id: 1,
    name: 'Alice Smith',
    age: 11,
    birthday: '2013-05-15',
    guardian: 'John Smith',
    contact: '123-456-7890',
  },
  {
    id: 2,
    name: 'Bob Johnson',
    age: 12,
    birthday: '2012-03-22',
    guardian: 'Mary Johnson',
    contact: '234-567-8901',
  },
  {
    id: 3,
    name: 'Catherine Brown',
    age: 11,
    birthday: '2013-07-30',
    guardian: 'Robert Brown',
    contact: '345-678-9012',
  },
  {
    id: 4,
    name: 'David Wilson',
    age: 10,
    birthday: '2014-11-10',
    guardian: 'Linda Wilson',
    contact: '456-789-0123',
  },
  {
    id: 5,
    name: 'Eva Davis',
    age: 4,
    birthday: '2020-02-14',
    guardian: 'James Davis',
    contact: '567-890-1234',
  },
  {
    id: 6,
    name: 'Frank Miller',
    age: 1,
    birthday: '2024-09-05',
    guardian: 'Susan Miller',
    contact: '678-901-2345',
  },
  {
    id: 7,
    name: 'Grace Garcia',
    age: 8,
    birthday: '2016-12-01',
    guardian: 'Michael Garcia',
    contact: '789-012-3456',
  },
  {
    id: 8,
    name: 'Henry Martinez',
    age: 5,
    birthday: '2019-04-20',
    guardian: 'Patricia Martinez',
    contact: '890-123-4567',
  },
  {
    id: 9,
    name: 'Isabella Rodriguez',
    age: 1,
    birthday: '2024-08-15',
    guardian: 'Carlos Rodriguez',
    contact: '901-234-5678',
  },
  {
    id: 10,
    name: 'Jack Thompson',
    age: 2,
    birthday: '2023-11-30',
    guardian: 'Laura Thompson',
    contact: '012-345-6789',
  },
];
