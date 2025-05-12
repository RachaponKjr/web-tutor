'use client';
import Footer from '@/components/footer';
import ProfileTutorCard from './components/profileTutorCard';
import { useCallback, useEffect, useState } from 'react';
import api from '@/server/api';
import { TutorProps } from '../category/page';
// import ReviewTutorCard from './components/reviewTutorCard';

export default function TutorDetails() {
  const [tutorData, setTutorData] = useState<TutorProps>({} as TutorProps);
  const getTutorId = useCallback(async () => {
    await api.tutor.getTutorById({ id: 4 }).then(({ data }) => {
      setTutorData(data?.data as TutorProps);
    });
  }, []);

  useEffect(() => {
    void getTutorId();
  }, [getTutorId]);

  console.log('tutorData', tutorData);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <ProfileTutorCard tutorData={tutorData} />
        {/* <ReviewTutorCard /> */}
      </div>
      <Footer />
    </div>
  );
}
