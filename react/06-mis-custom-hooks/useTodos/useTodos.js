import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos) || []);
  }, [todos]);

  const handleNewAddTodo = (todo) => {
    const action = { type: "[TODO] Add todo", payload: todo };
    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "[TODO] Remove todo", payload: id });
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "[TODO] Toggle todo", payload: id });
  };

  return {
    todos,
    todosCount: todos.length,
    pendingCount: todos.filter(todo => !todo.done).length,
    dispatch,
    handleDeleteTodo,
    handleToggleTodo,
    handleNewAddTodo,
  };
};
