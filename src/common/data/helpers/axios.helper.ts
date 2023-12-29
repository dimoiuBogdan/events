import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../../components/Auth/data/services/auth.services";
import { getFromLocalStorage, saveToLocalStorage } from "./helpers";

export const handleAxiosInterceptor = () => {
  axios.interceptors.request.use(
    async (config) => {
      const accessToken = getFromLocalStorage("access_token");

      if (!accessToken) {
        return config;
      }

      const currentDate = new Date();
      const decodedAccessToken = jwtDecode(accessToken);

      if (!decodedAccessToken.exp) {
        return config;
      }

      if (decodedAccessToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshAccessToken();

        if (data?.accessToken && data?.refreshToken) {
          config.headers["Authorization"] = `Bearer ${data.accessToken}`;

          saveToLocalStorage("access_token", data.accessToken);
          saveToLocalStorage("refresh_token", data.refreshToken);
        }
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: unknown) => {
      return Promise.reject(error);
    },
  );
};
