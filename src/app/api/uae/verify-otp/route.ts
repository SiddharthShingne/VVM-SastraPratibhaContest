import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.VVM_API_BASE_URL!;
const TOKEN = process.env.VVM_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const body = new URLSearchParams({
      email,
      otp,
      narmwreToken: TOKEN,
    });

    const response = await fetch(`${BASE_URL}verify-email-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json({
      success: data?.status === true,
      message: data?.status === true ? "OTP verified successfully" : "Invalid OTP",
      data,
    });
  } catch (error) {
    console.error("verify-otp error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}