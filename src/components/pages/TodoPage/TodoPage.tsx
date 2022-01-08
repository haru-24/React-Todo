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

  // 4 編集機能
  // 4.1ボタンクリックでINPUTを表示

  return (
    <div>
      <h1 className={styles.title}>React Todo App</h1>
      <div className={styles.inputWrapper}>
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
      </div>
      <div className={styles.todoWrapper}>
        {todos.map((todo) => (
          <div key={todo.id}>
            <span className={todo.isCompleted ? styles.completed : ""}>
              {todo.task}
            </span>
            <Button variant="outlined" onClick={() => onClickComplete(todo.id)}>
              完了
            </Button>
            <Button variant="outlined">更新</Button>
            <Button variant="outlined" onClick={() => onClickDelete(todo.id)}>
              削除
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
});
