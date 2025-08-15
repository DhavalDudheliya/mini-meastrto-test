"use client";

import DashBoardHeader from "@/components/ui/DashBoardHeader";
import Sidebar from "@/components/ui/Sidebar";
import React from "react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [toggleSideBar, setToggleSidebar] = useState(false);

  return (
    <>
      <div className="flex">
        <div
          className={`w-[200px] fixed z-[40] top-0 ${
            toggleSideBar ? "left-0" : "-left-[200px]"
          } lg:left-0 lg:relative lg:w-[200px] xl:w-[260px] transition-all duration-300 ease-in-out`}
        >
          <Sidebar />
        </div>
        <div className="w-full h-screen overflow-hidden lg:w-[calc(100%_-_200px)] xl:w-[calc(100%_-_260px)]">
          <DashBoardHeader toggleSidebar={() => setToggleSidebar(!toggleSideBar)} />
          <div className="dashboard-wrapper relative h-[calc(100%_-58px)] lg:h-[calc(100%_-68px)] xl:h-[calc(100%_-78px)]">
            <div className="h-full p-4 lg:p-5 xl:p-6 2xl:px-10 2xl:py-[34px]">
              <div className="h-full overflow-hidden overflow-y-auto y-scroll-hidden">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
