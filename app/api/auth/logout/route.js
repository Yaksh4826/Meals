
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function GET() {
    try {
        cookies().set("AUTH", " ");
        return NextResponse.json({ success: true, message: "Logged out of session successfully." })


    } catch (e) {

        return NextResponse.json({ message: e, success: false });
    }


}