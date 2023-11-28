import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/Layout";

import ManagementImage from "../../public/management_icon.svg";

export default function Home() {
  return (
    <Layout
      title="TaskMaster | Dashboard"
      description="Create and manage task using task master"
      keywords="Create Task | Add Task | Delete Task"
    >
      <div className="h-screen p-3 flex items-center justify-center flex-col bg-blue-700">
        <p className="mb-8 font-normal text-white text-5xl">TaskMaster</p>
        <Image
          src={ManagementImage}
          alt="Illustration of hectic business management"
          width={450}
          height={450}
          className="md:p-5"
        />
        <p className="mt-5 font-medium tracking-wider text-xl text-center text-white">
          Managing tasks made easy
        </p>
        <p className="font-light text-xs text-center text-white">
          Being able to manage and schedule task boost productivity
        </p>
        <Link href="/auth/login">
          <button className="mt-8 p-3 bg-white text-blue-900 font-medium uppercase hover:bg-gray-100 transition-all duration-200">
            Get Started
          </button>
        </Link>
      </div>
    </Layout>
  );
}
