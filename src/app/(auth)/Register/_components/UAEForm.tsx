
"use client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

import {
  registerUaeStudent,
  sendUaeOtp,
  verifyUaeOtp,
  RegistrationFormPayload,
} from "@/services/uaeService";
import { error } from "console";

type RegistrationForm = RegistrationFormPayload;

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "Others" },
];

const boards = [
  { label: "CBSE", value: "CBSE" },
  { label: "ICSE", value: "ICSE" },
  { label: "IB", value: "IB" },
  { label: "IGCSE", value: "IGCSE" },
];

const grades = [
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
];
// contry code type
// type CountryType = {
//   value: string;
//   label: string;
//   code: number;
// };
type Props = {
  countries: {
    value: string;
    label: string;
    code: string;
  }[];
};

export default function UAEForm({ countries }: Props) {

  // export default function UAEForm({ country }: { country: CountryType | undefined }) {

  const [open, setOpen] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  
  // const [errors, setErrors] = useState<Record<string, string | null>>({});

  const [form, setForm] = useState<RegistrationForm>({
    fullName: "",
    dob: "",
    emiratesId: "",
    gender: "",
    studentMobile: "",
    studentEmail: "",
    grade: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    board: "",
    country: countries.find(c => c.value === "uae")?.code || "", // default to 3 (UAE) or you can set it to the actual country code if available 
    city: "",
    pincode: "",
    schoolAddress: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    emailOtp: "",


  });



  // popup code
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
  });
  // 


  // const country_code = country?.code || 3; // default to 3 (UAE) if country is undefined
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendOtp = () => {

    // ✅ ADD THIS HERE (TOP pe)
    if (otpSent && !otpVerified) {
      alert("OTP already sent. Please verify it first.");
      return;
    }

    if (!getValues("parentEmail")) {
      setError("parentEmail", {
        type: "manual",
        message: "Enter parent email first",
      });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedOtp(otp);
    setOtpSent(true);
    setOtpVerified(false);
    console.log("Generated OTP:", otp);
    alert("OTP sent (check console for demo)");
  };
  const verifyOtp = () => {
    const otpValue = getValues("emailOtp")?.trim();

    if (otpValue === generatedOtp) {
      setOtpVerified(true);
      alert("OTP Verified ✅"); // 👈 ADD THIS
    } else {
      setError("emailOtp", {
        type: "manual",
        message: "Invalid OTP",
      });
    }
  };

  const onSubmit = async (data: RegistrationForm) => {
    if (!otpVerified) {
      await registerUaeStudent({ ...data });

      // await submitFormData(data); // 👈 ADD THIS
      alert("Please verify OTP before submitting");
      return;
    }

    try {
      setLoading(true);

      // 👇 selected country find karo
      const country_code = countries.find(
        (c) => c.value === "uae"   // ya dynamic use karo agar needed
      )?.code || "3"; // default to "3" for UAE if not found

      const payload = {
        ...data,
        country_code: String(country_code), // 👈 IMPORTANT FIX
      };

      console.log("Payload:", payload);

      const res = await registerUaeStudent(payload);

      await submitFormData(data); // 👈 yaha hona chahiye

      alert(res.message || "Registration successful");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };
  //  Popup tsx
  const submitFormData = async (formData: any) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setUserData({
          email: formData.studentEmail,   // from form
          username: data.username,        // from API
        });

        setShowPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };


  //  onblur

  // error={touchedFields.fullName ? errors.fullName : undefined}
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, touchedFields },
  } = useForm<RegistrationForm>({
    // mode: "onBlur", 
    mode: "all"
    // 🔥 important
    ,
    // reValidateMode: "onChange",
  });


  return (
    <div className="min-h-screen py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h1 className="text-xl font-bold tracking-tight text-[#2f5f8f] sm:text-2xl md:text-4xl text  ">
            Student Registration – UAE
          </h1>

          <Image
            src="/gcc/uae.webp"
            alt="UAE"
            width={70}
            height={70}
            className="h-auto w-12 object-contain sm:w-14 md:w-16"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Section title="Primary Details">
            <InputField
              label="Student Full Name"
              required
              placeholder="Enter full name"
              registration={register("fullName", {
                required: "Student Full Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabetical characters are allowed",
                },
              })}
              error={errors.fullName}
            />

            {/* <InputField
              label="Date of Birth"
              type="date"
              required
              registration={register("dob", {
                required: "Date of Birth is required",
              })}
              error={ touchedFields?.dob && errors?.dob
    ? errors.fullName
    : undefined}
            /> */}

            <InputField
              label="Date of Birth"
              type="date"
              required
              registration={register("dob", {
                required: "Date of Birth is required",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "Date of Birth must be in DD-MM-YYYY format",
                },
              })}
              error={errors.dob}
            />

            <InputField
              label="Emirates ID"
              required
              maxLength={15}
              placeholder="Enter Emirates ID"
              registration={register("emiratesId", {
                required: "Emirates ID is required",
                minLength: {
                  value: 15,
                  message: "Emirates ID must be 15 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Emirates ID must be 15 characters",
                },
              })}
              error={touchedFields?.emiratesId && errors?.emiratesId
                ? errors.emiratesId
                : undefined}
            />

            <SelectField
              label="Gender"
              required
              options={genders}
              registration={register("gender", {
                required: "Gender is required",

              })}
              error={touchedFields?.gender && errors?.gender
                ? errors.gender
                : undefined}
            />

            <InputField
              label="Student Mobile"
              placeholder="Enter mobile"
              registration={register("studentMobile", {
                required: "Student Mobile is required",
                pattern: {
                  value: /^[0-9]{9,10}$/,
                  message: "Student Mobile must be 10 digits",
                },
              })}
              error={touchedFields?.studentMobile && errors?.studentMobile
                ? errors.studentMobile
                : undefined}
            />

            <InputField
              label="Student Email"
              type="email"
              placeholder="Enter email"

              registration={register("studentEmail", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address (e.g. name@example.com)",
                },
              })}

              error={errors.studentEmail}
            />

            <SelectField
              label="Class / Grade"
              required
              options={grades}
              registration={register("grade", {
                required: "Grade is required",
              })}
              error={touchedFields?.grade && errors?.grade
                ? errors.grade
                : undefined}
            />
          </Section>

          <Section title="Login Details">
            <InputField
              label="Password"
              type="password"
              required
              placeholder="Enter password"
              registration={register("password", {
                required: "Password is required",

                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must be at least 6 characters, include uppercase, lowercase, number and special character",
                }
              })}
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              required
              placeholder="Confirm password"
              registration={register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword}
            />
          </Section>

          <Section title="School Details">
            <InputField
              label="School Name"
              required
              placeholder="Enter school name"
              registration={register("schoolName", {
                required: "School Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabetical characters are allowed",
                },
              })}
              error={errors.schoolName}
            />

            <SelectField
              label="Board"
              required
              options={boards}
              registration={register("board", {
                required: "Board is required",
              })}
              error={touchedFields?.board && errors?.board
                ? errors.board
                : undefined}
            />



            <InputField
              label="Country"
              disabled
              registration={register("country")}
              // error={touchedFields?.fullName && errors?.fullName
              //   ? errors.fullName
              //   : undefined}
              value={countries.find(c => c.value === "uae")?.label || ""}
            />


            <InputField
              label="Pincode"
              required
              placeholder="Enter pincode"
              registration={register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{5,6}$/,
                  message: "Pincode must be 5 or 6 digits",
                },
              })}
              error={touchedFields?.pincode && errors?.pincode
                ? errors.pincode
                : undefined}
            />

            <div className="md:col-span-2">
              <TextAreaField
                label="School Address"
                rows={3}
                required
                placeholder="Enter school address"
                registration={register("schoolAddress", {
                  required: "School Address is required",

                })}
                error={errors.schoolAddress}
              />
            </div>
          </Section>

          <Section title="Parent Details">
            <InputField
              label="Parent Name"
              required
              placeholder="Enter parent name"
              registration={register("parentName", {
                required: "Parent Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabetical characters are allowed",
                },
              })}
              error={errors.parentName}
            />

            <InputField
              label="Parent Mobile"
              required
              placeholder="Enter parent mobile"
              registration={register("parentMobile", {
                required: "Parent Mobile is required",
                pattern: {
                  value: /^[0-9]{9,10}$/,
                  message: "Parent Mobile must be 9 or 10 digits",
                },
              })}
              error={errors.parentMobile}
            />



            <InputField
              label="Parent Email"
              type="email"
              required
              placeholder="Enter parent email"
              registration={register("parentEmail", {
                required: "Parent email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email (e.g. parent@example.com)",
                },
              })}
              error={errors.parentEmail}
            />

            {otpSent && (
              <InputField
                label="Email OTP"
                required
                placeholder="Enter OTP"
                registration={register("emailOtp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "OTP must be exactly 6 digits",
                  },
                })}
                error={errors.emailOtp}
              />
            )}

            <div className="flex flex-col gap-2 pt-2 md:col-span-2 sm:flex-row">
              <Button
                type="button"
                variant="primary"
                onClick={sendOtp}
                loading={otpLoading}
                loadingText="Sending OTP..."
              >
                Send OTP
              </Button>

              {otpSent && (
                <Button
                  type="button"
                  variant="success"
                  onClick={verifyOtp}
                  loading={verifyLoading}
                  loadingText="Verifying..."
                >
                  Verify OTP
                </Button>
              )}

            </div>
          </Section>

          {/* <Section title="Terms & Conditions">
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                Definitions
                License – shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
                Licensor – shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
                Legal Entity – shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
                You / Your – shall mean an individual or Legal Entity exercising permissions granted by this License.
                Source Form – shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.
                Object Form – form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.
                Work – shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).
                Derivative Works – shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.
                Contribution – shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution".
                Contributor – shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.
                Grant of Copyright License
                Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

                Grant of Patent License
                Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

                Redistribution
                You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
                You must give any other recipients of the Work or Derivative Works a copy of this License
                You must cause any modified files to carry prominent notices stating that You changed the files
                You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works
                If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation.
                if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.
                You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
                Submission of Contributions
                Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

                Trademarks
                This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

                Disclaimer of Warranty
                Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

                Limitation of Liability
                In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

                Accepting Warranty or Additional Liability
                While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.

                Dispute Resolution
                In the event of any dispute, grievance or RTI (Right to Information) complaint, the decision made by the VVM Core Committee shall be considered final and binding.

                END OF TERMS AND CONDITIONS
              </p>
              <div className="bg-gray-100 p-4 rounded-md">
                I have read the terms and conditions mentioned above and accept them.
                You must accept the terms.
                After registration, please logging in, And update your profile and proceed with payment to avoid any future disruptions.
              </div>
            </div>


          </Section> */}

