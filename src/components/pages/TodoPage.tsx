import { ChangeEvent, memo, useEffect, useState, VFC } from "react";

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

  //   初期値をセット　（何度もレンダリングしないようにuseEffectを使用）
  useEffect(() => setTodos(defaultTodos), []);

  //   1　todoの追加
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

  return (
    <>
      <h1>Todo App</h1>
      <input type="text" onChange={onChangeInputValue} value={inputTodo} />
      <button onClick={onClickTodoAdd}>追加</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <li>{todo.task}</li>
          <button>完了</button>
          <button>更新</button>
          <button>削除</button>
        </div>
      ))}
    </>
  );
});
