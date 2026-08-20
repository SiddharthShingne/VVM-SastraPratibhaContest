
import React from "react";
import Link from "next/link";

const Level2 = () => {
  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">

            <h6 className="text-white text-[27px] font-medium mb-1  md:pl-40 ">
              Level-II
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

                <li className="text-white">Level-II</li>
              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* Disputes Section */}
      <div className="bg-white w-500px md:px-40 p-6">
        <div className="container mx-auto px-4 py-5">

          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]"></div>

            <div className="p-8">

              {/* Title */}
              <h2 className="text-[32px] font-black text-[#17395c] text-center mb-5">
                State Level Camp (SLC): Level-II
              </h2>

              {/* Content */}
              <p className="text-[17px] leading-[1.8] text-left text-[#4f6480] mt-2">
                The top 25 rankers from each class for every state will
                be identified to participate in the one or two-day State
                Level Camp (SLC). The camp will be organized at any
                location within the state.
              </p>
              <br />
              <p className="text-[17px] leading-[1.8] text-left text-[#4f6480] mt-2">
                The State Level Camp will focus on ApplicationOrientated Multiple Choice Questions, Hands-On
                Activities, Observation and Analysis, Situational ProblemSolving Ability, and a series of other activities. States will
                be clubbed according to the number of students who
                appeared for the examination, as per consideration of
                their geographical and cultural resemblance, and the
                convenience of the students.
              </p>
              <br />
              <p className="text-[17px] leading-[1.8] text-left text-[#4f6480] mt-2">
                Selected students will have to bear their travel expenses
                to attend the State Level Camp. No travel support for this
                purpose will be provided. The venue and other details
                will be updated on the website as well as communicated
                to all selected students by the respective state
                coordinator(s).
              </p>

            </div>
          </div>

          <p className="text-[17px] leading-[1.8] text-left text-[#4f6480] bg-amber-100 px-8 py-4 rounded-2xl">
            <strong>Displaying the Marks Obtained/
              Secured</strong>- Marks secured/obtained by
            the students will be available on their
            dashboard after one week of the declaration
            of the result. Students can login into their
            VVM account to check the same.
            <br />
            <br />
            <strong>Tiebreaker</strong>- In case there is a tie in
            rankings, the student(s) will be invited for
            Viva-Voce comprising three questions, and
            the one scoring the highest mark(s) will be
            declared as the winner.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Level2;