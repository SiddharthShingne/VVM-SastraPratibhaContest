
"use client";
import Link from "next/link";

export default function RegistrationSection() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#162a4a] py-[50px]  ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">
            <h6 className="text-white text-[27px] font-medium mb-1">
              Register
            </h6>

            <nav>
              <ol className="flex items-center text-white text-[12px]">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="mx-2">{">"}</li>
                <li className="text-white">Register</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Registration Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#f7fbff] to-[#eef5fb] py-16">

        {/* Background Effects */}
        <div className="absolute -top-[100px] -left-[80px] w-[260px] h-[260px] bg-[radial-gradient(circle,rgba(23,57,92,0.12)_0%,transparent_70%)] rounded-full"></div>
        <div className="absolute -bottom-[100px] -right-[80px] w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(255,193,7,0.18)_0%,transparent_70%)] rounded-full"></div>

        <div className="container mx-auto px-4 relative z-10">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-[#17395c] to-[#295c8a] text-white text-[13px] font-bold px-5 py-2 rounded-full shadow-lg mb-4">
              Registration Open For 2026-27
            </span>

            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-[#17395c] mb-3">
              Choose Your Registration Type
            </h2>

            <p className="text-[#5f6f81] max-w-[700px] mx-auto leading-7">
              Select the suitable registration option and complete your enrollment easily.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-1 gap-6 justify-center items-center">

            {/* Student Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-[#17395c14] hover:-translate-y-2 transition duration-300  max-w-lg mx-auto">

              <div className="relative h-[250px] overflow-hidden">
                <img
                  src="/student-registration-images/images-of-register-page/student-registration.jpg"
                  alt="Student"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17395c40] to-[#17395c10]"></div>
              </div>

              <div className="text-center px-6 pb-6 pt-12 relative">

                {/* Icon */}
                <div className="w-[68px] h-[68px] bg-gradient-to-r from-[#f4df17] to-[#f7b500] text-[#17395c] flex items-center justify-center rounded-full text-2xl absolute -top-8 left-1/2 -translate-x-1/2 border-4 border-white shadow-lg">
                  👤
                </div>

                <h4 className="text-xl font-extrabold text-[#17395c] mb-2">
                  Student Registration
                </h4>

                <p className="text-[#66788a] text-sm leading-7 mb-5">
                  Register as an individual student and begin your journey with Vidyarthi Vigyan Manthan.
                </p>

                <Link
                  href="/registration/individual-student-registration"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#17395c] to-[#295c8a] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:-translate-y-1 transition"
                >
                  Register Now →
                </Link>
              </div>
            </div>

            {/* School Card */}
            {/* <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-[#17395c14] hover:-translate-y-2 transition duration-300"> */}

            {/* <div className="relative h-[250px] overflow-hidden">
                <img
                  src="/images-of-register-page/school-registration.jpg"
                  alt="School"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17395c40] to-[#17395c10]"></div>
              </div> */}

            {/* <div className="text-center px-6 pb-6 pt-12 relative"> */}

            {/* Icon */}
            {/* <div className="w-[68px] h-[68px] bg-gradient-to-r from-[#17395c] to-[#2c6aa0] text-white flex items-center justify-center rounded-full text-2xl absolute -top-8 left-1/2 -translate-x-1/2 border-4 border-white shadow-lg">
                  🏫
                </div> */}

            {/* <h4 className="text-xl font-extrabold text-[#17395c] mb-2">
                  School Registration
                </h4> */}

            {/* <p className="text-[#66788a] text-sm leading-7 mb-5">
                  Register your school and enable students to participate through your institution.
                </p> */}
            {/* 
                <Link
                  href="/Register"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#17395c] to-[#295c8a] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:-translate-y-1 transition"
                >
                  Register Now →
                </Link> */}
            {/* </div> */}
            {/* </div> */}

          </div>

          {/* Response Message */}
          <div className="hidden mt-5 p-4 rounded-lg text-sm font-medium"></div>

        </div>
      </div>
    </div>
  );
}