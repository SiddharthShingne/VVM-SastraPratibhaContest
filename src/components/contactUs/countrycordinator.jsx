/* eslint-disable react-hooks/set-state-in-effect */
// "use client";
// import { Mail, User, PhoneCall } from "lucide-react";
// import React from "react";
// import Image from "next/image";

// // Data
// const countries = [
//     {
//         name: "United Arab Emirates (UAE)",
//         flag: "/gcc/uae.png",
//         coords: [
//             { name: "PRAVEEN NAIR", phone: "+971 508545100", email: "spc@sifuae.com" },
//             { name: "ASMITA BHAGDIKAR", phone: "+971 559859434", email: "sifuae@yahoo.com" },
//         ],
//     },
//     {
//         name: "Oman",
//         flag: "/gcc/oman.png",
//         coords: [
//             { name: "Shri Vinod Kumar T.M", phone: "+968 97479922", email: "tm.vinod1968@gmail.com" },
//         ],
//     },
//     {
//         name: "Kuwait",
//         flag: "/gcc/kuwait.png",
//         coords: [
//             { name: "Prabhat Palayil", phone: "+965 66657038 / 65571490", email: "vvmspc.sifkwt@gmail.com" },
//         ],
//     },
//     {
//         name: "Qatar",
//         flag: "/gcc/qatar.png",
//         coords: [
//             { name: "Qatar Coordinator", phone: "+974-XXXX-XXXX", email: "qatar1@spc.org" },
//             { name: "Qatar Coordinator", phone: "+974-XXXX-XXXX", email: "qatar2@spc.org" },
//         ],
//     },
//     {
//         name: "Saudi Arabia",
//         flag: "/gcc/saudi-arab.png",
//         coords: [
//             { name: "Ms. Athulya Chandran", phone: "+0553041594", email: "athulyac3@gmail.com" },
//             { name: "Mr. Aji Chandran", phone: "0544824350", email: "ajicaji@gmail.com" },
//         ],
//     },
//     {
//         name: "Bahrain",
//         flag: "/gcc/bahrain.png",
//         coords: [
//             { name: "Mukesh", phone: "+973-33370133", email: "info@sifbahrain.com" }
//         ],
//     },
// ];

// const Header = () => (
//     <div className="flex items-center gap-4 mb-10">
//         <div className="w-16 h-16 rounded-2xl bg-[#17395c] flex items-center justify-center shadow-lg">
//             <PhoneCall size={28} className="text-[#f4df17]" />
//         </div>
//         <div>
//             <h2 className="text-4xl font-extrabold text-[#17395c] tracking-tight leading-none">
//                 Coordinators
//             </h2>
//             <p className="text-sm text-gray-500 mt-1.5">Regional SPC contacts across GCC countries</p>
//         </div>
//     </div>
// );

// const InfoRow = ({ icon: Icon, label, value, href }) => (
//     <a
//         href={href}
//         className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 hover:bg-[#17395c]/5 transition"
//     >
//         <Icon size={18} className="text-[#17395c] shrink-0" />
//         <div className="min-w-0 text-left">
//             <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">{label}</p>
//             <p className="font-semibold text-[#17395c] text-sm break-all">{value}</p>
//         </div>
//     </a >
// );

// const CoordinatorCard = ({ coordinator }) => (
//     <div className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-7 bg-white rounded-3xl border border-slate-200 p-7 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(23,57,92,0.15)] hover:border-[#17395c]/25 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
//         {/* Decorative blobs */}
//         <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#17395c]/5 blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#f4df17]/10 blur-3xl pointer-events-none" />

//         {/* Accent stripe */}
//         <div className="absolute left-0 top-8 bottom-8 w-[5px] rounded-r-full bg-gradient-to-b from-[#17395c] via-[#3b82f6] to-[#f4df17] opacity-0 group-hover:opacity-100 transition duration-500" />

//         {/* Avatar */}
//         <div className="relative shrink-0">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#17395c] to-[#6d859d] p-[3px] shadow-md group-hover:rotate-6 group-hover:scale-105 transition duration-500">
//                 <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
//                     <User size={42} strokeWidth={1.6} className="text-slate-500" />
//                 </div>
//             </div>
//         </div>

//         {/* Content */}
//         <div className="flex flex-col justify-center text-center sm:text-left min-w-0 flex-1 relative">
//             <h4 className="text-2xl font-extrabold text-[#17395c] tracking-tight leading-tight mb-2">
//                 {coordinator.name}
//             </h4>

//             <span className="inline-flex items-center gap-2 self-center sm:self-start bg-gradient-to-r from-yellow-100 to-yellow-50 text-[#8a6500] font-bold uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full shadow-sm border border-yellow-200 mb-4">
//                 Coordinator • SPC
//             </span>

