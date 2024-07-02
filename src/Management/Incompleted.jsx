import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Checked1 from "../Management/Checked1"

export default function Incompleted({ incomplete = [], setIncompletedArray, incompletedArray, deleteTask, editTask }) {
  const confirmDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(item);
    }
  };

  const confirmEdit = (item) => {
      editTask(item);

  };

  return (
    <div className="">
      <h1 className="">Incompleted</h1>
      {incomplete.length > 0 && incomplete.map((item, i) => (
        <div key={i} className="border-b border-gray-200 py-2">
          <div className="flex items-center gap-2">
            <Checked1 item={item} incompletedArray={incompletedArray} setIncompletedArray={setIncompletedArray} />
            <div className="capitalize">{item.name}</div>
          </div>
          <div className="flex justify-between mt=2">
            <div className="mx-2">{item.id}</div>
            <div className="flex gap-2">
              <button className="hover:text-blue-500 " onClick={() => confirmEdit(item)}><FaRegEdit /></button>
              <button className="hover:text-red-500" onClick={() => confirmDelete(item)}><FaTrashAlt /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}