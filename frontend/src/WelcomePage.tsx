import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Command,
  FolderKanban,
  LayoutDashboard,
  Lock,
  MessageSquare,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Reveal } from '@/components/reveal';

const projects = [
  {
    name: 'Website Redesign',
    description: 'Website development',
    progress: 75,
    color: 'bg-violet-500',
    status: 'В процессе',
  },
  {
    name: 'Mobile Application',
    description: 'Product development',
    progress: 45,
    color: 'bg-blue-500',
    status: 'В работе',
  },
  {
    name: 'Marketing Campaign',
    description: 'Marketing',
    progress: 100,
    color: 'bg-emerald-500',
    status: 'Завершено',
  },
];

const tasks = [
  {
    title: 'Design new dashboard',
    project: 'Website Redesign',
    initials: 'JD',
    color: 'bg-violet-500',
  },
  {
    title: 'Review landing page',
    project: 'Website Redesign',
    initials: 'MK',
    color: 'bg-blue-500',
  },
  {
    title: 'Prepare project brief',
    project: 'Mobile Application',
    initials: 'AL',
    color: 'bg-amber-500',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Меньше рутины',
    description:
      'Организуйте повторяющиеся процессы и освободите время для действительно важных задач.',
  },
  {
    icon: BarChart3,
    title: 'Полная прозрачность',
    description: 'Следите за прогрессом проектов и понимайте, что происходит в команде.',
  },
  {
    icon: ShieldCheck,
    title: 'Всё под контролем',
    description: 'Храните рабочую информацию в одном структурированном пространстве.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Создайте пространство',
    description: 'Зарегистрируйтесь и настройте Nimbus под свою команду или личные задачи.',
    icon: LayoutDashboard,
  },
  {
    number: '02',
    title: 'Добавьте проекты',
    description: 'Организуйте проекты, задачи и всю необходимую информацию.',
    icon: FolderKanban,
  },
  {
    number: '03',
    title: 'Работайте вместе',
    description: 'Отслеживайте прогресс, делитесь результатами и двигайтесь к целям.',
    icon: Users,
  },
];

