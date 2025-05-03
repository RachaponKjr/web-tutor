import { Subjects } from '@/types/subject.type';
import React from 'react';

export default function categorySection({ subjects }: { subjects: Subjects }) {
  console.log(subjects);
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              หมวดหมู่ยอดนิยม
            </h2>
            <a
              href="#"
              className="text-indigo-600 hover:underline text-sm font-medium"
            >
              ดูเพิ่มเติม
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {subjects.slice(0, 6).map((item, index) => (
              <div key={index}>
                <a
                  href={`/category?subjectId=${encodeURIComponent(item.id)}&subject=${encodeURIComponent(item.name)}`}
                  className="text-indigo-600 hover:underline"
                >
                  <div className="flex flex-col items-center bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition">
                    <div className="text-indigo-500 text-3xl mb-2">
                      {item.icon}
                    </div>
                    <span className="text-xl font-medium text-gray-700 text-center">
                      {item.name}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
