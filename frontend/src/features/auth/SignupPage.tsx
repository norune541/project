import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Cloud, Loader2, ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { mockSignup } from '@/mock';

export default function SignupPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const signup = useMutation({
    mutationFn: mockSignup,
    onSuccess: (user) => {
      queryClient.setQueryData(['me'], user);
      navigate('/me', { replace: true });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup.mutate(form);
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
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>

                <Input
                  id="username"
                  name="username"
                  placeholder="username"
                  autoComplete="username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  disabled={signup.isPending}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={signup.isPending}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  disabled={signup.isPending}
                  className="h-11"
                />
              </div>

              {signup.isError && (
                <p className="text-sm text-destructive">
                  Не удалось создать аккаунт. Попробуйте ещё раз.
                </p>
              )}

              <Button type="submit" className="h-11 w-full" disabled={signup.isPending}>
                {signup.isPending && <Loader2 className="size-4 animate-spin" />}

                {signup.isPending ? 'Создание аккаунта...' : 'Создать аккаунт'}
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
