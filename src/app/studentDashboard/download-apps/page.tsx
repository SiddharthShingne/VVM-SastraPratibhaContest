// "user client"
"use client";
import MobileAppInstruction from "./Mobile-app-instruction/page";
import DestopAppInstruction from "./destop-app-instruction/page";
import IosAppInstruction from "./Ios-app-instrction/page";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import DashboardPage from "../page";
type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};
export default function DownloadApp() {

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
      content: <IosAppInstruction />
    },
  ];

  return (
    <>
      <DashboardPage >

        <div className="flex w-full flex-col">

          <Tabs aria-label="Dynamic tabs" items={tabs}>
            {(item: TabItem) => (
              <Tab key={item.id} title={item.label}>
                <Card>
                  <CardBody>{item.content}</CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </div>

      </DashboardPage >



    </>


  )
}
