import AboutSection from '@/components/aboutSection';
import CategorySection from '@/components/categorySection';
import Footer from '@/components/footer';
import HeroSection from '@/components/heroSection';
import api from '@/server/api';
import { Subjects } from '@/types/subject.type';
// import TutorSection from '@/components/tutorSection';

export default async function Home() {
  const response = await api.subject.getSubjects() as { data: { data: Subjects } };
  const subjects: Subjects = response.data.data ?? [];
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategorySection subjects={subjects} />
      {/* <TutorSection /> */}
      <AboutSection />
      <Footer />
    </div>
  );
}
