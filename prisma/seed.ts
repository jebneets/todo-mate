import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: "e43a44ec-610a-4aa8-a5d3-a87860cece39",
        name: "Alice Johnson",
        email: "alice@example.com",
        image: "https://example.com/avatar1.png",
      },
      {
        id: "71b209c3-94a6-4e39-a030-35fbf034ba97",
        name: "Bob Smith",
        email: "bob@example.com",
        image: "https://example.com/avatar2.png",
      },
    ],
  });

  await prisma.taskList.createMany({
    data: [
      {
        id: "eec83377-c0dd-4955-81ab-439b16a60036",
        userId: "e43a44ec-610a-4aa8-a5d3-a87860cece39",
        name: "List 1 for Alice",
        icon: "💼",
      },
      {
        id: "2f765de8-efca-4b54-99d6-61dbd4657305",
        userId: "e43a44ec-610a-4aa8-a5d3-a87860cece39",
        name: "List 2 for Alice",
        icon: "🛒",
      },
    ],
  });

  await prisma.task.createMany({
    data: [
      {
        id: "af3d71a2-a460-4333-96c3-0b8b92464d94",
        taskListId: "eec83377-c0dd-4955-81ab-439b16a60036",
        title: "Task 1 in List 1",
        notes: "Details for Task 1",
        dueDate: new Date("2025-07-29"),
        isComplete: true,
        priority: "low",
      },
      {
        id: "c0b2eb5a-cce0-41e1-93c2-da0e6a692df9",
        taskListId: "eec83377-c0dd-4955-81ab-439b16a60036",
        title: "Task 2 in List 1",
        notes: "Details for Task 2",
        dueDate: new Date("2025-07-30"),
        isComplete: true,
        priority: "high",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
