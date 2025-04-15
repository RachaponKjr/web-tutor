import React from 'react';

export default function JobsDetailCard() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-600">
        สอนคณิตศาสตร์ ประถม ที่บ้าน ลาดพร้าว 71
      </h1>

      {/* Summary Section */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>📍 สถานที่: ลาดพร้าว, กรุงเทพมหานคร</div>
        <div>🎓 ระดับชั้น: ประถมศึกษา</div>
        <div>⏰ เวลาเรียน: เสาร์-อาทิตย์, 10:00-12:00</div>
        <div>💰 ค่าจ้าง: 300 บาท/ชม.</div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg">รายละเอียดงาน</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          ต้องการครูสอนคณิตศาสตร์ให้ลูกชาย ป.6 สอนที่บ้าน ลาดพร้าว 71
          มีโต๊ะเรียนพร้อม ต้องการครูที่ใจเย็น และมีประสบการณ์สอนเด็กประถม
        </p>
      </div>

      {/* Requirements */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg">คุณสมบัติผู้สอน</h2>
        <ul className="list-disc ml-5 mt-2 text-gray-700">
          <li>เพศหญิง อายุ 20-35 ปี</li>
          <li>มีประสบการณ์สอนเด็กประถม</li>
          <li>สามารถเดินทางมาสอนได้ตรงเวลา</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-500">
        โพสต์เมื่อ: 14 เม.ย. 2025 • ผู้ว่าจ้าง: คุณแม่ของนักเรียน
      </div>

      {/* CTA */}
      <div className="mt-8">
        <button className="px-6 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700">
          สมัครสอนงานนี้
        </button>
      </div>
    </div>
  );
}
