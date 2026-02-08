export type TodoItem = {
  id: number;
  title: string;
  done: boolean;
};

export type TodoListResponse = {
  items: TodoItem[];
  summary: {
    total: number;
    done: number;
    remaining: number;
  };
};

export async function fetchTodos(): Promise<TodoListResponse> {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("투두 리스트 불러오기 실패");
  return res.json();
}

export async function createTodo(title: string): Promise<TodoItem> {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("투두 리스트 생성 실패");
  return res.json();
}

export async function updateTodo(todo: TodoItem): Promise<TodoItem> {
  const res = await fetch(`/api/todos/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: todo.title, done: todo.done }),
  });
  if (!res.ok) throw new Error("투두 리스트 업데이트 실패");
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("투두 리스트 삭제 실패");
}