//             <div className="w-full h-px bg-slate-200 mb-4" />

//             <div className="space-y-3">
//                 <InfoRow icon={PhoneCall} label="Phone" value={coordinator.phone} href={`tel:${coordinator.phone}`} />
//                 <InfoRow icon={Mail} label="Email" value={coordinator.email} href={`mailto:${coordinator.email}`} />
//             </div>
//         </div>
//     </div>
// );

// const CountrySection = ({ country }) => (
//     <div className="mb-16 last:mb-0">
//         <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
//             <div className="flex items-center gap-4">
//                 <Image
//                     src={country.flag}
//                     alt={country.name}
//                     width={36}
//                     height={36}
//                     className="w-9 h-9 rounded-full object-cover border-2 border-[#17395c]/20"
//                 />
//                 <div>
//                     <h3 className="text-xl font-bold text-[#17395c] tracking-tight">
//                         {country.name}
//                     </h3>
//                     <p className="text-xs text-gray-400">Regional Team</p>
//                 </div>
//             </div>
//             <span className="bg-[#17395c] text-white text-xs font-semibold px-3 py-1 rounded-full">
//                 {country.coords.length} Members
//             </span>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-7">
//             {country.coords.map((coord, index) => (
//                 <CoordinatorCard key={index} coordinator={coord} />
//             ))}
//         </div>
//     </div>
// );

