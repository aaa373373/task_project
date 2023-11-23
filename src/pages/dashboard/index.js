import React from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import DashboardNav from "@/components/DashboardNav";

const index = () => {
  return (
    <Layout
      title="TaskMaster | Dashboard"
      description="Create and manage task using task master"
      keywords="Create Task | Add Task | Delete Task"
    >
      <div className="p-3 h-screen bg-blue-700">
        <div className="h-full flex items-start justify-start rounded-xl overflow-hidden">
          {/* Navigation */}
          <DashboardNav />

          {/* Tasks list page */}
          <div className="h-full w-full p-56">
            <div>
              <p className="font-light text-2xl text-white">Tasks list</p>

              {/* Add Task */}
              <div className="mt-8 p-3 h-12 w-full flex items-center rounded-xl bg-white">
                <div className="h-full flex items-center">
                  <label className="mr-1">
                    <input type="radio" value="high" className="hidden" />
                    <span className="h-3 w-3 inline-block rounded-full bg-red-600"></span>
                  </label>
                  <label className="mr-1">
                    <input type="radio" value="medium" className="hidden" />
                    <span className="h-3 w-3 inline-block rounded-full bg-blue-700"></span>
                  </label>
                  <label className="mr-1">
                    <input type="radio" value="low" className="hidden" />
                    <span className="h-3 w-3 inline-block rounded-full bg-yellow-500"></span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="What is your next task"
                  className="h-full w-full mx-2 p-1 text-sm outline-none"
                />
                <div>
                  <span>
                    <RocketLaunchIcon
                      title="Submit"
                      className="w-6 text-blue-700"
                    />
                  </span>
                </div>
                {/* <div>
                  <label htmlFor="priority">Select</label>
                  <input type="date" id="priority" />
                </div> */}
              </div>

              {/* Render Tasks */}
              <div className="mt-20 px-3">
                <TaskList
                  completed={true}
                  task="Go to the gym"
                  priority="high"
                />
                <TaskList
                  completed={false}
                  task="Work on the interface"
                  priority="medium"
                />
                <TaskList
                  completed={true}
                  task="Change background color"
                  priority="low"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
