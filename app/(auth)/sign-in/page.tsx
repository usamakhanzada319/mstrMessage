"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>signIn as a {session.user.email}</h1>
        <button onClick={() => signOut()}>sign Out</button>
      </>
    );
  }
  return (
    <>
      <h1>not signed In</h1>
      <button onClick={() => signIn()}>sign Out</button>
    </>
  );
}
