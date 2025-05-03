import { fetchFromApi } from "../base-api";

const getSubjects = async () => {
  return await fetchFromApi({
    path: "/api/v1/catagory/",
    config: { method: "GET" },
  });
};

export { getSubjects };
