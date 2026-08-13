// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import MobileAppInstruction from "./Mobile-app-instruction/page";
// import DestopAppInstruction from "./destop-app-instruction/page";
// import Level1AppPage from "./level-1-app/page";
// import { useState } from "react";
// import { Tabs, Tab, Card, CardBody } from "@heroui/react";

// type TabItem = {
//   id: string;
//   label: string;
//   content: React.ReactNode;
// };

// export default function DownloadApp() {
//   const [activeTab, setActiveTab] = useState("Mobile App Instruction");

//   const tabs: TabItem[] = [
//     { id: "Mobile App Instruction", label: "Mobile App Instruction", content: <MobileAppInstruction /> },
//     // { id: "Desktop App Instruction", label: "Desktop App Instruction", content: <DestopAppInstruction /> },
//     // { id: "Level 1 SIF Exam", label: "Level 1 SIF Exam", content: <Level1AppPage /> },
//   ];

//   return (
//     <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-12 text-center shadow-xl transition-all duration-500 hover:shadow-2xl">
     
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
//       <div className="absolute inset-[1px] rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 transition-all duration-500" />

     
//       <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#17395c] to-[#244d79] shadow-lg group-hover:scale-110 transition-transform duration-500">
//         <svg className="h-10 w-10 text-[#f4df17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       </div>

     
//       <h2 className="relative mb-2 text-3xl font-black tracking-tight text-[#17395c]">
//         Coming Soon
//       </h2>

     
//       <div className="relative mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] group-hover:w-24 transition-all duration-500" />

//       <p className="relative mt-4 text-sm text-gray-500">
//         Stay tuddddddddddned for updates
//       </p>
//     </div>
//     // <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#17395c] via-[#1e4668] to-[#17395c] p-8 text-center shadow-2xl">
//     //   {/* Animated background pattern */}
//     //   <div className="absolute inset-0 opacity-10">
//     //     <div className="absolute inset-0 bg-[radial-gradient(#f4df17_2px,transparent_2px)] bg-[length:20px_20px]"></div>
//     //   </div>

//     //   {/* Glowing orb */}
//     //   <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#f4df17] opacity-20 blur-3xl animate-pulse"></div>
//     //   <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#f4df17] opacity-20 blur-3xl animate-pulse delay-1000"></div>

//     //   {/* Content */}
//     //   <div className="relative z-10">
//     //     <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#f4df17]/10 px-4 py-2">
//     //       <span className="text-sm font-semibold text-[#f4df17]">🚀 Launching Soon</span>
//     //     </div>

//     //     <h2 className="mb-4 text-4xl font-bold text-white">Coming Soon</h2>

//     //     <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-[#f4df17]"></div>

//     //     <p className="mb-8 text-gray-300 max-w-md mx-auto">
//     //       We're working hard to bring you something amazing. Stay tuned for updates!
//     //     </p>

//     //     {/* Countdown timer (optional) */}
//     //     <div className="mx-auto mb-8 flex max-w-xs justify-center gap-4">
//     //       <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
//     //         <div className="text-2xl font-bold text-white">15</div>
//     //         <div className="text-xs text-gray-300">Days</div>
//     //       </div>
//     //       <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
//     //         <div className="text-2xl font-bold text-white">08</div>
//     //         <div className="text-xs text-gray-300">Hours</div>
//     //       </div>
//     //       <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
//     //         <div className="text-2xl font-bold text-white">45</div>
//     //         <div className="text-xs text-gray-300">Mins</div>
//     //       </div>
//     //       <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
//     //         <div className="text-2xl font-bold text-white">22</div>
//     //         <div className="text-xs text-gray-300">Secs</div>
//     //       </div>
//     //     </div>

