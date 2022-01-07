import { Button, TextField } from "@mui/material";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import styles from "./ToDoPage.module.scss";

interface Todos {
  id: number;
  task: string;
  isCompleted: boolean;
}

export const TodoPage: VFC = memo(() => {
  // 初期データ
  const defaultTodos: Todos[] = [
    {
      id: 1,
      task: "ご飯を作る",
      isCompleted: false,
    },
    {
      id: 2,
      task: "掃除をする",
      isCompleted: false,
    },
  ];

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

  return (
    <div>
      <h1>Todo App</h1>
      <TextField
        id="standard-search"
        label="タスクを入力"
        type="search"
        variant="standard"
        onChange={onChangeInputValue}
        value={inputTodo}
      />
      <Button variant="outlined" onClick={onClickTodoAdd}>
        追加
      </Button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <li className={styles.list}>{todo.task}</li>
          <Button variant="outlined">完了</Button>
          <Button variant="outlined">更新</Button>
          <Button variant="outlined">削除</Button>
        </div>
      ))}
    </div>
  );
});
