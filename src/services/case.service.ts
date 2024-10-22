import { axios } from "../auth/axios";
import { endpoints } from "../auth/global";

export const caseService = {
  getCaseById,
  getCaseView,
  getCaseActions,
};

const token = sessionStorage.getItem("token");

function getCaseById(id: any) {
  return axios
    .get(encodeURI(endpoints.PEGAAPIURL + endpoints.CASES + "/" + id), {
      headers: {
        "Access-Control-Expose-Headers": "etag",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      response.data["etag"] = response.headers.etag;
      return response.data;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
function getCaseView(caseTypeID: any) {
  return axios
    .post(
      endpoints.PEGAAPIURL +
        endpoints.CASES +
        `??viewType=page` +
        `&pageName=pyEmbedAssignment`,
      {
        caseTypeID: caseTypeID,
        content: {},
        processID: "pyStartCase",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}

function getCaseActions(caseId: any, actionId: any) {
  return axios
    .get(
      encodeURI(
        endpoints.PEGAAPIURL +
          endpoints.CASES +
          caseId +
          endpoints.ACTIONS +
          "/" +
          actionId
      ),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
