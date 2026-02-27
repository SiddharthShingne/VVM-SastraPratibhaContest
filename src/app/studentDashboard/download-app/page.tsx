
"use client";
import MobileAppInstruction from "./Mobile-app-instruction/page";
import DestopAppInstruction from "./destop-app-instruction/page";
import Level1AppPage from "./level-1-app/page";
import { useState } from "react";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";
// import DashboardPage from "../page";
type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};
export default function DownloadApp() {
 const [activeTab, setActiveTab] = useState("Mobile App Instruction");

  const tabs: TabItem[] = [
    {
      id: "Mobile App Instruction",
      label: "Mobile App Instruction",
      content: <MobileAppInstruction />
    },
    {
      id: "Desktop App Instruction",
      label: "Desktop App Instruction",
      content: <DestopAppInstruction />
    },
    {
      id: "Level 1 SIF Exam",
      label: "Level 1 SIF Exam",
      content: <Level1AppPage />
    },
  ];


  
  return (
    <>
     

        <div className="flex w-full flex-col">

          <Tabs aria-label="Dynamic tabs" items={tabs}   selectedKey={activeTab}
  onSelectionChange={(key) => setActiveTab(key as string)}
  classNames={{
    tabList: "border-b border-gray-200 bg-gray-100 px-6",
    tab: "px-6 py-3 text-sm font-medium transition-all",
    cursor: "bg-transparent border-b-2 border-blue-600",
    tabContent: "group-data-[selected=true]:text-blue-600",
  }} >
            {(item: TabItem) => (
              <Tab key={item.id} title={item.label}>
                <Card>
                  <CardBody>{item.content}</CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </div>

      {/* </DashboardPage > */}



    </>


  )
}
