// get-data-hoy.jsx
import React, { useState } from "react";
import { Input, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function GetDateHoy() {
    const [date, setDate] = React.useState < Date | null > (new Date());

    return (
        <div className="p-24">
            <Popover placement="bottom">
                <PopoverHandler>
                    <Input
                        label="Select a Date"
                        onChange={() => null}
                        value={date ? format(date, "PPP") : ""}
                    />
                </PopoverHandler>
                <PopoverContent>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                            // Clases CSS personalizadas aquí...
                        }}
                        components={{
                            IconLeft: ({ ...props }) => (
                                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                            ),
                            IconRight: ({ ...props }) => (
                                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                            ),
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
