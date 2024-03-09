import { PropsWithChildren } from "react";

export default function AuthLayout({children}: PropsWithChildren) {

    return (
        <div className="h-full flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]  from-sky-200 to-blue-600">
            {children}
        </div>
    )
}