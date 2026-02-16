/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const ExamRequirements = () => {
    return (
        <div>
            {/* Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">
                    Exam Requirements
                </h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">Exam Requirements</span>
                </div>
            </div>

            {/* Content */}

            <div className="max-w-5xl mx-auto px-2 mt-12 mb-20 space-y-9 font-[Euclid Circular,sans-serif]  text-[#111827]">
                {/* Devices and Internet Facility */}
                <div className="max-w-5xl mx-auto px-4 mt-12 mb-10 space-y-6 font-[Euclid Circular,sans-serif] text-[#111827] text-[14px] leading-relaxed">
                    <h2 className="text-3xl font-bold text-center text-[#111827] uppercase">
                        DEVICES AND INTERNET FACILITY :
                    </h2>
                    <p>
                        All the students will appear for the examination using their own
                        devices with internet connectivity from their school/home. Students
                        will have to ensure time-to-time updates of the VVM Exam App. They
                        must also ensure that they use the same device that they had used to
                        attempt mock exams. They should make sure that the device is fully
                        charged and the App is working properly if they are using any other
                        device.
                    </p>

                    {/* App Download */}
                    <div>
                        <h3 className="text-[14px] font-bold uppercase text-[#111827]">
                            EXAM APPLICATION (APP) DOWNLOAD AND INSTALLATION:
                        </h3>
                        <p>
                            Once the registration process is complete, the Exam App will be
                            made available for download from the profile page of the student.
                            The App will be installed and will function properly only if it is
                            downloaded according to the operating system of the desired device
                            from the student’s profile page. The profile page will contain
                            detailed instructions for App download and installation. A request
                            support link will be available in case of any issues.
                        </p>
                        <p>
                            Once the App is downloaded, the user will have the option to test
                            the same by attempting Mock Exams. Students will have to update it
                            regularly and for this purpose he/she will have to allow push
                            notifications from this App for update notifications.
                        </p>
                    </div>

                    {/* Notifications and Mock Test */}
                    <div>
                        <h3 className="text-[14px] font-bold uppercase text-[#111827]">
                            NOTIFICATIONS AND MOCK TEST
                        </h3>
                        <p>
                            To build the confidence of the students and to make the exam user
                            friendly, mock tests will be conducted regularly. The registered
                            students will get regular notifications regarding availability of
                            mock exams. On the specified date and time, the student can login
                            into the Exam App and take the mock test. Mock Tests will begin on{" "}
                            <strong>
                                01<sup>st</sup> September, 2025.
                            </strong>
                        </p>
                        <p>
                            Upon completion of the mock test, the students can view their
                            results on the result page. After verification of answers student
                            can report to the admin if he/she faces any problems in the
                            feedback section of the App.
                        </p>
                    </div>
                </div>

                {/* Level-I Table */}
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-[#f97316] ">
                        Schedule of Examination:
                    </h2>

                    <div className="bg-white text-xm mt-5 text-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm md:text-base">
                                <thead className="bg-[#f1f5f9] text-gray-900">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-semibold">
                                            LEVEL-I EXAMINATION DETAILS
                                        </th>
                                        <th className="px-4 py-2 text-left font-semibold"></th>
                                        <th className="px-4 py-2 text-left font-semibold"></th>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 text-left font-semibold">Class</th>
                                        <th className="px-4 py-2 text-left font-semibold">
                                            Day & Date
                                        </th>
                                        <th className="px-4 py-2 text-left font-semibold">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {[
                                        [
                                            "VI",
                                            "28th October, 2025 and/or 31st October, 2025",
                                            "10:00 AM – 06:00 PM",
                                        ],
                                        [
                                            "VII",
                                            "28th October, 2025 and/or 31st October, 2025",
                                            "10:00 AM – 06:00 PM",
                                        ],
                                        [
                                            "VIII",
                                            "29th October, 2025 and/or 01st November, 2025",
                                            "10:00 AM – 06:00 PM",
                                        ],
                                        [
                                            "IX",
                                            "29th October, 2025 and/or 01st November, 2025",
                                            "10:00 AM – 06:00 PM",
                                        ],
                                        [
                                            "X",
                                            "30th October, 2025 and/or 02nd November, 2025",
                                            "10:00 AM – 06:00 PM",
                                        ],
                                        [
                                            "XI",
                                            "30th October, 2025 and/or 02nd November, 2025",
                                            "10:00 AM – 06:00 PM",
                                        ],
                                    ].map(([cls, date, time], i) => (
                                        <tr
                                            key={cls}
                                            className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}
                                        >
                                            <td className="px-4 py-3 font-semibold text-[#0f172a]">
                                                {cls}
                                            </td>
                                            <td className="px-4 py-3">{date}</td>
                                            <td className="px-4 py-3">{time}</td>
                                        </tr>
                                    ))}

                                    {/* Level-I General Entry */}
                                    <tr className="bg-indigo-100">
                                        <td
                                            className="px-4 py-3 font-bold text-[#0f172a]"
                                            colSpan={3}
                                        >
                                            SCHOOL LEVEL ONLINE EXAMINATION : LEVEL-I
                                        </td>
                                    </tr>
                                    <tr className="bg-[#f9fafb]">
                                        <td className="px-4 py-3 font-semibold text-[#0f172a]">
                                            VI, VII, VIII, IX, X, XI
                                        </td>
                                        <td className="px-4 py-3">
                                            19th November, 2025 and/or 23rd November, 2025
                                        </td>
                                        <td className="px-4 py-3">10:00 AM – 06:00 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Final Exam Details */}
                <div className="space-y-1.8 text-[15px] leading-relaxed text-[#4b5563]">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-[#111827]">
                        Final Online Examination:
                    </h2>
                    <p>
                        Three days before the date of the exam, the student will receive an
                        SMS and Email notification to download the latest App. This download
                        must be done at least two days before the exam date. After 26th
                        October, 2025, the App will be available for download (link will be
                        enabled) for all those appearing in the examination from 28th
                        October, 2025 to 02nd November, 2025. <br />
                        The student will not be able to appear for the exam without the
                        latest App (updated version) installed on the desired device.{" "}
                        <strong className="text-[#111827]">
                            Students can login into the Exam App anytime from 10:00 AM to
                            06:00 PM
                        </strong>{" "}
                        to write the exam with their selected device (mobile/tablet/laptop).
                    </p>
                    <p>On receiving this request, the App will verify the following:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Student's login details – username and password.</li>
                        <li>
                            Student's Live photo with photo uploaded on his/her profile.
                        </li>
                        <li>
                            Connection speed and give a warning if the speed is below
                            threshold.
                        </li>
                        <li>
                            Verify the Exam App ID to make sure that the student is using the
                            latest version of the App.
                        </li>
                        <li>
                            After successful verification, students will be asked to choose
                            the medium of taking the exam and then to download the question
                            paper (encrypted format).
                        </li>
                        <li>
                            The option to download the same will be available in the Exam App
                            itself.
                        </li>
                    </ul>
                    <p className="font-semibold text-red-500">
                        No student will be allowed or will be able to log in before 10:00 AM
                        or after 06:00 PM...
                    </p>
                    <p>
                        Students will have to click on the Go to Exam button on the Exam App
                        screen to write the exam. Students will see the Instructions on the
                        first page. He/she is requested to read all the instructions
                        carefully and then click the “I Agree” button given at the end of
                        the same to start the exam.
                    </p>
                </div>

                {/* Level-I and Level-II Exam Format */}
                <div className="space-y-4.5 text-[15px] leading-relaxed text-[#4b5563]">
                    {/* Level-I */}
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wide text-[#111827]">
                            School Level Online Examination : Level-I
                        </h2>
                        <p>There will be two sections.</p>
                        <div>
                            <strong className="block mb-2 text-[#111827]">➤ Section-A</strong>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>
                                    Students will have to click on the Go to Exam button on the
                                    Exam App screen to write the exam.
                                </li>
                                <li>Students will see the Instructions on the first page.</li>
                                <li>
                                    He/she is requested to read all the instructions carefully and
                                    then click the “I Agree” button given at the end of the same
                                    to start the exam.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <strong className="block mb-2 text-[#111827]">➤ Section-B</strong>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>
                                    Students will be provided 60 minutes to answer 60 questions.
                                </li>
                                <li>The student will see one question at a time.</li>
                                <li>
                                    He/she can review and edit answers until final submission or
                                    60-minute deadline.
                                </li>
                                <li>
                                    After the deadline or submission, the student is redirected to
                                    final submission.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Level-II */}
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wide text-[#111827]">
                            School Level Online Examination : Level-II
                        </h2>
                        <ul className="list-decimal pl-3 space-y-1">
                            <li>The Level-II of examination will be proctored.</li>
                            <li>
                                The questions for Level-II would be situation based problems or
                                PISA based.
                            </li>
                            <li>
                                50 multiple choice questions with multiple correct answers.
                                Negative marking of -0.5 Mark for each incorrect answer.
                            </li>
                            <li> There will be two sections.</li>
                            <div>
                                <p className="block font-bold mb-2 text-[#111827]">
                                    ➤ Section-A
                                </p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>
                                        Students will have to click on the Go to Exam button on the
                                        Exam App screen to write the exam.
                                    </li>
                                    <li>Students will see the Instructions on the first page.</li>
                                    <li>
                                        He/she is requested to read all the instructions carefully
                                        and then click the “I Agree” button to begin.
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="block font-bold mb-2 text-[#111827]">
                                    ➤ Section-B
                                </p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>60 minutes to answer 60 questions in this section.</li>
                                    <li>Only one question visible at a time.</li>
                                    <li>
                                        Answers can be reviewed and edited until submission or time
                                        expires.
                                    </li>
                                    <li>
                                        After 60 minutes or submission, the exam moves to final
                                        submission screen.
                                    </li>
                                </ul>
                            </div>
                            <li>
                                The top/lower panel of the App will display the statistics
                                regarding the number of questions Answered, Marked for Review,
                                Time Left, etc.
                            </li>
                            <li>
                                Students completing the exam before the stipulated time can
                                submit his/her answers by clicking on the “SUBMIT” button.
                            </li>
                            <li>
                                Once the submission is over, the student will get a Submission
                                notification and he/she will not be able/allowed to write the
                                exam again. After completion of the exam time students need to
                                upload answer sheets via all three options namely 1) Upload
                                Answer Sheet, 2) Upload File and 3) Send Email (auto drafted and
                                attached, students just need to click on the send email button).
                                In case of connection failure, the answers will be saved
                                automatically by the application to the local system in an
                                encrypted format. The student can upload the answer sheet within
                                the time window provided.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* App Availability */}
                <div className="space-y-1 text-[15px] leading-relaxed text-[#4b5563]">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-[#111827]">
                        Availability of App:
                    </h2>
                    <p>
                        After 26th October, 2025, the App will be available for download
                        (link will be enabled) for all those appearing in the Level-I of
                        school level online examination from 28th October to 02nd November,
                        2025. In the similar way App will be available for download on 15th
                        November, 2025 for all those appearing in the Level-II of school
                        level online examination either on 17th and/or on 23rd November,
                        2025.
                    </p>
                </div>

                {/* Device & Mock Tests */}
                <div className="space-y-1 text-[15px] leading-relaxed text-[#4b5563]">
                    <h2 className="text-base font-bold uppercase tracking-wide text-[#111827]">
                        UNFAIR MEANS
                    </h2>
                    <p>
                        To prevent the use of unfair means during School Level Online
                        Examinations (Level-I), the following measures will be taken:
                    </p>
                    <ul>
                        <li>
                            <b>Invigilator Visit:</b> Invigilator(s) will visit schools during
                            the time slot chosen by the school. Details regarding the
                            invigilator's visit and guidelines will be shared one week before
                            the date of the examination.{" "}
                        </li>
                        <li>
                            <b>Online Proctoring:</b> The examination will also be proctored
                            online.
                        </li>
                    </ul>
                    <p className="text-red-500">
                        Schools and students are expected to cooperate with the invigilators
                        and follow the guidelines to ensure a fair examination process.
                    </p>

                    <h3 className="font-semibold text-[#111827]">DISPUTES, IF ANY </h3>
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
export default ExamRequirements;
