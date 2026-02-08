import React, { useEffect, useState } from "react";
import "./App.css";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
  type TodoItem,
  type TodoListResponse,
} from "./api/todos";

export default function Test() {
  const [data, setData] = useState<TodoListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const summary = data?.summary;
  const items = data?.items;

  const LoadData = async () => {
    setLoading(true);
    try {
      const res = await fetchTodos();
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = title.trim();
    if (!v) return;
    try {
      await createTodo(v);
      setTitle("");
      await LoadData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      await LoadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async (todo: TodoItem) => {
    try {
      await updateTodo({ ...todo, done: !todo.done });
      await LoadData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="title">Todo</h1>

      <div className="summary">
        총합 {summary?.total} / 완료 {summary?.done} / 미완료
        {summary?.remaining}
      </div>

      <form className="form" onSubmit={handleCreate}>
        <input
          value={title}
          placeholder="할 일을 입력"
          className="input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="addButton">
          추가
        </button>
      </form>
      {loading && "로딩 중"}
      <ul className="list">
        {items?.map((item) => (
          <li className="item">
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleToggle(item)}
            />
            <span className={`itemTitle ${item.done ? "done" : ""}`}>
              {item.title}
            </span>
            <button
              type="button"
              className="deleteButton"
              onClick={() => handleDelete(item.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
