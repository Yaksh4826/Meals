import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function POST(request) {
    await connectDB();

    const response = await request.json();
    console.log(response)
    const { name, email, password } = response;
    console.log(password)
    // generating the salt and hash and then saving it to create the user

    try {
       const salt = await bcrypt.genSalt(10);

    const hash =  await bcrypt.hash(password, salt);
            const createdUser = await User.create({ name: name, password: hash, email: email });
                return NextResponse.json({ success: true, message: "successfully account is created", user: createdUser });

    } catch (e) {

        return NextResponse.json({ message: e, success: false });
    }


}