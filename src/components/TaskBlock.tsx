interface TaskBlockProps {
    title: string;
    value: string | number;
}

export function TaskBlock({ title, value }: TaskBlockProps) {
    return (
        <div className="bg-gray01 border-[0.5px] border-gray-03 rounded-[10px] py-5 px-12 flex flex-col items-center gap-[17px] max-[1220px]:px-10 font-normal text-xl max-[1100px]:text-lg max-[1100px]:px-8">
            <p className="text-dark-gray">{title}</p>
            <span className="text-primary">{value}</span>
        </div>
    )
}