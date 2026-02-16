"use client";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

const RegistrationProcess = () => {
    return (
        <div>
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-20 text-center">
                <h1 className="text-5xl md:text-4xl font-bold text-[#111d35] mb-4">
                    Registration Process{" "}
                </h1>

                <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Registration</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className=" text-extralight ">Registration Process</span>
                </div>
            </div>
            <div className="flex justify-center px-4 py-10 bg-white font-[Euclid Circular,sans-serif]">
                <div className="w-full max-w-5xl rounded-xl  border-gray-200 p-8 space-y-6 text-[#111827] text-left">
                    <h1 className="text-2xl font-bold text-center mb-4">
                        ALL ABOUT REGISTRATION AND EXAMINATION
                    </h1>
                    <p className="text-gray-600">
                        Vidyarthi Vigyan Manthan is a national level, unique, App-based,
                        science talent search examination that is conducted online. The
                        registered students will be allowed to take the exam from their own
                        device: smartphone, laptop, or desktop from home. The exam is
                        conducted on Windows and Android platforms ONLY. The timing of the
                        examination is the same all over India.
                        <b></b>The mode of registration is also online.
                    </p>
                    <p>
                        {" "}
                        <b>The mode of registration is also online.</b>
                    </p>

                    <h2 className="text-xl font-bold">
                        A. INDIVIDUAL STUDENT REGISTRATION
                    </h2>
                    <ul className="list-disc ml-6 text-gray-600 space-y-2">
                        <li>We are open for individual registration.</li>
                        <li>
                            The student will enter details like Name, DoB, Create Password,
                            Class, School Name, Address, District, State etc. and then the
                            entered data will be verified by the VVM admin by sending
                            OTP&lsquo;s to the registered mobile number and Email ID
                            respectively. Both the OTPs will be different and required to be
                            entered for completion of the verification process.
                        </li>
                        <li>
                            Now students will be provided with an option to make the online
                            payment to complete the registration. They can select a payment
                            option using the payment gateway. Students will have to pay Rs.
                            200/- (Rupees Two Hundred only) to complete the registration
                            process.
                        </li>
                        <li>
                            After completion of the registration process, the student will be
                            provided with a unique username (on registered Email ID) and
                            password (encrypted format).
                        </li>
                        <li>
                            The students registered through this category will be considered
                            for evaluation based on the district of their school and the
                            address mentioned during the registration. At the time of filling
                            in school details students should choose their school district
                            only.
                        </li>
                    </ul>

                    <h2 className="text-xl font-bold">
                        B. SCHOOL/INSTITUTE AND STUDENT REGISTRATION
                    </h2>
                    <p className="text-gray-600">
                        We encourage bulk registration through the school/institute. To
                        register under the school/institute category, a minimum of 10
                        students per class have to be registered.
                    </p>

                    <h6 className="text-base font-bold mt-4">
                        STEP-I: Appointment of School/Institute Exam Coordinator
                    </h6>
                    <p className="text-gray-600">
                        The school/institute Principal/authority needs to appoint the
                        school/institute exam coordinator and he/she will register the
                        school/institute and the students as per STEP-II and STEP-III.
                    </p>

                    <h6 className="text-base font-bold mt-4">
                        STEP-II: Registration of School/Institute
                    </h6>
                    <ul className="list-disc ml-6 text-gray-600 space-y-1">
                        <li>
                            Enter the details of the school like School/Institute Name,
                            School/Institute Address, Name of the Principal, Name of the Exam
                            Coordinator, Designation in School, Mobile Number, Email ID etc.
                            This information will be displayed as a school/institute profile
                            on the VVM website.
                        </li>
                        <li>
                            The entered data will be verified by the VVM admin by sending OTP
                            to registered Mobile Number and Email ID respectively. Both the
                            OTPs will be different and required to be entered for completion
                            of the verification process.
                        </li>
                        <li>
                            After completion of verification the school/institute will be
                            provided with a Unique Referral Code, visible after logging on
                            their dashboard which can be distributed to students registering
                            individually.
                        </li>
                    </ul>

                    <h6 className="text-base font-bold mt-4">
                        STEP III – Registration of Students from School/Institute
                    </h6>
                    <ul className="list-disc ml-6 text-gray-600 space-y-1">
                        <li>
                            Exam coordinator can ask the students of his/her School/Institute
                            (who wish to take up the VVM online exam) to register in
                            individual student categories and complete the registration by
                            paying a fee of Rs. 200 /- (Rupees Two Hundred only). Once they
                            are provided with login credentials, they will be able to enter
                            the Unique Referral Code on their dashboard after logging into
                            their account. As soon as the students enter the Unique Referral
                            Code, they will be automatically added to the school dashboard.
                        </li>
                        <li>
                            School Exam Coordinator can collect Rs. 200/- (Rupees Two Hundred
                            only) from each student.
                        </li>
                        <li>
                            The exam coordinator has two other options to register the
                            students: Online – One by one online entry of the student details.
                            Offline – The coordinator enters minimal details like Name of the
                            student, Class, Gender, Email ID, Phone No., Language of Exam etc.
                            in the prescribed Excel format provided for this purpose. It will
                            be an offline process, because, an editable Excel file (no changes
                            in the format of the file will be acceptable) is provided for data
                            entry.
                        </li>

                        <li>
                            {" "}
                            This information will be reflected on the website as a student
                            profile.
                        </li>
                        <li>
                            After completion of the entries the data can be uploaded online,
                            partially or completely. If the uploading or data submission is
                            successful, he/she will be provided with an option to make the
                            payment.
                        </li>
                        <li>
                            Payment option will be visible only after adding the minimum
                            students (10 students in all) required for school category
                            registration.
                        </li>
                        <li>
                            Payment can be done through online and offline modes. Exam
                            Coordinators depositing fees directly in VVM’s account are
                            requested to calculate the amount of fee as Rs. 170/- per student.
                            They should also retain the deposit slip with Transaction ID, Date
                            & Time to be uploaded (in .jpeg format) on the VVM offline payment
                            mode option provided on their dashboard. The fee payment status
                            will be updated after 48 hrs. of uploading the deposit
                            slip/receipt.
                        </li>
                        <li>
                            After the successful submission of the exam fee the exam
                            coordinator will be provided with each student&lsquo;s username
                            and password via email and these details will also be available on
                            the school dashboard. He/she will be required to distribute the
                            same to the respective students. The login credentials of students
                            will be functional on the fee payment status being updated.
                        </li>
                        <li>
                            After this, the job of exam coordinator is complete, unless there
                            is a need to modify any student&lsquo;s details.
                        </li>
                    </ul>

                    <h6 className="text-lg font-bold mt-4">
                        STEP IV – Creation of Student Profile
                    </h6>
                    <ul className="list-disc ml-6 text-gray-600 space-y-1">
                        <li>
                            After the first time login, students will be required to
                            update/change their password (mandatory).
                        </li>
                        <li>
                            Student can complete their profile after logging into the website.
                            On the student profile page, the details of the student like
                            profile photo, DoB, Father&#39;s Name, Mother&apos;s Name,
                            Residential address etc. need to be uploaded.
                        </li>
                        <li>
                            The date for the examination will be pre-selected and students
                            will not be allowed to make any further changes in the same. The
                            student has to arrange for a device with good internet
                            connectivity on the pre-selected date and time of examination.{" "}
                        </li>
                        <li>
                            The student must attempt an exam from the device (as the App for
                            each device varies) from which he is planning to take the exam to
                            check the Exam App compatibility with his/her device.
                        </li>
                        <li>
                            The details of all the students registered from that
                            school/institute will be accessible from the school/institute
                            login. The authority to modify a student&lsquo;s profile rests
                            only with the Principal or School/Institute Exam Coordinator.
                        </li>
                    </ul>

                    <h6 className="text-xl font-bold">FEE STRUCTURE</h6>
                    <ul className="list-disc ml-6 text-gray-600 space-y-1">
                        <li>
                            Students registering individually or through school will have to
                            pay a fee of Rs. 200/- (Rupees Two Hundred Only).
                        </li>
                        <li>
                            School/Institute coordinator is requested to retain Rs. 30/- per
                            student as a service charge with School/Institute and the rest of
                            the amount will be transferred only through Online/Offline Payment
                            Mode to the VVM Delhi office. In case of account payment, please
                            ensure to upload the receipt & transaction ID and submit the
                            transaction details.
                        </li>
                    </ul>
                    <h6 className="text-xl font-bold">Registration</h6>
                    <p className=" ml-6 text-gray-600 space-y-1">
                        Registration will be available only through Online Mode on VVM&lsquo;s
                        website www.vvm.org.in.
                    </p>

                    <div className="rounded-lg overflow-x-auto shadow-sm border border-gray-300">
                        <table className="w-full text-sm text-left text-gray-700 min-w-150">
                            <tbody>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800 w-1/3 align-top">
                                        Eligibility
                                    </td>
                                    <td className="px-6 py-4">
                                        Students from Class VI to XI studying under CBSE, ICSE and
                                        State Boards
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Language
                                    </td>
                                    <td className="px-6 py-4">
                                        English, Hindi, Marathi, Tamil, Telugu, Kannada, Bengali,
                                        Gujarati, Punjabi, Odia, Malayalam, Assamese, Sanskrit, Urdu
                                        <p className="text-red-600 mt-2 text-sm">
                                            Note: If less than 100 students are registered in any
                                            other language than English or Hindi, question paper will
                                            be available in English or Hindi only.
                                        </p>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Exam Venue
                                    </td>
                                    <td className="px-6 py-4">School/Home</td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Registration
                                    </td>
                                    <td className="px-6 py-4">
                                        Opens on{" "}
                                        <strong>
                                            1<sup>st</sup> July, 2025
                                        </strong>
                                        <br />
                                        Closes on{" "}
                                        <strong>
                                            30<sup>th</sup> September, 2025
                                        </strong>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Fee
                                    </td>
                                    <td className="px-6 py-4">
                                        Rs. 200/- (Rupees Two Hundred only)
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Mode of Payment
                                    </td>
                                    <td className="px-6 py-4 space-y-2">
                                        <p>
                                            Through payment gateway and ONLINE (RTGS/NEFT) payment
                                            only. NO CASH / DD / Cheque will be acceptable.
                                        </p>
                                        <p>
                                            Exam Coordinators depositing fee directly in VVM’s account
                                            are requested to retain deposit slip with Transaction ID,
                                            Date & Time to be uploaded (in .jpeg format) on VVM
                                            offline payment mode option provided in their dashboard.
                                            Fee payment status will be updated after 48 hrs. of
                                            uploading the deposit slip/receipt.
                                        </p>
                                        <p className="text-red-600">
                                            This option is not applicable for individually registering
                                            students.
                                        </p>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        <strong>
                                            ONLINE Payment Details for
                                            <br />
                                            School Exam Coordinator Only
                                        </strong>
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        <p>
                                            <strong>Current Account Number:</strong> 7009607017
                                        </p>
                                        <p>
                                            <strong>Account Name:</strong> VIDYARTHI VIGYAN MANTHAN
                                        </p>
                                        <p>
                                            <strong>IFSC Code:</strong> IDIB000D008
                                        </p>
                                        <p>
                                            <strong>Branch Name & Add:</strong>
                                            <br />
                                            Indian Bank, Defence Colony, New Delhi
                                        </p>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Website URL
                                    </td>
                                    <td className="px-6 py-4 text-blue-600 underline">
                                        <a
                                            href="http://www.vvm.org.in"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            www.vvm.org.in
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 className="font-semibold text-lg text-gray-800 mt-6">
                        Important dates to Remember:
                    </h2>
                    <div className="rounded-lg overflow-x-auto shadow-sm border border-gray-300 mt-6">
                        <table className="w-full text-sm text-left text-gray-700 min-w-150">
                            <tbody>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800 w-1/3">
                                        Upload of VVM Study Material
                                    </td>
                                    <td className="px-6 py-4">
                                        16<sup>th</sup> Aug 2025
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Mock Tests
                                    </td>
                                    <td className="px-6 py-4">
                                        01<sup>st</sup> September, 2025 onwards
                                    </td>
                                </tr>

                                {/* Level-I Exam Dates */}
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Date of Examination (Level-I) (Login any day)
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        <p>
                                            <strong>VI</strong> – 28<sup>th</sup> October, 2025 and/or
                                            31<sup>st</sup> October, 2025
                                        </p>
                                        <p>
                                            <strong>VII</strong> – 28<sup>th</sup> October, 2025
                                            and/or 31<sup>st</sup> October, 2025
                                        </p>
                                        <p>
                                            <strong>VIII</strong> – 29<sup>th</sup> October, 2025
                                            and/or 1<sup>st</sup> November, 2025
                                        </p>
                                        <p>
                                            <strong>IX</strong> – 29<sup>th</sup> October, 2025 and/or
                                            1<sup>st</sup> November, 2025
                                        </p>
                                        <p>
                                            <strong>X</strong> – 30<sup>th</sup> October, 2025 and/or
                                            2<sup>nd</sup> November, 2025
                                        </p>
                                        <p>
                                            <strong>XI</strong> – 30<sup>th</sup> October, 2025 and/or
                                            2<sup>nd</sup> November, 2025
                                        </p>
                                    </td>
                                </tr>

                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Time of Examination (Level-I)
                                    </td>
                                    <td className="px-6 py-4">
                                        10:00 AM to 06:00 PM (90 minutes)
                                        <br />
                                        <span className="font-medium text-gray-900">
                                            Students will be able to login only once.
                                        </span>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Declaration of Result (Level-I)
                                    </td>
                                    <td className="px-6 py-4">
                                        7<sup>th</sup> November, 2025
                                    </td>
                                </tr>

                                {/* Level-II Exam Dates */}
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800 align-top">
                                        Date of Examination (Level-II) (Login any day)
                                    </td>
                                    <td className="px-6 py-4">
                                        <strong>VI, VII, VIII, IX, X, XI</strong> – 19<sup>th</sup>{" "}
                                        November, 2025 and/or 23<sup>rd</sup> November, 2025
                                    </td>
                                </tr>

                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Time of Examination (Level-II)
                                    </td>
                                    <td className="px-6 py-4">
                                        10:00 AM to 06:00 PM (45 minutes)
                                        <br />
                                        Students will be able to login only once.
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Declaration of Result (Level-II)
                                    </td>
                                    <td className="px-6 py-4">
                                        27<sup>th</sup> November, 2025
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        One or Two-day State Camp
                                    </td>
                                    <td className="px-6 py-4">
                                        21<sup>st</sup> & 28<sup>th</sup> December, 2025 and 04
                                        <sup>th</sup> January, 2026 (any one day)
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                        Two-day National Camp
                                    </td>
                                    <td className="px-6 py-4">
                                        Date and Venue will be disclosed on 30<sup>th</sup> January,
                                        2026
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

export default RegistrationProcess;
