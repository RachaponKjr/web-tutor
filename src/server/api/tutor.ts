import { RequestData } from "@/app/category/components/stepForm";
import { ApiResponse, fetchFromApi } from "../base-api";
import { TutorProps } from "@/app/category/page";

const bookingTutor = async ({ data }: { data: RequestData }) => {
  return await fetchFromApi({
    path: "/api/v1/booking/create",
    config: {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    },
  });
};

const getTutorSubjects = async ({
  id,
}: {
  id: number;
}): Promise<ApiResponse<TutorProps>> => {
  return await fetchFromApi({
    path: `/api/v1/user/tutors/${id}`,
    config: { method: "GET" },
  });
};

const getTutorById = async ({ id }: { id: number }) => {
  return await fetchFromApi({
    path: `/api/v1/user/tutor/${id}`,
    config: { method: "GET" },
  });
};

export { bookingTutor, getTutorSubjects, getTutorById };
