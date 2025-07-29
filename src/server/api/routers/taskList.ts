import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const taskListRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.taskList.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        tasks: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const taskList = await ctx.db.taskList.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          tasks: {
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (!taskList) {
        throw new Error("TaskList not found");
      }

      return taskList;
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      icon: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.taskList.create({
        data: {
          name: input.name,
          icon: input.icon,
          userId: ctx.session.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1).optional(),
      icon: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const taskList = await ctx.db.taskList.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!taskList) {
        throw new Error("TaskList not found");
      }

      return ctx.db.taskList.update({
        where: { id: input.id },
        data: {
          ...(input.name && { name: input.name }),
          ...(input.icon !== undefined && { icon: input.icon }),
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const taskList = await ctx.db.taskList.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!taskList) {
        throw new Error("TaskList not found");
      }

      return ctx.db.taskList.delete({
        where: { id: input.id },
      });
    }),
});