"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import LabeledInput from "./labeled-Input";
import Button from "./ui/buttom";
import { Subjects } from "@/types/subject.type";
import SelectInput from "./select-Input";
import TimePickerRange from "./time-picker-range";
import Textarea from "./textarea";
import ImageUpload from "./image-upload";
import api from "@/server/api";
import { ResRegister } from "@/types/register.type";
import { toast } from "sonner";

interface RegisterResProps {
  status: string
  data: ResRegister
}

export default function Navbar({ subjects }: { subjects: Subjects }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    gender: "",
    subject: "",
    method: "",
    day: "",
    province: "",
    hourlyRate: "",
    timeStart: "",
    timeEnd: "",
    bio: "",
    technique: "",
    experience: "",
  });

  const subjectOptions = subjects.map((subject) => ({
    label: subject.name,
    value: subject.id.toString(),
  }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isStep0Valid =
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const isStep1Valid =
    formData.firstName &&
    formData.phone &&
    formData.subject &&
    formData.method &&
    formData.day &&
    formData.province &&
    formData.hourlyRate;

  const handleNext = () => {
    if (step === 0 && isStep0Valid) setStep(1);
  };

  const handleSubmit = async () => {
    if (isStep1Valid) {
      const registerData = {
        email: formData.email,
        password: formData.password,
        role: "TUTOR"
      }
      await api.user.registerUser({ data: registerData }).then(async (response) => {
        if (response.status !== 200) {
          toast.error("Email มีการสมัครแล้ว หรือ รหัสผ่านตำกว่า 8 ตัวอักษร", { className: "!text-red-500" });
          return
        }
        const res = response as { data: RegisterResProps };
        const payload = {
          image: formData.image,
          phoneNumber: formData.phone,
          pricePerHour: parseInt(formData.hourlyRate),
          province: formData.province,
          tutorName: formData.firstName,
          description: formData.bio,
          technique: formData.technique,
          categoryId: [parseInt(formData.subject)],
          teachingTime: formData.day,
          timeStart: formData.timeStart,
          timeEnd: formData.timeEnd,
          experience: formData.experience.split("\n"),
          levels: [1],
          userId: res.data.data.id,
          teachingMethod: formData.method,
          sex: formData.gender,
          languageTaught: "THAI",
        };

        await api.user.createUser({ data: payload }).then((response) => {
          if (response.status !== 200) {
            toast.error("เกิดข้อผิดพลาดในการสมัคร", { className: "!text-red-500" });
            return
          }
          toast.success("สมัครสําเร็จ", { className: "!text-green-500" });
          setDialogOpen(false);
        });
      })
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Tutor
        </Link>

        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link href="/search" className="hover:text-blue-500">ค้นหาครู</Link>
          <Link href="/apply" className="hover:text-blue-500">สมัครเป็นครู</Link>
          <Link href="/articles" className="hover:text-blue-500">บทความ</Link>
        </nav>

        <div className="hidden md:flex space-x-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm cursor-pointer">
                ลงทะเบียน เป็น ติวเตอร์
              </button>
            </DialogTrigger>
            <DialogContent className="!max-w-lg max-h-[90vh] overflow-auto">
              <h6 className="font-semibold text-lg mb-2">ลงทะเบียน เป็น ติวเตอร์ กับ เรา</h6>
              <form className="space-y-4 !w-full" onSubmit={(e) => e.preventDefault()}>
                {step === 0 && (
                  <>
                    <LabeledInput label="Email" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="example@mail.com" />
                    <LabeledInput label="Password" name="password" value={formData.password} onChange={handleChange} type="password" placeholder="********" />
                    <LabeledInput label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="********" />
                  </>
                )}
                {step === 1 && (
                  <>
                    <LabeledInput label="ชื่อติวเตอร์" name="firstName" value={formData.firstName} onChange={handleChange} />
                    <LabeledInput label="เบอร์โทรศัพท์" name="phone" value={formData.phone} onChange={handleChange} />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <SelectInput label="เพศ" name="gender" options={[{ label: "ชาย", value: "MAN" }, { label: "หญิง", value: "WOMAN" }]} value={formData.gender} onChange={handleChange} />
                      <SelectInput label="วิชาที่สอน" name="subject" options={subjectOptions} value={formData.subject} onChange={handleChange} />
                      <SelectInput label="รูปแบบการสอน" name="method" options={[{ label: "ออนไลน์", value: "ONLINE" }, { label: "ออนไซต์", value: "ONSITE" }, { label: "ทั้งสองแบบ", value: "BOTH" }]} value={formData.method} onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <SelectInput label="วันที่สอน" name="day" options={[{ label: "จ-ศ", value: "WEEKDAY" }, { label: "ส-อา", value: "WEEKEND" }, { label: "ทุกวัน", value: "EVERYDAY" }]} value={formData.day} onChange={handleChange} />
                      <LabeledInput label="จังหวัดที่สอน" name="province" value={formData.province} onChange={handleChange} />
                      <LabeledInput label="ราคาต่อชั่วโมง" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
                    </div>

                    <TimePickerRange
                      label="เลือกช่วงเวลา"
                      onChange={(start, end) => setFormData(prev => ({
                        ...prev,
                        timeStart: start ? start.toISOString() : "",
                        timeEnd: end ? end.toISOString() : ""
                      }))}
                    />

                    <Textarea label="แนะนำตัว" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                    <Textarea label="เทคนิคการสอน" name="technique" value={formData.technique} onChange={handleChange} rows={4} />
                    <Textarea label="ประสบการณ์" name="experience" value={formData.experience} onChange={handleChange} rows={4} />
                    <ImageUpload
                      name="profileImage"
                      label="รูปโปรไฟล์"
                      onChange={(file) => {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          const base64 = reader.result as string
                          setFormData((prev) => ({ ...prev, image: base64 }))
                        }
                        if (file) {
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </>
                )}

                <div className="flex justify-between gap-2 pt-2">
                  {step > 0 && <Button label="ย้อนกลับ" variant="secondary" onClick={() => setStep(step - 1)} className="w-1/2 h-12" />}
                  <Button label={step === 1 ? "ส่งข้อมูล" : "ถัดไป"} variant="primary" onClick={step === 0 ? handleNext : handleSubmit} className={step > 0 ? "w-1/2 h-12" : "w-full h-12"} disabled={step === 0 ? !isStep0Valid : !isStep1Valid} />
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700">
          <Link href="/search" className="block hover:text-blue-500">ค้นหาครู</Link>
          <Link href="/apply" className="block hover:text-blue-500">สมัครเป็นครู</Link>
          <Link href="/articles" className="block hover:text-blue-500">บทความ</Link>
        </div>
      )}
    </header>
  );
}
