import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RocketLaunchIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { collection, onSnapshot, where, query } from "firebase/firestore";

import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import DashboardNav from "@/components/DashboardNav";

import {
  getCurrentUser,
  writeTaskToDb,
  updateTaskInDb,
  getCurrentUserDetails,
} from "../../../../utils";

import { db } from "../../../../firebase.config";

const PriorityType = () => {
  const router = useRouter();

  const [priority, setPriority] = useState(router.query.type);
  const [task, setTask] = useState(null);
  const [user, setUser] = useState(null);
  const [availableTasks, setAvalaibleTaskes] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function getUserDetails(id) {
      const details = await getCurrentUserDetails(id);

      if (details.status === "failed") toast.error(details.message);

      setUserDetails(details);
    }

    async function currentUser() {
      const result = await getCurrentUser();

      if (result.isLoggedOut) router.push("/auth/login");

      setUser(result.user);
    }

    currentUser();

    if (user) {
      // Fetch user tasks in realtime
      const q = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid),
        where("priority", "==", router.query.type)
      );

      onSnapshot(q, (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({ ...doc.data(), id: doc.id });
        });
        setAvalaibleTaskes(tasks);
      });
      getUserDetails(user.uid);
    }
  }, [router, user]);

  async function handleTask(e) {
    e.preventDefault();

    if (task.trim().length < 1) toast.error("Please enter a task");

    await writeTaskToDb(user.uid, {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: user.email,
      schedule: task,
      date: new Date(),
      uid: user.uid,
      priority,
      completed: false,
    });

    setTask("");
  }

  async function handleStatus(id, taskStatus) {
    await updateTaskInDb(id, { completed: !taskStatus });
  }

  return (
    <Layout
      title="TaskMaster | Dashboard"
      description="Create and manage task using task master"
      keywords="Create Task | Add Task | Delete Task"
    >
      <div className="p-3 h-screen bg-blue-700">
        <div className="h-full flex items-start justify-start rounded-xl overflow-hidden">
          {/* Navigation */}
          <DashboardNav
            activeLink={router.query.type}
            firstName={userDetails?.firstName}
            lastName={userDetails?.lastName}
          />

          {/* Tasks list page */}
          <div className="h-full w-full p-56">
            <div>
              <p className="font-light text-2xl text-white capitalize">
                {router.query.type} Tasks lists
              </p>

              {/* Add Task */}
              <div className="mt-8 p-3 h-12 w-full flex items-center rounded-xl bg-white">
                <div className="h-full flex items-center">
                  <label className="mr-1 flex items-center">
                    <input
                      type="radio"
                      value="high"
                      className="hidden"
                      checked={priority === "high"}
                    />

                    {priority === "high" ? (
                      <CheckCircleIcon
                        title="High"
                        className="w-6 text-red-600"
                      />
                    ) : (
                      <span
                        className="h-4 w-4 inline-block rounded-full bg-red-600"
                        onClick={() => setPriority("high")}
                      ></span>
                    )}
                  </label>
                  <label className="mr-1 flex items-center">
                    <input
                      type="radio"
                      value="medium"
                      className="hidden"
                      checked={priority === "medium"}
                    />

                    {priority === "medium" ? (
                      <CheckCircleIcon
                        title="Medium"
                        className="w-6 text-blue-700"
                      />
                    ) : (
                      <span
                        className="h-4 w-4 inline-block rounded-full bg-blue-700"
                        onClick={() => setPriority("medium")}
                      ></span>
                    )}
                  </label>
                  <label className="mr-1 flex items-center">
                    <input
                      type="radio"
                      value="low"
                      className="hidden"
                      checked={priority === "low"}
                    />

                    {priority === "low" ? (
                      <CheckCircleIcon
                        title="Low"
                        className="w-6 text-yellow-500"
                      />
                    ) : (
                      <span
                        className="h-4 w-4 inline-block rounded-full bg-yellow-500"
                        onClick={() => setPriority("low")}
                      ></span>
                    )}
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="What is your next task"
                  className="h-full w-full mx-2 p-1 text-sm outline-none"
                  onChange={(e) => setTask(e.target.value)}
                />
                <div>
                  <span className={`${task && "cursor-pointer"}`}>
                    {task ? (
                      <RocketLaunchIcon
                        className="w-6 text-blue-700"
                        onClick={handleTask}
                      />
                    ) : (
                      <RocketLaunchIcon className="w-6 text-blue-400" />
                    )}
                  </span>
                </div>
              </div>

              {/* Render Tasks */}
              <div className="mt-20 px-3">
                {!availableTasks || availableTasks?.length < 1 ? (
                  <p className="text-white text-center text-2xl italic">
                    No available tasks added yet
                  </p>
                ) : (
                  availableTasks.map((task) => (
                    <TaskList
                      key={task.id}
                      id={task.id}
                      completed={task.completed}
                      task={task.schedule}
                      priority={task.priority}
                      handleStatus={handleStatus}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PriorityType;
