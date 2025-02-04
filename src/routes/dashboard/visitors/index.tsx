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

export const Route = createFileRoute('/dashboard/visitors/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const renderCell = (data: Visitors, columnKey: ColumnKey) => {
    switch (columnKey) {
      case 'name':
        return data.name;
      case 'email':
        return data.email;
      case 'phone':
        return data.phone;
      case 'visit_date':
        return data.visit_date;
      case 'service_attended':
        return data.service_attended;
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
        <h3>Visitors</h3>

        <div className="flex items-center gap-x-4">
          <Input
            labelPlacement="outside"
            placeholder="Search visitors"
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
            <span className="mr-6">Add Visitor</span>
          </Button>
        </div>
      </div>
      <Table aria-label="Visitors table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={visitors}>
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
  { name: 'EMAIL', uid: 'email' },
  { name: 'CONTACT NUMBER', uid: 'phone' },
  { name: 'VISIT DATE', uid: 'visit_date' },
  { name: 'SERVICE ATTENDENDED', uid: 'service_attended' },
  { name: 'ACTIONS', uid: 'actions' },
];
/* eg data for view details: image, gender */

type Visitors = (typeof visitors)[number];

const visitors = [
  {
    id: 1,
    name: 'Emily Carter',
    phone: '555-123-4567',
    email: 'emilyc@example.com',
    visit_date: '2025-01-15',
    service_attended: 'Sunday Service',
  },
  {
    id: 2,
    name: 'James Smith',
    phone: '555-234-5678',
    email: 'jamess@example.com',
    visit_date: '2025-01-20',
    service_attended: 'Youth Night',
  },
  {
    id: 3,
    name: 'Olivia Brown',
    phone: '555-345-6789',
    email: 'oliviab@example.com',
    visit_date: '2025-01-25',
    service_attended: 'Bible Study',
  },
  {
    id: 4,
    name: 'Michael Johnson',
    phone: '555-456-7890',
    email: 'michaelj@example.com',
    visit_date: '2025-01-30',
    service_attended: 'Sunday Service',
  },
  {
    id: 5,
    name: 'Sophia Williams',
    phone: '555-567-8901',
    email: 'sophiaw@example.com',
    visit_date: '2025-02-01',
    service_attended: 'Evening Prayer',
  },
  {
    id: 6,
    name: 'Daniel Garcia',
    phone: '555-678-9012',
    email: 'danielg@example.com',
    visit_date: '2025-02-03',
    service_attended: 'Choir Practice',
  },
  {
    id: 7,
    name: 'Ava Martinez',
    phone: '555-789-0123',
    email: 'avam@example.com',
    visit_date: '2025-02-05',
    service_attended: 'Prayer Meeting',
  },
  {
    id: 8,
    name: 'William Rodriguez',
    phone: '555-890-1234',
    email: 'williamr@example.com',
    visit_date: '2025-02-07',
    service_attended: 'Sunday Service',
  },
];
