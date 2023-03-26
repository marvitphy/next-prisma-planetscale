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
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return todos;
}

export async function createTodo(todo: { title: string }): Promise<Todo> {
  const newTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      description: "Teste",
    },
  });
  return newTodo;
}

export async function deleteTodo(id: string) {
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  return deletedTodo;
}
