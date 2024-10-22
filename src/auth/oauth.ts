import { axios } from "./axios.ts";
import { endpoints } from "./global.ts";
const url = `${endpoints.PEGAURL}/prweb/PRRestService/oauth2/v1/token`;

const client_id = endpoints.client_id;
const client_secret = endpoints.client_secret;
const grant_type = endpoints.grant_type;

const data = new URLSearchParams();
data.append("grant_type", grant_type);
data.append("client_id", client_id);
data.append("client_secret", client_secret);

/**
 * Function to check if the token is expired
 * @param {string} createdAt - The creation date of the token in ISO format
 * @param {string} expiresIn - The token's expiration date in ISO format
 * @returns {boolean} - True if the token is expired, false otherwise
 */
function isTokenExpired(createdAt: string | null, expiresIn: string) {
  const tokenCreatedAt = new Date(createdAt!);
  const tokenExpiryDate = new Date(expiresIn);

  console.log(tokenCreatedAt, tokenExpiryDate);
  const now = new Date();

  return now > tokenExpiryDate;
}

export async function getToken() {
  try {
    const tokenData = sessionStorage.getItem("token");

    if (!tokenData) {
      console.log("No token found. Fetching a new token...");
      return await fetchNewToken();
    }

    const parsedToken = parseJwt(tokenData);
    const tokenExpiry = new Date(parsedToken?.exp * 1000).toISOString();
    const createdAt = sessionStorage.getItem("tokenCreation");

    if (tokenData && !isTokenExpired(createdAt, tokenExpiry)) {
      return tokenData;
    } else {
      console.log("Token is expired. Fetching a new token...");
      return await fetchNewToken();
    }
  } catch (error) {
    console.error("Failed to read access token:", error);
    return await fetchNewToken();
  }
}

async function fetchNewToken() {
  return await axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      const tokenData = response.data;
      const createdAt = new Date();
      const access_token = tokenData.access_token;

      // Store the new token and creation time in sessionStorage
      sessionStorage.setItem("token", access_token);
      sessionStorage.setItem("tokenCreation", createdAt.toISOString());

      return access_token;
    })
    .catch((error) => {
      console.error("Failed to get access token:", error);
    });
}

function parseJwt(token: string | null) {
  const base64Url = token?.split(".")[1];
  const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64!)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
