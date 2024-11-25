import {requestWithAuth} from "@/service/request";

export const logout = async () => {
  return await requestWithAuth('POST', '/api/user/logout');
};