// // Main Component
// export default function ContactsPage({ fullWidth = false }) {
//     return (
//         <div className={fullWidth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"}>
//             <div className="relative rounded-[34px] border border-gray-200 shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden bg-white before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,#17395c10,transparent_40%)] before:pointer-events-none">
//                 <div className="h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />
//                 <div className="relative p-5 sm:p-8 lg:p-10">
//                     <Header />
//                     {countries.map((country, index) => (
//                         <CountrySection key={index} country={country} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";
import { Mail, User, PhoneCall, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

// Data
const countries = [
    {
        name: "United Arab Emirates (UAE)",
        flag: "/gcc/uae.png",
        coords: [
            { name: "PRAVEEN NAIR", phone: "+971 508545100", email: "spc@sifuae.com" },
            { name: "ASMITA BHAGDIKAR", phone: "+971 559859434", email: "sifuae@yahoo.com" },
        ],
    },
    {
        name: "Oman",
        flag: "/gcc/oman.png",
        coords: [
            { name: "Shri Vinod Kumar T.M", phone: "+968 97479922", email: "tm.vinod1968@gmail.com" },
        ],
    },
    {
        name: "Kuwait",
        flag: "/gcc/kuwait.png",
        coords: [
            { name: "Prabhat Palayil", phone: "+965 66657038 / 65571490", email: "vvmspc.sifkwt@gmail.com" },
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
            { name: "Ms. Athulya Chandran", phone: "+0553041594", email: "athulyac3@gmail.com" },
            { name: "Mr. Aji Chandran", phone: "0544824350", email: "ajicaji@gmail.com" },
        ],
    },
    {
        name: "Bahrain",
        flag: "/gcc/bahrain.png",
        coords: [
            { name: "Mukesh", phone: "+973-33370133", email: "info@sifbahrain.com" }
        ],
    },
];

const Header = () => (
    <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-[#17395c] flex items-center justify-center shadow-lg">
            <PhoneCall size={28} className="text-[#f4df17]" />
        </div>
        <div>
            <h2 className="text-4xl font-extrabold text-[#17395c] tracking-tight leading-none">
                Coordinators
            </h2>
            <p className="text-sm text-gray-500 mt-1.5">Regional SPC contacts across GCC countries</p>
        </div>
    </div>
);

const InfoRow = ({ icon: Icon, label, value, href }) => (

    <a href={href}
        className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 hover:bg-[#17395c]/5 transition"
    >
        <Icon size={18} className="text-[#17395c] shrink-0" />
        <div className="min-w-0 text-left">
            <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">{label}</p>
            <p className="font-semibold text-[#17395c] text-sm break-all">{value}</p>
        </div>
    </a >
);

const CoordinatorCard = ({ coordinator }) => (
    <div className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-7 bg-white rounded-3xl border border-slate-200 p-7 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(23,57,92,0.15)] hover:border-[#17395c]/25 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#17395c]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#f4df17]/10 blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-8 bottom-8 w-1.25 rounded-r-full bg-linear-to-b from-[#17395c] via-[#3b82f6] to-[#f4df17] opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#17395c] to-[#6d859d] p-0.75 shadow-md group-hover:rotate-6 group-hover:scale-105 transition duration-500">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                    <User size={42} strokeWidth={1.6} className="text-slate-500" />
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center text-center sm:text-left min-w-0 flex-1 relative">
            <h4 className="text-2xl font-extrabold text-[#17395c] tracking-tight leading-tight mb-2">
                {coordinator.name}
            </h4>

            <span className="inline-flex items-center gap-2 self-center sm:self-start bg-gradient-to-r from-yellow-100 to-yellow-50 text-[#8a6500] font-bold uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full shadow-sm border border-yellow-200 mb-4">
                Coordinator • SPC
            </span>

            <div className="w-full h-px bg-slate-200 mb-4" />

            <div className="space-y-3">
                <InfoRow icon={PhoneCall} label="Phone" value={coordinator.phone} href={`tel:${coordinator.phone}`} />
                <InfoRow icon={Mail} label="Email" value={coordinator.email} href={`mailto:${coordinator.email}`} />
            </div>
        </div>
    </div>
);

// Dropdown Selector
const CountryDropdown = ({ selected, onChange }) => {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    const buttonRef = useRef(null);
    const selectedCountry = countries.find((c) => c.name === selected);

    useEffect(() => {
        setMounted(true);
    }, []);

    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    };

    const handleToggle = () => {
        if (!open) updatePosition();
        setOpen(!open);
    };

    useEffect(() => {
        if (!open) return;
        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open]);

    return (
        <div className="relative mb-10">
            <button
                ref={buttonRef}
                type="button"
                onClick={handleToggle}
                className="w-full flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm hover:border-[#17395c]/30 transition"
            >
                <div className="flex items-center gap-3">
                    {/* {selectedCountry && (
                        <Image
                            src={selectedCountry.flag}
                            alt={selectedCountry.name}
                            width={28}
                            height={28}
                            className="w-7 h-7 rounded-full object-cover border border-[#17395c]/20"
                        />
                    )} */}
                    <span className="font-semibold text-[#17395c]">
                        {selectedCountry ? selectedCountry.name : "Select a country"}
                    </span>
                </div>
                <ChevronDown
                    size={20}
                    className={`text-[#17395c] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && mounted && createPortal(
                <>
                    {/* backdrop to close on outside click */}
                    <div
                        className="fixed inset-0 z-9998"
                        onClick={() => setOpen(false)}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: coords.top,
                            left: coords.left,
                            width: coords.width,
                        }}
                        className="z-[9999] bg-white border border-slate-200 rounded-2xl shadow-xl max-h-72 overflow-y-auto"
                    >
                        {countries.map((country) => (
                            <button
                                key={country.name}
                                type="button"
                                onClick={() => {
                                    onChange(country.name);
                                    setOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-slate-50 transition ${selected === country.name ? "bg-[#17395c]/5" : ""
                                    }`}
                            >
                                <Image
                                    // src={country.flag}
                                    src="/sif-logo.png"
                                    alt={country.name}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 rounded-full object-cover border border-[#17395c]/20"
                                />
                                <span className="font-medium text-[#17395c] text-sm">{country.name}</span>
                                <span className="ml-auto text-xs text-gray-400">{country.coords.length} Members</span>
                            </button>
                        ))}
                    </div>
                </>,
                document.body
            )}
        </div>
    );
};

const CountrySection = ({ country }) => (
    <div>
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-4">
                {/* <Image
                    src={country.flag}
                    alt={country.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#17395c]/20"
                /> */}
                <div>
                    <h3 className="text-xl font-bold text-[#17395c] tracking-tight">
                        {country.name}
                    </h3>
                    <p className="text-xs text-gray-400">Regional Team</p>
                </div>
            </div>
            <span className="bg-[#17395c] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {country.coords.length} Members
            </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-7">
            {country.coords.map((coord, index) => (
                <CoordinatorCard key={index} coordinator={coord} />
            ))}
        </div>
    </div>
);

// Main Component
export default function ContactsPage({ fullWidth = false }) {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const activeCountry = countries.find((c) => c.name === selectedCountry);
    return (
        <div className={fullWidth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"}>
            <div className="relative rounded-[34px] border border-gray-200 shadow-[0_20px_80px_rgba(0,0,0,0.08)] bg-white before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,#17395c10,transparent_40%)] before:pointer-events-none before:rounded-[34px]">
            <div className="h-1  from-[#17395c] via-[#f4df17] to-[#17395c]" />
                <div className="relative p-bg-linear-to-r5 sm:p-8 lg:p-10">
                    <Header />
                    <CountryDropdown selected={selectedCountry} onChange={setSelectedCountry} />
                    {activeCountry && <CountrySection country={activeCountry} />}
                </div>
            </div>
        </div>
    );
}