"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Footer = () => {
    const router = useRouter();
    return (
        <footer className="bg-[#111d35] text-white py-6 px-3 md:px-6 lg:px-10 font-sans">
            <div className="max-w-400 mx-auto flex flex-col lg:flex-row justify-between gap-6">
                {/* Section 1: Logo and Contact */}
                <div className="flex-[1.5]">
                    {/* 🔥 Logo Wrapper */}
                    <div className="inline-block bg-white backdrop-blur-md p-2 rounded-xl  border border-white/20 shadow-md mb-3">
                        <Image
                            src="/nav-logo.png"
                            alt="VVM Logo"
                            width={180}
                            height={50}
                            className="object-contain  drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]"
                        />
                    </div>

                    {/* Text */}
                    <p className="text-xs md:text-sm text-gray-300 mb-3 leading-relaxed">
                        India&rsquo;s Largest Online Science Talent <br /> Search Examination
                    </p>

                    {/* Button */}
                    <button
                        className="bg-linear-to-r from-[#1f4e7a] to-[#7f00ff] text-white px-4 py-2 rounded-full text-xs md:text-sm font-semiboldhover:from-[#17395c] 
                        hover:to-[#5a00cc] hover:shadow-[0_0_20px_rgba(127,0,255,0.6)]transition duration-300"
                        onClick={() => router.push("/contact-us/office-contact")}
                    >
                        Connect With Us
                    </button>

                </div>

                {/* Section 2: Śāstra Pratibhā Contest */}
                {/* <div className="flex-[1.5] flex flex-col justify-center gap-3 -ml-34">
                    <h3 className="relative text-2xl md:text-3xl font-extrabold tracking-wide select-none w-fit">
                      
                        <span
                            className="relative z-10 bg-clip-text text-transparent"
                            style={{
                                backgroundImage:
                                    "linear-gradient(135deg, #c8a200 0%, #ffe566 28%, #fff8c0 45%, #ffe566 62%, #b8900a 100%)",
                                filter: "drop-shadow(0 0 12px rgba(244,223,23,0.55)) drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                            }}
                        >
                            Śāstra Pratibhā Contest
                        </span>

                                            <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-clip-text text-transparent pointer-events-none"
                            style={{
                                backgroundImage:
                                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%)",
                                backgroundSize: "200% 100%",
                                WebkitBackgroundClip: "text",
                                animation: "shimmer 2.8s ease-in-out infinite",
                            }}
                        >
                            Śāstra Pratibhā Contest
                        </span>

                        <style>{`
            @keyframes shimmer {
                0%   { background-position: -100% center; }
                60%  { background-position: 200% center; }
                100% { background-position: 200% center; }
            }
        `}</style>
                    </h3>
                </div> */}
                {/* Section 3: Useful Links */}
                <div className="flex-1">
                    <h3 className="text-sm md:text-base font-semibold mb-3 border-b-2 border-[#7f00ff] pb-2">
                        Useful Links
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-1 text-xs text-gray-300">
                            <Link href="/" className="hover:text-[#7f00ff] transition">
                                Home
                            </Link>
                            <Link href="/about/what-is-vvm" className="hover:text-[#7f00ff] transition">
                                About Us
                            </Link>
                            {/* <Link
                                href="/brochure"
                                className="hover:text-[#7f00ff] transition"
                            >
                                Brochure
                            </Link> */}
                            {/* <Link
                                href="/endorsement"
                                className="hover:text-[#7f00ff] transition"
                            >
                                Endorsement
                            </Link> */}
                            {/* <Link href="/faq" className="hover:text-[#7f00ff] transition">
                                FAQ
                            </Link> */}
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-gray-300">
                            <Link href="/contact-us/office-contact" className="hover:text-[#7f00ff] transition">
                                Contact Us
                            </Link>
                            <Link href="/Archives/vvm-2025" className="hover:text-[#7f00ff] transition">
                                Archive
                            </Link>
                            {/* <Link href="/privacy" className="hover:text-[#7f00ff] transition">
                                Privacy-Policy
                            </Link> */}
                            {/* <Link href="/circular" className="hover:text-[#7f00ff] transition">
                                Circular
                            </Link> */}
                        </div>
                    </div>
                </div>
                {/* Section 4: Company Info */}
                <div className="flex-1">
                    <h3 className="text-sm md:text-base font-semibold mb-3 border-b-2 border-[#7f00ff] pb-2">
                        Our Organisation
                    </h3>
                    <div className="text-xs text-gray-300 leading-relaxed space-y-2">
                        <div>
                            <p>
                                <strong className="text-white">Add:</strong> VVM Secretariat,
                                Vijnana Bharati (VIBHA),
                                <br />
                                D-12, South Extension-I, New Delhi - 110049
                            </p>
                        </div>
                        <p>
                            <strong className="text-white">E-mail:</strong> office@vvm.org.in
                        </p>
                        <p>
                            <strong className="text-white">Office Time:</strong> 10:00AM to
                            5:00PM
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
