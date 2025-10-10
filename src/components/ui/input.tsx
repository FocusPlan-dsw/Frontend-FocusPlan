import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon
}

function Input({ icon: Icon, className, type, ...props }: InputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
        {Icon && <Icon className="h-[18px] w-[18px] text-gray02" />}
      </div>

      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-gray02 dark:bg-input/30 border border-gray02 h-[2.7rem] w-full min-w-0 rounded-md bg-transparent py-1 text-base pl-9 transition-color outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          Icon ? "pl-9" : "pl-2",
          "focus-visible:border-primary",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
