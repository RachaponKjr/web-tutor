import Footer from '@/components/footer';
import ProfileTutorCard from './components/profileTutorCard';
import api from '@/server/api';
import { TutorProps } from '../../category/page';

export default async function TutorDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const tutorId = Number(id);
  const tutorData = await api.tutor.getTutorById({ id: tutorId }).then(({ data }) => {
    return data?.data as TutorProps;
  });

  console.log(tutorData);

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
