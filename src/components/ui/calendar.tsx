"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactCalendar, { type CalendarProps as ReactCalendarProps } from "react-calendar"
import 'react-calendar/dist/Calendar.css';

import { cn } from "@/lib/utils"

export type CalendarProps = ReactCalendarProps

function Calendar({
  className,
  ...props
}: CalendarProps) {
  return (
    <ReactCalendar
      className={cn("p-0", className)}
      prevLabel={<ChevronLeft className="h-4 w-4" />}
      nextLabel={<ChevronRight className="h-4 w-4" />}
      next2Label={null}
      prev2Label={null}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
