// app/api/auth/logout/route.js

import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // ✅ Instruct the browser to delete the authToken cookie
    // By setting its value to empty and Max-Age to 0
    response.cookies.set("authToken", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}