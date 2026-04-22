"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
const Footer = () => {
    const router = useRouter();
    return (
            <footer className="bg-[#111d35] text-white font-sans">

                {/* ================= TOP SECTION ================= */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                        {/* 🔹 SECTION 1 */}
                    <div className="lg:-ml-4">
                        <div className="inline-block bg-white text-left p-2 rounded-xl shadow-md mb-4">
                            <Image
                                src="/nav-logo.png"
                                alt="Logo"
                                width={200}
                                height={55}
                                className="w-30 h-auto object-contain"
                            />
                        </div>

                        <p className="text-sm text-gray-300 leading-relaxed mb-4">
                            India’s Largest Online Science Talent <br />
                            Search Examination
                        </p>

                        <button
                            onClick={() => router.push("/contact-us/office-contact")}
                            className="bg-linear-to-r from-[#1f4e7a] to-[#7f00ff] px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
                        >
                            Connect With Us
                        </button>
                    </div>
                        {/* 🔹 SECTION 2 */}
                        <div>
                            <h3 className="text-base font-semibold mb-4 border-b border-[#7f00ff] pb-2">
                                Useful Links
                            </h3>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                                <div className="flex flex-col gap-2">
                                    <Link href="/" className="hover:text-[#7f00ff] transition">
                                        Home
                                    </Link>
                                    <Link href="/about/what-is-vvm" className="hover:text-[#7f00ff]">
                                        About Us
                                    </Link>
                                    <Link href="/faq" className="hover:text-[#7f00ff]">
                                        FAQ
                                    </Link>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Link href="/contact-us/office-contact" className="hover:text-[#7f00ff]">
                                        Contact Us
                                    </Link>
                                    <Link href="/Archives/vvm-2025" className="hover:text-[#7f00ff]">
                                        Archive
                                    </Link>
                                    <Link href="/privacy-policy" className="hover:text-[#7f00ff]">
                                        Privacy Policy
                                    </Link>
                                    <Link href="/terms-and-conditions" className="hover:text-[#7f00ff]">
                                        Terms & Conditions
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 🔹 SECTION 3 */}
                        <div>
                            <h3 className="text-base font-semibold mb-4 border-b border-[#7f00ff] pb-2">
                                Our Organisation
                            </h3>

                            <div className="text-sm text-gray-300 space-y-3 leading-relaxed">
                                <p>
                                    <span className="text-white font-medium">Add:</span> VVM Secretariat,
                                    Vijnana Bharati (VIBHA), <br />
                                    D-12, South Extension-I, New Delhi - 110049
                                </p>

                                <p>
                                    <span className="text-white font-medium">E-mail:</span> office@vvm.org.in
                                </p>

                                <p>
                                    <span className="text-white font-medium">Office Time:</span> 10:00 AM – 5:00 PM
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= BOTTOM BAR ================= */}
                <div className="bg-[#1f3a5f] relative">

                    <div className="h-px bg-white/20"></div>

                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-4">

                        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 text-sm text-gray-300">

                            {/* LEFT */}
                            <a
                                href="https://vijnanabharati.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Powered by Vijnana Bharati
                            </a>

                            {/* CENTER */}
                            <span className="text-center">
                                Vijnana Bharati All Rights Reserved.
                            </span>

                            {/* RIGHT */}
                            <div className="flex items-center gap-3">
                                <Link href="/faq" className="hover:underline">FAQ</Link>
                                <span>|</span>
                                <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
                                <span>|</span>
                                <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
                            </div>
                        </div>
                    </div>

                    {/* 🔝 Scroll Button */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="absolute right-6 -top-5 w-10 h-10 rounded-full   bg-[#17395c] border border-white/30 
                        flex items-center justify-center    shadow-lg hover:scale-110 transition"
                    >
                        <ArrowUp size={18} />
                    </button>

                </div>
            </footer>
        

    )
};

export default Footer;
