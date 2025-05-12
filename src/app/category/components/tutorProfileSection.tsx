/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useCallback, useEffect } from 'react';
import api from '@/server/api';
import { TutorProps } from '../page';
import TutorCard from './tutorCard';
import { useSearchParams } from 'next/navigation';

export default function tutorProfileSection() {
  const [tutorData, setTutorData] = React.useState<TutorProps[]>([]);
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId');
  const getTutorSubjects = useCallback(async () => {
    try {
      await api.tutor.getTutorSubjects({ id: Number(subjectId) }).then(({ data }) =>
        setTutorData(data?.data as TutorProps[])
      );
    } catch {
      console.log('error');
    }
  }, [subjectId])

  useEffect(() => {
    void getTutorSubjects();
  }, [getTutorSubjects])

  return (
    <div className="w-full md:w-3/4">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">ติวเตอร์ยอดนิยม</h2>

      <p className="text-gray-700 mb-4">
        เรียนภาษาอังกฤษตัวต่อตัว
        กับครูสอนภาษาอังกฤษคุณภาพที่ได้รับความนิยมมากที่สุดในตอนนี้ ราคาเริ่มที่
        250 บาท เลือกเนื้อหา และเวลาเรียนได้ มีครูให้เลือกหลายคน เรียนตัวต่อตัว
        เรียนสดออนไลน์ มีประสิทธิภาพ เห็นผลเร็ว
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          'พูดอังกฤษเพื่อการทำงาน',
          'แกรมม่า',
          'เตรียมสอบ TOEIC',
          'ภาษาอังกฤษ ป.1-ป.6',
          'ภาษาอังกฤษ ม.ต้น',
          'ภาษาอังกฤษ ม.ปลาย',
          'สอนสนทนา',
          'เรียนตัวต่อตัว',
        ].map((tag, i) => (
          <span
            key={i}
            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm hover:bg-indigo-200 cursor-pointer transition"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorData && tutorData.map((tutor, index) => (
          <TutorCard key={index} {...tutor} />
        ))}
      </div>
    </div>
  );
}
