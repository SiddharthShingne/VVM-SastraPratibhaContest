"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const Footer = () => {
    const router = useRouter();

    const gccFlags = [
        { src: "/gcc/uae.png", label: "UAE" },
        { src: "/gcc/oman.png", label: "Oman" },
        { src: "/gcc/kuwait.png", label: "Kuwait" },
        { src: "/gcc/qatar.png", label: "Qatar" },
        { src: "/gcc/saudi-arab.png", label: "Saudi Arabia" },
        { src: "/gcc/bahrain.png", label: "Bahrain" },
    ];

    const leftLinks = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about/what-is-vvm" },
        { label: "FAQ", href: "/faq" },
        { label: "Registration", href: "/registration/individual-student-registration" },
    ];

    const rightLinks = [
        { label: "Contact Us", href: "/contact-us/office-contact" },
        { label: "Archive", href: "/Archives/vvm-2025" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ];

    return (
        <footer className="bg-[#0f1b30] text-white font-sans">

            {/* ── TOP SECTION ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-7 sm:py-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 items-start">

                    {/* ── LEFT: Brand ── */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">

                        {/* Logo */}
                        <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden bg-white
              border-[2.5px] border-yellow-400/40
              shadow-[0_0_0_6px_rgba(255,215,0,0.07),0_8px_24px_rgba(0,0,0,0.3)]
              flex items-center justify-center flex-shrink-0"
                        >
                            <Image
                                src="/logo-footer.png"
                                alt="VVM Logo"
                                width={110}
                                height={110}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed mt-5 mb-5">
                            Largest Online Science Talent <br className="hidden sm:block" />
                            Search Examination
                        </p>

                        <button
                            onClick={() => router.push("/contact-us/office-contact")}
                            className="bg-gradient-to-r from-[#1f4e7a] to-[#6b21d6]
                px-6 py-2.5 rounded-lg text-sm font-semibold
                shadow-[0_4px_16px_rgba(107,33,214,0.35)]
                hover:brightness-110 hover:-translate-y-0.5
                transition-all duration-300"
                        >
                            Connect With Us
                        </button>
                    </div>

                    {/* ── CENTER: GCC Countries ── */}
                    {/* On small screens: full width, centered. On sm: spans both columns centered. On lg: single col */}
                    <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center w-full">

                        <div className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none mx-auto">
                            <h3 className="text-base font-bold text-white mb-2 tracking-wide text-center lg:text-left">
                                {/* GCC-SIF */}
                                Countries
                            </h3>
                            <div className="h-[1.5px] bg-gradient-to-r from-[#7f00ff] via-[#7f00ff]/40 to-transparent mb-6 rounded-full" />

                            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-4 sm:gap-5 place-items-center">
                                {gccFlags.map((flag, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <div
                                            className="w-[72px] h-[72px] sm:w-[68px] sm:h-[68px] lg:w-[76px] lg:h-[76px]
                        rounded-full bg-white
                        border-2 border-white/25
                        shadow-[0_4px_14px_rgba(0,0,0,0.28)]
                        flex items-center justify-center overflow-hidden
                        hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(0,0,0,0.35)] hover:border-[#7f00ff]/50
                        transition-all duration-300"
                                        >
                                            <Image
                                                src={flag.src}
                                                alt={flag.label}
                                                width={72}
                                                height={72}
                                                // BEFORE // AFTER
                                                className="w-full h-full object-contain p-1.5 rounded-full"
                                            />
                                        </div>
                                        <span className="text-[10px] sm:text-[11px] text-gray-400 text-center leading-tight">
                                            {flag.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Useful Links ── */}
                    <div className="flex flex-col items-center sm:items-start w-full sm:col-span-2 lg:col-span-1 lg:ml-auto">

                        <div className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none mx-auto">
                            <h3 className="text-base font-bold text-white mb-2 tracking-wide">
                                Useful Links
                            </h3>
                            <div className="h-[1.5px] bg-gradient-to-r from-[#7f00ff] via-[#7f00ff]/40 to-transparent mb-5 rounded-full" />

                            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-400">
                                {leftLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {rightLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="bg-[#162540] border-t border-white/10 relative">

                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-400">

                        {/* Left */}
                        <a
                            href="https://vijnanabharati.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors duration-200"
                        >
                            Powered by Vijnana Bharati
                        </a>

                        {/* Center */}
                        <span className="text-center order-last sm:order-none">
                            Vijnana Bharati All Rights Reserved.
                        </span>

                        {/* Right */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link href="/faq" className="hover:text-white transition-colors duration-200">FAQ</Link>
                            <span className="text-white/20">|</span>
                            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy</Link>
                            <span className="text-white/20">|</span>
                            <Link href="/terms-and-conditions" className="hover:text-white transition-colors duration-200 whitespace-nowrap">
                                Terms & Conditions
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Scroll to Top */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="absolute right-5 sm:right-6 -top-5
            w-10 h-10 rounded-full
            bg-[#1f3a5c] border border-white/25
            flex items-center justify-center
            shadow-[0_2px_10px_rgba(0,0,0,0.3)]
            hover:bg-[#274d7a] hover:-translate-y-0.5
            transition-all duration-200"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={16} />
                </button>

            </div>
        </footer>
    );
};

export default Footer;