const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const endpoints = {
  LOGIN: `${BASE_URL}/dashboard/auth/login`,
  REFRESH_TOKEN: `${BASE_URL}dashboard/auth/refresh-token`,
};

export { endpoints };
