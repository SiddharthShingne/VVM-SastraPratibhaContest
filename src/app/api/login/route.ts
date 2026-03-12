import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.VVM_API_BASE_URL!;

interface RawLoginApiResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      username: string;
      [key: string]: unknown;
    };
  };
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const body = new URLSearchParams({
      username: payload.username || "",
      password: payload.password || "",
    });

    const response = await fetch(`${BASE_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    const data: RawLoginApiResponse = await response.json();

    if (!data?.status || !data?.data?.token) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message || "Login failed",
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      token: data.data.token,
      username: data.data.user.username,
    });
  } catch (error) {
    console.error("login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Login API error",
      },
      { status: 500 },
    );
  }
}
