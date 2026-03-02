"use client";
import { useState } from "react";

interface RegistrationForm {
  fullName: string;
  dob: string;
  emiratesId: string;
  gender: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  board: string;
  region: string;
  schoolName: string;
  grade: string;
  parentTitle: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
  studentMobile: string;
  studentEmail: string;
  emailOtp: string;
}

export default function UAEForm() {
  const titles = ["Mr", "Mrs", "Ms", "Dr"];
  const genders = ["Male", "Female"];
  const boards = ["CBSE", "ICSE", "IB", "IGCSE", "STATE"];
  const grades = ["6", "7", "8", "9", "10", "11"];

  const [form, setForm] = useState<RegistrationForm>({
    fullName: "",
    dob: "",
    emiratesId: "",
    gender: "",
    password: "",
    confirmPassword: "",
    country: "UAE",
    city: "",
    board: "",
    region: "",
    schoolName: "",
    grade: "",
    parentTitle: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    studentMobile: "",
    studentEmail: "",
    emailOtp: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.password || !form.confirmPassword) {
      alert("Please fill required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(form);
  };

  return (
    // <div className="container page-wrapper">
    //   <div className="header-title text-center">
    //     <h1>
    //       Student Registration – <b>UAE</b>
    //     </h1>
    //   </div>

    //   <form onSubmit={handleSubmit}>
    //     {/* PRIMARY DETAILS */}
    //     <div className="section-card">
    //       <div className="section-title">
    //         <span className="step">1</span> Primary Details
    //       </div>

    //       <div className="row g-3">
    //         <div className="col-md-4">
    //           <label>Student Full Name</label>
    //           <input
    //             className="form-control"
    //             name="fullName"
    //             value={form.fullName}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="col-md-4">
    //           <label>Date of Birth</label>
    //           <input
    //             type="date"
    //             className="form-control"
    //             name="dob"
    //             value={form.dob}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="col-md-4">
    //           <label>Emirates ID</label>
    //           <input
    //             className="form-control"
    //             name="emiratesId"
    //             value={form.emiratesId}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="col-md-4">
    //           <label>Gender</label>
    //           <select
    //             className="form-select"
    //             name="gender"
    //             value={form.gender}
    //             onChange={handleChange}
    //           >
    //             <option value="">Select Gender</option>
    //             {genders.map((g) => (
    //               <option key={g} value={g}>
    //                 {g}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //       </div>
    //     </div>

    //     {/* LOGIN DETAILS */}
    //     <div className="section-card">
    //       <div className="section-title">
    //         <span className="step">2</span> Login Details
    //       </div>

    //       <div className="row g-3">
    //         <div className="col-md-6">
    //           <label>Create Password</label>
    //           <input
    //             type="password"
    //             className="form-control"
    //             name="password"
    //             value={form.password}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="col-md-6">
    //           <label>Confirm Password</label>
    //           <input
    //             type="password"
    //             className="form-control"
    //             name="confirmPassword"
    //             value={form.confirmPassword}
    //             onChange={handleChange}
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     {/* SCHOOL DETAILS */}
    //     <div className="section-card">
    //       <div className="section-title">
    //         <span className="step">3</span> School Details
    //       </div>

    //       <div className="row g-3">
    //         <div className="col-md-4">
    //           <label>Country</label>
    //           <input
    //             className="form-control"
    //             value="UAE"
    //             disabled
    //           />
    //         </div>

    //         <div className="col-md-4">
    //           <label>City</label>
    //           <input
    //             className="form-control"
    //             name="city"
    //             value={form.city}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="col-md-4">
    //           <label>Board</label>
    //           <select
    //             className="form-select"
    //             name="board"
    //             value={form.board}
    //             onChange={handleChange}
    //           >
    //             <option value="">Select Board</option>
    //             {boards.map((b) => (
    //               <option key={b} value={b}>
    //                 {b}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //       </div>
    //     </div>

    //     {/* SUBMIT */}
    //     <div className="text-center mt-4">
    //       <button className="submit-btn" type="submit">
    //         Submit Registration
    //       </button>
    //     </div>
    //   </form>
    // </div> 

    <form onSubmit={handleSubmit} className="space-y-6">
  {/* PRIMARY DETAILS */}
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
        1
      </span>
      <h2 className="text-xl font-semibold text-gray-800">Primary Details</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          placeholder="e.g. Ahmed Khan"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm bg-white"
        >
          <option value="">Select Gender</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Standard / Grade</label>
        <select
          name="standard"
          value={form.standard}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm bg-white"
        >
          <option value="">Select Standard</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          placeholder="••••••••"
        />
      </div>
    </div>
  </div>

  {/* PARENT / GUARDIAN DETAILS */}
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
        2
      </span>
      <h2 className="text-xl font-semibold text-gray-800">Parent / Guardian Details</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
        <input
          type="text"
          name="parentName"
          value={form.parentName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          placeholder="e.g. Fatima Khan"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Mobile</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            +91
          </span>
          <input
            type="tel"
            name="parentMobile"
            value={form.parentMobile}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
            placeholder="98765 43210"
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Email</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            name="parentEmail"
            value={form.parentEmail}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
            placeholder="parent@example.com"
          />
          <button
            type="button"
            className="px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition shadow-sm whitespace-nowrap"
          >
            Send OTP
          </button>
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
            placeholder="Enter OTP sent to email"
          />
          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition shadow-sm whitespace-nowrap"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* SCHOOL DETAILS */}
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
        3
      </span>
      <h2 className="text-xl font-semibold text-gray-800">School Details</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <input
          type="text"
          value="UAE"
          disabled
          className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          placeholder="e.g. Dubai"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
        <select
          name="board"
          value={form.board}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm bg-white"
        >
          <option value="">Select Board</option>
          {boards.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>

  {/* SUBMIT BUTTON */}
  <div className="text-center">
    <button
      type="submit"
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Submit Registration
    </button>
  </div>
</form>
  );
}