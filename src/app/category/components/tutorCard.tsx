import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TutorProps } from '../page';


export default function TutorCard({
  description,
  userId,
  image,
  name,
  technique,
  teachingMethod,
  tutorName,
}: TutorProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="object-cover aspect-[16/12] rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{tutorName}</h3>
      <p className="text-sm text-indigo-600 mb-2">
        <strong>รูปเเบบการสอน : </strong>{teachingMethod}
      </p>

      <p className="text-gray-700 text-sm mb-2 line-clamp-2">
        <strong className="font-medium">เทคนิคการสอน:</strong> {technique}
      </p>

      <p className="text-gray-700 text-sm line-clamp-3">{description}</p>

      <div className="mt-4">
        <Link className="inline-block cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm" href={`/tutor/${userId}`}>
          ดูโปรไฟล์ติวเตอร์
        </Link>
      </div>
    </div>
  );
}
