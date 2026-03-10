
"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        href: "/about",
        subLinks: [
            { label: "What is VVM", href: "/about/whatisvvm" },
            { label: "Śāstra Pratibhā Contest", href: "/about/sastrapratibhacontest" },
            { label: "Why VVM", href: "/about/whyvvm" },
            { label: "About Organizers", href: "/about/aboutorganizers" },
            { label: "Objectives Of VVM", href: "/about/objectivesofvvm" },
            { label: "Structure Of VVM", href: "/about/structureofvvm" },
        ],
    },
    {
        label: "Our Teams",
        href: "/ourTeams",
        subLinks: [
            { label: "Mentors and Patrons", href: "/ourTeams/mentorandpatrons" },
            { label: "Advisors", href: "/ourTeams/advisors" },
            { label: "Core Team", href: "/ourTeams/coreteam" },
            { label: "Registration and Outreach Team", href: "/ourTeams/registrationandoutreachteam" },
            { label: "Student Mentorship Team", href: "/ourTeams/studentmentorshipteam" },
            { label: "Zonal Coordinators", href: "/ourTeams/zonalcoordinators" },
        ],
    },
    {
        label: "Registration",
        href: "/registration",
        subLinks: [
            { label: "Individual Student Registration", href: "/registration/individualstudentregistration" },
            { label: "School Registration", href: "/registration/schoolregistration" },
            { label: "Registration Process", href: "/registration/registrationprocess" },
            { label: "Fee Structure", href: "/registration/feestructure" },
        ],
    },
    {
        label: "Exam Details",
        href: "/examdetails",
        subLinks: [
            { label: "Syllabus", href: "/examdetails/syllabus" },
            { label: "School Level Exam 1", href: "/examdetails/schoolLevelExam1" },
            { label: "School Level Exam 2", href: "/examdetails/schoolLevelExam2" },
            { label: "State Level Camp", href: "/examdetails/statelevelcamp" },
            { label: "National Camp", href: "/examdetails/nationalcamp" },
            { label: "Student Awards", href: "/examdetails/studentawards" },
            { label: "Exam Requirements", href: "/examdetails/examrequirements" },
            { label: "Important Dates", href: "/examdetails/importantdates" },
            { label: "Unfair Means", href: "/examdetails/unfairmeans" },
            { label: "Disputes", href: "/examdetails/disputes" },
        ],
    },
    {
        label: "Brochure",
        href: "/brochure",
        subLinks: [
            { label: "First", href: "/brochure/viewFlipbook" },
            { label: "Download Brochure PDF", href: "/pdf/vvm-25-26-session-brochure.pdf", download: true },
        ],
    },
    { label: "Endorsement Circular", href: "/endorsementCircular" },
    {
        label: "Gallery",
        href: "/gallery",
        subLinks: [
            { label: "Preregistration Campaign", href: "/gallery/preregistrationcampaign" },
            { label: "VVM In News", href: "/gallery/vvmInNews" },
            { label: "State Camp", href: "/gallery/stateCamp" },
            { label: "National Camp", href: "/gallery/NationalCamp" },
            { label: "SRIJAN Internship", href: "/gallery/srijanInternship" },
        ],
    },
    {
        label: "Downloads",
        href: "/downloads",
        subLinks: [
            { label: "Promotional Video", href: "/downloads/promotionalVideo" },
            { label: "Posters/Advertisements", href: "/downloads/posters&Advertisments" },
        ],
    },
    {
        label: "Archive",
        href: "/archive",
        subLinks: [
            { label: "Archives 2022", href: "/archives/archives2022" },
            { label: "Archives 2023", href: "/archives/archives2023" },
            { label: "Archives 2024", href: "/archives/archives2024" },
        ],
    },
    {
        label: "Results",
        href: "/results",
        subLinks: [
            { label: "VVM 2024-25 NLC -  ZONAL RESULT - ME COUNTRIES", href: "/pdf/results/VVM 2024-25 NLC - ZONAL RESULT - ME COUNTRIES.pdf", download: true },
            { label: "VVM 2024-25 NLC - HIMALAYAN RESULT", href: "/pdf/results/VVM 2024-25 NLC - HIMALAYAN RESULT.pdf", download: true },
            { label: "VVM 2024-25 NLC - ZONAL RESULT", href: "/pdf/results/VVM 2024-25 NLC - ZONAL RESULT.pdf" },
        ],
    },
    {
        label: "Contact Us",
        href: "/contactUs",
        subLinks: [
            { label: "First", href: "/contactUs/first" },
            { label: "Office Contacts", href: "/contactUs/officeContacts" },
        ],
    },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const pathname = usePathname();
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleMouseEnter = (label: string) => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        setDropdownOpen(label);
    };

    const handleMouseLeave = () => {
        hideTimeoutRef.current = setTimeout(() => {
            setDropdownOpen(null);
        }, 500);
    };

    return (
        <nav className="bg-white px-5 py-1 shadow-sm sticky top-0 z-50 font-sans">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap">

                {/* LOGO */}
                <div className="flex items-center gap-2 shrink-0">
                    <Image src="/nav-logo.png" alt="Logo" width={160} height={45} />
                </div>

                {/* MOBILE MENU BUTTON */}
                <div className="block lg:hidden">
                    <button
                        className="text-2xl focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* NAV ITEMS */}
                <ul
                    className={`w-full lg:w-auto lg:flex lg:items-center transition-all duration-300 ${menuOpen ? "block mt-3" : "hidden lg:flex"
                        }`}
                >
                    {navItems.map(({ label, href, subLinks }) => {
                        const isActive =
                            pathname === href ||
                            (subLinks && subLinks.some((sub) => pathname === sub.href));

                        const hasDropdown = !!subLinks;

                        return (
                            <li
                                key={label}
                                className="relative group px-1.5 py-1 text-[11px] font-semibold text-[#111d35] whitespace-nowrap"
                                onMouseEnter={() => handleMouseEnter(label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {hasDropdown ? (
                                    <span
                                        className={`cursor-pointer border-b ${isActive
                                                ? "border-blue-700 text-blue-700"
                                                : "border-transparent hover:border-blue-600"
                                            }`}
                                    >
                                        {label}
                                    </span>
                                ) : (
                                    <Link
                                        href={href}
                                        className={`border-b ${isActive
                                                ? "border-blue-700 text-blue-700"
                                                : "border-transparent hover:border-blue-600"
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                )}

                                {/* DROPDOWN */}
                                {hasDropdown && (
                                    <ul
                                        className={`absolute left-0 z-40 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-md transition-all duration-200 ${dropdownOpen === label ? "block" : "hidden"
                                            }`}
                                    >
                                        {subLinks.map((sublink, i) => (
                                            <li key={i}>
                                                <Link
                                                    href={sublink.href}
                                                    className={`block px-3 py-1.5 text-[10px] hover:bg-gray-100 ${pathname === sublink.href
                                                            ? "text-blue-700 font-medium"
                                                            : "text-gray-700"
                                                        }`}
                                                    {...(sublink.download
                                                        ? { download: true, target: "_blank" }
                                                        : {})}
                                                >
                                                    {sublink.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;