import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getByTaskListId: protectedProcedure
    .input(z.object({ taskListId: z.string() }))
    .query(async ({ ctx, input }) => {
      const taskList = await ctx.db.taskList.findFirst({
        where: {
          id: input.taskListId,
          userId: ctx.session.user.id,
        },
      });

      if (!taskList) {
        throw new Error("TaskList not found");
      }

      return ctx.db.task.findMany({
        where: { taskListId: input.taskListId },
        orderBy: { createdAt: "asc" },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      taskListId: z.string(),
      title: z.string().min(1),
      notes: z.string().optional(),
      dueDate: z.date().optional(),
      priority: z.enum(["low", "medium", "high"]).default("medium"),
    }))
    .mutation(async ({ ctx, input }) => {
      const taskList = await ctx.db.taskList.findFirst({
        where: {
          id: input.taskListId,
          userId: ctx.session.user.id,
        },
      });

      if (!taskList) {
        throw new Error("TaskList not found");
      }

      return ctx.db.task.create({
        data: {
          title: input.title,
          notes: input.notes,
          dueDate: input.dueDate,
          priority: input.priority,
          taskListId: input.taskListId,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().min(1).optional(),
      notes: z.string().optional(),
      dueDate: z.date().optional(),
      isComplete: z.boolean().optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.findFirst({
        where: { id: input.id },
        include: {
          taskList: true,
        },
      });

      if (!task || task.taskList.userId !== ctx.session.user.id) {
        throw new Error("Task not found");
      }

      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          ...(input.title && { title: input.title }),
          ...(input.notes !== undefined && { notes: input.notes }),
          ...(input.dueDate !== undefined && { dueDate: input.dueDate }),
          ...(input.isComplete !== undefined && { isComplete: input.isComplete }),
          ...(input.priority && { priority: input.priority }),
        },
      });
    }),

  toggleComplete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.findFirst({
        where: { id: input.id },
        include: {
          taskList: true,
        },
      });

      if (!task || task.taskList.userId !== ctx.session.user.id) {
        throw new Error("Task not found");
      }

      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          isComplete: !task.isComplete,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.findFirst({
        where: { id: input.id },
        include: {
          taskList: true,
        },
      });

      if (!task || task.taskList.userId !== ctx.session.user.id) {
        throw new Error("Task not found");
      }

      return ctx.db.task.delete({
        where: { id: input.id },
      });
    }),
});