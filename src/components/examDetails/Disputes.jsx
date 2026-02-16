import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const page = () => {
    return (
        <div>
            {/* Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">Disputes</h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]"> Disputes</span>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-2 mt-12 mb-20 space-y-9 font-[Euclid Circular,sans-serif]  text-[#111827]">
                <div className="space-y-1 text-[15px] leading-relaxed text-[#4b5563]">
                    <h2 className="text-base font-bold uppercase tracking-wide text-[#111827]">
                        DISPUTES, IF ANY
                    </h2>
                    <p>
                        In the event of any dispute, grievance or RTI (Right to Information)
                        complaint, the decision made by the VVM Core Committee shall be
                        considered final and binding.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
