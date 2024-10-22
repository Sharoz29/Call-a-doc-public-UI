import { axios } from "../auth/axios";
import { endpoints } from "../auth/global";

export const assignmentService = {
  getAssignmentsView,
  getAssignmentsActions,
  createAssignment,
};

const token = sessionStorage.getItem("token");

async function getAssignmentsView(assignmentId: any) {
  return axios
    .get(
      encodeURI(
        endpoints.PEGAAPIURL +
          endpoints.ASSIGNMENTS +
          "/" +
          assignmentId +
          `?viewType=page`
      ),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
      response.data["etag"] = response.headers.etag;
      return response.data;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
async function getAssignmentsActions(assignmentId: any, action: string) {
  return axios
    .get(
      encodeURI(
        endpoints.PEGAAPIURL +
          endpoints.ASSIGNMENTS +
          "/" +
          assignmentId +
          endpoints.ACTIONS +
          `/${action}`
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
async function createAssignment(
  caseId: string,
  action: string,
  reqBody: any,
  etag: string
) {
  return axios
    .patch(
      encodeURI(
        endpoints.PEGAAPIURL +
          endpoints.ASSIGNMENTS +
          `/${caseId}` +
          endpoints.ACTIONS +
          `/${action}?viewType=page`
      ),
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "if-match": etag,
        },
      }
    )
    .then(function (response) {
      response.data["etag"] = response.headers.etag;
      return response.data;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
