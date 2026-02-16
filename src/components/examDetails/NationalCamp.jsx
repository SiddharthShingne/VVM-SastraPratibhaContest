"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const NationalCamp = () => {
    return (
        <div>
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">
                    National Camp
                </h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">National Camp</span>
                </div>
            </div>
            <div className="max-w-5xl mx-auto text-left font-[Euclid Circular,sans-serif] space-y-6 leading-relaxed mt-10 px-4">
                <h1 className="text-2xl font-bold text-[#0f172a] uppercase">
                    National Camp (NC): Level-IV
                </h1>

                <p className="text-[15px] text-gray-500 font-medium mb-20">
                    Top two students from each class i.e. total 12 students from each
                    state will be invited to a<strong> two-day National Camp</strong>.
                    <br />
                    <br />
                    The <strong>National Camp (NC)</strong> will comprise of
                    Presentations, Activities to test
                    <strong>
                        {" "}
                        Scientific Understanding, Innovation, Creativity, Out-of-Box
                        Thinking
                    </strong>{" "}
                    and
                    <strong> Assessment of Leadership Quality</strong>.<br />
                    <br />
                    Selected students will have to bear their{" "}
                    <strong>travel expense</strong> to attend the National Camp.
                    <strong> No travel support</strong> for this purpose will be provided.
                    <br />
                    Organisers will make{" "}
                    <strong>boarding and lodging arrangements</strong>.<br />
                    Necessary details regarding venue and others will be provided to all
                    the students selected for participation in the National Camp by the
                    respective state coordinator(s).
                    <br />
                    <br />
                    <strong>Displaying the Marks Obtained/Secured</strong> – Marks
                    secured/obtained by the students will be available on their dashboard
                    after one week of the declaration of the result. Students can login
                    into their VVM account to check the same.
                    <br />
                    <br />
                    <strong>Tiebreaker</strong> – In case, there is a tie in rankings the
                    student(s) will be invited for
                    <strong> Viva-Voce</strong> comprising three questions and the one
                    scoring the highest mark(s) will be declared as the winner.
                </p>
            </div>
        </div>
    );
};

export default NationalCamp;
