import { useState } from "react";
import styles from "./ToDoList.module.css";
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

  const handleToggleComplete = (selectedId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedId
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const handleDelete = (selectedId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== selectedId));
  };

  return (
    <div>
      <div className={styles.inputField}>
        <input
          className={styles.input}
          type="text"
          placeholder="추가하려는 일정을 입력하세요"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        {inputValue && (
          <img
            onClick={handleResetInput}
            className={styles.resetInput}
            src={removeIcon}
            alt="removeIcon"
          />
        )}
      </div>
      <p>할 일</p>
      <ul className={styles.list}>
        {items
          .filter((item) => !item.isCompleted)
          .map((todo) => (
            <li key={`key-${todo.id}`} className={styles.listItem}>
              {todo.text}
              <div>
                <button onClick={() => handleToggleComplete(todo.id)}>
                  완료
                </button>
                <button onClick={() => handleDelete(todo.id)}>삭제</button>
              </div>
            </li>
          ))}
      </ul>
      {items.filter((item) => item.isCompleted).length > 0 && (
        <div>
          <p>완료</p>
          <ul className={styles.list}>
            {items
              .filter((item) => item.isCompleted)
              .map((todo) => (
                <li
                  key={`key-${todo.id}`}
                  className={`${styles.listItem} ${styles.completed}`}
                >
                  {todo.text}
                  <div>
                    <button onClick={() => handleToggleComplete(todo.id)}>
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
