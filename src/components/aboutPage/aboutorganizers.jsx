"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
// Organizer reusable section
const OrganizerSection = ({ logo, name, title, description, qr }) => (
    <div className="bg-gray-50 mt-14 pb-15 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
            <div className="bg-white shadow rounded-lg p-5 sm:p-7 font-sans">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Logo + Text */}
                    <div className="flex items-start gap-5 max-w-3xl">
                        <Image
                            src={logo}
                            alt={`${title} Logo`}
                            width={80}
                            height={80}
                            className="rounded-full object-contain"
                        />
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#111d35] mb-2">
                                {title}
                            </h2>
                            <p className="text-gray-800 text-sm sm:text-base leading-relaxed text-justify">
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
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
const AboutOrganizers = () => {
    return (
        <div>
            {/* Heading */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-26 text-center">
                <h1 className="text-6xl md:text-6xl font-extrabold text-[#111d35] mb-4">
                    About Organizers
                </h1>
                <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>About</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">About VVM</span>
                </div>
            </div>
            {/* Sections */}
            <OrganizerSection
                logo="/scan/vibha.png"
                qr="/scan/vibha-qr.png"
                title="VIJNANA BHARATI"
                name="VIJNANA BHARATI (VIBHA)"
                description="is a national movement for the propagation and popularization of Science & Technology among students and masses. VIBHA promotes scientific contributions made by India in ancient times as well as now. Now we are the largest scientific organization having the longest chain of state units and networking institutions across the country."
            />
            <OrganizerSection
                logo="/scan/logo-ncert.jpg"
                qr="/scan/ncert-scanner.png"
                title="NCERT"
                name="National Council of Educational Research & Training (NCERT)"
                description="is an organisation set up by the Government of India in the year 1961 to assist and advise the Central and State governments on academic matters related to school education. The major objectives of NCERT and its constituent units are to: undertake, promote and coordinate research in areas related to school education; prepare and publish model textbooks, supplementary material, newsletters, journals, develop educational kits, and multimedia digital materials, etc."
            />
            <OrganizerSection
                logo="/scan/ncsm-logo.png"
                qr="/scan/ncsm.png"
                title="National Council of Science Museums"
                name="National Council of Science Museums (NCSM)"
                description="an autonomous organisation under the Ministry of Culture, Government of India was formed on April 4, 1978. Today, it administers 26 Science Centres/Museums across India. The major objective of the NCSM is to disseminate the growth of science and technology among masses, along with collecting, restoring and preserving important historical objects that represent landmarks in the development of science, technology and industry."
            />
        </div>
    );
};
export default AboutOrganizers;
