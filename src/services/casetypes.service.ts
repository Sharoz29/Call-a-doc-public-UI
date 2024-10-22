import { axios } from "../auth/axios";
import { endpoints } from "../auth/global";

export const casetypeService = {
  getCaseTypes,
};

const token = sessionStorage.getItem("token");
function getCaseTypes() {
  return axios
    .get(endpoints.PEGAAPIURL + endpoints.CASETYPES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response.data.caseTypes;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
