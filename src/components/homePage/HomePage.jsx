"use client";
import MidCard from "@/components/homePage/MidCard";
import Gallery from "@/components/homePage/Gallery";
import VVMExamInfo from "@/components/homePage/VVMExamInfo";
import Contact from "@/components/homePage/Contact";
import VideoGallery from "@/components/homePage/video";
import { useState, useEffect } from "react";

    function shouldShowNotice() {
        if (typeof window === "undefined") return false; // SSR safe
        const lastShown = localStorage.getItem("sif_notice_time");
        const THIRTY_MINUTES = 60 * 60 * 1000;
        return !lastShown || Date.now() - Number(lastShown) > THIRTY_MINUTES;
    }

    export default function HomePage() {
        const [showNotice, setShowNotice] = useState(shouldShowNotice);
        //                                            ^ lazy initializer, runs once on mount

        const handleClose = () => {
            localStorage.setItem("sif_notice_time", Date.now().toString());
            setShowNotice(false);
        };
    return (
        <>
            {showNotice && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 text-center">
                        <div className="text-5xl mb-4">⚠️</div>
                        <h3 className="text-xl font-bold text-[#17395c] mb-3">
                            Important Notice
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            <strong>
                                This site is accessible exclusively for GCC
                                students wishing to participate in the
                                Śāstra Pratibhā Contest.
                            </strong>
                        </p>
                        <button
                            onClick={handleClose}
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