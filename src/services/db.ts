import { prisma } from "./prisma";

export interface Todo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  completed?: boolean;
  description: string;
}

export async function getTodos(): Promise<Todo[]> {
  const todos = await prisma.todo.findMany();
  return todos;
}

export async function createTodo(todo: Todo): Promise<Todo> {
  const newTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      description: todo.description,
    },
  });
  return newTodo;
}
