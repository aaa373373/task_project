import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

import Layout from "@/components/Layout";
import DashboardNav from "@/components/DashboardNav";
import TitleList from "@/components/TitleList";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";

import { getCurrentUser, getCurrentUserDetails } from "../../../utils";
import { db } from "../../../firebase.config";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const Notes = () => {
  const router = useRouter();

  const [contentTitle, setContentTtitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
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
      // Fetch user tasks in realtime
      const q = query(collection(db, "notes"), where("uid", "==", user.uid));
      onSnapshot(q, (querySnapshot) => {
        const userNotes = [];
        querySnapshot.forEach((doc) => {
          userNotes.push({ ...doc.data(), id: doc.id });
        });
        setNotes(userNotes);
        console.log(notes);
      });
      getUserDetails(user.uid);
    }
  }, [router, user]);

  function handleSelectedNote(id, el) {
    if (document.querySelector(".activateLink")) {
      document.querySelector(".activateLink").classList.remove("activateLink");
      el.classList.add("activateLink");
    }

    const result = notes.filter((note) => note.id === id)[0];
    setContentTtitle(result.title);
    setContent(result.content);
  }

  // async function handleSubmitNote(e) {
  //   e.preventDefault();

  //   if (content.trim().length < 1) {
  //     toast.error("No there's no content available.");
  //     return;
  //   }

  //   if (conententTitle.trim().length < 1) {
  //     toast.error("Provide note title.");
  //     return;
  //   }

  //   await writeNoteToDb(user.uid, {
  //     firstName: userDetails.firstName,
  //     lastName: userDetails.lastName,
  //     email: user.email,
  //     title: conententTitle,
  //     content: content,
  //     date: new Date(),
  //     uid: user.uid,
  //   });

  //   setContentTtitle("");
  //   setContent("");
  // }

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
            activeLink="notes"
            firstName={userDetails?.firstName}
            lastName={userDetails?.lastName}
          />

          {/* Tasks list page */}
          <div className="h-full w-full p-56">
            <div className="h-full">
              <p className="font-light text-2xl text-white">Notes</p>

              <div className="mt-10 h-full flex items-start">
                <div className="h-full w-4/12 mr-5 bg-blue-900 overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900">
                  {notes.length > 0 &&
                    notes.map((note) => (
                      <TitleList
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        formattedDate={moment(note.date.seconds * 1000).format(
                          "MM/DD/YYYY"
                        )}
                        handleSelectedNote={handleSelectedNote}
                      />
                    ))}
                </div>
                <div className="hideContentBox h-full w-6/12 overflow-hidden">
                  <div className="mb-5 w-full flex items-center">
                    <input
                      type="text"
                      placeholder="Type not title"
                      className="p-3 w-full outline-0 border-0 rounded"
                      onChange={(e) => setContentTtitle(e.target.value)}
                      value={contentTitle}
                    />
                    {/* <button
                  className="p-3 w-32 block font-medium text-white capitalize bg-blue-900 hover:bg-blue-800 transition-all duration-200"
                  onClick={handleSubmitNote}
                >
                  Submit
                </button> */}
                  </div>

                  {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
                  <QuillEditor
                    value={content}
                    onChange={setContent}
                    className="bg-white mt-2 h-full text-xl overflow-hidden rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notes;
