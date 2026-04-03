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
    { id: "Desktop App Instruction", label: "Desktop App Instruction", content: <DestopAppInstruction /> },
    { id: "Level 1 SIF Exam", label: "Level 1 SIF Exam", content: <Level1AppPage /> },
  ];

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Download App Tabs"
            items={tabs}
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
            classNames={{
              tabList: "border-b border-gray-200 bg-white/70 backdrop-blur px-6 rounded-t-2xl",
              tab: "px-6 py-3 text-sm font-bold transition-all text-[#17395c]",
              cursor: "bg-transparent border-b-2 border-[#17395c]",
              tabContent: "group-data-[selected=true]:text-[#17395c]",
            }}
          >
            {(item: TabItem) => (
              <Tab key={item.id} title={item.label}>
                <Card className="rounded-b-2xl border-0 shadow-none bg-transparent">
                  <CardBody className="p-0">{item.content}</CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}