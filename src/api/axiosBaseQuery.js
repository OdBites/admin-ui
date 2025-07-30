import axiosMain from "./axiosInstance";

export const axiosBaseQuery =
  ({ baseURL = "" } = {}) =>
  async ({ url, method, data, params }) => {
    try {
      const response = await axiosMain({
        url,
        method,
        data,
        params,
        baseURL: baseURL || undefined,
      });

      return { data: response.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data || error.message,
        },
      };
    }
  };
