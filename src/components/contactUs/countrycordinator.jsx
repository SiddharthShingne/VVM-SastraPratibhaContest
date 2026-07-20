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
            { name: "PRAVEEN NAIR", phone: "+971 508545100", email: "spc@sifuae.com" },
            { name: "ASMITA BHAGDIKAR", phone: "+971 559859434", email: "sifuae@yahoo.com" },
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
            { name: "Bahrain Coordinator", phone: "+973-XXXX-XXXX", email: "bahrain1@spc.org" },
            { name: "Bahrain Coordinator", phone: "+973-XXXX-XXXX", email: "bahrain2@spc.org" },
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
    <a
        href={href}
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
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#17395c]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#f4df17]/10 blur-3xl pointer-events-none" />

        {/* Accent stripe */}
        <div className="absolute left-0 top-8 bottom-8 w-[5px] rounded-r-full bg-gradient-to-b from-[#17395c] via-[#3b82f6] to-[#f4df17] opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* Avatar */}
        <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#17395c] to-[#6d859d] p-[3px] shadow-md group-hover:rotate-6 group-hover:scale-105 transition duration-500">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                    <User size={42} strokeWidth={1.6} className="text-slate-500" />
                </div>
            </div>
        </div>

        {/* Content */}
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

const CountrySection = ({ country }) => (
    <div className="mb-16 last:mb-0">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-4">
                <Image
                    src={country.flag}
                    alt={country.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#17395c]/20"
                />
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
    return (
        <div className={fullWidth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"}>
            <div className="relative rounded-[34px] border border-gray-200 shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden bg-white before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,#17395c10,transparent_40%)] before:pointer-events-none">
                <div className="h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />
                <div className="relative p-5 sm:p-8 lg:p-10">
                    <Header />
                    {countries.map((country, index) => (
                        <CountrySection key={index} country={country} />
                    ))}
                </div>
            </div>
        </div>
    );
}