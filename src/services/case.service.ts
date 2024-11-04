import { axios } from "../auth/axios";
import { endpoints } from "../auth/global";

export const caseService = {
  getCaseById,
  getCaseView,
  getCaseActions,
};

const token = sessionStorage.getItem("token");

async function getCaseById(id: any) {
  try {
    return await axios
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
  } catch (error) {
    return await Promise.reject(error);
  }
}

const ongoingRequests = new Map();

async function getCaseView(caseTypeID: any) {
  if (ongoingRequests.has(caseTypeID)) {
    return ongoingRequests.get(caseTypeID);
  }

  const requestPromise = axios
    .post(
      endpoints.PEGAAPIURL + endpoints.CASES + `?viewType=page`,
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
    .then((response) => {
      ongoingRequests.delete(caseTypeID);

      return {
        ...response.data,
        etag: response.headers["etag"],
        actions: response?.data?.data?.caseInfo?.assignments[0]?.actions,
        navigationSteps: response?.data.uiResources.navigation.steps,
      };
    })
    .catch((error) => {
      ongoingRequests.delete(caseTypeID);
      return Promise.reject(error);
    });

  ongoingRequests.set(caseTypeID, requestPromise);

  return requestPromise;
}

async function getCaseActions(caseId: any, actionId: any) {
  try {
    const response = await axios.get(
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
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error);
  }
}
