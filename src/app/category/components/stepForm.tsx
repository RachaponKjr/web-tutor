'use client';

import React, { useState } from 'react';
import CheckList from '@/components/check-list';
import provinces from '@/data/thai_provinces.json'
import { useSearchParams } from 'next/navigation';
import stepList from '@/data/form-tutor';
import SelectInput from '@/components/select-Input';
import LabeledInput from '@/components/labeled-Input';
import api from '@/server/api';
import { toast } from 'sonner';
export interface RequestData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  formOne?: string;
  formTwo?: string;
  formThree?: string;
  formFour?: string;
  formFive?: string;
  formSix?: string;
  formSeven?: string;
  formEight?: string;
  formNine?: string;
  formTen?: string;
  formEleven?: string;
  subjectCategoryId?: number;
  yourCity?: string;
  status?: string;
}


export default function StepForm() {
  const [step, setStep] = useState(0);
  const param = useSearchParams();
  const data = stepList
  const subjectCategory = param.get('subjectId');
  const [formData, setFormData] = useState<RequestData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    formOne: "",
    formTwo: "",
    formThree: "",
    formFour: "",
    formFive: "",
    formSix: "",
    formSeven: "",
    formEight: "",
    yourCity: "",
    subjectCategoryId: Number(subjectCategory || 0),
    status: "PENDING"
  });

  const options = provinces.map((province) => ({
    label: province.name_th,
    value: province.name_th,
  }));

  const handleNextStep = () => {
    if (step < data.length - 1) {
      setStep(step + 1);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sandData = async () => {
    try {
      await api.tutor.bookingTutor({ data: formData }).then((res) => {
        if (res.status !== 200) {
          toast.error("มีบางอย่างผิดพลาด", { className: "!text-red-500" });
          return
        }
        toast.success("ส่งข้อมูลสําเร็จ", { className: "!text-green-500" });
        setFormData({})
        setStep(step + 1);
      }).catch((err) => {
        toast.error(err.response.data.message, { className: "!text-red-500" });
      })

    } catch {
      console.log('error')
    }
  };

  console.log('formData', formData);

  return (
    <div className="max-w-xl mx-auto p-6 my-4 shadow-sm bg-indigo-100 border border-indigo-400 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
        📘 ค้นหาติวเตอร์ง่ายเเค่คลิก
      </h2>
      {step < data.length - 1 && (
        <div>
          <div className='flex gap-2 items-center text-lg font-semibold mb-3'>
            <span>{step + 1}.</span>
            <h3 className="text-start">
              {data[step].label}
            </h3>
          </div>
          <CheckList
            name={data[step].name}
            items={data[step].items || []}
            selectedValues={formData[data[step].name as keyof RequestData] ? formData[data[step].name as keyof RequestData]?.split(',') : []}
            onChange={(name, selected) => {
              setFormData((prev) => ({
                ...prev,
                [name]: selected.join(','),
              }))
              handleNextStep();
            }}
          />
        </div>
      )}
      {step === 8 && (
        <div className="text-center">
          <div className='flex gap-2 items-center text-lg font-semibold mb-3'>
            <span>{step + 1}.</span>
            <h3 className="text-start">
              ที่อยู่ที่คุณอยู่
            </h3>
          </div>
          <SelectInput value={formData.yourCity} onChange={handleChange} name="yourCity" options={options} />
          <button className="mt-4 px-4 py-1 w-full cursor-pointer bg-blue-600 text-white rounded-lg h-12 hover:bg-blue-700" onClick={() => setStep(step + 1)}>กดถัดไป</button>
        </div>
      )}
      {step === 9 && (
        <div className="text-center">
          <div className='flex gap-2 items-center text-lg font-semibold mb-3'>
            <span>{step + 1}.</span>
            <h3 className="text-start">
              กรุณากรอกข้อมูลติดต่อกลับ
            </h3>
          </div>
          <div className='flex flex-col gap-2'>
            <LabeledInput className='text-start' value={formData.fullName} onChange={handleChange} name="fullName" label="ชื่อ-นามสกุล" />
            <LabeledInput className='text-start' value={formData.phoneNumber} onChange={handleChange} name="phoneNumber" label="เบอร์โทรศัพท์" />
            <LabeledInput className='text-start' value={formData.email} onChange={handleChange} name="email" label="อีเมล" />
          </div>
          <button className="mt-4 px-4 py-1 w-full cursor-pointer bg-blue-600 text-white rounded-lg h-12 hover:bg-blue-700" onClick={sandData}>ส่งข้อมูล</button>
        </div>
      )}

      {step === 10 && (
        <div className="text-center">
          <div className='flex flex-col gap-2'>
            <span className='text-lg font-semibold'>ทำการส่งข้อมูลไปให้เจ้าหน้าที่เรียบร้อยแล้ว</span>
            <span>กรุณารอเจ้าหน้าที่ติดต่อกลับ....</span>
          </div>
          <button className="mt-4 px-4 py-1 w-full cursor-pointer bg-blue-600 text-white rounded-lg h-12 hover:bg-blue-700" onClick={()=>setStep(0)}>กรอกข้อมูลใหม่</button>
        </div>
      )}

    </div>
  );
}
