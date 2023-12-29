import { JwtPayload, jwtDecode } from "jwt-decode";
import { getFromLocalStorage } from "../../../../data/helpers/helpers";
import { AccessTokenType } from "../../../Auth/data/models/auth.models";

export const getUserIdFromAccessToken = () => {
  const accessToken = getFromLocalStorage("access_token");

  if (!accessToken) return;

  const decodedAccessToken = jwtDecode<JwtPayload & AccessTokenType>(
    accessToken,
  );

  return decodedAccessToken.id;
};
