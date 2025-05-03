import { z } from "zod";

export const requestFormSchema = z.object({
  fullName: z.string().min(1, "กรุณากรอกชื่อ"),
  phoneNumber: z.string().min(1, "กรุณากรอกเบอร์โทรศัพท์"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  subjectId: z.number().min(1, "กรุณาเลือกวิชา"),
  subjectName: z.string().optional(), // ไม่จำเป็น เพราะคุณใช้ subjectId
  level: z.string().min(1, "กรุณาเลือกระดับการเรียน"),
  target: z.string().min(1, "กรุณากรอกเป้าหมายการเรียน"),
  nationalityTeacher: z.string().min(1, "กรุณาเลือกสัญชาติครู"),
  teacherSex: z.string().min(1, "กรุณาเลือกเพศครู"),
  studyingDays: z.string().min(1, "กรุณาเลือกวันเรียน"),
  studyingTimes: z.string().min(1, "กรุณาเลือกเวลาเรียน"),
  startStudyingDate: z.string().min(1, "กรุณาเลือกวันที่เริ่มเรียน"),
  teachingMethod: z.string().min(1, "กรุณาเลือกรูปแบบการเรียน"),
  studyLocation: z.string().min(1, "กรุณากรอกสถานที่เรียน"),
  yourCity: z.string().min(1, "กรุณากรอกจังหวัด"),
  note: z.string().optional(),
  assignedTutorId: z.number().optional(),
  status: z.string().default("PENDING"),
});

export type RequestForm = z.infer<typeof requestFormSchema>;
