"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between flex-wrap px-5 py-2 bg-[#111d35] text-[#ffffffa2] text-sm font-medium">
            <div className="flex items-center gap-2 max-w-full  lg:flex">
                <Image src="/hand-emoji.svg" alt="Hand Emoji" width={24} height={24} />
                <p>
                    Welcome to Vidyarthi Vigyan Manthan – Unlocking the Power of
                    Education!
                </p>
            </div>

            <div className="flex gap-4 w-full lg:w-auto justify-end mt-3 lg:mt-0">
                <button
                    onClick={() => router.push("/Login")}
                    className="border-4 border-[#b57edc] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition duration-200 hover:text-yellow-200 hover:bg-[#485e94] hover:font-bold"
                >
                    Login
                </button>
                <button
                    onClick={() => router.push("/Register")}
                    className="border-4 border-[#b57edc] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition duration-200 hover:text-yellow-200 hover:bg-[#485e94] hover:font-bold"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Header;
