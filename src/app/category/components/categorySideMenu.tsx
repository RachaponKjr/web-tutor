import { Subjects } from '@/types/subject.type';
import React from 'react';

export default function categorySideMenu({ subjects }: { subjects: Subjects }) {
  return (
    <div className="w-full md:w-1/4 p-4 mr-6 border-r-2 border-gray-400/80">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        หมวดหมู่ติวเตอร์
      </h2>
      <ul className="space-y-4">
        {subjects.slice(0, 6).map((item, index) => (
          <li key={index}>
            <a
              href={`/category?subjectId=${encodeURIComponent(item.id)}&subject=${encodeURIComponent(item.name)}`}
              className="text-lg text-gray-800 hover:text-indigo-500"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
