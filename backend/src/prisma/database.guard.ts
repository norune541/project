export function databaseGuard(): void {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('DATABASE_URL is not defined');
    process.exit(1);
  }

  let databaseName: string;

  try {
    const url = new URL(databaseUrl);
    databaseName = url.pathname.slice(1);
  } catch {
    console.error('DATABASE_URL is invalid');
    process.exit(1);
  }

  if (!databaseName.includes('test')) {
    console.error(
      `Refusing to run integration tests against "${databaseName}". Expected a test database.`,
    );
    process.exit(1);
  }

  if (process.env.NODE_ENV !== 'test') {
    console.error(
      `Refusing to run integration tests with NODE_ENV="${process.env.NODE_ENV}". Expected "test".`,
    );
    process.exit(1);
  }
}
