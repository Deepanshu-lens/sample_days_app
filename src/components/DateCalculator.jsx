// src/components/DateCalculator.jsx
"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

const DateCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeAllDays, setIncludeAllDays] = useState(true);
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [result, setResult] = useState(null);
  const [event, setEvent] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState({
    SU: true, // Sunday
    M: true, // Monday
    T: true, // Tuesday
    W: true, // Wednesday
    TH: true, // Thursday
    F: true, // Friday
    ST: true, // Saturday
  });

  const handleDateClick = (date) => {
    setSelectedDays((prev) => ({
      ...prev,
      [format(date, "E").toUpperCase()]: !prev[format(date, "E").toUpperCase()],
    }));
  };

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let daysBetween = 0;

    // Ensure start date is before end date
    if (start > end) {
      setResult(0);
      return;
    }

    // Loop through each day from start to end date (excluding the end day)
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const dayKey = ["SU", "M", "T", "W", "TH", "F", "ST"][day]; // Map to selected days

      // Check if the day is selected
      if (selectedDays[dayKey]) {
        daysBetween++;
      }
    }

    // Check the end day only if includeEndDay is true
    if (includeEndDay) {
      const endDayKey = ["SU", "M", "T", "W", "TH", "F", "ST"][end.getDay()];
      if (selectedDays[endDayKey]) {
        daysBetween++; // Include the end day if it's selected
      }
    }

    // Adjust the result based on includeAllDays
    setResult(includeAllDays ? daysBetween : Math.max(daysBetween - 1, 0));
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Days Between Dates Calculator</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Start date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">End date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Or select an event: (optional)
          </label>
          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">---</option>
            <option value="event1">Event 1</option>
            <option value="event2">Event 2</option>
            <option value="event3">Event 3</option>
          </select>
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-2">Include all days?</label>
          <Switch
            checked={includeAllDays}
            onCheckedChange={() => setIncludeAllDays(!includeAllDays)}
            className="toggle toggle-primary" // Add your color theme class here
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-2">Include end day?</label>
          <Switch
            checked={includeEndDay}
            onCheckedChange={() => setIncludeEndDay(!includeEndDay)}
            className="toggle toggle-primary" // Add your color theme class here
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Days to include:
          </label>
          <div className="flex space-x-2">
            {["SU", "M", "T", "W", "TH", "F", "ST"].map((day, i) => (
              <button
                key={i}
                onClick={() =>
                  handleDateClick(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      i + 1
                    )
                  )
                }
                className={`p-2 border rounded ${
                  selectedDays[day] ? "bg-[#00AA00] text-white" : "bg-gray-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={calculateDays}
          className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition"
        >
          Calculate
        </button>
        {result !== null && (
          <p className="mt-4 text-lg">
            Days Between: <span className="font-bold">{result}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default DateCalculator;
