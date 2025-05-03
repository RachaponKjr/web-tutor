'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Clock } from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  label?: string
  onChange?: (start: Date | null, end: Date | null) => void
}

const TimePickerRange: React.FC<Props> = ({ label, onChange }) => {
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)

  const handleStartChange = (date: Date | null) => {
    setStartTime(date)
    onChange?.(date, endTime)
  }

  const handleEndChange = (date: Date | null) => {
    setEndTime(date)
    onChange?.(startTime, date)
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl p-4 bg-white rounded-2xl shadow-md">
      {label && <h4 className="text-base font-semibold text-gray-700">{label}</h4>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Start Time */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">เวลาเริ่มต้น</label>
          <div className="relative">
            <Clock className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <DatePicker
              selected={startTime}
              onChange={handleStartChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="เวลา"
              dateFormat="HH:mm"
              placeholderText="เลือกเวลาเริ่มต้น"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">เวลาสิ้นสุด</label>
          <div className="relative">
            <Clock className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <DatePicker
              selected={endTime}
              onChange={handleEndChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="เวลา"
              dateFormat="HH:mm"
              placeholderText="เลือกเวลาสิ้นสุด"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimePickerRange
