import { Link } from 'react-router-dom';
import { Cloud, Loader2, ArrowUpRight, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useForm } from 'react-hook-form';
import { useSignup } from './hooks/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RegisterInputDto } from 'shared';
import { registerSchema } from 'shared';
import { FieldGroup, Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SignupPage() {
  const { mutateAsync, isPending, error, isError } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputDto>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (input: RegisterInputDto) => {
    const data = await mutateAsync(input);
    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
    }
  };

  return (
    <main className="min-h-svh lg:grid lg:grid-cols-2">
      {/* Desktop Branding */}
      <section className="relative hidden min-h-svh flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex xl:p-16">
        <Link to="/" className="relative z-10 flex items-center gap-3 text-xl font-semibold">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/10">
            <Cloud className="size-6" />
          </div>
          Nimbus
        </Link>

        <div className="relative z-10 max-w-xl space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
              Welcome to Nimbus
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-6xl">
              Everything you need.
              <br />
              All in one place.
            </h1>
          </div>

          <p className="max-w-md text-base leading-relaxed text-primary-foreground/70 xl:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex items-center gap-2 text-sm font-medium">
            Explore Nimbus
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        {/* Decorative Background */}
        <Cloud className="absolute -bottom-24 -right-20 size-[420px] text-primary-foreground/[0.04] xl:size-[560px]" />

        <p className="relative z-10 text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Nimbus. All rights reserved.
        </p>
      </section>

      {/* Signup Section */}
      <section className="flex min-h-svh items-center justify-center bg-background px-4 py-8 sm:px-8 lg:px-12 xl:px-20">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-lg font-semibold lg:hidden"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Cloud className="size-5" />
            </div>
            Nimbus
          </Link>

          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Создайте аккаунт
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore.
              </p>
              {isError && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Ошибка входа</AlertTitle>
                  <AlertDescription>
                    {error.message || 'Не удалось выполнить вход'}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FieldGroup>
                <Field className="space-y-1">
                  <FieldLabel htmlFor="email">Имя пользователя</FieldLabel>
                  <Input
                    id="username"
                    {...register('username')}
                    placeholder="username"
                    autoComplete="username"
                    className="h-11"
                  />
                  {errors.username && (
                    <FieldDescription className="text-destructive">
                      {errors.username.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field className="space-y-1">
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  <Input
                    id="email"
                    {...register('email')}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="h-11"
                  />
                  {errors.email && (
                    <FieldDescription className="text-destructive">
                      {errors.email.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field className="space-y-1">
                  <FieldLabel htmlFor="email">Пароль</FieldLabel>

                  <Input
                    id="password"
                    {...register('password')}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    className="h-11"
                  />
                  {errors.password && (
                    <FieldDescription className="text-destructive">
                      {errors.password.message}
                    </FieldDescription>
                  )}
                </Field>

                <Button type="submit" className="h-11 w-full" disabled={isPending}>
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Войти'}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Уже есть аккаунт?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Войдите
                  </Link>
                </p>
              </FieldGroup>
            </form>
          </div>

          {/* Terms */}
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            Создавая аккаунт, вы соглашаетесь с{' '}
            <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
              Условиями использования
            </Link>{' '}
            и{' '}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
              Политикой конфиденциальности
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
