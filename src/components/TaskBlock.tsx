interface TaskBlockProps {
    title: string;
    value: string | number;
}

export function TaskBlock({ title, value }: TaskBlockProps) {
    return (
        <div className="bg-gray01 border-[0.5px] border-gray-03 rounded-[10px] py-5 px-14 flex flex-col items-center gap-[17px]">
            <p className="text-xl text-dark-gray font-normal">{title}</p>
            <span className="text-xl text-primary font-normal">{value}</span>
        </div>
    )
}