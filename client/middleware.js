import { NextResponse } from "next/server";

export default function middleware(req){
    let verify = req.cookies.get("token");
    const { pathname } = req.nextUrl;

    if(!verify && ( pathname === "/" || pathname.startsWith("/post") || pathname === "/explore" || pathname.startsWith("/user"))){ 
        return NextResponse.redirect( new URL("http://localhost:3000/login", req.url));  
    }     
}
