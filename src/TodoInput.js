import React, { useCallback, useState } from "react";
import { db } from "./pouchdb";
import TodoList from "./TodoList";

const TodoInput = () => {
  const [task, setTask] = useState("");

  const handleTask = useCallback((e) => {
    setTask(e.target.value);
  }, []);

  const handleReset = useCallback(() => {
    setTask("");
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        var response = await db.put({
          _id: String(Math.random()),
          title: task,
        });
        console.log(response);
        handleReset();
      } catch (err) {
        console.log(err);
      }
    },
    [task, handleReset]
  );

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <h1>TODO</h1>
          <input
            type="text"
            required={true}
            className="border"
            placeholder="Add Task"
            value={task}
            onChange={handleTask}
          />
          <button type="submit">ADD</button>
          <button type="reset">RESET</button>
        </form>
      </div>
      <TodoList />
    </div>
  );
};;;;

export default TodoInput;
