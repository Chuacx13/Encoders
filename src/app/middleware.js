import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  const user = decodeToken(token);

  if (user?.role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  } else if (user?.role === "user") {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  return NextResponse.next();
}

function decodeToken(token) {
  if (token === "admin-token") {
    return { role: "admin" };
  } else if (token === "user-token") {
    return { role: "user" };
  }
  return null;
}
