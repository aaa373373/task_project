import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";

import Layout from "@/components/Layout";
import DashboardNav from "@/components/DashboardNav";

import {
  getCurrentUser,
  getCurrentUserDetails,
  writeNoteToDb,
} from "../../../utils";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const QuickNote = () => {
  const router = useRouter();

  const [contentTitle, setContentTtitle] = useState("");
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

  async function handleSubmitNote(e) {
    e.preventDefault();

    if (content.trim().length < 1) {
      toast.error("No there's no content available.");
      return;
    }

    if (contentTitle.trim().length < 1) {
      toast.error("Provide note title.");
      return;
    }

    await writeNoteToDb(user.uid, {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: user.email,
      title: contentTitle,
      content: content,
      date: new Date(),
      uid: user.uid,
    });

    setContentTtitle("");
    setContent("");
  }

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

              <div className="h-10 mt-10 mb-5 w-full flex items-center">
                <input
                  type="text"
                  placeholder="Type not title"
                  className="mr-2 p-3 w-full outline-0 border-0"
                  onChange={(e) => setContentTtitle(e.target.value)}
                  value={contentTitle}
                />
                <button
                  className="p-3 w-32 block font-medium text-white capitalize bg-blue-900 hover:bg-blue-800 transition-all duration-200"
                  onClick={handleSubmitNote}
                >
                  Submit
                </button>
              </div>

              {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
              <QuillEditor
                value={content}
                onChange={setContent}
                className="bg-white mt-2 h-full text-xl overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuickNote;
