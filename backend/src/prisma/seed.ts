import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

const DEMO_USERS_COUNT = 20;
const DEMO_PASSWORD = 'password';

async function main() {
  faker.seed(2026);

  const password = await bcrypt.hash(DEMO_PASSWORD, 12);

  const users = Array.from({ length: DEMO_USERS_COUNT }, (_, index) => ({
    email: `demo${index + 1}@example.com`,
    username: faker.internet.username(),
  }));

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      create: {
        ...user,
        password,
      },
      update: {},
    });
  }

  console.log(
    `Seed completed: ${users.length} demo users processed. With '${DEMO_PASSWORD}' as password. A user: ${users[0].email}`,
  );
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
