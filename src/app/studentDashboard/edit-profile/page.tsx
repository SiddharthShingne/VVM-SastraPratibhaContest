"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";

interface FormData {
  name: string;
  schoolName: string;
  studentMobile: string;
  studentEmail: string;
  dob: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
  address: string;
  grade: string;
  gender: string;
  howDidYouGetToKnowAboutVVM: string;
}

export default function EditProfile() {
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("FORM DATA:", data);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-md">

      <h1 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-8 tracking-wide">
        EDIT STUDENT PROFILE
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <InputField
          required
          label="Full Name"
          registration={register("name", { required: true })}
        />

        <InputField
          required
          label="School Name"
          registration={register("schoolName", { required: true })}
        />

        <InputField
          label="Student Mobile Number"
          type="tel"
          registration={register("studentMobile")}
        />

        <InputField
          label="Student Email"
          type="email"
          registration={register("studentEmail")}
        />

        <InputField
          required
          label="Date Of Birth"
          type="date"
          registration={register("dob", { required: true })}
        />

        <InputField
          label="Parent/Guardian Full Name"
          registration={register("parentName")}
        />

        <InputField
          required
          label="Parent Mobile Number"
          type="tel"
          registration={register("parentMobile", { required: true })}
        />

        <InputField
          required
          label="Parent Email"
          type="email"
          registration={register("parentEmail", { required: true })}
        />

        <InputField
          required
          label="Address"
          registration={register("address", { required: true })}
        />

        {/* Dropdowns */}
        <Dropdown
          name="grade"
          label="Grade"
          options={[6, 7, 8, 9, 10, 11, 12].map(g => ({
            label: `${g}`,
            value: String(g)
          }))}
          onChange={(e) => setValue("grade", e.target.value)}
        />

        <Dropdown
          name="gender"
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" }
          ]}
          onChange={(e) => setValue("gender", e.target.value)}
        />

        <Dropdown
          name="howDidYouGetToKnowAboutVVM"
          label="How did you get to know about VVM?"
          options={[
            { label: "Website", value: "website" },
            { label: "School Circular/Teacher", value: "school" },
            { label: "State Coordinator", value: "state" },
            { label: "News / Print Media", value: "news" },
            { label: "NCSM", value: "ncsm" },
            { label: "Social Media", value: "social" },
            { label: "Friend/Family", value: "family" }
          ]}
          onChange={(e) =>
            setValue("howDidYouGetToKnowAboutVVM", e.target.value)
          }
        />

      </div>

      {/* BUTTON */}
      <div className="mt-10">
        <button
          onClick={handleSubmit(onSubmit)}
          className="
            px-8 py-3
            bg-[#17395c]
            text-white
            rounded-xl
            hover:bg-[#0f2742]
            transition
            shadow-md hover:shadow-lg
          "
        >
          Submit
        </button>
      </div>
    </div>
   )
  }