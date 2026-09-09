"use client";

import { useEffect, useState } from "react";
import { getStudyMaterials } from "@/services/importantDatesService";

// class name (as stored in localStorage) -> book filename
const CLASS_TO_BOOK: Record<string, string> = {
  "6": "Anna Mani Book.pdf",
  "7": "Anna Mani Book.pdf",
  "8": "Ashima Chatterjee Book.pdf",
  "9": "Ashima Chatterjee Book.pdf",
  "10": "Rohini Godbole Book.pdf",
  "11": "Rohini Godbole Book.pdf",
};

export default function StudyMaterial() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfLabel, setPdfLabel] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [apiMaterials, setApiMaterials] = useState<any[]>([]);
  const [apiLoading, setApiLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user"); // <-- change key here if different
      if (!raw) {
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(raw);
      const className: string | undefined =
        parsed?.user?.user_detail?.class?.name ??
        parsed?.user_detail?.class?.name;

      if (!className) {
        setLoading(false);
        return;
      }

      const bookFile = CLASS_TO_BOOK[className];
      if (!bookFile) {
        setLoading(false);
        return;
      }

      setPdfUrl(`/pdf/syllabus/${encodeURIComponent(bookFile)}`);
      setPdfLabel(bookFile.replace(".pdf", ""));
    } catch (e) {
      console.error("Failed to read class from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  
  // useEffect(() => {
  //   const fetchApiMaterials = async () => {
  //     try {
  //       const res = await getStudyMaterials(1); // country_type=1
  //       console.log("study-materials API response:", res); // check shape in browser console, remove after confirming

  //       const list =
  //         res?.data?.data ??   // paginated Laravel response
  //         res?.data ??
  //         res?.materials ??
  //         res;

  //       setApiMaterials(Array.isArray(list) ? list : []);
  //     } catch (e) {
  //       console.error("Failed to fetch study materials", e);
  //     } finally {
  //       setApiLoading(false);
  //     }
  //   };
  //   fetchApiMaterials();
  // }, []);

  
  useEffect(() => {
    const fetchApiMaterials = async () => {
      try {
        const res = await getStudyMaterials(1); // country_type=1
        const list = res?.data?.data ?? [];
        const englishOnly = Array.isArray(list)
          ? list.filter((item: any) => item.language === "English")
          : [];
        setApiMaterials(englishOnly);
      } catch (e) {
        console.error("Failed to fetch study materials", e);
      } finally {
        setApiLoading(false);
      }
    };
    fetchApiMaterials();
  }, []);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-sm text-gray-500">Loading study material...</p>
      </div>
    );
  }

  return (
    <div>
      {!pdfUrl ? (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-12 text-center shadow-xl transition-all duration-500 hover:shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          <div className="absolute inset-[1px] rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 transition-all duration-500" />

          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#17395c] to-[#244d79] shadow-lg group-hover:scale-110 transition-transform duration-500">
            <svg className="h-10 w-10 text-[#f4df17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="relative mb-2 text-3xl font-black tracking-tight text-[#17395c]">
            Coming Soon
          </h2>

          <div className="relative mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] group-hover:w-24 transition-all duration-500" />

          <p className="relative mt-4 text-sm text-gray-500">
            Study material not available for your class yet.
          </p>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-12 text-center shadow-xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] opacity-10 -z-10" />

          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#17395c] to-[#244d79] shadow-lg">
            <svg className="h-10 w-10 text-[#f4df17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          <h2 className="relative mb-2 text-3xl font-black tracking-tight text-[#17395c]">
            {pdfLabel}
          </h2>

          <div className="relative mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

          <p className="relative mb-8 text-sm text-gray-500">
            Your study material is ready — click below to download.
          </p>


         <a href={pdfUrl}
          download
          className="relative inline-flex items-center gap-2 rounded-xl bg-[#17395c] px-8 py-3.5 text-sm font-bold text-[#f4df17] shadow-lg transition-all duration-300 hover:bg-[#244d79] hover:shadow-xl hover:scale-105"
          >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Study Material
        </a>
        </div>
  )
}

      {/* Section 2: Study materials from API */}
      <div className="mt-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-[#17395c] to-[#f4df17]" />
          <h3 className="text-2xl font-black tracking-tight text-[#17395c]">
            More Study Materials
          </h3>
        </div>

        {apiLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white p-10 shadow-sm">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : apiMaterials.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10">
            <p className="text-sm text-gray-500">No additional materials found.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apiMaterials.map((item: any) => {
              const docs: string[] = Object.keys(item)
                .filter((key) => /^document\d+$/.test(key) && item[key])
                .sort(
                  (a, b) =>
                    Number(a.replace("document", "")) - Number(b.replace("document", ""))
                )
                .map((key) => item[key]);

              return (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] opacity-70" />

                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#17395c] to-[#244d79]">
                      <svg
                        className="h-5 w-5 text-[#f4df17]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#17395c]">
                        {item.study_material_type ?? "Study Material"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {docs.length} document{docs.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {docs.map((docUrl: string, i: number) => {
                      return (

                    <a    key = { i }
                    href = { docUrl }
                      download
                      target = "_blank"
                      rel = "noopener noreferrer"
                      className = "flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs font-semibold text-[#17395c] transition-colors duration-200 hover:border-[#17395c]/20 hover:bg-white hover:shadow-sm"
                        >
                    <span>Document {i + 1}</span>
                    <svg
                      className="h-4 w-4 shrink-0 text-[#17395c] transition-transform duration-200 group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>
                  );
              })}
                </div>
          </div>
        );
      })}
      </div>
  )}
    </div>
      {/* <div className="mt-10">
        <h3 className="mb-4 text-xl font-bold text-[#17395c]">
          More Study Materials
        </h3>

        {apiLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : apiMaterials.length === 0 ? (
          <p className="text-sm text-gray-500">No additional materials found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {apiMaterials.map((item: any) => {
              const docs = Object.keys(item)
                .filter((key) => /^document\d+$/.test(key) && item[key])
                .sort((a, b) => Number(a.replace("document", "")) - Number(b.replace("document", "")))
                .map((key) => item[key]);

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <p className="mb-1 text-sm font-semibold text-[#17395c]">
                    {item.study_material_type ?? "Study Material"}
                  </p>

                  <div className="mt-2 flex flex-col gap-2">
                    {docs.map((docUrl: string, i: number) => (

               <a       key = { i }
                        href = { docUrl }
                        download
                        target = "_blank"
                        rel = "noopener noreferrer"
                        className = "flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 text-xs font-medium text-[#17395c] hover:bg-gray-50"
                      >
                      Document { i + 1}
                    <svg className="h-4 w-4 text-[#17395c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                    ))}
                </div>
                </div>
        );
            })}
      </div>
        )}
    </div> */}
    </div >
  );
}