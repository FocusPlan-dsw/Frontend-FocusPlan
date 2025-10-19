type InformationBlockReportsProps = {
        icon?: React.ElementType
        quantity: string | number
        value: string
    }

export function InformationBlockReports({ icon: Icon, quantity, value }: InformationBlockReportsProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[330px] min-h-[110px] bg-light-gray border border-gray02 rounded-[10px] p-4 sm:p-5">
            <div className="flex items-center gap-3">
                {Icon && <Icon className="w-[30px] h-[30px] text-primary" />}
                <p className="text-2xl font-normal text-primary">
                    {quantity}
                </p>
            </div>
            <p className="text-dark-gray text-lg font-normal text-center">
                {value}
            </p>
        </div>
    )
}