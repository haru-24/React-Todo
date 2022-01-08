import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import styles from "./ToDoPage.module.scss";
import { InputTodo } from "../../molecules/InputTodo/InputTodo";
import { Todos } from "../../../Types/todo";
import { defaultTodos } from "../../../data/todoData";
import { TodoTask } from "../../molecules/TodoTask/TodoTask";

export const TodoPage: VFC = memo(() => {
  // State
  const [todos, setTodos] = useState<Todos[]>([]);
  const [inputTodo, setInputTodo] = useState("");

  //   初期値をセット（何度もレンダリングしないようにuseEffectを使用）
  useEffect(() => setTodos(defaultTodos), []);

  // 1todoの追加
  // 1.1inputに入力した値を格納する
  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value);
  };

  // 1.2todoをtodosにセットする
  const onClickTodoAdd = () => {
    if (inputTodo !== "") {
      const newTodos: Todos[] = [
        ...todos,
        { id: todos.length + 1, task: inputTodo, isCompleted: false },
      ];
      setTodos(newTodos);
      setInputTodo("");
    }
  };

  //  2 削除機能
  // 2.1 idでフィルターをかけて対象のTodoを削除

  const onClickDelete = (id: number) => {
    const delteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(delteTodo);
  };

  // 3 完了機能
  // 3.1 フィルターで抽出
  const onClickComplete = (id: number) => {
    const changeCompltedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(changeCompltedTodo);
  };

  // 3.2 完了済みを全て消す
  const onClickAllDelete = () => {
    if (window.confirm("完了済みを全て削除しますか？")) {
      const completedAllDelete = todos.filter(
        (todo) => todo.isCompleted !== true
      );
      setTodos(completedAllDelete);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>React Todo App</h1>
      <InputTodo
        onChangeInputValue={onChangeInputValue}
        onClickAllDelete={onClickAllDelete}
        onClickTodoAdd={onClickTodoAdd}
        inputTodo={inputTodo}
      />

      <div className={styles.todoWrapper}>
        {todos.map((todo) => (
          <TodoTask
            key={todo.id}
            todo={todo}
            onClickComplete={onClickComplete}
            onClickDelete={onClickDelete}
          />
        ))}
      </div>
    </div>
  );
});
