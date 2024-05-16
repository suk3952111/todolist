import { useState } from "react";
import "./ToDoList.css";
import removeIcon from "@/assets/remove.svg";

function ToDoList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newItem = {
        id: Date.now(),
        text: e.target.value,
        isCompleted: false,
      };
      setItems((prevItems) => [newItem, ...prevItems]);
      setInputValue("");
    }
  };

  const handleResetInput = () => {
    setInputValue("");
  };

  const handleToggleComplete = (todo) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === todo.id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleDelete = (todo) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== todo.id));
  };

  return (
    <div>
      <div className="inputField">
        <input
          className="input"
          type="text"
          placeholder="추가하려는 일정을 입력하세요"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        {inputValue && (
          <img
            onClick={handleResetInput}
            className="resetInput"
            src={removeIcon}
            alt="removeIcon"
          />
        )}
      </div>
      <p>할 일</p>
      <ul className="list">
        {items
          .filter((item) => !item.isCompleted)
          .map((todo) => (
            <li key={`key-${todo.id}`} className="list-item">
              {todo.text}
              <div>
                <button onClick={() => handleToggleComplete(todo)}>완료</button>
                <button onClick={() => handleDelete(todo)}>삭제</button>
              </div>
            </li>
          ))}
      </ul>
      {items.filter((item) => item.isCompleted).length > 0 && (
        <div>
          <p>완료</p>
          <ul className="list">
            {items
              .filter((item) => item.isCompleted)
              .map((todo) => (
                <li key={`key-${todo.id}`} className="list-item completed">
                  {todo.text}
                  <div>
                    <button onClick={() => handleToggleComplete(todo)}>
                      취소
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ToDoList;
