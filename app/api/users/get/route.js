import { NextResponse } from "next/server";
import { headers } from "next/headers";
export async function GET(request) {
  try {
   const h = await headers();
   const userEmail = await h.get("x-userEmail");
   return NextResponse.json({ success: true, userEmail });
    }

   catch (error) {
    console.error("Error in /api/users/get:", error);
    return NextResponse.json(
      { success: false, message: "Unable to process request" },
      { status: 500 }
    );
  }
}