import React, { useState } from "react";
import Incompleted from "./Management/Incompleted.jsx";
import Completed from "./Management/completed.jsx";
import Task from "./Management/Task.jsx";
import Footer from "./Footer.jsx";

export default function App() {
  const [form, setForm] = useState({ name: "" });
  const [incomplete, setIncomplete] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [incompletedArray, setIncompletedArray] = useState([]);
  const [completedArray, setCompletedArray] = useState([]);
  const [check, setCheck] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    if(form.name.trim()===""){
      alert("task name cannot be empty.")
      return;
    }
    const date = new Date();
    if (editingTask) {
      const updatedIncomplete = incomplete.map((task) =>
        task.id === editingTask.id ? { ...task, name: form.name } : task
      );
      const updatedCompleted = completed.map((task) =>
        task.id === editingTask.id ? { ...task, name: form.name } : task
      );

      setIncomplete(updatedIncomplete);
      setCompleted(updatedCompleted);
      setEditingTask(null);
      alert("Do you want to save change?"); // Notification after submitting the update
    } else {
      const newTask = { ...form, id: date.getTime() };

      if (check) {
        setCompleted([newTask, ...completed]);
      } else {
        setIncomplete([newTask, ...incomplete]);
      }
    }

    setForm({ name: "" });
    setCheck(false);
  };


  const deleteTask = (task) => {
    setIncomplete(incomplete.filter((item) => item.id !== task.id));
    setCompleted(completed.filter((item) => item.id !== task.id));
    setIncompletedArray(incompletedArray.filter((item)=> item.id !== task.id));
    setCompletedArray(completedArray.filter((item)=> item.id !== task.id));
  };

  const editTask = (task) => {
    setForm({ name: task.name });
    setEditingTask(task);
  };

  const moveTasksToCompleted = () => {
    setCompleted([...incompletedArray, ...completed]);
    const remainingIncomplete = incomplete.filter(
      (item) => !incompletedArray.includes(item)
    );
    setIncomplete(remainingIncomplete);
    setIncompletedArray([]);
    setCheck(false); // Ensure checkbox is reset
  };

  const moveTasksToIncomplete = () => {
    setIncomplete([...completedArray, ...incomplete]);
    const remainingCompleted = completed.filter(
      (item) => !completedArray.includes(item)
    );
    setCompleted(remainingCompleted);
    setCompletedArray([]);
    setCheck(false); // Ensure checkbox is reset
  };

  return (
    <div className="p-5">
      <div className="border rounded-xl shadow-transparent">
        <Task />
        <div className="flex item-center justify-center gap-4">
          <input
            type="text"
            className="border-2 drop-shadow-md rounded-xl"
            placeholder="Task name.."
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <div className="flex gap-5">
            <div>
              <input
                type="checkbox"
                value={check}
                checked={check}
                onChange={(event) => setCheck(event.target.checked)}
              />
              Move to completed task?
            </div>
            <button
              onClick={handleSubmit}
              className="border bg-gray-800 p-3 py-2 px-4 rounded-md hover:bg-green-600">
              <span className="text-white">{editingTask ? "Update" : "Submit"}</span>
            </button>
          </div>
        </div>
        <div className="flex my-3">
          <div className="border bg-black py-4 p-20 w-[30%] h-[30rem] overflow-y-auto mx-auto shadow-xl rounded-xl text-white capitalize text-xl flex justify-between">
            <Incompleted
              incomplete={incomplete}
              setIncompletedArray={setIncompletedArray}
              incompletedArray={incompletedArray}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </div>
          {incompletedArray.length > 0 && (
            <button
              onClick={moveTasksToCompleted}
              className="bg-red-900 hover:bg-black my-[13rem] w-[15rem] h-[4rem] rounded-md p-2 px-5 text-white">
              Transfer to completed task
            </button>
          )}
          {completedArray.length > 0 && (
            <button
              onClick={moveTasksToIncomplete}
              className="bg-red-900 hover:bg-black my-[13rem] w-[15rem] h-[4rem] rounded-md p-2 px-5 text-white"
            >
              Transfer to incomplete
            </button>
          )}
          <div className="border bg-black py-4 p-20 w-[30%] h-[30rem] overflow-y-auto mx-auto shadow-xl rounded-xl text-white capitalize text-xl flex justify-between">
            <Completed
              completed={completed}
              setCompletedArray={setCompletedArray}
              completedArray={completedArray}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
