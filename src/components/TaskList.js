import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const TaskList = ({ id, priority, task, completed, handleStatus }) => {
  return (
    <>
      <div className="mb-4 p-3 h-12 w-full flex items-center rounded-xl bg-white">
        <div className="h-full flex items-center">
          {priority === "high" && (
            <label className="mr-1">
              <input type="radio" value="high" className="hidden" />
              <span className="h-3 w-3 inline-block rounded-full bg-red-600"></span>
            </label>
          )}
          {priority === "medium" && (
            <label className="mr-1">
              <input type="radio" value="medium" className="hidden" />
              <span className="h-3 w-3 inline-block rounded-full bg-blue-700"></span>
            </label>
          )}
          {priority === "low" && (
            <label className="mr-1">
              <input type="radio" value="low" className="hidden" />
              <span className="h-3 w-3 inline-block rounded-full bg-yellow-500"></span>
            </label>
          )}
        </div>
        <p className="h-full w-full mx-2 p-1 text-sm outline-none">{task}</p>

        {completed === true ? (
          <div>
            <span
              className="cursor-pointer"
              onClick={() => handleStatus(id, completed)}
            >
              <CheckCircleIcon
                title="Completed"
                className="w-6 text-blue-700"
              />
            </span>
          </div>
        ) : (
          <span
            className="h-5 w-5 inline-block border-2 border-gray-300 rounded-full cursor-pointer"
            onClick={() => handleStatus(id, completed)}
          ></span>
        )}
      </div>
    </>
  );
};

export default TaskList;
