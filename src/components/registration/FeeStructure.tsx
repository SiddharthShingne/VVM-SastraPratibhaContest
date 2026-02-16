"use client";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
const FeeStructure = () => {
    return (
        <div>
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-20 text-center">
                <h1 className="text-5xl md:text-4xl font-bold text-[#111d35] mb-4">
                    FEE STRUCTURE
                </h1>
                <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Registration</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className=" text-extralight ">FEE STRUCTURE</span>
                </div>
            </div>
            <div className="flex justify-center px-4 py-10 bg-white font-[Euclid Circular,sans-serif]">
                <div className="w-full max-w-5xl rounded-xl  border-gray-200 p-8 space-y-6 text-[#111827] text-left">
                    <div className="bg-white rounded-lg p-6 mt-8 text-gray-800 space-y-4 font-[Euclid Circular,sans-serif]">
                        <h1 className="text-2xl font-bold text-center text-gray-900">
                            FEE STRUCTURE
                        </h1>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600">
                            <li>
                                Students registering individually or through school will have to
                                pay a fee of
                                Rs. 200/- (Rupees Two Hundred Only).
                            </li>
                            <li>
                                School/Institute coordinator is requested to retain
                                Rs. 30/- per student as a service charge with
                                School/Institute and the rest of the amount will be transferred
                                only through Online/Offline Payment Mode to the VVM Delhi
                                office. In case of account payment, please ensure to upload the
                                receipt & transaction ID and submit the transaction details.
                            </li>
                            <li>
                                Modes of Fee Payment:
                                <br />
                                Fee can be paid through payment gateway,{" "}
                                ONLINE (RTGS/NEFT), and
                                Challan payment only.
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-lg overflow-x-auto shadow-sm border border-gray-300 mt-6">
                        <table className="w-full text-sm text-left text-gray-700 min-w-150">
                            <tbody>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800 w-1/3">
                                        Eligibility
                                    </td>
                                    <td className="px-6 py-4">
                                        Students from Class VI to XI studying under CBSE, ICSE and
                                        State Boards
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Language
                                    </td>
                                    <td className="px-6 py-4">
                                        English, Hindi, Marathi, Tamil, Telugu, Kannada, Bengali,
                                        Gujarati, Punjabi, Odia, Malayalam, Assamese, Sanskrit, Urdu
                                        <br />
                                        <span className="text-red-600 italic">
                                            Note: If less than 100 students are registered in any
                                            other language than English or Hindi, question paper will
                                            be available in English or Hindi only.
                                        </span>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Exam Venue
                                    </td>
                                    <td className="px-6 py-4">School/Home</td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Registration
                                    </td>
                                    <td className="px-6 py-4">
                                        Opens on 1<sup>st</sup> July, 2025
                                        <br />
                                        Closes on 30<sup>th</sup> September, 2025
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800">Fee</td>
                                    <td className="px-6 py-4">
                                        Rs. 200/- (Rupees Two Hundred only)
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Mode of Payment
                                    </td>
                                    <td className="px-6 py-4">
                                        Through payment gateway and ONLINE (RTGS/NEFT) payment only.
                                        NO CASH / DD / Cheque will be acceptable.
                                        <br />
                                        <br />
                                        Exam Coordinators depositing fee directly in VVM’s account
                                        are requested to retain deposit slip with Transaction ID,
                                        Date & Time to be uploaded (in .jpeg format) on VVM offline
                                        payment mode option provided in their dashboard. Fee payment
                                        status will be updated after 48 hrs. of uploading the
                                        deposit slip/receipt.
                                        <br />
                                        <span className="text-red-600 italic">
                                            This option is not applicable for individually registering
                                            students.
                                        </span>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        ONLINE Payment Details for School Exam Coordinator Only
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        <p>
                                            <strong>Current Account Number:</strong> 7009670017
                                        </p>
                                        <p>
                                            <strong>Account Name:</strong> VIDYARTHI VIGYAN MANTHAN
                                        </p>
                                        <p>
                                            <strong>IFSC Code:</strong> IDIB000D008
                                        </p>
                                        <p>
                                            <strong>Branch Name & Add:</strong> Indian Bank, Defence
                                            Colony, New Delhi
                                        </p>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Website URL
                                    </td>
                                    <td className="px-6 py-4">
                                        <a
                                            href="https://www.vvm.org.in"
                                            className="text-red-600 underline"
                                        >
                                            www.vvm.org.in
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FeeStructure;
