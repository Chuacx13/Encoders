import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  const user = decodeToken(token);

  if (user?.role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  } else if (user?.role === "resident") {
    return NextResponse.redirect(new URL("/resident", req.url));
  }

  return NextResponse.next();
}

function decodeToken(token) {
  if (token === "admin-token") {
    return { role: "admin" };
  } else if (token === "resident-token") {
    return { role: "resident" };
  }
  return null;
}
