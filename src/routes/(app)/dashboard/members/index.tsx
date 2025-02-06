import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons';
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
  User,
} from '@heroui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { PlusIcon, SearchIcon } from 'lucide-react';
import * as React from 'react';

export const Route = createFileRoute('/(app)/dashboard/members/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const navigate = useNavigate();

  const renderCell = (data: Member, columnKey: ColumnKey) => {
    switch (columnKey) {
      case 'fullName':
        return (
          <User
            avatarProps={{ radius: 'lg', src: data.avatar }}
            description={data.email}
            name={data.fullName}
          >
            {data.email}
          </User>
        );
      case 'title':
        return data.title;
      case 'gender':
        return data.gender;
      case 'location':
        return data.location;
      case 'contact':
        return data.contact;
      case 'email':
        return data.email;
      case 'birthday':
        return data.birthday;
      case 'designation':
        return data.designation;
      case 'committee':
        return data.committee;
      case 'department':
        return data.department;
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
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Details">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit details">
              <span
                className="cursor-pointer text-lg text-default-400 active:opacity-50"
                onClick={() =>
                  void navigate({
                    to: '/dashboard/members/$productId/edit',
                    params: { productId: data.id },
                  })
                }
              >
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
            onPress={() => void navigate({ to: '/dashboard/members/create' })}
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
  );
}

type ColumnKey = (typeof columns)[number]['uid'];
const columns = [
  { name: 'FULL NAME', uid: 'fullName' },
  { name: 'TITLE', uid: 'title' },
  { name: 'GENDER', uid: 'gender' },
  { name: 'LOCATION', uid: 'location' },
  { name: 'CONTACT NUMBER', uid: 'contact' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'DATE OF BIRTH', uid: 'birthday' },
  { name: 'DESIGNATION', uid: 'designation' },
  { name: 'COMMITTEE', uid: 'committee' },
  { name: 'DEPARTMENT', uid: 'department' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];
/* eg data for view details: image, title, gender, department */

type Member = (typeof members)[number];

const members = [
  {
    id: 1,
    fullName: 'Tony Reichert',
    title: 'Mr',
    gender: 'Male',
    designation: 'Elder',
    status: 'Active',
    location: 'Haatso',
    contact: '+233 00 000 0000',
    birthday: '10th October, 1992',
    committee: 'Welfare',
    department: 'Music',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    title: 'Mrs',
    fullName: 'Zoey Lang',
    gender: 'Female',
    designation: 'None',
    status: 'Active',
    location: 'Haatso',
    contact: '+233 00 000 0000',
    birthday: '10th October, 1992',
    committee: 'Welfare',
    department: 'Music',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    title: 'Mrs',
    fullName: 'Jane Fisher',
    gender: 'Female',
    designation: 'Deaconess',
    status: 'Inactive',
    location: 'Haatso',
    contact: '+233 00 000 0000',
    birthday: '10th June, 1990',
    committee: 'Welfare',
    department: 'Music',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    fullName: 'William Howard',
    title: 'Mr',
    gender: 'Male',
    designation: 'None',
    status: 'Inactive',
    location: 'Haatso',
    contact: '+233 00 000 0000',
    birthday: '10th October, 1992',
    committee: 'Welfare',
    department: 'IT',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    fullName: 'Kristen Copper',
    title: 'Mrs',
    gender: 'Female',
    designation: 'Deaconess',
    status: 'Active',
    location: 'Haatso',
    contact: '+233 00 000 0000',
    birthday: '1st November, 1995',
    committee: 'Welfare',
    department: 'Music',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
];

type StatusKey = keyof typeof statusColor;
const statusColor = {
  Active: 'success',
  Inactive: 'warning',
} as const;
