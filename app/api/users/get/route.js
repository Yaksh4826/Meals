import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    console.log(request)
    const user = request?.user ?? null;

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error in /api/users/get:", error);
    return NextResponse.json(
      { success: false, message: "Unable to process request" },
      { status: 500 }
    );
  }
}