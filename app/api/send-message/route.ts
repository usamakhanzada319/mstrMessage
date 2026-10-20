import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import { Message } from "@/app/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, content } = await request.json();

    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "user not found" },
        { status: 404 },
      );
    }
    //first check is user accepting meaagaes
    if (!user.isAcceptingMessage) {
      return Response.json(
        { success: false, message: "user is not accepting messages" },
        { status: 403 },
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("message addingg error", error);
    return Response.json(
      { success: false, message: "server Error" },
      { status: 500 },
    );
  }
}
