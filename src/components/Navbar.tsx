
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
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
            { label: "Why Śāstra Pratibhā Contest", href: "/about/why-vvm" },
            { label: "About Organizers", href: "/about/about-organizers" },
            { label: "Objectives Of Śāstra Pratibhā Contest", href: "/about/objectives-of-vvm" },
            { label: "Structure Of Śāstra Pratibhā Contest", href: "/about/structure-of-vvm" },
        ],
    },
    {
        label: "Registration",
        href: "/registration",
        subLinks: [
            { label: "Individual Student Registration", href: "/registration/individual-student-registration" },
            { label: "Registration Process", href: "/registration/registration-process" },
            { label: "Fee Structure", href: "/registration/fee-structure" },
        ],
    },
    {
        label: "Exam Details",
        href: "/exam-details",
        subLinks: [
            { label: "National Camp", href: "/exam-details/national-camp" },
            { label: "Student Awards", href: "/exam-details/student-awards" },
            { label: "Exam Requirements", href: "/exam-details/exam-requirements" },
            // { label: "Important Dates", href: "/exam-details/important-dates" },
            { label: "Unfair Means", href: "/exam-details/unfair-means" },
            { label: "Disputes", href: "/exam-details/disputes" },
        ],
    },
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
    {
        label: "Contact Us",
        href: "/contactUs",
        subLinks: [
            { label: "Office Contacts", href: "/contact-us/office-contact" },
        ],
    },
];

const gccFlags = [
    { src: "/gcc/oman.png", alt: "Oman" },
    { src: "/gcc/qatar.png", alt: "Qatar" },
    { src: "/gcc/kuwait.png", alt: "Kuwait" },
    { src: "/gcc/saudi-arab.png", alt: "Saudi Arabia" },
    { src: "/gcc/uae.png", alt: "UAE" },
    { src: "/gcc/bahrain.png", alt: "Bahrain" },
];

