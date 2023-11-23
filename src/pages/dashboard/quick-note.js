import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import Layout from "@/components/Layout";
import DashboardNav from "@/components/DashboardNav";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const QuickNote = () => {
  const [content, setContent] = useState("");

  return (
    <Layout
      title="TaskMaster | Dashboard | Quick Note"
      description="Create and manage task using task master"
      keywords="Create Task | Add Task | Delete Task"
    >
      <div className="p-3 h-screen bg-blue-700">
        <div className="h-full flex items-start justify-start rounded-xl overflow-hidden">
          {/* Navigation */}
          <DashboardNav />

          {/* Tasks list page */}
          <div className="h-full w-full p-56">
            <div className="h-full">
              <p className="font-light text-2xl text-white">Quick note</p>
              {/* Add Task */}

              {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
              <QuillEditor
                value={content}
                onChange={setContent}
                className="bg-white mt-8 h-full overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuickNote;
