import React from "react";
import Checked2 from "./Checked2"
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

export default function Completed({ completed = [], completedArray, setCompletedArray, deleteTask, editTask }) {
  const confirmDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(item);
    }
  };

  const confirmEdit = (item) => {
    if (window.confirm("Do you want to edit this task?")) {
      editTask(item);
    }
  };

  return (
    <div className="">
      <h1 className="">Completed</h1>
      {completed.length > 0 && completed.map((box, i) => (
        <div key={i} className="border-b border-gray-200 py-2">
          <div className="flex items-center gap-2">
            <Checked2 ele={box} completedArray={completedArray} setCompletedArray={setCompletedArray} />
            <div className="capitalize">{box.name}</div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="mx-2">{box.id}</div>
            <div className="flex gap-2">
              <button className=" hover:text-blue-500 " onClick={() => confirmEdit(box)}><FaRegEdit /></button>
              <button className="hover:text-red-00" onClick={() => confirmDelete(box)}><FaTrashAlt /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}