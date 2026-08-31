
import React from "react";
import Link from "next/link";

const Level1 = () => {
  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">

            <h6 className="text-white text-[27px] font-medium mb-1  md:pl-40">
              Level-I
            </h6>

            <nav>
              <ol className="flex items-center text-white text-[12px] whitespace-nowrap md:pl-40">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li className="mx-2">{">"}</li>

                <li>Exam Details</li>

                <li className="mx-2">{">"}</li>

                <li className="text-white">Level-I</li>
              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* Disputes Section */}
      <div className="bg-white py-16 w-500px md:px-40 p-6">
        <div className="container mx-auto px-4 py-5">

          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]"></div>

            <div className="p-8">

              {/* Title */}
              <h2 className="text-[32px] font-black text-[#17395c] text-center mb-5">
                School-Level Examination
                (Class Wise): Level-I
              </h2>

              {/* Content */}
              <p className="text-[17px] leading-[1.8] text-left text-[#4f6480] mt-2">
                Level – I school level examination will be of one hour and thirty minutes duration
                with 100 multiple choice questions - each weighted for 4 Marks. The question paper
                will be in two sections, viz. <strong>Section-A</strong> and <strong>Section-B</strong>. <br /> There is no negative marking in
                <strong> Section-A</strong>.<br /> Incorrect answers will incur a penalty of -1 Mark (0.25% Negative Marking)
                in <strong>Section-B</strong>. <br /> <br /> The examination will consist <strong>Section-A</strong> (comprising 40 questions from
                the study material Indian Contributions to Science and Life Stories of Tri-Shakti : Anna
                Mani, Asima Chatterjee and Rohini Godbole (to be provided by Vijnana Bharati) &
                <strong> Section-B</strong> (comprising 60 questions based on the VVM Syllabus (Based on Text Books
                of NCERT & various State Boards Curriculum) & Logic and Reasoning (open source).
                A detailed syllabus is provided on VVM’s website. <br /> The examination will be conducted
                class-wise. Evaluation of students will be based on their performance at each level.
              </p>

              {/* =====================================================
                  STUDY MATERIAL
              ====================================================== */}
              <div className="mb-10">
                <br />
                <h2 className="text-[24px] sm:text-[28px] font-bold text-[#17395c] mb-3">
                  Study Material
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse border border-[#5ca8c5] text-[12px] sm:text-[13px]">
                    <thead>
                      <tr className="bg-[#6fa0b4] text-white">
                        <th className="border border-[#5ca8c5] px-2 py-1 text-left font-semibold">
                          Class/Study Material
                        </th>
                        <th className="border border-[#5ca8c5] px-2 py-1 text-center font-semibold">
                          VI & VII
                        </th>
                        <th className="border border-[#5ca8c5] px-2 py-1 text-center font-semibold">
                          VIII & IX
                        </th>
                        <th className="border border-[#5ca8c5] px-2 py-1 text-center font-semibold">
                          X & XI
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[#4f6480]">
                      <tr>
                        <td className="border border-[#5ca8c5] px-2 py-1 font-medium">
                          Indian Contributions to Science
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1 text-center">
                          Volume-I
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1 text-center">
                          Volume-II
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1 text-center">
                          Volume-III
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#5ca8c5] px-2 py-1 font-medium">
                          Life Stories of Tri-Shakti
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1 text-center">
                          Anna Mani
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1 text-center">
                          Asima Chatterjee
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1 text-center">
                          Rohini Godbole
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#5ca8c5] px-2 py-1 font-medium">
                          Logic and Reasoning
                        </td>
                        <td
                          colSpan={3}
                          className="border border-[#5ca8c5] px-2 py-1 text-center"
                        >
                          Open Source
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#5ca8c5] px-2 py-1 font-medium">
                          Science and Mathematics from Text Books
                        </td>
                        <td
                          colSpan={3}
                          className="border border-[#5ca8c5] px-2 py-1 text-center"
                        >
                          VVM Syllabus
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              {/* =====================================================
                  PATTERN OF QUESTION PAPER - BASIC
              ====================================================== */}
              <div className="mb-10">
                <h2 className="text-[24px] sm:text-[28px] font-bold text-[#17395c] mb-3">
                  The Pattern of the Question Paper:
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] border-collapse border border-[#5ca8c5] text-[12px] sm:text-[13px]">
                    <tbody className="text-[#4f6480]">
                      <tr>
                        <td className="w-[180px] border border-[#5ca8c5] px-2 py-1 font-medium">
                          Content
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1">
                          VI, VII, VIII, IX, X, XI
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#5ca8c5] px-2 py-1 font-medium">
                          No. of Questions
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1">
                          100*
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-[#5ca8c5] px-2 py-1 font-medium">
                          Marks
                        </td>
                        <td className="border border-[#5ca8c5] px-2 py-1">
                          400
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            

              {/* Content */}
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Answers to Section-B will be evaluated only if a student secures equal
                  to or more than 50% (i.e., equal to or more than 80 Marks) in Section-A.
                </li>

                <li>
                  Merit list will be prepared considering the marks scored in both sections.
                </li>

                <li>
                  Top rankers (per class) based on total marks scored (merit) in both
                  sections, namely Section-A & Section-B thus will be selected for
                  participation in State Level Camp (Level-II).
                </li>
              </ul>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Level1;