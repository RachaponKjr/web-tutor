"use client";

import React, { useState } from "react";
import CheckList from "@/components/check-list";
import provinces from "@/data/thai_provinces.json";
import { useSearchParams } from "next/navigation";
import stepList from "@/data/form-tutor";
import SelectInput from "@/components/select-Input";
import LabeledInput from "@/components/labeled-Input";
import api from "@/server/api";
import { toast } from "sonner";
import { X } from "lucide-react";

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
  const data = stepList;
  const subjectCategory = param.get("subjectId");
  const [confirm, setConfirm] = useState(false);
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
    status: "PENDING",
  });
  console.log(formData);

  const options = provinces.map((province) => ({
    label: province.name_th,
    value: province.name_th,
  }));

  const handleNextStep = () => {
    if (step < data.length - 1) {
      setStep((prev) => prev + 1);
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

  const checkInfo = () => setConfirm(true);

  const sandData = async () => {
    try {
      const res = await api.tutor.bookingTutor({ data: formData });
      if (res.status !== 200) {
        toast.error("มีบางอย่างผิดพลาด", { className: "!text-red-500" });
        return;
      }
      toast.success("ส่งข้อมูลสําเร็จ", { className: "!text-green-500" });
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        yourCity: "",
        subjectCategoryId: Number(subjectCategory || 0),
        status: "PENDING",
      });
      setConfirm(false);
      setStep(10);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "เกิดข้อผิดพลาด", {
        className: "!text-red-500",
      });
    }
  };

  const renderStepHeader = (label: string) => (
    <div className="flex gap-2 items-center text-lg font-semibold mb-3">
      <span>{step + 1}.</span>
      <h3 className="text-start">{label}</h3>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-6 my-6 bg-white border border-gray-200 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        📘 ค้นหาติวเตอร์ง่ายแค่คลิก
      </h2>

      {/* STEP FORM */}
      {step < data.length - 1 && (
        <div>
          {renderStepHeader(data[step].label)}
          <CheckList
            name={data[step].name}
            items={data[step].items || []}
            selectedValues={
              formData[data[step].name as keyof RequestData]?.split(",") || []
            }
            onChange={(name, selected) => {
              setFormData((prev) => ({
                ...prev,
                [name]: selected.join(""),
              }));
              handleNextStep();
            }}
          />
        </div>
      )}

      {/* LOCATION */}
      {step === 8 && (
        <div className="text-center">
          {renderStepHeader("ที่อยู่ที่คุณอยู่")}
          <SelectInput
            value={formData.yourCity}
            onChange={handleChange}
            name="yourCity"
            options={options}
          />
          <button
            className="mt-4 w-full h-12 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            onClick={() => setStep(step + 1)}
          >
            ถัดไป
          </button>
        </div>
      )}

      {/* CONTACT INFO */}
      {step === 9 && (
        <div className="text-center">
          {renderStepHeader("กรุณากรอกข้อมูลติดต่อกลับ")}
          <div className="flex flex-col gap-4">
            <LabeledInput
              className="text-start"
              value={formData.fullName}
              onChange={handleChange}
              name="fullName"
              label="ชื่อเล่น"
            />
            <LabeledInput
              className="text-start"
              value={formData.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
              label="เบอร์โทรศัพท์"
            />
          </div>
          <button
            className="mt-4 w-full h-12 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            onClick={checkInfo}
          >
            ส่งข้อมูล
          </button>
        </div>
      )}

      {/* CONFIRM */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-center text-indigo-700">
              ✅ กรุณาตรวจสอบข้อมูลก่อนส่ง
            </h3>
            <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setConfirm(false)} />
            <div className="flex flex-col gap-4">
              <LabeledInput
                className="text-start"
                value={formData.fullName}
                name="confirmFullName"
                label="ชื่อ-นามสกุล"
              />
              <LabeledInput
                className="text-start"
                value={formData.phoneNumber}
                name="confirmPhone"
                label="เบอร์โทรศัพท์"
              />
            </div>
            <button
              className="mt-6 w-full h-12 cursor-pointer bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              onClick={sandData}
            >
              ✅ ยืนยันส่งข้อมูล
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {step === 10 && (
        <div className="text-center py-8">
          <p className="text-xl font-semibold text-green-600">
            🎉 ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!
          </p>
          <p className="text-gray-700 mt-2">
            กรุณารอเจ้าหน้าที่ติดต่อกลับภายในเร็ว ๆ นี้
          </p>
          <button
            className="mt-6 w-full h-12 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            onClick={() => setStep(0)}
          >
            กรอกข้อมูลใหม่อีกครั้ง
          </button>
        </div>
      )}
    </div>
  );
}