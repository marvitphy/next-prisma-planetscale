import { GetServerSideProps } from "next";
import { getTodos, Todo } from "@/services/db";
import { useState } from "react";
import TodoItem from "@/components/TodoItem";
import { useForm } from "react-hook-form";

interface Props {
  todos: Todo[];
}

interface FormData {
  title: string;
}

export default function Home({ todos }: Props) {
  const [todosData, setTodos] = useState<Todo[]>(todos);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const todo = await response.json();
      setTodos([todo.todo, ...todosData]);
      setLoading(false);
      resetField("title");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const newTodos = todosData.filter((todo) => todo.id !== data.data.id);
      setTodos(newTodos);
      setIsDeleting(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center flex-col items-center mt-8 w-full">
      <div>
        <div className="w-[350px]">
          <h1 className="text-4xl font-bold">Todo App</h1>
          <h3 className="mt-3">
            A simple todo app built with <b>Next.js</b>, <b>Prisma</b> and{" "}
            <b>Planet Scale</b>
          </h3>
        </div>
        <div className="mt-8 w-[450px] sm:w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              disabled={loading}
              {...register("title", { required: true })}
              className="w-full h-10 rounded-sm border-2 border-[#141416] focus:outline-none focus:border-[#141416] p-2 text-black"
              placeholder="Add a new todo"
            />
          </form>
        </div>
        <div
          className={`mt-8 ${
            isDeleting ? "pointer-events-none opacity-70" : ""
          }`}
        >
          {todosData.length > 0 ? (
            todosData.map((todo) => (
              <TodoItem onClick={() => handleDelete(todo.id)} key={todo.id}>
                {todo.title}
              </TodoItem>
            ))
          ) : (
            <h1 className="text-1xl font-bold">Nenhuma tarefa </h1>
          )}
        </div>
      </div>
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
