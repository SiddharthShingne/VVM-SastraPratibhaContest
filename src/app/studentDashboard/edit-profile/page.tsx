
"use client";

import { useState, ChangeEvent } from "react";
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    schoolName: "",
    studentMobile: "",
    studentEmail: "",
    dob: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    address: "",
    grade: "",
    gender: "",
    howDidYouGetToKnowAboutVVM: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    
      <div className="max-w-6xl mx-auto bg-white">

        <h1 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-8 tracking-wide">
          EDIT STUDENT PROFILE
        </h1>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputField
            required
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            required
            label="School Name"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
          />

          <InputField
            label="Student Mobile Number"
            name="studentMobile"
            type="tel"
            value={formData.studentMobile}
            onChange={handleChange}
          />

          <InputField
            label="Student Email"
            name="studentEmail"
            type="email"
            value={formData.studentEmail}
            onChange={handleChange}
          />

          <InputField
            required
            label="Date Of Birth "
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />

          <InputField
            label="Parent/Guardian Full Name"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
          />

          <InputField
            required
            label="Parent/Guardian Phone/Mobile Number"
            name="parentMobile"
            type="tel"
            value={formData.parentMobile}
            onChange={handleChange}
          />

          <InputField
            required
            label="Parent/Guardian Email-Id "
            name="parentEmail"
            type="email"
            value={formData.parentEmail}
            onChange={handleChange}
          />

          <InputField
            required
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          {/* Grade Select */}
          <Dropdown
            label="Grade"
            name="grade"
            options={[6, 7, 8, 9, 10, 11, 12].map((g) => ({ label: `${g}`, value: String(g) }))}
            value={formData.grade}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, grade: e.target.value }))
            }
          />

          {/* Gender Select */}
          <Dropdown
            label="Gender"
            name="gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" }
            ]}
            value={formData.gender}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gender: e.target.value }))
            }
          />
          {/* VVM Info Select */}
          <Dropdown
            label="How did you get to know about VVM?"
            name="howDidYouGetToKnowAboutVVM"
            options={[
              { label: "Website", value: "website" },
              { label: "School Circular/Teacher", value: "School Circular/Teacher" },
              { label: "State Coordinator", value: "state-coordinator" },
              { label: "News / Print Media", value: "news-print-media" },
              { label: "National Council of Science Museums", value: "ncsm" },
              { label: "Social Media (Facebook, Instagram, Twitter, YouTube)", value: "social-media" },
              { label: " Friend-Family", value: "friend-family" },

            ]
            }
            value={formData.howDidYouGetToKnowAboutVVM}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, howDidYouGetToKnowAboutVVM: e.target.value }))
            }
          />

        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm">
            Submit
          </button>
        </div>
      </div>
    // </div>

  );
}