//     //     {/* Notify button */}
//     //     <button className="rounded-lg bg-[#f4df17] px-6 py-3 font-bold text-[#17395c] transition-all hover:bg-[#e8d000] hover:scale-105 active:scale-95">
//     //       📧 Notify Me When Live
//     //     </button>
//     //   </div>
//     // </div>
//     // <div className="min-h-screen py-10 px-4">
//     //   <div className="max-w-275 mx-auto">

//     //     <div className="flex w-full flex-col">
//     //       <Tabs
//     //         aria-label="Download App Tabs"
//     //         items={tabs}
//     //         selectedKey={activeTab}
//     //         onSelectionChange={(key) => setActiveTab(key as string)}
//     //         classNames={{
//     //           tabList: "border-b border-gray-200 bg-white/70 backdrop-blur px-6 rounded-t-2xl",
//     //           tab: "px-6 py-3 text-sm font-bold transition-all text-[#17395c]",
//     //           cursor: "bg-transparent border-b-2 border-[#17395c]",
//     //           tabContent: "group-data-[selected=true]:text-[#17395c]",
//     //         }}
//     //       >
//     //         {(item: TabItem) => (
//     //           <Tab key={item.id} title={item.label}>
//     //             <Card className="rounded-b-2xl border-0 shadow-none bg-transparent">
//     //               <CardBody className="p-0">{item.content}</CardBody>
//     //             </Card>
//     //           </Tab>
//     //         )}
//     //       </Tabs>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }






"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Smartphone, Laptop, BookCheck } from "lucide-react";

/* ==========================================================
   TYPES
========================================================== */

interface InstructionBlock {
  heading: string;
  stepNumber: number | null;
  points: string[];
  paragraphs: string[];
}

interface InstructionSection {
  title: string;
  blocks: InstructionBlock[];
}

/* ==========================================================
   PARSERS
========================================================== */

function parsePlainTextInstruction(text: string): InstructionBlock[] {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const blocks: InstructionBlock[] = [];
  let current: InstructionBlock | null = null;

  const headingPattern = /^(\d+)[.)]\s+(.{2,80})$/;
  const bulletPattern = /^[-*•]\s+(.*)$/;

  lines.forEach((line) => {
    const headingMatch = line.match(headingPattern);
    const bulletMatch = line.match(bulletPattern);

    if (headingMatch && !bulletMatch) {
      if (current) blocks.push(current);
      current = {
        heading: headingMatch[2],
        stepNumber: parseInt(headingMatch[1], 10),
        points: [],
        paragraphs: [],
      };
    } else if (bulletMatch) {
      if (!current) current = { heading: "", stepNumber: null, points: [], paragraphs: [] };
      current.points.push(bulletMatch[1]);
    } else {
      if (!current) current = { heading: "", stepNumber: null, points: [], paragraphs: [] };
      current.paragraphs.push(line);
    }
  });

  if (current) blocks.push(current);
  return blocks;
}

function parseHtmlInstruction(rawHtml: string): InstructionBlock[] {
  if (typeof document === "undefined") return [];

  const html = rawHtml
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/b>/gi, "</b>\n");

  const container = document.createElement("div");
  container.innerHTML = html;

  const blocks: InstructionBlock[] = [];
  let current: InstructionBlock | null = null;

  const pushCurrent = () => {
    if (
      current &&
      ((current as InstructionBlock).heading ||
        (current as InstructionBlock).points.length ||
        (current as InstructionBlock).paragraphs.length)
    ) {
      blocks.push(current as InstructionBlock);
    }
  };

  container.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;

      if (el.tagName.toLowerCase() === "b") {
        pushCurrent();
        const text = el.textContent?.trim() || "";
        const match = text.match(/^(\d+)\.\s*(.*)$/);

        current = {
          heading: match ? match[2] : text,
          stepNumber: match ? +match[1] : null,
          points: [],
          paragraphs: [],
        };
      }
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const lines = node.textContent
        ?.split("\n")
        .map((x) => x.trim())
        .filter(Boolean);

      lines?.forEach((line) => {
        if (!current) current = { heading: "", stepNumber: null, points: [], paragraphs: [] };

        if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*")) {
          (current as InstructionBlock).points.push(line.replace(/^[•*-]\s*/, ""));
        } else {
          (current as InstructionBlock).paragraphs.push(line);
        }
      });
    }
  });

  pushCurrent();
  return blocks;
}

