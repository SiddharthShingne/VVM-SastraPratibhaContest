import { Apple, Smartphone, LaptopMinimal } from 'lucide-react';

export default function MobileAppInstruction() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">

        <button className="flex items-center gap-2 px-3 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition">
          <span><Smartphone /></span>
          Download APK file
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-500 shadow-md hover:scale-105 transition">
          <span><Apple /></span>
          Download iOS App
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 shadow-md hover:scale-105 transition">
          <span><LaptopMinimal /></span>
          Download Apple File
        </button>

      </div>

      {/* Heading */}
      <h2 className="font-semibold text-gray-800 mb-3">
        Important Instructions for Final Exam/Practice Test
      </h2>

      <p className="text-gray-400 mb-4">Read all the instructions carefully.</p>

      {/* Instructions List */}
      <ol className="list-decimal pl-6 space-y-3 text-gray-600 leading-relaxed">

        <li>
          Final Exam/Practice Test is scheduled with the intent to give look and
          feel of real time exam environment and make students acquainted with
          Exam App and its features.
        </li>

        <li>
          Keep your laptop devices charged and power backup in desktop devices
          while attempting Final Exam.
        </li>

        <li>
          Disable screen lock or increase idle time while attempting the Mock
          Exam (so that it doesn’t lock) as it will also be counted as minimize
          attempt.
        </li>

        <li>
          Final Exam contains the Question Paper of VVM 2024-25 session and has
          no connection with current year’s syllabus as well as pattern of
          question paper.
        </li>

        <li>
          This Final Test is designed as per the Syllabus and Pattern of last
          year’s Final Exam. Pattern and Syllabus will change in the Final Exam
          according to this year’s pattern, syllabus and scheme.
        </li>

        <li>
          You can choose the Language of Exam from the options provided. Choose
          your secondary Language if you wish to see the questions in other
          language as well.
        </li>

        <li>
          You can switch between primary and secondary languages during the
          exam.
        </li>

        <li>
          App is enabled with all the features similar to Final Exam hence there
          will be no carry forward of the time remaining from stipulated time if
          any candidate completes Section-A or Section-B before time.
        </li>

        <li>
          If any student is not able to complete Section-A in the stipulated time
          he/she will be automatically redirected to the Section-B.
        </li>

        <li>
          To give Final Test follow the steps given in App.
        </li>

        <li>
          Desktop Exam App works in Online Mode. Don’t worry if you get
          disconnected from internet after starting the exam, once you finish
          your exam, it provides you with an option to download the answer sheet
          and send it via email or to upload it later.
        </li>

        <li>
          Do not try to minimize, turn off Internet/WiFi, play with keyboard,
          power / sounds / camera buttons, switch between Apps/Tabs etc. during
          the exam, 3 such attempts will lead to auto ending of your exam.
        </li>

        <li>
          Share the Answer Sheet through the options provided or through email
          provided on the submission screen.
        </li>

        <li>
          In case of submission of answer sheet via email you will not be able to
          see the Final exam result.
        </li>

      </ol>
    </div>
  );
}