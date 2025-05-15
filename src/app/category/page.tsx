import React from 'react';
import StepForm from './components/stepForm';
import Footer from '@/components/footer';
import CategorySideMenu from './components/categorySideMenu';
import TutorProfileSection from './components/tutorProfileSection';
import { Subjects } from '@/types/subject.type';
import api from '@/server/api';

export interface TutorProps {
  name: string;
  id: number;
  userId: number;
  tutorName: string;
  province: string;
  image: string;
  pricePerHour: string;
  languageTaught: string;
  sex: string;
  description: string;
  phoneNumber: string;
  verifyed: boolean;
  technique: string;
  teachingMethod: string;
  teachingTime: string;
  timeStart: string;
  timeEnd: string;
  availableTime: string;
  experiences: {
    id: number;
    detail: string;
  }[];
}



export default async function Page() {
  const response = await api.subject.getSubjects() as { data: { data: Subjects } };

  const subjects: Subjects = response.data.data ?? [];

  return (
    <div className="min-h-screen bg-white">
      <StepForm subjects={subjects} />
      <div className="md:flex px-24 py-6 border-t-2 border-gray-400/80">
        <CategorySideMenu subjects={subjects} />
        <TutorProfileSection />
      </div>
      <Footer />
    </div>
  );
}

