import { fetchFromApi } from "../base-api";

const createUser = async ({ data }: { data: any }) => {
  return await fetchFromApi({
    path: "/api/v1/user/tutor-detail",
    config: { method: "POST", body: JSON.stringify(data) },
  });
};

const registerUser = async ({ data }: { data: any }) => {
  return await fetchFromApi({
    path: "/api/v1/auth/register",
    config: { method: "POST", body: JSON.stringify(data) },
  });
};

export { createUser, registerUser };
