
"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SubLink = {
  label: string;
  href: string;
  download?: boolean;
};

type NavItem = {
  label: string;
  href: string;
  subLinks?: SubLink[];
};


const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        href: "/about",
        subLinks: [
            { label: "What is VVM", href: "/about/what-is-vvm" },
            { label: "Śāstra Pratibhā Contest", href: "/about/sastra-pratibha-contest" },
            { label: "Why VVM", href: "/about/why-vvm" },
            { label: "About Organizers", href: "/about/about-organizers" },
            { label: "Objectives Of VVM", href: "/about/objectives-of-vvm" },
            { label: "Structure Of VVM", href: "/about/structure-of-vvm" },
        ],
    },
    // {
    //     label: "Our Teams",
    //     href: "/ourTeams",
    //     subLinks: [
    //         { label: "Mentors and Patrons", href: "/ourTeams/mentorandpatrons" },
    //         { label: "Advisors", href: "/ourTeams/advisors" },
    //         { label: "Core Team", href: "/ourTeams/coreteam" },
    //         { label: "Registration and Outreach Team", href: "/ourTeams/registrationandoutreachteam" },
    //         { label: "Student Mentorship Team", href: "/ourTeams/studentmentorshipteam" },
    //         { label: "Zonal Coordinators", href: "/ourTeams/zonalcoordinators" },
    //     ],
    // },
    {
        label: "Registration",
        href: "/registration",
        subLinks: [
            { label: "Individual Student Registration", href: "/registration/individual-student-registration" },
            { label: "Register", href: "/registration/register" },
            { label: "Registration Process", href: "/registration/registration-process" },
            { label: "Fee Structure", href: "/registration/fee-structure" },
        ],
    },
    {
        label: "Exam Details",
        href: "/exam-details",
        subLinks: [
            // { label: "Syllabus", href: "/exam-details/syllabus" },
            // { label: "School Level Exam 1", href: "/exam-details/school-level-exam1" },
            //  { label: "State Level Camp", href: "/exam-details/state-level-camp" },
            
            { label: "National Camp", href: "/exam-details/national-camp" },
            { label: "Student Awards", href: "/exam-details/student-awards" },
            { label: "Exam Requirements", href: "/exam-details/exam-requirements" },
            // { label: "Important Dates", href: "/exam-details/important-dates" },
            { label: "Unfair Means", href: "/exam-details/unfair-means" },
            { label: "Disputes", href: "/exam-details/disputes" },
        ],
    },
    // {
    //     label: "Brochure",
    //     href: "/brochure",
    //     subLinks: [
    //         { label: "First", href: "/brochure/viewFlipbook" },
    //         { label: "Download Brochure PDF", href: "/pdf/vvm-25-26-session-brochure.pdf", download: true },
    //     ],
    // },
    // { label: "Endorsement Circular", href: "/endorsementCircular" }
    // ,
    // {
    //     label: "Gallery",
    //     href: "/gallery",
    //     subLinks: [
    //         { label: "Preregistration Campaign", href: "/gallery/preregistrationcampaign" },
    //         { label: "VVM In News", href: "/gallery/vvmInNews" },
    //         { label: "State Camp", href: "/gallery/stateCamp" },
    //         { label: "National Camp", href: "/gallery/NationalCamp" },
    //         { label: "SRIJAN Internship", href: "/gallery/srijanInternship" },
    //     ],
    // }


    {
        label: "Downloads",
        href: "/downloads",
        subLinks: [
            { label: "Promotional Video", href: "/downloads/promotional-video" },
            { label: "Posters/Advertisements", href: "/downloads/poster-advertisement" },
        ],
    },
    {
        label: "Archive",
        href: "/Archives",
        subLinks: [
            { label: "Archives 2025", href: "/Archives/vvm-2025" },
            { label: "Archives 2024", href: "/Archives/vvm-2024" },
            // { label: "Archives 2023", href: "/Archives/vvm-2023" },
        ],
    },
    // {
    //     label: "Results",
    //     href: "/results",
    //     subLinks: [
    //         { label: "VVM 2024-25 NLC -  ZONAL RESULT - ME COUNTRIES", href: "/pdf/results/VVM 2024-25 NLC - ZONAL RESULT - ME COUNTRIES.pdf", download: true },
    //         { label: "VVM 2024-25 NLC - HIMALAYAN RESULT", href: "/pdf/results/VVM 2024-25 NLC - HIMALAYAN RESULT.pdf", download: true },
    //         { label: "VVM 2024-25 NLC - ZONAL RESULT", href: "/pdf/results/VVM 2024-25 NLC - ZONAL RESULT.pdf" },
    //     ],
    // },
    {
        label: "Contact Us",
        href: "/contactUs",
        subLinks: [
            // { label: "Country Coordinators", href: "/contactUs/countrycordinator" },
            { label: "Office Contacts", href: "/contact-us/office-contact" },
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
        <nav className="bg-white px-6 py-2 shadow-sm sticky top-0 z-50 font-sans">
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">

                {/* LOGO */}
                <div className="flex items-center gap-3 shrink-0 px-1 ">
                    <Image src="/nav-logo.png" alt="Logo" width={200} height={55} />
                    <Image src="/gcc/oman.png" alt="oman" width={55} height={55} />
<Image src="/gcc/qatar.png" alt="qatar" width={55} height={55} />
<Image src="/gcc/kuwait.png" alt="kuwait" width={55} height={55} />
<Image src="/gcc/saudi-arab.png" alt="saudi-arabia" width={55} height={55} />
                    <Image src="/gcc/uae.png" alt="uae" width={55} height={55} />
                    <Image src="/gcc/bahrain.png" alt="bahrain" width={55} height={55} />
 </div>
                            

                {/* MOBILE MENU BUTTON */}
                <div className="block lg:hidden">
                    <button
                        className="text-[28px] focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* NAV ITEMS */}
                <ul
                    className={`w-full lg:w-auto lg:flex lg:items-center transition-all duration-300 ${menuOpen ? "block mt-4" : "hidden lg:flex"
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
                                className="relative group px-2 py-1.5 text-[14px] font-semibold text-[#111d35] whitespace-nowrap"
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
                                        className={`absolute left-0 z-40 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-md transition-all duration-200 ${dropdownOpen === label ? "block" : "hidden"
                                            }`}
                                    >
                                        {subLinks.map((sublink, i) => (
                                            <li key={i}>
                                                <Link
                                                    href={sublink.href}
                                                    className={`block px-4 py-2 text-[13px] hover:bg-gray-100 ${pathname === sublink.href
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