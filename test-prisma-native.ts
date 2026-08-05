import "dotenv/config";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(await prisma.product.count());
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });