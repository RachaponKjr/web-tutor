/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import LabeledInput from '@/components/labeled-Input';
import SelectInput from '@/components/select-Input';
import Textarea from '@/components/textarea';
import { Subjects } from '@/types/subject.type';
import DateTimeInput from '@/components/date-time';
import api from '@/server/api';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export type RequestForm = {
  fullName: string;
  phoneNumber: string;
  email: string;
  subjectId: number;
  subjectName: string;
  level: string;
  target: string;
  nationalityTeacher: string;
  teacherSex: string;
  studyingDays: string;
  studyingTimes: string;
  startStudyingDate: string;
  teachingMethod: string;
  studyLocation: string;
  yourCity: string;
  note: string;
  assignedTutorId: number;
  status: string;
};
export default function StepForm({ subjects }: { subjects: Subjects }) {
  const [step, setStep] = useState(0);
  const subjectId = useSearchParams().get('subjectId');
  const subject = useSearchParams().get('subject');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<RequestForm>({
    fullName: '',
    phoneNumber: '',
    email: '',
    subjectId: Number(subjectId) as unknown as number,
    subjectName: subject || '',
    level: '',
    target: '',
    nationalityTeacher: '',
    teacherSex: '',
    studyingDays: '',
    studyingTimes: '',
    startStudyingDate: '',
    teachingMethod: '',
    studyLocation: '',
    yourCity: '',
    note: '',
    assignedTutorId: 0,
    status: 'PENDING',
  });
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let parsedValue: any = value;

    if (name === 'subjectId') {
      parsedValue = parseInt(value, 10);
      const subject = subjects.find((s) => s.id === parsedValue);
      setFormData((prev) => ({
        ...prev,
        subjectId: parsedValue,
        subjectName: subject?.name || '',
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleNext = async () => {
    const currentStep = steps[step];
    const required = currentStep.required || [];
    const hasError = required.some((key) => !formData[key as keyof RequestForm]);
    if (hasError) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    setError('');

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log(formData);
      const response = await api.tutor.bookingTutor({ data: formData });
      if (response.status === 200) {
        toast.success('ส่งข้อมูลไปให้ผู้ดูแลเรียบร้อยแล้ว', { className: '!text-green-500' });
        setIsSuccessModalOpen(true);
      } else {
        toast.error('เกิดข้อผิดพลาดในการส่งข้อมูล', { className: '!text-red-500' });
      }
    }
  };

  const steps = [
    {
      title: 'ข้อมูลทั่วไป',
      required: ['fullName', 'email', 'phoneNumber'],
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabeledInput label="ชื่อ-นามสกุล" name="fullName" value={formData.fullName} onChange={handleChange} />
          <LabeledInput label="เบอร์โทรศัพท์" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <LabeledInput label="อีเมล" name="email" value={formData.email} onChange={handleChange} type="email" className='col-span-2' />
        </div>
      )
    },
    {
      title: 'ข้อมูลการเรียนที่ต้องการ',
      required: ['level', 'target'],
      content: (
        <div className="space-y-4 grid grid-cols-1 gap-x-4">
          <SelectInput
            label="ระดับการเรียน"
            name="level"
            value={formData.level}
            onChange={handleChange}
            options={[
              { label: 'ประถม', value: 'ประถม' },
              { label: 'มัธยม', value: 'มัธยม' },
              { label: 'มหาวิทยาลัย', value: 'มหาวิทยาลัย' },
            ]}
          />
          <Textarea label="เป้าหมายการเรียน" name="target" value={formData.target} onChange={handleChange} />
        </div>
      )
    },
    {
      title: 'ข้อมูลครูที่ต้องการ',
      required: ['nationalityTeacher', 'teacherSex'],
      content: (
        <div className="space-y-4 grid grid-cols-2 gap-x-4">
          <SelectInput
            label="สัญชาติครู"
            name="nationalityTeacher"
            value={formData.nationalityTeacher}
            onChange={handleChange}
            options={[
              { label: 'ไทย', value: 'ไทย' },
              { label: 'ต่างชาติ', value: 'ต่างชาติ' },
              { label: 'ไม่สำคัญ', value: 'ไม่สำคัญ' },
            ]}
          />
          <SelectInput
            label="เพศครู"
            name="teacherSex"
            value={formData.teacherSex}
            onChange={handleChange}
            options={[
              { label: 'ชาย', value: 'MAN' },
              { label: 'หญิง', value: 'WOMAN' },
              { label: 'ไม่สำคัญ', value: 'NULL' },
            ]}
          />
        </div>
      )
    },
    {
      title: 'ช่วงเวลาที่สะดวกเรียน',
      required: ['studyingDays', 'studyingTimes', 'startStudyingDate'],
      content: (
        <div className="space-y-4 grid-cols-2 grid gap-x-4">
          <SelectInput label="วันที่สอน" name="studyingDays" options={[{ label: "จันทร์ - ศุกร์", value: "WEEKDAY" }, { label: "เสาร์ - อาทิตย์", value: "WEEKEND" }, { label: "ทุกวัน", value: "EVERYDAY" }]} value={formData.studyingDays} onChange={handleChange} />
          <DateTimeInput label="เวลาเรียน" name="studyingTimes" value={formData.studyingTimes} onChange={handleChange} />
          <LabeledInput label="วันที่เริ่มเรียน" name="startStudyingDate" value={formData.startStudyingDate} onChange={handleChange} type="date" />
        </div>
      )
    },
    {
      title: 'วิธีการเรียนและสถานที่',
      required: ['teachingMethod', 'yourCity', 'studyLocation'],
      content: (
        <div className="space-y-4 grid grid-cols-2 gap-x-4">
          <SelectInput
            label="รูปแบบการเรียน"
            name="teachingMethod"
            value={formData.teachingMethod}
            onChange={handleChange}
            options={[
              { label: 'ออนไลน์', value: 'ONLINE' },
              { label: 'สอนที่บ้าน', value: 'ONSITE' },
              { label: 'ทั้งสองแบบ', value: 'BOTH' },
            ]}
          />
          <LabeledInput label="จังหวัดที่อยู่" name="yourCity" value={formData.yourCity} onChange={handleChange} />
          <Textarea label="เขต/ตำบล หรือรายละเอียดเพิ่มเติม" name="studyLocation" value={formData.studyLocation} onChange={handleChange} className='col-span-2' />
        </div>
      )
    },
    {
      title: 'หมายเหตุเพิ่มเติม (ถ้ามี)',
      content: (
        <Textarea
          label="หมายเหตุเพิ่มเติม"
          name="note"
          value={formData.note}
          onChange={handleChange}
        />
      )
    }
  ];

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3 text-center">
          📘 หาติวเตอร์ที่ตรงใจคุณง่าย ๆ
        </h2>
        <p className="text-gray-600 text-center mb-6">
          กรุณากรอกข้อมูลในแต่ละขั้นตอนอย่างละเอียด เพื่อให้เราแนะนำติวเตอร์ที่เหมาะสมที่สุดให้คุณ
        </p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {step + 1}. {steps[step].title}
          </h3>
          {steps[step].content}
        </div>

        {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}

        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition font-semibold"
        >
          {step === steps.length - 1 ? 'ส่งคำตอบ' : 'ถัดไป'}
        </button>
      </div>
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center space-y-4">
            <h3 className="text-xl font-bold text-green-600">🎉 ส่งข้อมูลเรียบร้อยแล้ว</h3>
            <p className="text-gray-600">ขอบคุณที่กรอกข้อมูล เราจะติดต่อคุณโดยเร็วที่สุด</p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
