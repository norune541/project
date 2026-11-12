import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, UserRound, Building2, Mail, CalendarDays, Hash } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { useMe, type User } from '@/mock';

type ProfileForm = {
  username: string;
  company: string;
};

const getInitials = (username = '') =>
  username
    .trim()
    .split(/[\s_-]+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

export default function MePage() {
  const queryClient = useQueryClient();
  const { data: user, isPending, isError } = useMe();

  const [form, setForm] = useState<Partial<ProfileForm>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="size-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <UserRound className="size-10 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Не удалось загрузить профиль</h2>
          <p className="text-sm text-muted-foreground">Попробуйте обновить страницу.</p>
          <Button
            variant="outline"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['me'] })}
          >
            Повторить
          </Button>
        </CardContent>
      </Card>
    );
  }

  const username = form.username ?? user.username;
  const company = form.company ?? user.company;

  const dirty = username !== user.username || company !== user.company;

  const updateField = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dirty || username.trim().length < 3) return;

    setSaving(true);

    try {
      // Replace with PATCH /me.
      await new Promise((resolve) => setTimeout(resolve, 600));

      queryClient.setQueryData<User>(['me'], {
        ...user,
        username: username.trim(),
        company: company.trim(),
      });

      setForm({});
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Настройки</h1>
        <p className="text-sm text-muted-foreground">
          Управление личными данными и настройками аккаунта.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar className="size-16">
          <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
            {getInitials(user.username)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="truncate text-xl font-semibold">{user.username}</h2>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{user.role}</Badge>
          <Badge>{user.plan}</Badge>
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Profile Settings */}
        <form onSubmit={handleSave}>
          <Card>
            <CardHeader>
              <CardTitle>Личные данные</CardTitle>
              <CardDescription>Обновите информацию своего профиля.</CardDescription>
            </CardHeader>

            <CardContent>
              <FieldGroup className="gap-5">
                {/* Username */}
                <Field>
                  <FieldLabel htmlFor="username">Имя пользователя</FieldLabel>

                  <Input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(event) => updateField('username', event.target.value)}
                    autoComplete="username"
                    minLength={3}
                    required
                    disabled={saving}
                  />

                  <FieldDescription>Минимум 3 символа.</FieldDescription>
                </Field>

                {/* Company */}
                <Field>
                  <FieldLabel htmlFor="company">Компания</FieldLabel>

                  <Input
                    id="company"
                    name="company"
                    value={company}
                    onChange={(event) => updateField('company', event.target.value)}
                    autoComplete="organization"
                    placeholder="Название компании"
                    disabled={saving}
                  />
                </Field>

                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    disabled
                    readOnly
                  />

                  <FieldDescription>
                    Email используется для входа и не может быть изменён здесь.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">{saved && 'Изменения сохранены'}</div>

              <div className="flex w-full gap-2 sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  disabled={!dirty || saving}
                  onClick={() => {
                    setForm({});
                    setSaved(false);
                  }}
                >
                  Отмена
                </Button>

                <Button
                  type="submit"
                  className="flex-1 sm:flex-none"
                  disabled={!dirty || saving || username.trim().length < 3}
                >
                  {saving && <Loader2 className="size-4 animate-spin" />}

                  {saving ? 'Сохранение...' : 'Сохранить'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>

        {/* Account Information */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Информация об аккаунте</CardTitle>
            <CardDescription>Основные сведения о вашей учётной записи.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* User ID */}
            <div className="flex items-start gap-3">
              <Hash className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs text-muted-foreground">Идентификатор</p>
                <p className="break-all font-mono text-xs">{user.id}</p>
              </div>
            </div>

            <Separator />

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="break-all text-sm font-medium">{user.email}</p>
              </div>
            </div>

            <Separator />

            {/* Company */}
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs text-muted-foreground">Компания</p>
                <p className="text-sm font-medium">{user.company || 'Не указана'}</p>
              </div>
            </div>

            <Separator />

            {/* Registration Date */}
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs text-muted-foreground">Дата регистрации</p>
                <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
