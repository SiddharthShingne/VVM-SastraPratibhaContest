"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#111d35] text-white py-6 px-3 md:px-6 lg:px-10 font-sans">
            <div className="max-w-400 mx-auto flex flex-col lg:flex-row justify-between gap-6">
                {/* Section 1: Logo and Contact */}
                <div className="flex-[1.5]">
                    <Image
                        src="/nav-logo.png"
                        alt="VVM Logo"
                        width={216}
                        height={60}
                        className="mb-3"
                    />
                    <p className="text-xs md:text-sm text-gray-300 mb-3 leading-relaxed">
                        India&rsquo;s Largest Online Science Talent <br /> Search
                        Examination
                    </p>

                    <button className="border-2 border-[#d1adf5] bg-[#000b27] text-white px-3 py-1.5 rounded-3xl text-xs md:text-sm font-semibold hover:bg-[#7f00ff] transition duration-300">
                        Contact With Us
                    </button>
                </div>

                {/* Section 2: Useful Links */}
                <div className="flex-1">
                    <h3 className="text-sm md:text-base font-semibold mb-3 border-b-2 border-[#7f00ff] pb-2">
                        Useful Links
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-1 text-xs text-gray-300">
                            <Link href="/" className="hover:text-[#7f00ff] transition">
                                Home
                            </Link>
                            <Link href="/aboutUs" className="hover:text-[#7f00ff] transition">
                                About Us
                            </Link>
                            <Link
                                href="/brochure"
                                className="hover:text-[#7f00ff] transition"
                            >
                                Brochure
                            </Link>
                            <Link
                                href="/endorsement"
                                className="hover:text-[#7f00ff] transition"
                            >
                                Endorsement
                            </Link>
                            <Link href="/faq" className="hover:text-[#7f00ff] transition">
                                FAQ
                            </Link>
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-gray-300">
                            <Link href="/contact" className="hover:text-[#7f00ff] transition">
                                Contact Us
                            </Link>
                            <Link href="/archive" className="hover:text-[#7f00ff] transition">
                                Archive
                            </Link>
                            <Link href="/privacy" className="hover:text-[#7f00ff] transition">
                                Privacy-Policy
                            </Link>
                            <Link
                                href="/circular"
                                className="hover:text-[#7f00ff] transition"
                            >
                                Circular
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Section 3: Company Info */}
                <div className="flex-1">
                    <h3 className="text-sm md:text-base font-semibold mb-3 border-b-2 border-[#7f00ff] pb-2">
                        Our Company
                    </h3>
                    <div className="text-xs text-gray-300 leading-relaxed space-y-2">
                        <div>
                            <h4 className="text-[#7f00ff] text-xs font-semibold mb-1">
                                Get Contact
                            </h4>
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
