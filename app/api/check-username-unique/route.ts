import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import { usernameValidation } from "@/app/schemas/signUpSchema";
import z from "zod";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return Response.json(
      {
        success: false,
        message: "Just GET method is allowed",
      },
      { status: 405 },
    );
  }

  dbConnect();
  try {
    const { searchParams } = new URL(request.url); //here we get complete URL {localhost:api/cuu?:username=usama?phone:iphone} like this
    const queryParams = { username: searchParams.get("username") }; // after this process we get just {username:usama} just username query

    // validation with the help of zod

    const result = usernameQuerySchema.safeParse(queryParams); // its give us validate username viva schema validation

    if (!result.success) {
      const usernameError = result.error.format().username?._errors || []; // here we can get error about username
      return Response.json(
        {
          success: false,
          message:
            usernameError.length > 0
              ? usernameError.join(",")
              : "Invalid query parameters",
        },
        { status: 400 },
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerify: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 },
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is avilabel",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      { success: false, message: "Error checking username" },
      { status: 500 },
    );
  }
}
