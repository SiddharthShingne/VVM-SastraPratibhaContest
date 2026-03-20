
"use client";

import React, { useState } from "react";

export default function DownloadCertificate() {
  const [loading, setLoading] = useState<string | null>(null);

  // 🔥 REAL DOWNLOAD FUNCTION (API BASED)
  const downloadCertificate = async (type: string) => {
    try {
      setLoading(type);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://your-api.com/certificate/${type}`, // 👈 CHANGE THIS API
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6 space-y-10">

      {/* LEVEL 1 */}
      <div>
        <h2 className="text-center text-lg font-semibold mb-4">
          Level-I - Participation, Selection, Merit
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">

          <button
            onClick={() => downloadCertificate("level1-participation")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            {loading === "level1-participation"
              ? "Downloading..."
              : "Download Level 1 Participation Certificate"}
          </button>

          <button
            onClick={() => downloadCertificate("level2-selection")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            {loading === "level2-selection"
              ? "Downloading..."
              : "Download Selection for Level 2 Exam Certificate"}
          </button>

        </div>
      </div>

      {/* LEVEL 2 */}
      <div>
        <h2 className="text-center text-lg font-semibold mb-4">
          Level-II - Participation, Selection, Merit
        </h2>

        <div className="flex justify-center">

          <button
            onClick={() => downloadCertificate("level2-participation")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            {loading === "level2-participation"
              ? "Downloading..."
              : "Download Level 2 Participation Certificate"}
          </button>

        </div>
      </div>

    </div>
  );
}