import React, { useState } from "react";
import "./App.scss";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isShowAlertMessage, setIsShowAlertMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue === "") {
      setIsShowAlertMessage(true);
      return;
    }
    setIsShowAlertMessage(false);
    addTodo(inputValue);
    setInputValue("");
  };

  const addTodo = (inputValue) => {
    setTodoList([...todoList, { description: inputValue, hasDone: false }]);
  };

  const resetAll = () => {
    setInputValue("");
    setTodoList([]);
  };

  const handleDelete = (index) => {
    setTodoList(todoList.filter((_, _index) => _index !== index));
  };

  const handleCheck = (index) => {
    const updatedTodoList = todoList.map((todo, _index) => {
      if (_index !== index) {
        return todo;
      }

      return { ...todo, hasDone: !todo.hasDone };
    });
    setTodoList(updatedTodoList);
  };

  return (
    <div className="main">
      <h1>TO-DO LIST</h1>
      <form id="add" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="new task"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <input type="submit" value="ADD" />
      </form>
      {isShowAlertMessage && (
        <div className="alertMessage">Todoを入力してください</div>
      )}
      <div className="tasksBoard">
        <ul id="todo-list">
          {todoList.map((todo, index) => {
            return (
              <li key={`${todo}${index}`}>
                <span onClick={() => handleDelete(index)}>×</span>
                <label className={todo.hasDone ? "checked" : ""}>
                  <input
                    type="checkbox"
                    checked={todo.hasDone}
                    onChange={() => handleCheck(index)}
                  />
                  {todo.description}
                </label>
              </li>
            );
          })}
        </ul>
        <p>
          {/* FIXME CSSを調整する */}
          <button onClick={resetAll}>Clear</button>
        </p>
      </div>
    </div>
  );
};
