/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import MobileAppInstruction from "./Mobile-app-instruction/page";
import DestopAppInstruction from "./destop-app-instruction/page";
import Level1AppPage from "./level-1-app/page";
import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export default function DownloadApp() {
  const [activeTab, setActiveTab] = useState("Mobile App Instruction");

  const tabs: TabItem[] = [
    { id: "Mobile App Instruction", label: "Mobile App Instruction", content: <MobileAppInstruction /> },
    // { id: "Desktop App Instruction", label: "Desktop App Instruction", content: <DestopAppInstruction /> },
    // { id: "Level 1 SIF Exam", label: "Level 1 SIF Exam", content: <Level1AppPage /> },
  ];

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-12 text-center shadow-xl transition-all duration-500 hover:shadow-2xl">
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="absolute inset-[1px] rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 transition-all duration-500" />

      {/* Icon */}
      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#17395c] to-[#244d79] shadow-lg group-hover:scale-110 transition-transform duration-500">
        <svg className="h-10 w-10 text-[#f4df17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Text */}
      <h2 className="relative mb-2 text-3xl font-black tracking-tight text-[#17395c]">
        Coming Soon
      </h2>

      {/* Decorative line */}
      <div className="relative mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] group-hover:w-24 transition-all duration-500" />

      <p className="relative mt-4 text-sm text-gray-500">
        Stay tuned for updates
      </p>
    </div>
    // <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#17395c] via-[#1e4668] to-[#17395c] p-8 text-center shadow-2xl">
    //   {/* Animated background pattern */}
    //   <div className="absolute inset-0 opacity-10">
    //     <div className="absolute inset-0 bg-[radial-gradient(#f4df17_2px,transparent_2px)] bg-[length:20px_20px]"></div>
    //   </div>

    //   {/* Glowing orb */}
    //   <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#f4df17] opacity-20 blur-3xl animate-pulse"></div>
    //   <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#f4df17] opacity-20 blur-3xl animate-pulse delay-1000"></div>

    //   {/* Content */}
    //   <div className="relative z-10">
    //     <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#f4df17]/10 px-4 py-2">
    //       <span className="text-sm font-semibold text-[#f4df17]">🚀 Launching Soon</span>
    //     </div>

    //     <h2 className="mb-4 text-4xl font-bold text-white">Coming Soon</h2>

    //     <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-[#f4df17]"></div>

    //     <p className="mb-8 text-gray-300 max-w-md mx-auto">
    //       We're working hard to bring you something amazing. Stay tuned for updates!
    //     </p>

    //     {/* Countdown timer (optional) */}
    //     <div className="mx-auto mb-8 flex max-w-xs justify-center gap-4">
    //       <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
    //         <div className="text-2xl font-bold text-white">15</div>
    //         <div className="text-xs text-gray-300">Days</div>
    //       </div>
    //       <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
    //         <div className="text-2xl font-bold text-white">08</div>
    //         <div className="text-xs text-gray-300">Hours</div>
    //       </div>
    //       <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
    //         <div className="text-2xl font-bold text-white">45</div>
    //         <div className="text-xs text-gray-300">Mins</div>
    //       </div>
    //       <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
    //         <div className="text-2xl font-bold text-white">22</div>
    //         <div className="text-xs text-gray-300">Secs</div>
    //       </div>
    //     </div>

    //     {/* Notify button */}
    //     <button className="rounded-lg bg-[#f4df17] px-6 py-3 font-bold text-[#17395c] transition-all hover:bg-[#e8d000] hover:scale-105 active:scale-95">
    //       📧 Notify Me When Live
    //     </button>
    //   </div>
    // </div>
    // <div className="min-h-screen py-10 px-4">
    //   <div className="max-w-275 mx-auto">

    //     <div className="flex w-full flex-col">
    //       <Tabs
    //         aria-label="Download App Tabs"
    //         items={tabs}
    //         selectedKey={activeTab}
    //         onSelectionChange={(key) => setActiveTab(key as string)}
    //         classNames={{
    //           tabList: "border-b border-gray-200 bg-white/70 backdrop-blur px-6 rounded-t-2xl",
    //           tab: "px-6 py-3 text-sm font-bold transition-all text-[#17395c]",
    //           cursor: "bg-transparent border-b-2 border-[#17395c]",
    //           tabContent: "group-data-[selected=true]:text-[#17395c]",
    //         }}
    //       >
    //         {(item: TabItem) => (
    //           <Tab key={item.id} title={item.label}>
    //             <Card className="rounded-b-2xl border-0 shadow-none bg-transparent">
    //               <CardBody className="p-0">{item.content}</CardBody>
    //             </Card>
    //           </Tab>
    //         )}
    //       </Tabs>
    //     </div>
    //   </div>
    // </div>
  );
}