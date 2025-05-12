import { TutorProps } from '@/app/category/page';
import { formatTimeRange } from '@/lib/format';
import Image from 'next/image';
import React from 'react';

export default function profileTutorCard({ tutorData }: { tutorData: TutorProps }) {
  console.log('tutorData', tutorData);

  return (
    <div className="bg-white rounded-lg max-w-2xl place-self-center shadow-lg p-8">
      <div className="flex flex-col gap-4 lg:flex-row items-center mb-6">
        <div className='w-36 aspect-square rounded-full relative'>
          <Image
            src={tutorData.image}
            alt="Tutor"
            fill
            className="rounded-full object-cover mb-4 lg:mb-0 lg:mr-6"
          />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-semibold text-gray-800">{tutorData.tutorName}</h1>
          <div>
            <span>สอนด้วยภาษา : </span><span>{tutorData.languageTaught === 'THAI' ? 'ไทย' : 'อังกฤษ'}</span>
          </div>
          <div>
            <span>รูปแบบการสอน : </span><span>{tutorData.teachingMethod === 'ONLINE' ? 'ออนไลน์' : 'ออฟไลน์'}</span>
          </div>
        </div>
      </div>

      {/* Tutor Description */}
      <p className="text-gray-800 mb-4">{tutorData.description}</p>

      {/* Tutor Experience */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        ประสบการณ์การสอน:
          {Array.isArray(tutorData.experiences) && tutorData.experiences.length > 0 && (
            <ul className="list-disc pl-6 text-gray-700">
              {tutorData.experiences.map((exp, index) => (
                <li key={index} className="text-base font-normal text-gray-700">
                  {exp.detail}
                </li>
              ))}
            </ul>
          )}
      </h2>
      <div className='text-xl font-semibold text-gray-800 '>
        <span>เทคนิคการสอน:</span>
        <p className="list-disc text-base font-normal text-gray-700">
          {tutorData.technique}
        </p>
      </div>

      {/* Price and Contact Information */}
      <div className="flex justify-between items-center mt-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">ราคาติว:</h2>
          <p className="text-gray-700">{tutorData.pricePerHour} / ชั่วโมง</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">ติดต่อ:</h2>
          <p className="text-gray-700">{tutorData.phoneNumber}</p>
        </div>
      </div>

      <div className='text-lg font-semibold text-gray-800'>
        <h2 className=" mt-8">
          เวลาที่ติวได้:
        </h2>
        <span className="text-base font-normal text-gray-700">
          {tutorData.teachingTime === 'Weekday' ? 'วันจันทร์ - วันศุกร์' : tutorData.teachingTime === 'Everyday' ? 'ทุกวัน' : 'วันเสาร์ - วันอาทิตย์'} {formatTimeRange(tutorData.timeStart, tutorData.timeEnd)}
        </span>
      </div>
      <ul className="list-disc pl-6 text-gray-700">

      </ul>

    </div>
  );
}