<Section title="Terms & Conditions">
  {/* <div className="bg-white p-4 rounded-lg border width-screen border-none shadow-sm" > */}

    {/* Scrollable Terms Box */}
    {/* <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-md border-none text-sm text-gray-700 space-y-3 w-full shadow"> */}

    {/* <div className="bg-white p-4 rounded-lg width-auto shadow-md pr-4 "> */}

  {/* Scrollable Terms Box */}
  {/* <div className="h-64 overflow-y-auto bg-gray-10 p-4 rounded-md text-sm text-gray-700 space-y-3 width-auto shadow-md"> */}
            
            <div className="bg-white p-4 rounded-lg w-295 shadow-md ">
  <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-md text-sm text-gray-700 space-y-3 w-289 ">
            
      <h3 className="font-semibold text-gray-800">Definitions</h3>
      <p>
        License – shall mean the terms and conditions for use, reproduction, and distribution...
      </p>

      <h3 className="font-semibold text-gray-800">Grant of Copyright License</h3>
      <p>
        Subject to the terms and conditions of this License, each Contributor hereby grants...
      </p>

      <h3 className="font-semibold text-gray-800">Disclaimer of Warranty</h3>
      <p>
        Unless required by applicable law, Licensor provides the Work on an "AS IS" BASIS...
      </p>

      <h3 className="font-semibold text-gray-800">Limitation of Liability</h3>
      <p>
        In no event shall any Contributor be liable for damages including loss of goodwill...
      </p>

      <h3 className="font-semibold text-gray-800">Dispute Resolution</h3>
      <p>
        The decision made by the VVM Core Committee shall be final and binding.
      </p>

      <p className="text-center font-semibold text-gray-800">
        END OF TERMS AND CONDITIONS
      </p>
    </div>

    {/* Checkbox */}
    <div className="mt-4 flex items-start gap-2">
      <input
        type="checkbox"
        {...register("termsAccepted", {
          required: "You must accept the terms",
        })}
        className="mt-1"
      />
      <label className="text-sm text-gray-700">
        I have read the terms and conditions mentioned above and accept them.
      </label>
    </div>

    {/* Error Message */}
    {errors.termsAccepted && (
      <p className="text-red-500 text-sm mt-1">
        {errors.termsAccepted.message}
      </p>
    )}

    {/* Note */}
    <p className="text-red-500 text-sm mt-2">
      After registration, please login and update your profile and proceed with payment to avoid any future disruptions.
    </p>

  </div>
</Section>

          <div className="pt-4 text-center">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              loadingText="Submitting..."
              className="px-8 py-3"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </div>


      {/* // Popup UI */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50  ">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[400px]">

            {/* ✅ Tick Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center">
                <span className="text-green-500 text-3xl">✔</span>
              </div>
            </div>

            {/* ✅ Title */}
            <h2 className="text-lg font-semibold mb-2">
              You  Registered! 🎉
            </h2>

            {/* ✅ Message */}
            <p className="text-sm text-gray-600 mb-3">
              Registration for VVM 2026-27 Completed Successfully
            </p>

            {/* ✅ Dynamic Email */}
            <p className="text-sm text-gray-600 mb-1">
              Login credentials are emailed to{""}
              <span className="font-semibold">{userData.email}</span>.
            </p>

            {/* ✅ Dynamic Username */}
            <p className="text-sm font-medium mb-3">
              Username: {userData.username}
            </p>

            {/* ✅ Note */}
            <p className="text-xs text-gray-500 mb-4">
              If the credentials email is not in the INBOX, please check your Spam folder.
            </p>

            {/* ✅ Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="bg-purple-500 text-white px-6 py-2 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}



    </div>





  );
}
