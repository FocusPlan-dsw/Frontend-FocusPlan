import React from 'react';

interface TaskViewCardProps {
  title: string;
  icon: React.ElementType;
  estimatedTime?: string;
  elapsedTime?: string;
  startDate?: Date | string | number;
  dueDate?: Date | string | number;
  actualStartDate?: Date | string | number;
  actualEndDate?: Date | string | number;
  type: 'planned' | 'executed';
}

function formatDate(date: Date | string | number | undefined): string {
  if (!date) {
    return 'Não definido';
  }
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return 'Não definido';
  }
  return dateObj.toLocaleDateString('pt-BR');
}

export function TaskViewCard({
  title,
  icon,
  estimatedTime,
  elapsedTime,
  startDate,
  dueDate,
  actualStartDate,
  actualEndDate,
  type,
}: TaskViewCardProps) {
  
  const IconComponent = icon;
  
  const startDateFormatted = formatDate(type === 'planned' ? startDate : actualStartDate);
  const dueDateFormatted = formatDate(type === 'planned' ? dueDate : actualEndDate);
  const timeValue = type === 'planned' ? estimatedTime : elapsedTime;

  const isPlanned = type === 'planned';

  const periodLabel = isPlanned ? 'Período planejado:' : 'Período executado:';

  const timeLabel = isPlanned ? 'Tempo estimado:' : 'Tempo focado:';

  return (
    <div className="flex flex-col gap-5 bg-light-gray border-[0.5px] border-gray02 rounded-[10px] w-full max-w-[45rem] max-lg:max-w-full p-5">
      <div className={`flex items-center gap-2 pb-3 border-b -mx-5 -mt-5 px-5 pt-5 rounded-t-[10px]`}>
        <IconComponent className={`h-5 w-5 text-primary`} />
        <h3 className={`font-semibold text-base uppercase tracking-wide text-primary`}>
          {title}
        </h3>
      </div>
      
      <div className='flex flex-wrap gap-x-20 gap-y-5'>
        <div className="flex flex-col gap-1">
          <span className={`font-medium text-sm flex items-center gap-1.5 text-slate-600`}>
            {periodLabel}
          </span>
          <span className="text-slate-800">
            {startDateFormatted} → {dueDateFormatted}
          </span>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className={`font-medium text-sm flex items-center gap-1.5 text-slate-600`}>
            {timeLabel}
          </span>
          <span className="text-slate-800">
            {timeValue || 'Não definido'}
            {timeValue && /^\d+$/.test(timeValue) ? ' min' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}