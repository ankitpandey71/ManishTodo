import React from "react";

const TodoList = ({ items, onDelete }) => {
  return (
    <div>
      <h1>Todo List</h1>
      {items.map((item) => {
        return (
          <div key={item}>
            <h3>{item}</h3>
            <button onClick={() => onDelete(item)}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
