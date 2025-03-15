import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons';
import { membersQueryOptions } from '@/utils/query-options';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@heroui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { PlusIcon, SearchIcon } from 'lucide-react';

export const Route = createFileRoute('/(app)/dashboard/members/')({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(membersQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const membersQuery = useSuspenseQuery(membersQueryOptions());

  const renderCell = (
    data: (typeof membersQuery.data.results)[number],
    columnKey: ColumnKey,
  ) => {
    switch (columnKey) {
      case 'full_name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: data.image }}
            description={data.email}
            name={data.full_name}
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
      case 'contact_no':
        return data.contact_no;
      case 'birthday':
        return data.birthday;
      case 'committee':
        return data.committee;
      case 'department':
        return data.department;
      case 'designation':
        return data.designation;
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
              <button className="cursor-pointer text-lg text-danger active:opacity-50">
                <DeleteIcon />
              </button>
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
        <TableBody items={membersQuery.data.results}>
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
      {/* add when total number of pages is returned */}
      {/* <Pagination
        page={currentPage}
        total={1}
        onChange={setCurrentPage}
        showControls
        className="ml-auto"
        variant="bordered"
      /> */}
    </div>
  );
}

type ColumnKey = (typeof columns)[number]['uid'];
const columns = [
  { name: 'NAME', uid: 'full_name' },
  { name: 'TITLE', uid: 'title' },
  { name: 'GENDER', uid: 'gender' },
  { name: 'LOCATION', uid: 'location' },
  { name: 'CONTACT NUMBER', uid: 'contact_no' },
  { name: 'DATE OF BIRTH', uid: 'birthday' },
  { name: 'COMMITTEE', uid: 'committee' },
  { name: 'DEPARTMENT', uid: 'department' },
  { name: 'DESIGNATION', uid: 'designation' },
  { name: 'ACTIONS', uid: 'actions' },
];
