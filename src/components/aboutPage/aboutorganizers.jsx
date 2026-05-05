/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Organizer reusable section
const OrganizerSection = ({ logo, name, title, description, qr }) => (
    <div className="page-list  mt-14 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">


            {/* VVM CARD */}
            <div className="
                relative rounded-3xl overflow-hidden
                bg-white/70 backdrop-blur-xl border border-white/60
                shadow-[0_20px_45px_rgba(23,57,92,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]
                transition-all duration-300
                hover:-translate-y-1.5 hover:shadow-[0_25px_55px_rgba(23,57,92,0.18)]
            ">

                {/* Top Gradient Border */}
                <div className="absolute top-0 left-0 w-full h-1.25
                    bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

                {/* Inner Content */}
                <div className="p-7">

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                        {/* Logo + Text */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 max-w-3xl text-center sm:text-left">

                            <Image
                                src={logo}
                                alt={`${title} Logo`}
                                width={80}
                                height={80}
                                className="rounded-full object-contain transition-transform duration-300 hover:scale-105"
                            />

                            <div>
                                <h2 className="text-[30px] font-extrabold text-[#17395c] mb-2">
                                    {title}
                                </h2>

                                <p className="text-[16px] leading-[1.8] text-[#4f6480]">
                                    <strong>{name}</strong> {description}
                                </p>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="shrink-0">
                            <Image
                                src={qr}
                                alt={`${title} QR Code`}
                                width={100}
                                height={100}
                                className="object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
);

const AboutOrganizers = () => {
    return (
        <div className="bg-gray-50">

            {/* ================= Breadcrumb Header ================= */}
            <div className="bg-[#162a4a] py-12.5">
                <div className="max-w-6xl mx-auto px-4 text-white">
                    <h1 className="text-[27px] font-medium mb-1">
                       About Organizers
                    </h1>

                    <p className="text-[12px] opacity-90">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>{" "}
                        {" > "} About {" > "} About Organizers
                    </p>
                </div>
            </div>

            {/* Sections */}
            <OrganizerSection
                logo="/scan/vibha.png"
                qr="/scan/vibha-qr.png"
                title="VIJNANA BHARATI"
                name="VIJNANA BHARATI (VIBHA)"
                description="is a national movement for the propagation and popularization of Science & Technology among students and masses. VIBHA promotes scientific contributions made by India in ancient times as well as now."
            />

            <OrganizerSection
                logo="/scan/logo-ncert.jpg"
                qr="/scan/ncert-scanner.png"
                title="NCERT"
                name="National Council of Educational Research & Training (NCERT)"
                description="is an organisation set up by the Government of India in 1961 to assist and advise governments on academic matters related to school education."
            />

            <OrganizerSection
                logo="/scan/ncsm-logo.png"
                qr="/scan/ncsm.png"
                title="NCSM"
                name="National Council of Science Museums (NCSM)"
                description="an autonomous organisation under the Ministry of Culture, formed in 1978, managing science centres and promoting science awareness across India."
            />

        </div>
    );
};

export default AboutOrganizers;
