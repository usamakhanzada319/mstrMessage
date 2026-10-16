import { resend } from "../lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode, email }),
    });
    return {
      success: true,
      message: "Verification Email send successfully",
    };
  } catch (Emailerror) {
    console.error("error sending Vefification Email", Emailerror);
    return { success: false, message: "faild due to send verification email" };
  }
}
