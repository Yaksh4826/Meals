import Group from "@/app/models/Group";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/dbConnect";

// Delete route 

export async function POST(request, {params}) {
    try {
        await connectDB();

    const {groupId} = await params;
    

        const deletedGroup = await Group.findOneAndDelete({ _id:groupId});
        return NextResponse.json({ success: true, deletedGroup })



    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error })
    }


}
