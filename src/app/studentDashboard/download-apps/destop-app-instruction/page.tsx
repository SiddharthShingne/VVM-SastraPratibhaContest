"use client";

export default function DestopAppInstruction() {
  return (
   <>
       <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* STEP 1 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-red-500 mb-4">Step 1</h2>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left */}
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>No need to install “SafeExamBrowser” App if you have already installed it. Or</li>
              <li>Download the “SafeExamBrowser” from the below button by selecting your OS.</li>
              <li>Install the “SafeExamBrowser” App with admin permission.</li>
              <li>Make sure that the “SafeExamBrowser” App is installed on your computer.</li>
            </ol>

            {/* Right Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow">
                Download Safe Exam Browser
                <div className="text-xs font-normal" href="">Windows 10 and above OS File</div>
              </button>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow">
                Download Safe Exam Browser
                <div className="text-xs font-normal">Windows 8 and below OS File</div>
              </button>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow">
                Download Safe Exam Browser
                <div className="text-xs font-normal">MAC OS File</div>
              </button>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-red-500 mb-4">Step 2</h2>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left */}
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Make sure you have downloaded the Final Exam Level 2 App.</li>
              <li>
                Download Final Exam Level 2 SEB file
                <span className="text-blue-600 underline ml-1">
                  (vvm_final_exam_level_2.seb)
                </span>
                or use the link provided.
              </li>
              <li>Now select this file, right-click and open with “SafeExamBrowser” App.</li>
              <li>This will open the Final Exam App in the “SafeExamBrowser” App.</li>
              <li>Ensure you have installed VVM Exam App after 05:PM on 18th November, 2025.</li>
              <li>Make sure you are able to log in to the App and see the Final Exam Level 2 option in the Menu.</li>
              <li>If you have any queries/problems during installation, please refer to the document “How to Attempt Exam from Desktop App”.</li>
            </ol>

            {/* Right */}
            <div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg shadow">
                Download Final Exam Level 2 SEB file
                <div className="text-xs font-normal">(vvm_final_exam_level_2.seb)</div>
              </button>
            </div>
          </div>
        </div>

        {/* IMPORTANT INSTRUCTIONS */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            Important Instructions for Final Exam/Practice Test
          </h3>

          <p className="text-gray-400 mb-4">Read all the instructions carefully.</p>

          <ol className="list-decimal pl-5 space-y-2 text-gray- reminder text-gray-600">
            <li>Final Exam/Practice Test is scheduled with the intent to give look and feel of real time exam environment and make students acquainted with Exam App and its features.</li>
            <li>Keep your laptop devices charged and power backup in desktop devices while attempting Final Exam.</li>
            <li>Disable screen lock or increase idle time while attempting the Mock Exam.</li>
            <li>Final Exam contains the Question Paper of VVM 2024-25 session.</li>
            <li>This Final Test is designed as per the Syllabus and Pattern of last year’s Final Exam.</li>
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

          <p className="mt-4 font-semibold text-gray-700">Team VVM</p>
        </div>

      </div>
    </div>
   </>
  );
}
