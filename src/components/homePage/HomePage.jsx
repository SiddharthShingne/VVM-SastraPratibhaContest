"use client";
import MidCard from "@/components/homePage/MidCard";
import Gallery from "@/components/homePage/Gallery";
import VVMExamInfo from "@/components/homePage/VVMExamInfo";
import Contact from "@/components/homePage/Contact";
import VideoGallery from "@/components/homePage/video";
import { useState } from "react";
export default function HomePage() {
    const [showNotice, setShowNotice] = useState(true);
    return (
        <>
            {/* ---------------- SIF NOTICE DIALOG ---------------- */}
            {showNotice && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 text-center">
                        <div className="text-5xl mb-4">⚠️</div>

                        <h3 className="text-xl font-bold text-[#17395c] mb-3">
                            Important Notice
                        </h3>

                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            This site is accessible only for <strong>SIF Students</strong>.
                        </p>

                        <button
                            onClick={() => setShowNotice(false)}
                            className="px-6 py-2.5 bg-[#17395c] text-white rounded-lg text-sm font-semibold hover:bg-[#0f2742] transition"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            <MidCard />
            <Gallery />
            <VideoGallery />
            <VVMExamInfo />
            <Contact />
        </>
    );
}