import { GetServerSideProps } from "next";
import { getTodos, Todo } from "@/services/db";

interface Props {
  todos: Todo[];
}

export default function Home({ todos }: Props) {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const todos: any = await getTodos();
  const todosJson = JSON.parse(JSON.stringify(todos));

  return {
    props: {
      todos: todosJson,
    },
  };
};
