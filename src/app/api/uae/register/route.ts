import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.VVM_API_BASE_URL!;
const TOKEN = process.env.VVM_TOKEN!;

function getBoardId(board: string) {
  switch (board) {
    case "ICSE":
      return "1";
    case "CBSE":
      return "2";
    case "IGCSE":
      return "5";
    case "IB":
      return "6";
    default:
      return "";
  }
}

function getGenderValue(gender: string) {
  switch (gender) {
    case "Male":
      return "1";
    case "Female":
      return "2";
    default:
      return "3";
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const body = new URLSearchParams({
      country_code: "AE",
      narmwreToken: TOKEN,

      fullName: payload.fullName || "",
      dob: payload.dob || "",
      emirate_id: payload.emiratesId || "",
      exam_lang: "14",
      gender: getGenderValue(payload.gender),
      hear: "1",

      password: payload.password || "",
      cpassword: payload.confirmPassword || "",

      country: "UAE",

      // original VVM form expects ids for some of these
      state_id: payload.stateId || "",
      dist_id: payload.distId || "",
      city_id: payload.cityId || "",

      board_id: getBoardId(payload.board),
      region: payload.region || "",
      gcc_school_id: payload.schoolId || "",
      sch_name: payload.schoolName || "",

      grade: payload.grade || "",

      name_1: "Mr",
      parent_full_name: payload.parentName || "",
      parent_mobile: payload.parentMobile || "",
      parent_email: payload.parentEmail || "",

      student_mobile: payload.studentMobile || "",
      whatsapp_mobile: payload.whatsappMobile || "",
      student_email: payload.studentEmail || "",

      OTP: payload.emailOtp || "",
      receivedOTP: payload.emailOtp || "",
      select1: "on",
    });

    const response = await fetch(`${BASE_URL}sif/register/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json({
      success: !!data?.status,
      message: data?.status ? "Registration successful" : "Registration failed",
      data,
    });
  } catch (error) {
    console.error("register error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to register" },
      { status: 500 }
    );
  }
}