import {
  Button,
  cn,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
  User,
} from '@heroui/react';
import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import {
  BabyIcon,
  Building2Icon,
  ChurchIcon,
  ClipboardCheckIcon,
  HandHeartIcon,
  LayoutDashboardIcon,
  MenuIcon,
  PanelLeftCloseIcon,
  PanelRightCloseIcon,
  UserCogIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-react';
import * as React from 'react';

export const Route = createFileRoute('/(app)/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSideBar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container min-h-dvh bg-content3">
      <header className="dashboard-header sticky top-0 z-10 flex min-h-16 items-center justify-between bg-background px-4">
        {/* menu togglers */}
        <Button
          isIconOnly
          aria-label={
            isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
          }
          variant="light"
          onPress={toggleSideBar}
          className="max-lg:hidden"
        >
          {isSidebarCollapsed ? (
            <PanelRightCloseIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>

        {/* mobile nav toggler */}
        <>
          <Button
            isIconOnly
            aria-label="Open nav"
            variant="light"
            className="lg:hidden"
            onPress={onOpen}
          >
            <MenuIcon />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="sm"
            className="rounded-none"
          >
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader
                    as={Link}
                    to="/dashboard"
                    className="flex items-center"
                    onClick={onClose}
                  >
                    <img
                      alt="Praise Cathedral Logo"
                      src="/images/logo.png"
                      className="aspect-square h-10 rounded-full object-cover object-center"
                    />
                    <p className="ml-2 truncate text-2xl font-semibold">
                      Praise Cathedral
                    </p>
                  </DrawerHeader>
                  <DrawerBody>
                    <nav>
                      <ul className="space-y-2">
                        {links.map((link) => {
                          return (
                            <li
                              key={link.label}
                              className="flex items-center justify-center"
                            >
                              <Button
                                as={Link}
                                variant="light"
                                fullWidth
                                className="justify-start [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
                                {...link}
                                activeOptions={{ exact: true }}
                                activeProps={{
                                  className:
                                    '!bg-primary !hover:bg-primary !text-primary-foreground',
                                }}
                                onPress={onClose}
                              >
                                {link.icon}
                                <p className="truncate">{link.label}</p>
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </DrawerBody>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </>

        {/* user profile */}
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
              }}
              className="transition-transform"
              description="Admin"
              name="John Doe"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={() => {
                void navigate({ to: '/' });
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>
      <aside
        className={cn(
          'dashboard-aside sticky top-0 grid max-h-dvh grid-rows-[auto_1fr] bg-background transition-[grid-template-columns] duration-300 ease-in-out max-lg:hidden',
          isSidebarCollapsed
            ? 'grid-cols-[theme(spacing.16)]'
            : 'grid-cols-[theme(spacing.60)] px-4',
        )}
      >
        <Link
          to="/dashboard"
          className={cn(
            'flex h-16 items-center',
            isSidebarCollapsed && 'justify-center',
          )}
        >
          <img
            alt="Praise Cathedral Logo"
            src="/images/logo.png"
            className="aspect-square h-10 rounded-full object-cover object-center"
          />
          <p
            className={cn(
              'ml-2 truncate text-2xl font-semibold',
              isSidebarCollapsed && 'hidden',
            )}
          >
            Praise Cathedral
          </p>
        </Link>
        <ul className="space-y-4 py-4">
          {links.map((link) => {
            return (
              <li key={link.label} className="flex items-center justify-center">
                <Button
                  as={Link}
                  variant="light"
                  fullWidth
                  isIconOnly={isSidebarCollapsed}
                  className={cn(
                    'justify-start [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
                    isSidebarCollapsed && 'justify-center',
                  )}
                  {...link}
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className:
                      '!bg-primary !hover:bg-primary !text-primary-foreground',
                  }}
                >
                  {link.icon}
                  <p className={cn('truncate', isSidebarCollapsed && 'hidden')}>
                    {link.label}
                  </p>
                </Button>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="dashboard-main p-4">
        <Outlet />
      </main>
      <footer
        className={cn(
          'dashboard-footer flex min-h-16 flex-wrap items-center justify-center gap-x-1.5 bg-background text-sm',
        )}
      >
        <span>© Copyright</span>
        <span className="font-bold">ACI Praise Cathedral.</span>
        <span>All Rights Reserved</span>
      </footer>
    </div>
  );
}

const links = linkOptions([
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon />,
  },
  {
    to: '/dashboard/members',
    label: 'Members',
    icon: <UsersIcon />,
  },
  {
    to: '/dashboard/children',
    label: 'Children',
    icon: <BabyIcon />,
  },
  {
    to: '/dashboard/visitors',
    label: 'Visitors',
    icon: <UserPlusIcon />,
  },
  {
    to: '/dashboard/departments',
    label: 'Departments',
    icon: <Building2Icon />,
  },
  {
    to: '/dashboard/committee',
    label: 'Committee',
    icon: <ClipboardCheckIcon />,
  },
  {
    to: '/dashboard/elders',
    label: 'Elders',
    icon: <UserCogIcon />,
  },
  {
    to: '/dashboard/deaconesses',
    label: 'Deaconesses',
    icon: <HandHeartIcon />,
  },
  {
    to: '/dashboard/pastors-and-bishops',
    label: 'Pastors & Bishops',
    icon: <ChurchIcon />,
  },
]);
