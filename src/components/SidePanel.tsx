import Image from "next/image";

export function SidePanel() {
    return (
        <div className="bg-gradient w-full xl:max-w-[45rem] h-screen flex items-center justify-center max-xl:max-h-[10vh]">
            <Image src="/white-logo.svg" alt="logo" width={432} height={109} className="max-xl:w-[10rem]" />
        </div>
    )
}