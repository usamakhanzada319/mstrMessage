import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 },
    );
  }
  const userId = new mongoose.Types.ObjectId(session.user._id); //here convert string id to mongoose object id

  try {
    const result = await UserModel.aggregate([
      { $match: { _id: userId } },

      { $unwind: "$messages" },

      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!result || result.length === 0) {
      return Response.json({ success: false, message: [] }, { status: 200 });
    }
    return Response.json(
      { success: true, messages: result[0].messages },
      { status: 200 },
    );
  } catch (error) {
    console.error("unexpected error occured", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