const faqs = [
  {
    question: 'Что такое Nimbus?',
    answer:
      'Nimbus — рабочее пространство, которое помогает организовать проекты, задачи и командную работу в одном месте.',
  },
  {
    question: 'Можно ли использовать Nimbus самостоятельно?',
    answer:
      'Да. Nimbus подходит как для индивидуальной работы, так и для совместной работы небольших и больших команд.',
  },
  {
    question: 'Сложно ли начать пользоваться платформой?',
    answer:
      'Нет. Создайте аккаунт, настройте пространство и добавьте первый проект. Интерфейс спроектирован так, чтобы начать работу было просто.',
  },
  {
    question: 'Можно ли работать с командой?',
    answer:
      'Да. Вы можете организовывать общие проекты, распределять задачи и следить за ходом работы.',
  },
];

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-[100px]" />

      <div className="overflow-hidden rounded-[24px] border border-border/70 bg-card shadow-2xl shadow-primary/10 sm:rounded-[28px]">
        {/* Browser header */}
        <div className="flex h-12 items-center justify-between border-b px-4 sm:h-14 sm:px-5">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-red-400/80" />
            <div className="size-2.5 rounded-full bg-yellow-400/80" />
            <div className="size-2.5 rounded-full bg-green-400/80" />
          </div>

          <div className="flex items-center gap-2 rounded-md bg-muted/70 px-3 py-1.5 text-[11px] text-muted-foreground sm:text-xs">
            <Lock className="size-3" />
            app.nimbus.com
          </div>

          <MoreHorizontal className="size-4 text-muted-foreground" />
        </div>

        <div className="grid min-h-[480px] grid-cols-[135px_1fr] sm:grid-cols-[175px_1fr] lg:min-h-[510px]">
          {/* Dashboard sidebar */}
          <aside className="border-r bg-muted/20 p-3 sm:p-4">
            <div className="mb-8 flex items-center gap-2 px-1">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Cloud className="size-4" />
              </div>

              <span className="text-sm font-semibold">Nimbus</span>
            </div>

            <div className="mb-3 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Workspace
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-2 py-2 text-xs font-medium text-primary">
                <LayoutDashboard className="size-3.5" />
                Overview
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground">
                <FolderKanban className="size-3.5" />
                Projects
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground">
                <CheckCircle2 className="size-3.5" />
                My tasks
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground">
                <Users className="size-3.5" />
                Team
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground">
                <MessageSquare className="size-3.5" />
                Messages
              </div>
            </div>

            <div className="mb-3 mt-8 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Settings
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground">
                <Command className="size-3.5" />
                Preferences
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground">
                <Lock className="size-3.5" />
                Security
              </div>
            </div>

            <div className="mt-12 rounded-lg border bg-background p-2.5">
              <div className="mb-2 flex items-center gap-1.5">
                <Sparkles className="size-3 text-primary" />
                <span className="text-[10px] font-semibold">Nimbus Pro</span>
              </div>
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Your workspace, upgraded.
              </p>
            </div>
          </aside>

          {/* Dashboard content */}
          <div className="min-w-0 p-3 sm:p-5 lg:p-6">
            <div className="mb-6 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] text-muted-foreground sm:text-xs">Monday, November 12</p>
                <h3 className="mt-1 text-base font-semibold tracking-tight sm:text-xl">
                  Good morning, Alex
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="size-8">
                  <Search className="size-3.5" />
                </Button>

                <Button variant="outline" size="icon" className="relative size-8">
                  <Bell className="size-3.5" />
                  <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
                </Button>

                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">JD</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Summary cards */}
            <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              <div className="rounded-xl border bg-background p-3">
                <div className="mb-2 flex items-center justify-between">
                  <FolderKanban className="size-4 text-primary" />
                  <span className="text-[9px] text-emerald-600">+2</span>
                </div>
                <p className="text-xl font-semibold">12</p>
                <p className="text-[10px] text-muted-foreground">Active projects</p>
              </div>

              <div className="rounded-xl border bg-background p-3">
                <div className="mb-2 flex items-center justify-between">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span className="text-[9px] text-emerald-600">+8</span>
                </div>
                <p className="text-xl font-semibold">48</p>
                <p className="text-[10px] text-muted-foreground">Completed tasks</p>
              </div>

              <div className="col-span-2 rounded-xl border bg-background p-3 sm:col-span-1">
                <div className="mb-2 flex items-center justify-between">
                  <Users className="size-4 text-blue-500" />
                  <span className="text-[9px] text-muted-foreground">This week</span>
                </div>
                <p className="text-xl font-semibold">08</p>
                <p className="text-[10px] text-muted-foreground">Team members</p>
              </div>
            </div>

            {/* Project list */}
            <div className="mb-5 rounded-xl border bg-background p-3 sm:p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold sm:text-sm">Your projects</h4>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Track your team's progress
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]">
                  View all
                  <ChevronRight className="ml-1 size-3" />
                </Button>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.name}>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-medium sm:text-xs">
                          {project.name}
                        </p>
                        <p className="mt-0.5 text-[9px] text-muted-foreground">
                          {project.description}
                        </p>
                      </div>

                      <span className="shrink-0 text-[9px] text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${project.color}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="rounded-xl border bg-background p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-xs font-semibold sm:text-sm">Recent tasks</h4>
                <MoreHorizontal className="size-4 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                {tasks.slice(0, 2).map((task) => (
                  <div key={task.title} className="flex items-center gap-2.5">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Check className="size-3 text-emerald-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-medium">{task.title}</p>
                      <p className="text-[9px] text-muted-foreground">{task.project}</p>
                    </div>

                    <Avatar className="size-6">
                      <AvatarFallback className={`${task.color} text-[8px] text-white`}>
                        {task.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -bottom-7 -left-5 hidden items-center gap-3 rounded-xl border bg-background p-3 shadow-xl xl:flex">
        <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
          <CheckCircle2 className="size-5" />
        </div>
        <div>
          <p className="text-xs font-semibold">Task completed</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Your team is making progress</p>
        </div>
      </div>

      <div className="absolute -right-5 top-14 hidden items-center gap-2 rounded-xl border bg-background px-3 py-2.5 shadow-xl xl:flex">
        <div className="flex -space-x-2">
          <Avatar className="size-7 border-2 border-background">
            <AvatarFallback className="bg-violet-500 text-[9px] text-white">JD</AvatarFallback>
          </Avatar>
          <Avatar className="size-7 border-2 border-background">
            <AvatarFallback className="bg-blue-500 text-[9px] text-white">MK</AvatarFallback>
          </Avatar>
          <Avatar className="size-7 border-2 border-background">
            <AvatarFallback className="bg-amber-500 text-[9px] text-white">AL</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-[10px] font-medium">Your team</span>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 xl:px-12 2xl:px-16">
          <Link to="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Cloud className="size-5" />
            </div>
            Nimbus
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Возможности
            </a>
            <a
              href="#workflow"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Как это работает
            </a>
            <a
              href="#faq"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Войти</Link>
            </Button>

            <Button className="h-10 px-4 sm:px-5">
              <Link to="/register">
                Начать бесплатно
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_35%,hsl(var(--primary)/0.10),transparent_45%)]" />

        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-5 pb-24 pt-16 sm:px-8 sm:pt-20 lg:min-h-[720px] lg:grid-cols-[0.86fr_1.14fr] lg:gap-10 lg:py-24 xl:gap-16 xl:px-12 2xl:px-16">
          <Reveal className="relative z-10 max-w-[610px]">
            <Badge variant="secondary" className="mb-7 gap-2 rounded-full px-3.5 py-1.5">
              <Sparkles className="size-3.5 text-primary" />
              Пространство для больших идей
            </Badge>

            <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-[4.25rem] xl:text-[5rem]">
              Работа становится
              <span className="mt-1 block text-primary">проще с Nimbus.</span>
            </h1>

            <p className="mt-7 max-w-[490px] text-base leading-8 text-muted-foreground sm:text-lg">
              Проекты, задачи и команда — в едином рабочем пространстве. Сосредоточьтесь на
              результате, а не на поиске нужной информации.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-6">
                <Link to="/register">
                  Создать аккаунт
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="h-12 px-6">
                <a href="#features">Изучить возможности</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Простое начало
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Единое пространство
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative min-w-0 lg:pl-2">
            <DashboardPreview />
          </Reveal>
        </div>
      </section>

      {/* Product overview strip */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto grid w-full max-w-[1440px] gap-7 px-5 py-8 sm:px-8 md:grid-cols-3 xl:px-12 2xl:px-16">
          {[
            {
              icon: FolderKanban,
              title: 'Проекты',
              description: 'Структура и прогресс',
            },
            {
              icon: CheckCircle2,
              title: 'Задачи',
              description: 'Понятные приоритеты',
            },
            {
              icon: Users,
              title: 'Команда',
              description: 'Общая рабочая среда',
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 100} className="flex items-center gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background">
                <item.icon className="size-5 text-primary" />
              </div>

              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 xl:px-12 2xl:px-16">
          <Reveal className="mb-14 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-5">
                Возможности Nimbus
              </Badge>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Всё необходимое.
                <span className="block text-muted-foreground">Без лишней сложности.</span>
              </h2>
            </div>

            <p className="max-w-md text-base leading-7 text-muted-foreground">
              Вместо десятков разрозненных инструментов — единое пространство, в котором каждый
              знает, что происходит и что делать дальше.
            </p>
          </Reveal>

          {/* Bento grid */}
          <div className="grid gap-5 lg:grid-cols-12">
            {/* Projects */}
            <Reveal className="lg:col-span-7">
              <Card className="h-full overflow-hidden rounded-[28px] border-border/70 bg-muted/25 shadow-none">
                <CardContent className="flex h-full flex-col p-7 sm:p-9">
                  <div className="max-w-md">
                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FolderKanban className="size-5" />
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight">
                      Все проекты под контролем
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Соберите задачи, файлы и важную информацию в одном месте. Больше не нужно
                      переключаться между разными приложениями.
                    </p>
                  </div>

                  <div className="mt-9 grid flex-1 gap-3 sm:grid-cols-3">
                    {[
                      {
                        title: 'To do',
                        tasks: ['Research', 'Wireframes', 'User flow'],
                        tone: 'bg-muted',
                      },
                      {
                        title: 'In progress',
                        tasks: ['Dashboard UI', 'Components', 'Responsive'],
                        tone: 'bg-primary/10',
                      },
                      {
                        title: 'Completed',
                        tasks: ['Project brief', 'Audit', 'Planning'],
                        tone: 'bg-emerald-500/10',
                      },
                    ].map((column) => (
                      <div key={column.title} className={`rounded-xl border bg-background p-3`}>
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-semibold">{column.title}</span>
                          <MoreHorizontal className="size-3.5 text-muted-foreground" />
                        </div>

                        <div className="space-y-2">
                          {column.tasks.map((task, index) => (
                            <div key={task} className="rounded-lg border bg-card p-2.5">
                              <div className={`mb-2 h-1 w-7 rounded-full ${column.tone}`} />
                              <p className="text-[10px] font-medium">{task}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-[9px] text-muted-foreground">
                                  {index + 1} tasks
                                </span>
                                <Avatar className="size-5">
                                  <AvatarFallback className="bg-primary/10 text-[8px] text-primary">
                                    JD
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Team */}
            <Reveal delay={100} className="lg:col-span-5">
              <Card className="h-full overflow-hidden rounded-[28px] border-0 bg-primary text-primary-foreground shadow-none">
                <CardContent className="flex h-full flex-col p-7 sm:p-9">
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary-foreground/10">
                    <Users className="size-5" />
                  </div>

                  <h3 className="max-w-sm text-2xl font-semibold tracking-tight">
                    Команда работает как единое целое
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-primary-foreground/70">
                    Обсуждайте задачи, распределяйте ответственность и держите всех участников в
                    одном контексте.
                  </p>

                  <div className="mt-10 flex flex-1 flex-col justify-end">
                    <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="text-xs font-medium">Team workspace</span>
                        <Badge className="border-0 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/20">
                          Active
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex -space-x-3">
                          {[
                            ['JD', 'bg-violet-500'],
                            ['MK', 'bg-blue-500'],
                            ['AL', 'bg-amber-500'],
                            ['SK', 'bg-emerald-600'],
                          ].map(([initials, color]) => (
                            <Avatar key={initials} className="size-10 border-2 border-primary">
                              <AvatarFallback className={`${color} text-xs text-white`}>
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold">Your team</p>
                          <p className="text-[10px] text-primary-foreground/60">Working together</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Small features */}
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 100} className="lg:col-span-4">
                <Card className="h-full rounded-[24px] border-border/70 shadow-none transition-colors hover:bg-muted/30">
                  <CardContent className="p-7">
                    <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-muted text-primary">
                      <feature.icon className="size-5" />
                    </div>

                    <h3 className="text-lg font-semibold">{feature.title}</h3>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="scroll-mt-24 border-y bg-muted/25 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 xl:px-12 2xl:px-16">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="outline" className="mb-5">
              Начать просто
            </Badge>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              От идеи до результата.
              <span className="block text-muted-foreground">В три шага.</span>
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Создайте рабочее пространство, организуйте процессы и приступайте к работе без долгой
              настройки.
            </p>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-3 md:gap-7">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 120}>
                <div className="h-full border-t border-border pt-7">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{step.number}</span>

                    <div className="flex size-11 items-center justify-center rounded-xl border bg-background">
                      <step.icon className="size-5 text-muted-foreground" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 xl:px-12 2xl:px-16">
          <Reveal>
            <Badge variant="outline" className="mb-5">
              Совместная работа
            </Badge>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Важная информация
              <span className="block text-primary">всегда рядом.</span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-muted-foreground">
              Не теряйте контекст в переписках и бесконечных списках. Nimbus помогает команде видеть
              общую картину и понимать, как отдельные задачи связаны с результатом.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Общая информация по проектам',
                'Понятное распределение задач',
                'Прозрачный ход работы',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium">
                  <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Button className="mt-9 h-11 px-5">
              <Link to="/register">
                Попробовать Nimbus
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </Reveal>

          {/* Activity preview */}
          <Reveal delay={150}>
            <div className="relative rounded-[28px] border bg-muted/30 p-4 sm:p-7">
              <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Project activity</p>
                    <h3 className="mt-1 font-semibold">Website Redesign</h3>
                  </div>

                  <Button variant="outline" size="icon" className="size-9">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>

                <div className="space-y-7">
                  {[
                    {
                      name: 'Jessica Davis',
                      initials: 'JD',
                      action: 'completed a task',
                      task: 'Create homepage wireframe',
                      time: '10 min ago',
                      color: 'bg-violet-500',
                    },
                    {
                      name: 'Michael Kim',
                      initials: 'MK',
                      action: 'commented on',
                      task: 'Dashboard layout',
                      time: '35 min ago',
                      color: 'bg-blue-500',
                    },
                    {
                      name: 'Alex Lee',
                      initials: 'AL',
                      action: 'created a task',
                      task: 'Review mobile experience',
                      time: '1 hour ago',
                      color: 'bg-amber-500',
                    },
                  ].map((activity) => (
                    <div key={activity.name} className="flex gap-3">
                      <Avatar className="size-9 shrink-0">
                        <AvatarFallback className={`${activity.color} text-xs text-white`}>
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-6">
                          <span className="font-semibold">{activity.name}</span>{' '}
                          <span className="text-muted-foreground">{activity.action}</span>
                        </p>

                        <div className="mt-1 rounded-lg bg-muted/60 px-3 py-2">
                          <p className="text-xs font-medium">{activity.task}</p>
                        </div>

                        <p className="mt-1.5 text-[10px] text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-2 border-t pt-5">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MessageSquare className="size-4" />
                  </div>
                  <p className="text-xs text-muted-foreground">Your team stays connected.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t bg-muted/20 py-24 sm:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 xl:px-12 2xl:px-16">
          <Reveal>
            <Badge variant="outline" className="mb-5">
              FAQ
            </Badge>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Остались вопросы?</h2>

            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              Здесь собрали ответы на основные вопросы о Nimbus. Создайте аккаунт и познакомьтесь с
              платформой сами.
            </p>

            <Button variant="outline" className="mt-7">
              <Link to="/register">
                Создать аккаунт
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={120}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="py-2">
                  <AccordionTrigger className="text-left text-sm font-medium sm:text-base">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 xl:px-12 2xl:px-16">
        <Reveal>
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-primary px-6 py-16 text-primary-foreground sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <div className="pointer-events-none absolute -right-32 -top-40 size-[500px] rounded-full border-[70px] border-primary-foreground/[0.04]" />
            <div className="pointer-events-none absolute -bottom-64 -left-24 size-[500px] rounded-full border-[70px] border-primary-foreground/[0.04]" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <Badge className="mb-6 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/10">
                Ваше рабочее пространство начинается здесь
              </Badge>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Готовы навести порядок в работе?
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-primary-foreground/70 sm:text-lg">
                Создайте пространство в Nimbus и соберите проекты, задачи и команду в одном месте.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" variant="secondary" className="h-12 px-7">
                  <Link to="/register">
                    Начать бесплатно
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"

                  className="h-12 border-primary-foreground/30 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/login">У меня уже есть аккаунт</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between xl:px-12 2xl:px-16">
          <Link to="/" className="flex items-center gap-2.5 font-semibold">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Cloud className="size-4" />
            </div>
            Nimbus
          </Link>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nimbus. Все права защищены.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Условия использования
            </Link>

            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Конфиденциальность
            </Link>

            <Link to="/login" className="transition-colors hover:text-foreground">
              Войти
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
