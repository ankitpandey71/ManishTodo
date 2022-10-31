import React, { useCallback, useState } from "react";
import TodoList from "./TodoList";

const TodoInput = () => {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]); // ["", "", ""]

  const handleTask = useCallback((e) => {
    setTask(e.target.value);
  }, []);

  const handleReset = useCallback(() => {
    setTask("");
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setTasks((prev) => [task, ...prev]);
    handleReset()
  }, [task, handleReset]);

  const handleDelete = useCallback((removeItem) => {
    setTasks(prev => {
        const copyArr = [...prev]
        const filteredArr = copyArr.filter(item => item !== removeItem);
        return filteredArr;
    })
  }, [])

  console.log({ task, tasks });

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
            //
            value={task}
            onChange={handleTask}
          />
          <button type="submit">ADD</button>
          <button type="reset">RESET</button>
        </form>
      </div>
      <TodoList items={tasks} onDelete={handleDelete}/>
    </div>
  );
};

export default TodoInput;
