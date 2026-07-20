// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
  const authCookie = request.cookies.get("AUTH");
  const key = process.env.JWT_SECRET;

  // No token or no secret configured -> not authenticated
  if (!authCookie?.value || !key) {
    return redirectToLogin(request);
  }

  try {
    const payload = jwt.verify(authCookie.value, key);

    // Pass user info downstream via headers for route handlers to use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-email", payload.email);
    if (payload.id) requestHeaders.set("x-user-id", payload.id);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Middleware auth error:", error.message);
    return redirectToLogin(request);
  }
}

function redirectToLogin(request) {
  const loginUrl = new URL("/auth/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/users/:path*"], // only protects routes under /users/*
};