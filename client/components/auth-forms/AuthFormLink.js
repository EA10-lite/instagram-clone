import React from "react";
import Link from "next/link";

export default function AuthFormLink({ url, placeholder, style }){
    return (
        <Link href={url}>
            <a className={`__formLink ${style && "__space"}`}> { placeholder } </a>
        </Link>
    )
}