import { Card, CardBody } from '@heroui/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  BabyIcon,
  Building2Icon,
  ComputerIcon,
  FlameIcon,
  MusicIcon,
  ShieldIcon,
  UserIcon,
  UserPlusIcon,
  UserRoundIcon,
  UsersIcon,
  UsersRoundIcon,
} from 'lucide-react';

export const Route = createFileRoute('/(app)/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4">
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Members</h4>

            <Link
              to="/dashboard/members"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100/60 p-2 *:text-emerald-500">
              <UsersIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">700</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Males</h4>

            <Link
              to="/dashboard/members"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-100/60 p-2 *:text-blue-500">
              <UserIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">350</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Females</h4>

            <Link
              to="/dashboard/members"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-pink-100/60 p-2 *:text-pink-500">
              <UserRoundIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">350</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Children</h4>

            <Link
              to="/dashboard/children"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-purple-100/60 p-2 *:text-purple-500">
              <BabyIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">150</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Visitors</h4>

            <Link
              to="/dashboard/visitors"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-100/60 p-2 *:text-green-500">
              <UserPlusIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">50</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Welfare Committee</h4>

            <Link
              to="/dashboard/committees"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-default-100/60 p-2 *:text-default-500">
              <UsersRoundIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">400</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Departments</h4>

            <Link
              to="/dashboard/departments"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-100/60 p-2 *:text-blue-500">
              <Building2Icon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">400</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Music Department</h4>

            <Link
              to="/dashboard/departments"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-100/60 p-2 *:text-blue-500">
              <MusicIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">300</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>IT & Media Department</h4>

            <Link
              to="/dashboard/departments"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-100/60 p-2 *:text-blue-500">
              <ComputerIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">100</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4>Prayer Department</h4>

            <Link
              to="/dashboard/departments"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-amber-100/60 p-2 *:text-amber-500">
              <FlameIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">25</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="space-y-6 px-6 py-8">
          <div className="flex items-center justify-between">
            <h4 className="truncate">Protocol & Security Department</h4>

            <Link
              to="/dashboard/departments"
              className="text-primary hover:underline"
            >
              View
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-orange-100/60 p-2 *:text-orange-500">
              <ShieldIcon />
            </div>
            <p className="text-3xl font-bold md:text-4xl">70</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
