"use client";

export default function DestopAppInstruction() {
  // Reusable button style
  const btnPrimary =
    "relative overflow-hidden inline-flex items-center justify-center w-full px-7 py-3 rounded-[14px] text-[15px] font-extrabold tracking-wide text-white border border-white/20 bg-gradient-to-br from-[#17395c] to-[#1f4e7a] shadow-[0_6px_20px_rgba(23,57,92,0.30)] hover:shadow-[0_10px_30px_rgba(23,57,92,0.40)] hover:-translate-y-0.5 hover:text-[#f4df17] active:scale-[0.97] transition-all duration-250 cursor-pointer";

  const btnSuccess =
    "relative overflow-hidden inline-flex items-center justify-center w-full px-7 py-4 rounded-[14px] text-[15px] font-extrabold tracking-wide text-white border border-white/20 bg-gradient-to-br from-[#1a6b4a] to-[#145c3d] shadow-[0_6px_20px_rgba(26,107,74,0.30)] hover:shadow-[0_10px_30px_rgba(26,107,74,0.40)] hover:-translate-y-0.5 hover:text-[#f4df17] active:scale-[0.97] transition-all duration-250 cursor-pointer";

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[1100px] mx-auto space-y-10">

        {/* ── STEP 1 ── */}
        <div className="relative rounded-[28px] overflow-hidden bg-white/75 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] before:content-[''] before:absolute before:top-0 before:left-0 before:h-[5px] before:w-full before:bg-gradient-to-r before:from-[#17395c] before:via-[#f4df17] before:to-[#17395c]">
          <div className="p-8">
            <h2 className="text-[26px] font-black text-[#17395c] text-center mb-6">
              Step 1
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left */}
              <ol className="list-decimal pl-5 space-y-2 text-[16px] text-[#4f6480] leading-[1.8]">
                <li>No need to install "SafeExamBrowser" App if you have already installed it. Or</li>
                <li>Download the "SafeExamBrowser" from the below button by selecting your OS.</li>
                <li>Install the "SafeExamBrowser" App with admin permission.</li>
                <li>Make sure that the "SafeExamBrowser" App is installed on your computer.</li>
              </ol>

              {/* Right */}
              <div className="space-y-4">
                <button className={btnPrimary}>
                  Download Safe Exam Browser
                  <span className="block text-xs font-normal mt-0.5">Windows 10 and above OS File</span>
                </button>
                <button className={btnPrimary}>
                  Download Safe Exam Browser
                  <span className="block text-xs font-normal mt-0.5">Windows 8 and below OS File</span>
                </button>
                <button className={btnPrimary}>
                  Download Safe Exam Browser
                  <span className="block text-xs font-normal mt-0.5">MAC OS File</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── STEP 2 ── */}
        <div className="relative rounded-[28px] overflow-hidden bg-white/75 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] before:content-[''] before:absolute before:top-0 before:left-0 before:h-[5px] before:w-full before:bg-gradient-to-r before:from-[#17395c] before:via-[#f4df17] before:to-[#17395c]">
          <div className="p-8">
            <h2 className="text-[26px] font-black text-[#17395c] text-center mb-6">
              Step 2
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left */}
              <ol className="list-decimal pl-5 space-y-2 text-[16px] text-[#4f6480] leading-[1.8]">
                <li>Make sure you have downloaded the Final Exam Level 2 App.</li>
                <li>
                  Download Final Exam Level 2 SEB file{" "}
                  <span className="text-[#17395c] font-bold underline">
                    (vvm_final_exam_level_2.seb)
                  </span>{" "}
                  or use the link provided.
                </li>
                <li>Now select this file, right-click and open with "SafeExamBrowser" App.</li>
                <li>This will open the Final Exam App in the "SafeExamBrowser" App.</li>
                <li>Ensure you have installed VVM Exam App after 05:PM on 18th November, 2025.</li>
                <li>Make sure you are able to log in to the App and see the Final Exam Level 2 option in the Menu.</li>
                <li>If you have any queries/problems during installation, please refer to the document "How to Attempt Exam from Desktop App".</li>
              </ol>

              {/* Right */}
              <div>
                <button className={btnSuccess}>
                  Download Final Exam Level 2 SEB file
                  <span className="block text-xs font-normal mt-0.5">(vvm_final_exam_level_2.seb)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── IMPORTANT INSTRUCTIONS ── */}
        <div className="relative rounded-[28px] overflow-hidden bg-white/75 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] before:content-[''] before:absolute before:top-0 before:left-0 before:h-[5px] before:w-full before:bg-gradient-to-r before:from-[#17395c] before:via-[#f4df17] before:to-[#17395c]">
          <div className="p-8">
            <h3 className="text-[20px] font-black text-[#17395c] mb-2">
              Important Instructions for Final Exam/Practice Test
            </h3>

            <p className="text-[#4f6480] text-[16px] mb-5">Read all the instructions carefully.</p>

            <div className="h-px bg-[rgba(23,57,92,0.1)] mb-5" />

            <ol className="list-decimal pl-5 space-y-2 text-[16px] text-[#4f6480] leading-[1.8]">
              <li>Final Exam/Practice Test is scheduled with the intent to give look and feel of real time exam environment and make students acquainted with Exam App and its features.</li>
              <li>Keep your laptop devices charged and power backup in desktop devices while attempting Final Exam.</li>
              <li>Disable screen lock or increase idle time while attempting the Mock Exam.</li>
              <li>Final Exam contains the Question Paper of VVM 2024-25 session.</li>
              <li>This Final Test is designed as per the Syllabus and Pattern of last year's Final Exam.</li>
              <li>You can choose the Language of Exam from the options provided.</li>
              <li>You can switch between primary and secondary languages during the exam.</li>
              <li>App is enabled with all the features similar to Final Exam.</li>
              <li>If any student is not able to complete Section-A in the stipulated time he/she will be automatically redirected to the Section-B.</li>
              <li>To give Final Test follow the steps given in App.</li>
              <li>Desktop Exam App works in Online Mode.</li>
              <li>Do not try to minimize or switch apps during the exam.</li>
              <li>Share the Answer Sheet through the options provided.</li>
              <li>In case of submission of answer sheet via email you will not be able to see the Final exam result.</li>
            </ol>

            <p className="mt-6 font-black text-[#17395c] text-[15px]">Team VVM</p>
          </div>
        </div>

      </div>
    </div>
  );
}