function parseInstructionContent(raw: string): InstructionBlock[] {
  if (!raw) return [];
  const cleaned = raw.replace(/\\n/g, "\n").replace(/\r/g, "").trim();
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(cleaned);
  return looksLikeHtml ? parseHtmlInstruction(cleaned) : parsePlainTextInstruction(cleaned);
}

function parseInstructionSections(raw: string): InstructionSection[] {
  if (!raw) return [];
  const cleaned = raw.replace(/\\n/g, "\n").replace(/\r/g, "").trim();

  const sectionRegex = /(Mobile\/Tablet App Instructions|Desktop\/Laptop App Instructions)/g;
  const parts = cleaned.split(sectionRegex).filter(Boolean);

  const sections: InstructionSection[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    sections.push({
      title: parts[i].trim(),
      blocks: parseInstructionContent(parts[i + 1] || ""),
    });
  }
  return sections;
}

/* ==========================================================
   SMALL HELPERS
========================================================== */

function getUser(): { country_id?: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    const country_id =
      parsed?.user?.country_id ??
      parsed?.user?.user_detail?.state?.country_id ??
      parsed?.country_id ??
      null;

    return { country_id };
  } catch {
    return null;
  }
}

async function apiGet(path: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const res = await fetch(`${base}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

/* ==========================================================
   MARKET / STORE BUTTON
========================================================== */

const STORE_ICONS: Record<string, string> = {
  google:
    "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzVDREFERDsiIHBvaW50cz0iMjkuNTMsMCAyOS41MywyNTEuNTA5IDI5LjUzLDUxMiAyOTkuMDA0LDI1MS41MDkgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNCREVDQzQ7IiBwb2ludHM9IjM2OS4wNjcsMTgwLjU0NyAyNjIuMTc1LDExOS40NjcgMjkuNTMsMCAyOTkuMDA0LDI1MS41MDkgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNEQzY4QTE7IiBwb2ludHM9IjI5LjUzLDUxMiAyOS41Myw1MTIgMjYyLjE3NSwzODMuNTUxIDM2OS4wNjcsMzIyLjQ3IDI5OS4wMDQsMjUxLjUwOSAiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0E5NjsiIGQ9Ik0zNjkuMDY3LDE4MC41NDdsLTcwLjA2Myw3MC45NjFsNzAuMDYzLDcwLjk2MWwxMDguNjg4LTYyLjg3N2M2LjI4OC0zLjU5Myw2LjI4OC0xMS42NzcsMC0xNS4yNyAgTDM2OS4wNjcsMTgwLjU0N3oiLz4KPC9zdmc+Cg==",
  apple:
    "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzA1IDMwNSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPHBhdGggZD0iTTQwLjczOCwxMTIuMTE5Yy0yNS43ODUsNDQuNzQ1LTkuMzkzLDExMi42NDgsMTkuMTIxLDE1My44MkM3NC4wOTIsMjg2LjUyMyw4OC41MDIsMzA1LDEwOC4yMzksMzA1ICAgYzAuMzcyLDAsMC43NDUtMC4wMDcsMS4xMjctMC4wMjJjOS4yNzMtMC4zNywxNS45NzQtMy4yMjUsMjIuNDUzLTUuOTg0YzcuMjc0LTMuMSwxNC43OTctNi4zMDUsMjYuNTk3LTYuMzA1ICAgYzExLjIyNiwwLDE4LjM5LDMuMTAxLDI1LjMxOCw2LjA5OWM2LjgyOCwyLjk1NCwxMy44NjEsNi4wMSwyNC4yNTMsNS44MTVjMjIuMjMyLTAuNDE0LDM1Ljg4Mi0yMC4zNTIsNDcuOTI1LTM3Ljk0MSAgIGMxMi41NjctMTguMzY1LDE4Ljg3MS0zNi4xOTYsMjAuOTk4LTQzLjAxbDAuMDg2LTAuMjcxYzAuNDA1LTEuMjExLTAuMTY3LTIuNTMzLTEuMzI4LTMuMDY2Yy0wLjAzMi0wLjAxNS0wLjE1LTAuMDY0LTAuMTgzLTAuMDc4ICAgYy0zLjkxNS0xLjYwMS0zOC4yNTctMTYuODM2LTM4LjYxOC01OC4zNmMtMC4zMzUtMzMuNzM2LDI1Ljc2My01MS42MDEsMzAuOTk3LTU0LjgzOWwwLjI0NC0wLjE1MiAgIGMwLjU2Ny0wLjM2NSwwLjk2Mi0wLjk0NCwxLjA5Ni0xLjYwNmMwLjEzNC0wLjY2MS0wLjAwNi0xLjM0OS0wLjM4Ni0xLjkwNWMtMTguMDE0LTI2LjM2Mi00NS42MjQtMzAuMzM1LTU2Ljc0LTMwLjgxMyAgIGMtMS42MTMtMC4xNjEtMy4yNzgtMC4yNDItNC45NS0wLjI0MmMtMTMuMDU2LDAtMjUuNTYzLDQuOTMxLTM1LjYxMSw4Ljg5M2MtNi45MzYsMi43MzUtMTIuOTI3LDUuMDk3LTE3LjA1OSw1LjA5NyAgIGMtNC42NDMsMC0xMC42NjgtMi4zOTEtMTcuNjQ1LTUuMTU5Yy05LjMzLTMuNzAzLTE5LjkwNS03Ljg5OS0zMS4xLTcuODk5Yy0wLjI2NywwLTAuNTMsMC4wMDMtMC43ODksMC4wMDggICBDNzguODk0LDczLjY0Myw1NC4yOTgsODguNTM1LDQwLjczOCwxMTIuMTE5eiIgZmlsbD0iIzJlMmUyZSIvPgoJPHBhdGggZD0iTTIxMi4xMDEsMC4wMDJjLTE1Ljc2MywwLjY0Mi0zNC42NzIsMTAuMzQ1LTQ1Ljk3NCwyMy41ODNjLTkuNjA1LDExLjEyNy0xOC45ODgsMjkuNjc5LTE2LjUxNiw0OC4zNzkgICBjMC4xNTUsMS4xNywxLjEwNywyLjA3MywyLjI4NCwyLjE2NGMxLjA2NCwwLjA4MywyLjE1LDAuMTI1LDMuMjMyLDAuMTI2YzE1LjQxMywwLDMyLjA0LTguNTI3LDQzLjM5NS0yMi4yNTcgICBjMTEuOTUxLTE0LjQ5OCwxNy45OTQtMzMuMTA0LDE2LjE2Ni00OS43N0MyMTQuNTQ0LDAuOTIxLDIxMy4zOTUtMC4wNDksMjEyLjEwMSwwLjAwMnoiIGZpbGw9IiMyZTJlMmUiLz4KPC9nPgo8L3N2Zz4K",
  windows:
    "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgNDgwIDQ4MCI+CjxnPgoJPHBhdGggZD0iTTAuMTc2LDIyNEwwLjAwMSw2Ny45NjNsMTkyLTI2LjA3MlYyMjRIMC4xNzZ6IE0yMjQuMDAxLDM3LjI0MUw0NzkuOTM3LDB2MjI0SDIyNC4wMDFWMzcuMjQxeiBNNDc5Ljk5OSwyNTZsLTAuMDYyLDIyNCAgIGwtMjU1LjkzNi0zNi4wMDhWMjU2SDQ3OS45OTl6IE0xOTIuMDAxLDQzOS45MThMMC4xNTcsNDEzLjYyMUwwLjE0NywyNTZoMTkxLjg1NFY0MzkuOTE4eiIgZmlsbD0iIzAwYmNmMiIvPgo8L2c+Cjwvc3ZnPgo=",
};


function StoreButton({
  href,
  subtitle,
  title,
  icon,
}: {
  href: string;
  subtitle: string;
  title: string;
  icon: keyof typeof STORE_ICONS;
}) {
  return (

  <a  href = { href }
      target = "_blank"
  rel = "noopener noreferrer"
  role = "button"
  className = "inline-flex items-center gap-3 rounded-md border border-gray-200 bg-white pl-3 pr-4 py-2 no-underline bg-no-repeat bg-[length:1.5rem_1.5rem] bg-[position:0.75rem_center] pl-[2.8125rem] transition-colors duration-200 hover:bg-gray-50"
  style = {{ backgroundImage: `url(${STORE_ICONS[icon]})` }
}
    >
  <span className="flex flex-col">
    <span className="text-[0.75rem] text-gray-500 -mb-1">{subtitle}</span>
    <span className="text-lg text-gray-900">{title}</span>
  </span>
    </a >
  );
}

/* ==========================================================
   PAGE COMPONENT
========================================================== */

type TabKey = "mobile" | "desktop" | "mock";

export default function DownloadAppsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("mobile");

  const [isLoading, setIsLoading] = useState(false);
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");

  const [showMockTab, setShowMockTab] = useState(false);
  const [showMockGCCTab, setShowMockGCCTab] = useState(false);

  const [parsedSections1, setParsedSections1] = useState<InstructionSection[]>([]);
  const [parsedInstruction2, setParsedInstruction2] = useState<InstructionBlock[]>([]);

  useEffect(() => {
    const user = getUser();

    if (!user) {
      setShowMockTab(true);
      setShowMockGCCTab(false);
      fetchMockInstruction();
      return;
    }

    const cId = user.country_id ?? null;

    if (cId === 1 || cId === null) {
      setShowMockTab(true);
      setShowMockGCCTab(false);
      fetchMockInstruction();
    } else {
      setShowMockTab(false);
      setShowMockGCCTab(true);
      fetchMockInstructionSIF();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMockInstruction() {
    setIsLoading(true);
    try {
      const res = await apiGet("/get-instraction-document?type=mock_instraction");
      setTitle1(res?.data?.title || "");
      setParsedSections1(parseInstructionSections(res?.data?.content || ""));
    } catch (err) {
      console.error("Error fetching mock instruction:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMockInstructionSIF() {
    setIsLoading(true);
    try {
      const res = await apiGet("/get-instraction-document?type=mock_instraction_sif");
      setTitle2(res?.data?.title || "");
      setParsedInstruction2(parseInstructionContent(res?.data?.content || ""));
    } catch (err) {
      console.error("Error fetching mock instruction SIF:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const tabs: { key: TabKey; label: string; icon: React.ReactNode; show: boolean }[] = [
    { key: "mobile", label: "Mobile App", icon: <Smartphone size={18} />, show: true },
    { key: "desktop", label: "Desktop App", icon: <Laptop size={18} />, show: true },
    // {
    //   key: "mock",
    //   label: "Mock Instruction",
    //   icon: <BookCheck size={18} />,
    //   show: showMockTab || showMockGCCTab,
    // },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
      <div className="p-4 sm:p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-2.5 rounded-full font-semibold text-sm">
            <Sparkles size={16} />
            Download Center
          </span>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
            Download App &amp; Exam Instructions
          </h2>

          <p className="text-gray-500 mt-3 mx-auto max-w-xl text-base leading-relaxed">
            Download the VVM Mobile/Desktop application and carefully follow
            the instructions before attempting the Examination.
          </p>
        </div>

        {/* Navigation */}
        <ul className="flex flex-wrap gap-4 justify-center mb-12 list-none p-0">
          {tabs
            .filter((t) => t.show)
            .map((t) => (
              <li key={t.key}>
                <button
                  type="button"
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center justify-center gap-2.5 min-w-[180px] px-6 py-3.5 rounded-full font-semibold
                    transition-all duration-300
                    ${
                      activeTab === t.key
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_10px_25px_rgba(13,110,253,0.25)]"
                        : "bg-slate-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              </li>
            ))}
        </ul>

        {/* Tab content */}
        <div>
          {activeTab === "mobile" && <MobilePane />}
          {activeTab === "desktop" && <DesktopPane />}
          {activeTab === "mock" && (
            <MockPane
              showMockTab={showMockTab}
              showMockGCCTab={showMockGCCTab}
              isLoading={isLoading}
              title1={title1}
              title2={title2}
              parsedSections1={parsedSections1}
              parsedInstruction2={parsedInstruction2}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   SHARED "CARD" WRAPPER
========================================================== */

function PaneCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
      <div className="py-4">
        <div className="rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 sm:p-8 lg:p-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   MOBILE PANE
========================================================== */

function MobilePane() {
  return (
    <PaneCard>
      <h2 className="text-blue-600 font-bold text-2xl mb-6">
        Mobile/Tablet App Instructions
      </h2>

      {/* Android */}
      <div className="mb-8">
        <h5 className="font-bold text-xl mb-3">Android App Instructions</h5>
        <div className="mb-3">
          <StoreButton
            href="https://play.google.com/store/apps/details?id=com.exam.vidyarthi_vigyan_manthan_2025&pcampaignid=web_share"
            subtitle="Download on the"
            title="Google Play"
            icon="google"
          />
        </div>
        <ul className="pl-6 list-disc space-y-2 text-gray-600">
          <li>Click on the Android App link provided.</li>
          <li>You will be redirected to the Google Play Store.</li>
          <li>Download and install the VVM Exam 2026-27 app.</li>
          <li>Open the app after installation.</li>
          <li>Log in using your provided credentials (Username and Password).</li>
          <li>
            After successful login, proceed to attempt the exam by following
            the on-screen instructions.
          </li>
        </ul>
      </div>

      {/* iOS */}
      <div className="mb-4">
        <h5 className="font-bold text-xl mb-3">iOS App Instructions</h5>
        <div className="mb-3">
          <StoreButton
            href="https://apps.apple.com/in/app/vvm-exam-2026-27/id6754361412"
            subtitle="Download on the"
            title="App Store"
            icon="apple"
          />
        </div>
        <ul className="pl-6 list-disc space-y-2 text-gray-600">
          <li>Click on the iOS App link provided.</li>
          <li>You will be redirected to the Apple App Store.</li>
          <li>Download and install the VVM Exam 2026-27 app.</li>
          <li>Open the app after installation.</li>
          <li>Log in using your provided credentials (Username and Password).</li>
          <li>
            After successful login, proceed to attempt the exam by following
            the on-screen instructions.
          </li>
        </ul>
      </div>
    </PaneCard>
  );
}

/* ==========================================================
   DESKTOP PANE
========================================================== */

function DesktopPane() {
  return (
    <PaneCard>
      {/* Step 1 */}
      <div className="mb-8">
        <h5 className="font-bold text-xl mb-3">Step : 1</h5>
        <ul className="pl-6 list-disc space-y-2 text-gray-600 mb-4">
          <li>No need to install SafeExamBrowser App if you have already installed it.</li>
          <li>Or Download the SafeExamBrowser from the below button by selecting your OS.</li>
          <li>Install the SafeExamBrowser App with admin permission.</li>
          <li>Make sure that the SafeExamBrowser App is installed on your computer.</li>
        </ul>

        <div className="flex flex-wrap gap-3 justify-between">
          <StoreButton
            href="https://d32lt7x711uuz8.cloudfront.net/2627/DekstopApplications/win_10_SEB_3.9.0.787_SetupBundle.exe"
            subtitle="Download Safe Exam Browser"
            title="Windows 10 & Above OS File"
            icon="windows"
          />
          <StoreButton
            href="https://d32lt7x711uuz8.cloudfront.net/2627/DekstopApplications/win_8_SafeExamBrowserInstaller.exe"
            subtitle="Download Safe Exam Browser"
            title="Windows 8 & Below OS File"
            icon="windows"
          />
          <StoreButton
            href="https://d32lt7x711uuz8.cloudfront.net/2627/DekstopApplications/MAC_SafeExamBrowser-3.5.4.dmg"
            subtitle="Download Safe Exam Browser"
            title="MAC OS File"
            icon="windows"
          />
        </div>
      </div>

      {/* Step 2 */}
      <div className="mb-4">
        <h5 className="font-bold text-xl mb-3">Step : 2</h5>
        <ul className="pl-6 list-disc space-y-2 text-gray-600 mb-4">
          <li>
            Make sure you have downloaded the Mock Exam App file, or click the
            Exam SEB File Download button provided to download it.
          </li>
          <li>
            Now select this file, right-click on Mock exam App file and open
            with SafeExamBrowser App.
          </li>
          <li>This will open the Mock Exam App in the SafeExamBrowser App.</li>
          <li>Make sure you are able to log in to the App and see Mock Exam Button.</li>
        </ul>

        <div className="flex flex-wrap gap-3 justify-between">
          <StoreButton
            href="https://d32lt7x711uuz8.cloudfront.net/2627/DekstopApplications/Mock_vvm_exam.seb"
            subtitle="Download Mock Exam SEB File"
            title="Exam SEB File"
            icon="windows"
          />
        </div>
      </div>
    </PaneCard>
  );
}

/* ==========================================================
   MOCK PANE
========================================================== */

function MockPane({
  showMockTab,
  showMockGCCTab,
  isLoading,
  title1,
  title2,
  parsedSections1,
  parsedInstruction2,
}: {
  showMockTab: boolean;
  showMockGCCTab: boolean;
  isLoading: boolean;
  title1: string;
  title2: string;
  parsedSections1: InstructionSection[];
  parsedInstruction2: InstructionBlock[];
}) {
  return (
    <PaneCard>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading instructions...</div>
      ) : (
        <>
          {showMockTab &&
            parsedSections1.map((section, sIdx) => (
              <div key={sIdx} className="mb-10">
                <h2 className="text-blue-600 font-bold text-2xl mb-2">
                  {title1}
                </h2>
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  {section.title}
                </h3>
                {section.blocks.map((block, bIdx) => (
                  <InstructionBlockView key={bIdx} block={block} />
                ))}
              </div>
            ))}

          {showMockGCCTab && (
            <div className="mb-10">
              <h2 className="text-blue-600 font-bold text-2xl mb-6">
                {title2}
              </h2>
              {parsedInstruction2.map((block, bIdx) => (
                <InstructionBlockView key={bIdx} block={block} />
              ))}
            </div>
          )}

          {!showMockTab && !showMockGCCTab && (
            <div className="text-center text-gray-500">
              No instructions available.
            </div>
          )}
        </>
      )}
    </PaneCard>
  );
}

function InstructionBlockView({ block }: { block: InstructionBlock }) {
  return (
    <div className="mb-6">
      {block.heading && (
        <h4 className="text-lg font-bold text-gray-900 mb-2">
          {block.stepNumber !== null ? `Step ${block.stepNumber}: ` : ""}
          {block.heading}
        </h4>
      )}

      {block.paragraphs.length > 0 && (
        <div className="text-gray-700 leading-7 whitespace-pre-line mb-2">
          {block.paragraphs.join("\n")}
        </div>
      )}

      {block.points.length > 0 && (
        <ul className="pl-6 list-disc space-y-1 text-gray-600">
          {block.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}