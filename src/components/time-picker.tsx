"use client"

import { useId } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface TimePickerProps {
  label: string;
  value: string; 
  onChange: (value: string) => void;
}

export function TimePicker({ label, value, onChange }: TimePickerProps) {
  const id = useId();

  function formatTime(valor: string) {
    if (!valor) return "";
    const [h, m] = valor.split(":").map(Number);
    const partes: string[] = [];

    if (h) partes.push(`${h} hora${h > 1 ? "s" : ""}`);
    if (m) partes.push(`${m} minuto${m > 1 ? "s" : ""}`);
 

    return partes.length > 0 ? partes.join(", ") : "0 minutos";
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>

      <Input
        type="time"
        id={id}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-3 appearance-none [&::-webkit-datetime-edit]:text-left [&::-webkit-datetime-edit-text]:text-left [&::-webkit-datetime-edit-field]:text-left [&::-webkit-calendar-picker-indicator]:hidden"
      />

      <span className="text-sm text-primary">
        {formatTime(value)}
      </span>
    </div>
  );
}