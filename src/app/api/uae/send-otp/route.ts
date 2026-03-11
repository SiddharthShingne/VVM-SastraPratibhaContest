import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.VVM_API_BASE_URL!;
const TOKEN = process.env.VVM_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const body = new URLSearchParams({
      email,
      type: "student",
      country: "AE",
      narmwreToken: TOKEN,
    });

    const response = await fetch(`${BASE_URL}send-email-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "OTP API failed", data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      data,
    });
  } catch (error) {
    console.error("send-otp error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}