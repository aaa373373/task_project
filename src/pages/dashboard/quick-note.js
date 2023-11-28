import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";

import Layout from "@/components/Layout";
import DashboardNav from "@/components/DashboardNav";
import { getCurrentUser, getCurrentUserDetails } from "../../../utils";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const QuickNote = () => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState(null);

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
      getUserDetails(user.uid);
    }
  }, [router, user]);

  return (
    <Layout
      title="TaskMaster | Dashboard | Quick Note"
      description="Create and manage task using task master"
      keywords="Create Task | Add Task | Delete Task"
    >
      <div className="p-3 h-screen bg-blue-700">
        <div className="h-full flex items-start justify-start rounded-xl overflow-hidden">
          {/* Navigation */}
          <DashboardNav
            activeLink="quick-note"
            firstName={userDetails?.firstName}
            lastName={userDetails?.lastName}
          />

          {/* Tasks list page */}
          <div className="h-full w-full p-56">
            <div className="h-full">
              <p className="font-light text-2xl text-white">Quick note</p>
              {/* Add Task */}

              {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
              <QuillEditor
                value={content}
                onChange={setContent}
                className="bg-white mt-8 h-full text-xl overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuickNote;
