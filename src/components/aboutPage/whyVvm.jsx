"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
const WhyVVM = () => {
    const contactItems = [
        {
            icon: <Mail className="w-10 h-10 text-[#2955c2]" />,
            title: "E-MAIL ID",
            content: ["office@vvm.org.in"],
        },
        {
            icon: <Phone className="w-10 h-10 text-[#2955c2]" />,
            title: "LANDLINE NO",
            content: ["011-49032436"],
        },
        {
            icon: <MessageCircle className="w-10 h-10 text-[#2955c2]" />,
            title: "WHATSAPP",
            content: ["9899615277", "9266034649"],
        },
        {
            icon: <MapPin className="w-10 h-10 text-[#2955c2]" />,
            title: "OUR LOCATION",
            content: [
                "VVM Secretariat,",
                "Vijnana Bharati (VIBHA),",
                "D-12, South Extension-I,",
                "New Delhi - 110049",
            ],
        },
    ];
    return (
        <div>
            {/* About Heading */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-26 text-center">
                <h1 className="text-6xl md:text-6xl font-extrabold text-[#111d35] mb-4">
                    WHY VVM?
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
            {/* Opportunities Section */}
            <div className="bg-white mt-10 pb-15 px-4 sm:px-6 lg:px-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white shadow rounded-lg p-5 sm:p-7 font-[Euclid Circular,sans-serif]">
                        <div className="text-center">
                            <div className="text-left px-4 sm:px-8 pt-4 pb-2">
                                <h3 className="text-xl font-semibold text-[#111d35] mb-4">
                                    VVM offers unique opportunities for participants, including:
                                </h3>
                                <ul className="list-disc pl-5 text-[20px] leading-6.75 font-normal text-[#6B7385] space-y-2">
                                    <li>Experiential learning and hands-on activities</li>
                                    <li>
                                        Know the rich heritage of India’s scientific contributions
                                    </li>
                                    <li>
                                        Fostering national pride through the Indian Knowledge System
                                    </li>
                                    <li>Peer evaluation and review</li>
                                    <li>Comprehensive 360-degree assessment</li>
                                    <li>
                                        Meet brilliant peers from across the nation and learn from
                                        them
                                    </li>
                                    <li>Mentorship from renowned scientists and academicians</li>
                                    <li>
                                        Visits to national laboratories (ISRO, CSIR, DRDO, IITs,
                                        IISERs, NITs, etc.)
                                    </li>
                                    <li>
                                        Personality development and leadership skills in science
                                    </li>
                                    <li>Holistic development of the child</li>
                                    <li>
                                        Identification of personal strengths for career development
                                    </li>
                                    <li>Developing willingness to serve society</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact Information Section */}
            <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-6 text-center flex flex-col items-center h-full min-h-70 transition-all hover:shadow-lg"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h4 className="text-lg font-bold text-[#111d35] uppercase mb-2 tracking-wide">
                                {item.title}
                            </h4>
                            <div className="text-[#6B7385] text-[16px] leading-6 font-semibold space-y-1">
                                {item.content.map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyVVM;

