import React, { useCallback, useEffect, useState } from "react";
import { db } from "./pouchdb";

const TodoList = ({ items, onDelete }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
      console.log("doc ==> ", doc);
      setTasks(doc.rows);
    });
  }, []);

  useEffect(() => {
    db.changes({
      since: "now",
      live: true,
    }).on("change", function (doc) {
      console.log("doc ==> ", doc);
      db.allDocs(
        { include_docs: true, descending: false },
        function (err, doc) {
          console.log("doc ==> ", doc);
          setTasks(doc.rows);
        }
      );
    });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      {tasks.map((task) => (
        <TaskItem key={task.doc._id} task={task} />
      ))}
    </div>
  );
};

export default TodoList;

const TaskItem = ({ task }) => {
  const handleDelete = useCallback(() => {
    db.remove(task.doc);
  }, [task]);

  return (
    <div>
      <h3>{task.doc.title}</h3>
      <button onClick={handleDelete}>DELETE</button>
    </div>
  );
};
