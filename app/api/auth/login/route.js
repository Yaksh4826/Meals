import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function POST(request) {
    await connectDB();


    const data = await request.json()
    console.log(data)
    const { email, password } = data;
    console.log(data.email)

    //   First we need to check if the account exists or not 

    try {
        const existedUser = await User.findOne({ email: email });
        if (!existedUser) {
            return NextResponse.json({ success: false, message: "Account does not exist " });

        }
        console.log(existedUser)
        const result = await bcrypt.compare(password, existedUser.password);
        if (!result) {
            return NextResponse.json({ success: false, message: "Incorrect password, please try again." });

        }
        // now checks are done correct password so we need to givee token and confirmation
        const key = process.env.JWT_SECRET;
        const token = await jwt.sign({ email: existedUser.email }, key);
        const cookieStore = await cookies();
        cookieStore.set("AUTH", token);

        return NextResponse.json({ success: true, message: "Successfully Logged in." });

    } catch (e) {

        return NextResponse.json({ message: e, success: false });
    }


}