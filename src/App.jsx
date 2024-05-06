import React, { useState } from "react";
import "./App.css";
import removeIcon from "./remove.svg";

function App() {
  const [items, setItems] = useState([]);
  const [completeItems, setCompleteItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    console.log(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      setItems((prevItems) => [value, ...prevItems]);
      setInputValue("");
      console.log(items);
    }
  };

  const handleResetInput = (index) => {
    setInputValue("");
  };

  const handleDelete = (index) => {
    const nextItems = items.filter((_, idx) => idx !== index);
    setItems(nextItems);
    console.log(index);
  };

  const handleComplete = (todo, index) => {
    setCompleteItems((prevCompleteItems) => [todo, ...prevCompleteItems]);
    handleDelete(index);
  };

  const handleCancel = (todo, index) => {
    const nextItems = completeItems.filter((_, idx) => idx !== index);
    setCompleteItems(nextItems);
    setItems((prevItems) => [...prevItems, todo]);
  };

  return (
    <div>
      <div className="inputField">
        <input
          className="input"
          type="text"
          placeholder="추가하려는 일정을 입력하세요"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
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
        {items.map((todo, index) => (
          <li key={`key-${index}`} className="list-item">
            {todo}
            <div>
              <button onClick={() => handleComplete(todo, index)}>완료</button>
              <button onClick={() => handleDelete(index)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
      {completeItems.length > 0 && (
        <div>
          <p>완료</p>
          <ul className="list">
            {completeItems.map((todo, index) => (
              <li key={`key-${index}`} className="list-item">
                {todo}
                <div>
                  <button onClick={() => handleCancel(todo, index)}>
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

export default App;
