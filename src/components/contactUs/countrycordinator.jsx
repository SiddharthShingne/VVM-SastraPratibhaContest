"use client";
import { Mail, User, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

// Data
const countries = [
    {
        name: "United Arab Emirates (UAE)",
        flag: "/gcc/uae.png",
        coords: [
            { name: "UAE Coordinator", phone: "+971-XXXX-XXXX", email: "uae1@spc.org" },
            { name: "UAE Coordinator", phone: "+971-XXXX-XXXX", email: "uae2@spc.org" },
        ],
    },
    {
        name: "Oman",
        flag: "/gcc/oman.png",
        coords: [
            { name: "Oman Coordinator", phone: "+968-XXXX-XXXX", email: "oman1@spc.org" },
            { name: "Oman Coordinator", phone: "+968-XXXX-XXXX", email: "oman2@spc.org" },
        ],
    },
    {
        name: "Kuwait",
        flag: "/gcc/kuwait.png",
        coords: [
            { name: "Kuwait Coordinator", phone: "+965-XXXX-XXXX", email: "kuwait1@spc.org" },
            { name: "Kuwait Coordinator", phone: "+965-XXXX-XXXX", email: "kuwait2@spc.org" },
        ],
    },
    {
        name: "Qatar",
        flag: "/gcc/qatar.png",
        coords: [
            { name: "Qatar Coordinator", phone: "+974-XXXX-XXXX", email: "qatar1@spc.org" },
            { name: "Qatar Coordinator", phone: "+974-XXXX-XXXX", email: "qatar2@spc.org" },
        ],
    },
    {
        name: "Saudi Arabia",
        flag: "/gcc/saudi-arab.png",
        coords: [
            { name: "Saudi Arabia Coordinator", phone: "+966-XXXX-XXXX", email: "saudi1@spc.org" },
            { name: "Saudi Arabia Coordinator", phone: "+966-XXXX-XXXX", email: "saudi2@spc.org" },
        ],
    },
    {
        name: "Bahrain",
        flag: "/gcc/bahrain.png",
        coords: [
            { name: "Bahrain Coordinator", phone: "+973-XXXX-XXXX", email: "bahrain1@spc.org" },
            { name: "Bahrain Coordinator", phone: "+973-XXXX-XXXX", email: "bahrain2@spc.org" },
        ],
    },
];


const Header = () => (
    <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#17395c] flex items-center justify-center">
            <PhoneCall size={22} className="text-[#f4df17]" />
        </div>
        <h2 className="text-4xl font-extrabold text-[#17395c] tracking-tight">
            Coordinators
        </h2>
    </div>
);

const CoordinatorCard = ({ coordinator }) => (
    <div className="group flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-white rounded-[28px] border border-gray-200 px-6 py-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] via-[#4c6f75] to-[#d0bf2e] shrink-0">
            <div className="w-full h-full rounded-full bg-[#f7f7f7] flex items-center justify-center">
                <User size={52} strokeWidth={1.8} className="text-gray-500" />
            </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center text-center sm:text-left min-w-0 flex-1">
            <h4 className="text-[1.7rem] leading-tight font-extrabold text-[#17395c] mb-1">
                {coordinator.name}
            </h4>

            <p className="text-[#b88d00] font-bold text-lg mb-4">
                Coordinator - SPC
            </p>

            <a
                href={`tel:${coordinator.phone}`}
                className="flex items-center justify-center sm:justify-start gap-3 text-[#17395c] font-bold text-[1.35rem] hover:text-[0f2742] transition mb-2"
            >
                <PhoneCall size={22} className="text-pink-500" />
                {coordinator.phone}
            </a>

            <a
                href={`mailto:${coordinator.email}`}
                className="flex items-center justify-center sm:justify-start gap-3 text-[#17395c] font-bold text-[1.3rem] hover:text-[0f2742] transition break-all"
            >
                <Mail size={22} className="text-purple-400" />
                {coordinator.email}
            </a>
        </div>
    </div>
);

const CountrySection = ({ country }) => (
    <div className="mb-8 last:mb-0">
        {/* Country Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <Image
                src={country.flag}
                alt={country.name}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#17395c]"
            />
            <h3 className="text-[2rem] font-extrabold text-[#17395c] tracking-tight">
                {country.name}
            </h3>
        </div>

        {/* Coordinators Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
            {country.coords.map((coord, index) => (
                <CoordinatorCard key={index} coordinator={coord} />
            ))}
        </div>
    </div>
);

// Main Component
export default function ContactsPage({ fullWidth = false }) {
    return (
        // <div>
           
        //     <div className="max-w-[1400px]  mx-auto px-4 sm:px-6  lg:px-8 py-10">
        //         <div className="rounded-[34px] bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 border border-gray-200 shadow-xl overflow-hidden">
        //             {/* Top accent bar */}
        //             <div className="h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

        //             <div className="p-5 sm:p-8 lg:p-10">
        //                 <Header />

        //                 {countries.map((country, index) => (
        //                     <CountrySection key={index} country={country} />
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div> 
        <div className={fullWidth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"}>
            <div className="rounded-[34px] border border-gray-200 shadow-xl overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30">
                <div className="h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />
                <div className="p-5 sm:p-8 lg:p-10">
                    <Header />
                    {countries.map((country, index) => (
                        <CountrySection key={index} country={country} />
                    ))}
                </div>
            </div>
        </div>
    );
}