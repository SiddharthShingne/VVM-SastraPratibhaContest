"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between flex-wrap px-3 py-1 bg-[#111d35] text-[#ffffffa2] text-xs font-medium">
            <div className="flex items-center gap-1 max-w-full lg:flex">
                <Image src="/hand-emoji.svg" alt="Hand Emoji" width={16} height={16} />
                <p>
                    Welcome to Vidyarthi Vigyan Manthan – Unlocking the Power of
                    Education!
                </p>
            </div>

            <div className="flex gap-2 w-full lg:w-auto justify-end mt-1 lg:mt-0">
                <button
                    onClick={() => router.push("/Login")}
                    className="border-2 border-[#b57edc] text-white text-xs font-semibold px-3 py-1 rounded-full transition duration-200 hover:text-yellow-200 hover:bg-[#485e94] hover:font-bold"
                >
                    Login
                </button>
                <button
                    onClick={() => router.push("/Register")}
                    className="border-2 border-[#b57edc] text-white text-xs font-semibold px-3 py-1 rounded-full transition duration-200 hover:text-yellow-200 hover:bg-[#485e94] hover:font-bold"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Header;
