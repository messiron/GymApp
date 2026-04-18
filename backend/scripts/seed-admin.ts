import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
const email = process.env.ADMIN_EMAIL;

async function main() {
  try {
    if (!email) throw new Error("Email not provide");

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        role: "ADMIN",
      }
    });
    console.log("✅ User admin created:", user.email);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  finally {
    await prisma.$disconnect();
  }
}

main();