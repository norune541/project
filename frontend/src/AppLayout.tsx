import {
  ChevronsUpDown,
  Cloud,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  UserRound,
  Users,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useMe } from './mock';

type NavItem = { title: string; to: string; icon: LucideIcon };

const WORKSPACE_NAV: NavItem[] = [
  { title: 'Дашборд', to: '/', icon: LayoutDashboard },
  { title: 'Проекты', to: '/projects', icon: FolderKanban },
  { title: 'Команда', to: '/team', icon: Users },
];

const ACCOUNT_NAV: NavItem[] = [{ title: 'Настройки', to: '/me', icon: Settings }];

const isActivePath = (pathname: string, to: string) =>
  to === '/' ? pathname === '/' : pathname.startsWith(to);

const initials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function SidebarBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" render={<Link to="/" />}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Cloud className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Nimbus</span>
            <span className="truncate text-xs text-muted-foreground">Рабочее пространство</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavGroup({ label, items }: { label: string; items: NavItem[] }) {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, to, icon: Icon }) => (
            <SidebarMenuItem key={to}>
              <SidebarMenuButton
                render={<Link to={to} />}
                isActive={isActivePath(pathname, to)}
                tooltip={title}
                onClick={() => setOpenMobile(false)}
              >
                <Icon />
                <span>{title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function UserSummary({ name, email }: { name: string; email: string }) {
  return (
    <>
      <Avatar className="size-8 rounded-lg">
        <AvatarFallback className="rounded-lg bg-primary/10 text-xs text-primary">
          {initials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{name}</span>
        <span className="truncate text-xs text-muted-foreground">{email}</span>
      </div>
    </>
  );
}

function UserMenu() {
  const { data: user } = useMe();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
            <UserSummary name={user.username} email={user.email} />
            <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isMobile ? 'bottom' : 'top'}
            align="end"
            sideOffset={8}
            className="min-w-56"
          >
            <div className="flex items-center gap-2 px-2 py-1.5">
              <UserSummary name={user.username} email={user.email} />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link to="/me" />}>
              <UserRound />
              Профиль
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => navigate('/login')}>
              <LogOut />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function Header() {
  const { pathname } = useLocation();
  const current = [...WORKSPACE_NAV, ...ACCOUNT_NAV].find(({ to }) => isActivePath(pathname, to));

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <div className="h-4 w-px bg-border" />
      <span className="text-sm font-medium">{current?.title}</span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t px-4 py-5 text-sm text-muted-foreground md:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p>© {new Date().getFullYear()} Nimbus. Все права защищены.</p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1" aria-label="Документы">
          <a href="#" className="transition-colors hover:text-foreground">
            Условия использования
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Конфиденциальность
          </a>
          <a href="mailto:support@nimbus.app" className="transition-colors hover:text-foreground">
            Поддержка
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarBrand />
        </SidebarHeader>

        <SidebarContent>
          <NavGroup label="Рабочее пространство" items={WORKSPACE_NAV} />
          <NavGroup label="Аккаунт" items={ACCOUNT_NAV} />
        </SidebarContent>

        <SidebarFooter>
          <UserMenu />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset className="min-w-0">
        <Header />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
