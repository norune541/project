import { Link } from 'react-router-dom';
import { ArrowLeft, Cloud, Home, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-muted px-4 py-8 sm:px-6">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        {/* Logo */}
        <Link to="/" className="mb-16 flex items-center gap-2 text-lg font-semibold tracking-tight">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cloud className="size-5" />
          </div>
          Nimbus
        </Link>

        {/* Error Code */}
        <div className="relative mb-6">
          <span className="select-none text-[120px] font-bold leading-none tracking-tighter text-primary/10 sm:text-[160px]">
            404
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="size-12 text-primary sm:size-16" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Страница не найдена</h1>

          <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            Похоже, эта страница потерялась в облаках. Возможно, адрес указан неверно или страница
            была перемещена.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button className="h-11 w-full sm:w-auto">
            <Link to="/">
              <Home className="size-4" />
              На главную
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-11 w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="size-4" />
            Назад
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-16 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nimbus. Все права защищены.
        </p>
      </div>
    </main>
  );
}
