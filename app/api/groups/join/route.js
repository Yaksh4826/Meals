import Group from "@/app/models/Group";
import { connectDB } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  const { joinCode, userId } = await request.json();

  // DO NOT shadow the model
  const group = await Group.findOne({ joinCode });

  if (!group) {
    return NextResponse.json({
      success: false,
      message: "Failed to find the Group",
    });
  }

  // Push userId correctly
  group.members.push(userId);

  await group.save();

  return NextResponse.json({
    success: true,
    message: "User added to group",
    group,
  });
}
