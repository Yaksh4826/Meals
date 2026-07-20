// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "./app/models/User";


export async function proxy(request) {
  const authCookie = request.cookies.get("AUTH");
  const key = process.env.JWT_SECRET;
  console.log(authCookie)

  const result = await jwt.verify(authCookie.value, key,);
  console.log(result)
  if(!result){
    return NextResponse.json({success:false, message:"You are not logged in"});
  }

 
  //
  
  
  const res = NextResponse.next();

  res.headers.set("x-userEmail", result.email);  // sending in the headers.




  return res;

}



export const config = {
  matcher: ["/api/users/:path*"]
};
