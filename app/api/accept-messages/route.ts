import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import { z } from "zod";

const acceptMessageSchema = z.object({
  isAcceptingMessage: z.boolean(),
});

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 },
    );
  }

  const userId = (session.user as User)._id;

  const body = await request.json();
  const result = acceptMessageSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { success: false, message: "isAcceptingMessage must be boolean" },
      { status: 400 },
    );
  }

  const { isAcceptingMessage } = result.data;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage },
      { new: true },
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Status updated",
        isAcceptingMessage: updatedUser.isAcceptingMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 },
    );
  }

  const userId = (session.user as User)._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