const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navRef = useRef<HTMLElement>(null);

    // Stable closeMenu with useCallback — used in event handlers, not called inside effect body
    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        setDropdownOpen(null);
        setExpandedMobile(null);
    }, []);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
        setExpandedMobile(null);
    };

    const handleMouseEnter = (label: string) => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        setDropdownOpen(label);
    };

    const handleMouseLeave = () => {
        hideTimeoutRef.current = setTimeout(() => setDropdownOpen(null), 150);
    };

    const toggleMobileDropdown = (label: string) => {
        setExpandedMobile((prev) => (prev === label ? null : label));
    };

    // Close on outside click — no setState called directly in effect body
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const drawer = document.getElementById("mobile-menu");
            const target = e.target as Node;
            const outsideNav = navRef.current && !navRef.current.contains(target);
            const outsideDrawer = drawer && !drawer.contains(target);
            if (outsideNav && outsideDrawer) {
                closeMenu();
            } else if (outsideNav) {
                setDropdownOpen(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [closeMenu]);

    // Handle browser back/forward navigation
    useEffect(() => {
        window.addEventListener("popstate", closeMenu);
        return () => window.removeEventListener("popstate", closeMenu);
    }, [closeMenu]);

    // Body scroll lock — only side effect on DOM, no setState cascade
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            <nav
                ref={navRef}
                id="global-navbar"
                className="bg-white shadow-sm sticky top-0 z-50 font-sans"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* sm:h-18 (canonical) replaces sm:h-[72px] */}
                    <div className="flex items-center justify-between h-16 sm:h-18">

                        {/* ── LOGO + FLAGS ── */}
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 lg:flex-none">
                            <Link href="/" className="shrink-0" onClick={closeMenu}>
                                <Image
                                    src="/nav-logo.png"
                                    alt="Logo"
                                    width={200}
                                    height={55}
                                    className="h-auto object-contain"  // sirf h-auto, width CSS se mat do
                                    style={{ width: "clamp(120px, 20vw, 200px)" }}  // width style mein do
                                    priority
                                />
                            </Link>
                            {/* Flags — visible sm and above */}
                            <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                                {gccFlags.map(({ src, alt }) => (
                                    <Image
                                        key={alt}
                                        src={src}
                                        alt={alt}
                                        width={36}
                                        height={36}
                                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full object-cover border border-gray-100 shadow-sm"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* ── DESKTOP NAV ── */}
                        <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                            {navItems.map(({ label, href, subLinks }) => {
                                const hasDropdown = !!subLinks;
                                const isActive =
                                    pathname === href ||
                                    (subLinks && subLinks.some((s) => pathname === s.href));

                                return (
                                    <li
                                        key={label}
                                        className="relative"
                                        onMouseEnter={() => handleMouseEnter(label)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {hasDropdown ? (
                                            <button
                                                aria-haspopup="true"
                                                aria-expanded={dropdownOpen === label}
                                                className={`flex items-center gap-1 px-3 py-2 text-[13.5px] xl:text-[14px] font-semibold rounded-md transition-colors whitespace-nowrap ${isActive
                                                        ? "text-blue-700 bg-blue-50"
                                                        : "text-[#111d35] hover:text-blue-600 hover:bg-blue-50"
                                                    }`}
                                            >
                                                {label}
                                                <ChevronIcon
                                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen === label ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                        ) : (
                                            <Link
                                                href={href}
                                                className={`flex items-center px-3 py-2 text-[13.5px] xl:text-[14px] font-semibold rounded-md transition-colors whitespace-nowrap ${isActive
                                                        ? "text-blue-700 bg-blue-50"
                                                        : "text-[#111d35] hover:text-blue-600 hover:bg-blue-50"
                                                    }`}
                                            >
                                                {label}
                                            </Link>
                                        )}

                                        {/* Desktop Dropdown */}
                                        {hasDropdown && (
                                            <ul
                                                className={`absolute left-0 top-full z-50 mt-1.5 w-60 bg-white border border-gray-100 rounded-xl shadow-xl ring-1 ring-black/5 transition-all duration-200 origin-top-left ${dropdownOpen === label
                                                        ? "opacity-100 scale-100 pointer-events-auto"
                                                        : "opacity-0 scale-95 pointer-events-none"
                                                    }`}
                                                style={{ transitionProperty: "opacity, transform" }}
                                            >
                                                <div className="py-1.5">
                                                    {subLinks!.map((sublink, i) => (
                                                        <li key={i} className="list-none">
                                                            <Link
                                                                href={sublink.href}
                                                                className={`block px-4 py-2.5 text-[13px] transition-colors hover:bg-gray-50 ${pathname === sublink.href
                                                                        ? "text-blue-700 font-semibold bg-blue-50/60"
                                                                        : "text-gray-700 hover:text-gray-900"
                                                                    }`}
                                                                {...(sublink.download
                                                                    ? { download: true, target: "_blank" }
                                                                    : {})}
                                                            >
                                                                {sublink.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </div>
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* ── HAMBURGER BUTTON ── */}
                        <button
                            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ml-2 shrink-0"
                            onClick={toggleMenu}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                        >
                            {/* translate-y-1.5 (canonical) replaces translate-y-[6px] */}
                            <span
                                className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "translate-y-1.5 rotate-45" : ""
                                    }`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                    }`}
                            />
                            {/* -translate-y-1.5 (canonical) replaces -translate-y-[6px] */}
                            <span
                                className={`block w-5 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── BACKDROP ── */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden="true"
                onClick={closeMenu}
            />

            {/* ── MOBILE DRAWER ── */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className={`fixed top-0 right-0 h-full w-[min(85vw,320px)] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <Link href="/" onClick={closeMenu}>
                        <Image
                            src="/nav-logo.png"
                            alt="Logo"
                            width={200}
                            height={55}
                            className="h-auto object-contain"  // sirf h-auto, width CSS se mat do
                            style={{ width: "clamp(120px, 20vw, 200px)" }}  // width style mein do
                            priority
                        />
                    </Link>
                    <button
                        className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
                        onClick={closeMenu}
                        aria-label="Close menu"
                    >
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* GCC Flags row in drawer */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50/60">
                    {gccFlags.map(({ src, alt }) => (
                        <Image
                            key={alt}
                            src={src}
                            alt={alt}
                            width={36}
                            height={36}
                            className="w-8 h-8 rounded-full object-cover border border-gray-100 shadow-sm"
                        />
                    ))}
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto py-2">
                    <ul>
                        {navItems.map(({ label, href, subLinks }) => {
                            const hasDropdown = !!subLinks;
                            const isActive =
                                pathname === href ||
                                (subLinks && subLinks.some((s) => pathname === s.href));
                            const isExpanded = expandedMobile === label;

                            return (
                                <li key={label} className="border-b border-gray-50 last:border-0">
                                    {hasDropdown ? (
                                        <>
                                            <button
                                                onClick={() => toggleMobileDropdown(label)}
                                                aria-expanded={isExpanded}
                                                className={`w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-semibold transition-colors ${isActive
                                                        ? "text-blue-700 bg-blue-50/50"
                                                        : "text-[#111d35] hover:bg-gray-50"
                                                    }`}
                                            >
                                                {label}
                                                <ChevronIcon
                                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            {/* Mobile sub-links accordion */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <ul className="bg-gray-50/70 pl-4">
                                                    {subLinks!.map((sublink, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={sublink.href}
                                                                onClick={closeMenu}
                                                                className={`flex items-center px-5 py-3 text-[14px] border-l-2 transition-colors ${pathname === sublink.href
                                                                        ? "border-blue-600 text-blue-700 font-semibold bg-blue-50/40"
                                                                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
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
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={href}
                                            onClick={closeMenu}
                                            className={`flex items-center px-5 py-3.5 text-[15px] font-semibold transition-colors ${isActive
                                                    ? "text-blue-700 bg-blue-50/50 border-l-2 border-blue-600"
                                                    : "text-[#111d35] hover:bg-gray-50"
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Navbar;

/* ── Chevron Icon ── */
function ChevronIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="4 6 8 10 12 6" />
        </svg>
    );
}