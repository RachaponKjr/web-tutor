import { RequestForm } from "@/types/booking";
import { fetchFromApi } from "../base-api";

const bookingTutor = async ({ data }: { data: RequestForm }) => {
  return await fetchFromApi({
    path: "/api/v1/booking/create",
    config: { method: "POST", body: JSON.stringify(data) },
  });
};

export { bookingTutor };
