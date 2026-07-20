import Group from "@/app/models/Group";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/dbConnect";



export async function POST(request) {
    try {
        await connectDB();

        const data = await request.json();
        const { GroupName, userId } = data;

        const createdGroup = await Group.create({ GroupName: GroupName, createdBy: userId, members: [userId] });
        return NextResponse.json({ success: true, group: createdGroup })



    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error })
    }


}
