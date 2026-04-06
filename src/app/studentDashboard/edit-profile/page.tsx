/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import axiosInstance from "@/services/axiosInstance";
import { fetchStates, fetchDistricts } from "@/services/authService";

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
  state: string;
  district: string;
}

export default function EditProfile() {
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<FormData>();

  const [states, setStates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);

  // ✅ LOAD STATES
  useEffect(() => {
    const loadStates = async () => {
      const data = await fetchStates();
      setStates(data);
    };
    loadStates();
  }, []);

  // ✅ PREFILL FORM FROM LOCAL STORAGE (FIXED)
  useEffect(() => {
    const init = async () => {
      const raw = localStorage.getItem("user");
      if (!raw) return;

      const user = JSON.parse(raw);
      const d = user?.user_detail;
      if (!d) return;

      // 🔥 RESET (IMPORTANT FIX)
      reset({
        name: d.name || "",
        schoolName: d.school_name || "",
        studentMobile: d.student_mobile_number || "",
        studentEmail: d.student_email || "",
        dob: d.date_of_birth || "",
        parentName: d.parent_name || "",
        parentMobile: d.parent_phone_number || "",
        parentEmail: d.parent_email || "",
        address: d.address || "",
        gender: String(d.gender || ""),
        grade: String(d.class_id || ""),
        howDidYouGetToKnowAboutVVM: String(
          d.know_about_vvm_id || ""
        ),
        state: String(d.state_id || ""),
        district: String(d.district_id || ""),
      });

      // ✅ LOAD DISTRICTS AFTER STATE
      if (d.state_id) {
        const districtData = await fetchDistricts(
          String(d.state_id)
        );
        setDistricts(districtData);
      }
    };

    init();
  }, [reset]);

  // ✅ SUBMIT
  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        name: data.name,
        school_name: data.schoolName,
        student_mobile_number: data.studentMobile,
        student_email: data.studentEmail,
        date_of_birth: data.dob,
        parent_name: data.parentName,
        parent_phone_number: data.parentMobile,
        parent_email: data.parentEmail,
        address: data.address,
        class_id: data.grade,
        gender: data.gender,
        know_about_vvm_id: data.howDidYouGetToKnowAboutVVM,
        state_id: data.state,
        district_id: data.district,
      };

      console.log("Submitting Payload:", payload);

      await axiosInstance.post("/update-profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully");

      // ✅ UPDATE LOCAL STORAGE
      const raw = localStorage.getItem("user");
      if (raw) {
        const user = JSON.parse(raw);

        user.user_detail = {
          ...user.user_detail,
          ...payload,
        };

        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed");
    }
  };
  console.log("States in component:", states);
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-8">
        EDIT STUDENT PROFILE
      </h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Full Name" required registration={register("name")} />
        <InputField label="School Name" required registration={register("schoolName")} />
        <InputField label="Student Mobile Number" registration={register("studentMobile")} />
        <InputField label="Student Email" registration={register("studentEmail")} />
        <InputField label="Date Of Birth" type="date" required registration={register("dob")} />
        <InputField label="Parent Name" registration={register("parentName")} />
        <InputField label="Parent Mobile" required registration={register("parentMobile")} />
        <InputField label="Parent Email" required registration={register("parentEmail")} />
        <InputField label="Address" required registration={register("address")} />

        {/* GRADE */}
        <Dropdown
          name="grade"
          label="Grade"
          value={watch("grade") || ""}
          options={[
            { label: "6", value: "1" },
            { label: "7", value: "2" },
            { label: "8", value: "3" },
            { label: "9", value: "4" },
            { label: "10", value: "5" },
            { label: "11", value: "6" },
            { label: "12", value: "7" },
          ]}
          onChange={(e) => setValue("grade", e.target.value)}
        />

        {/* GENDER */}
        <Dropdown
          name="gender"
          label="Gender"
          value={watch("gender") || ""}
          options={[
            { label: "Male", value: "1" },
            { label: "Female", value: "2" },
            { label: "Other", value: "3" },
          ]}
          onChange={(e) => setValue("gender", e.target.value)}
        />

        {/* STATE */}
        <Dropdown
          name="state"
          label="State"
          value={watch("state") || ""}
          options={states.map((s: any) => ({
            label: s.name,
            value: String(s.id),
          }))}
          onChange={async (e) => {
            const value = e.target.value;

            setValue("state", value);
            setValue("district", "");

            const res = await fetchDistricts(value);
            setDistricts(res);
          }}
        />

        {/* DISTRICT */}
        <Dropdown
          name="district"
          label="District"
          value={watch("district") || ""}
          options={districts.map((d: any) => ({
            label: d.name,
            value: String(d.id),
          }))}
          onChange={(e) => setValue("district", e.target.value)}
        />

        {/* VVM SOURCE */}
        <Dropdown
          name="howDidYouGetToKnowAboutVVM"
          label="How did you get to know about VVM?"
          value={watch("howDidYouGetToKnowAboutVVM") || ""}
          options={[
            { label: "Website", value: "1" },
            { label: "School Circular/Teacher", value: "2" },
            { label: "State Coordinator", value: "3" },
            { label: "News / Print Media", value: "4" },
            { label: "NCSM", value: "5" },
            { label: "Social Media", value: "6" },
            { label: "Friend/Family", value: "7" },
          ]}
          onChange={(e) =>
            setValue("howDidYouGetToKnowAboutVVM", e.target.value)
          }
        />
      </div>

      <div className="mt-10">
        <button
          onClick={handleSubmit(onSubmit)}
          className="px-8 py-3 bg-[#17395c] text-white rounded-xl hover:bg-[#0f2742]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}