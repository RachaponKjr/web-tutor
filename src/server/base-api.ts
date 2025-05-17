"use server";

import { getCookie } from "@/lib/cookie";

// local
// const BASE_URL: string = "http://127.0.0.1:3001";

// production
const BASE_URL: string = "http://119.59.103.110:3001";

type FetchConfig = RequestInit & { headers?: Record<string, string> };

export type ApiResponse<T> = {
  data?: T;
  message?: string;
  status: number;
};

async function fetchFromApi<T>({
  path,
  params = {},
  config = {},
  requiresAuth = false,
  baseUrl = BASE_URL,
}: {
  path: string;
  params?: Record<string, unknown>;
  config?: FetchConfig;
  requiresAuth?: boolean;
  baseUrl?: string;
}): Promise<ApiResponse<T>> { 
  try {
    const token = await getCookie("access_token");

    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    const fullUrl = `${baseUrl}${path}${queryString ? `?${queryString}` : ""}`;

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...((config.headers as Record<string, string>) || {}),
    };

    if (requiresAuth && token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(fullUrl, {
      ...config,
      headers: requestHeaders,
    });

    if (!response.ok) {
      return { message: response.statusText, status: response.status };
    }

    const data: T = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { fetchFromApi };
