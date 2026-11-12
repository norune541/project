import { Link } from 'react-router-dom';
import { Cloud, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginInputDto } from 'shared';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useLogin } from './hooks/login';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputDto>({ resolver: zodResolver(loginSchema) });
  const { mutateAsync, isPending, error, isError } = useLogin();

  const onSubmit = async (input: LoginInputDto) => {
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
              Welcome back to Nimbus
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

      {/* Login Section */}
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
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">С возвращением</h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Войдите в аккаунт, чтобы продолжить работу.
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  <Input
                    {...register('email')}
                    id="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                    className="h-11"
                  />
                  {errors.email && (
                    <FieldDescription className="text-destructive">
                      {errors.email.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor="password">Пароль</FieldLabel>

                    <Link
                      to="/forgot-password"
                      className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      Забыли пароль?
                    </Link>
                  </div>

                  <Input
                    {...register('password')}
                    id="password"
                    autoComplete="current-password"
                    placeholder="At least 8 characters"
                    className="h-11"
                  />
                  {errors.password && (
                    <FieldDescription className="text-destructive">
                      {errors.password.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field className="gap-4">
                  <Button type="submit" className="h-11 w-full" disabled={isPending}>
                    {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Войти'}
                  </Button>

                  <FieldDescription className="text-center">
                    Нет аккаунта?{' '}
                    <Link
                      to="/register"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Создайте его
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </div>

          {/* Terms */}
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            Входя в аккаунт, вы принимаете{' '}
            <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
              Условия использования
            </Link>{' '}
            и{' '}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
              Политику конфиденциальности
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
