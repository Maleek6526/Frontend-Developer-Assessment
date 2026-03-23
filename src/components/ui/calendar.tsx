import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center w-full min-h-[40px]",
        caption_label: props.captionLayout === "dropdown" ? "hidden" : "text-sm font-medium",
        caption_dropdowns: "flex justify-center items-center gap-2",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center transition-opacity"
        ),
        nav_button_previous: "absolute left-0 top-1/2 -translate-y-1/2",
        nav_button_next: "absolute right-0 top-1/2 -translate-y-1/2",
        table: "w-full border-collapse space-y-1",
        head_row: "grid grid-cols-7 w-full",
        head_cell:
          "text-muted-foreground rounded-md font-normal text-[0.8rem] flex justify-center items-center h-9",
        row: "grid grid-cols-7 w-full mt-2",
        cell: "h-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 flex justify-center items-center",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 flex justify-center items-center",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal transition-all hover:bg-accent hover:text-accent-foreground"
        ),
        // v9 compatible keys
        weekdays: "grid grid-cols-7 w-full",
        weekday: "text-muted-foreground rounded-md font-normal text-[0.8rem] flex justify-center items-center h-9",
        week: "grid grid-cols-7 w-full mt-2",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground font-bold",
        outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        range_end: "day-range-end",
        hidden: "invisible",
        dropdown: "rdp-dropdown",
        dropdown_month: "rdp-dropdown_month",
        dropdown_year: "rdp-dropdown_year",
        dropdown_icon: "hidden",
        vhidden: "hidden",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />
          }
          return <ChevronRight className="h-4 w-4" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
