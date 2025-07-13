import axios from "axios";
import { endpoints } from "../../lib/endpoints";
import { encrypt } from "@/utils/crypto-util";

/**
 * Authenticates a user with the provided email and password.
 *
 * This function sends a POST request to the login endpoint with the user's email and encrypted password.
 * It returns the response data as provided by the backend, which includes:
 * If authentication fails, it returns the backend's response (with success: false).
 *
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The password of the user.
 * @returns {Promise<{
 *   success: boolean,
 *   user_id: string,
 *   first_name: string,
 *   last_name: string,
 *   email: string,
 *   access_token: string,
 *   refresh_token: string
 * }>} - A promise that resolves to the response data from the server.
 */
export async function loginUser(email: string, password: string) {
  const encryptedPassword = encrypt(password);
  try {
    const response = await axios.post(
      endpoints.LOGIN,
      {
        email,
        password: encryptedPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // Return the backend's response structure directly
    return response.data;
  } catch (error: any) {
    // If the backend returns an error response, try to return a similar structure
    if (error?.response?.data) {
      return {
        success: false,
        user_id: "",
        first_name: "",
        last_name: "",
        email: email,
        access_token: "",
        refresh_token: "",
        error: error?.response?.data?.error || "Authentication failed",
      };
    }
    // For other errors, return a generic failure structure
    return {
      success: false,
      user_id: "",
      first_name: "",
      last_name: "",
      email: email,
      access_token: "",
      refresh_token: "",
      error: error?.message || "Authentication failed",
    };
  }
}

/**
 * Refreshes the access token using the provided email and refresh token.
 *
 * This function sends a POST request to the refresh token endpoint with the user's email
 * and refresh token. If the refresh is successful, it returns the new access token.
 * Otherwise, it throws an error indicating the refresh failed.
 *
 * @param {string} email - The email address of the user.
 * @param {string} refreshToken - The refresh token associated with the user.
 * @returns {Promise<string>} - A promise that resolves to the new access token.
 * @throws {Error} - Throws an error if the token refresh fails.
 */
export async function refreshAccessToken(
  email: string,
  refreshToken: string,
): Promise<string> {
  try {
    const response = await axios.post(endpoints.REFRESH_TOKEN, {
      email,
      refresh_token: refreshToken,
    });

    // Handle application-level errors (status 200 but success: false)
    if (!response.data.success) {
      const errorMessage = response.data.error || "Failed to refresh token";
      console.error("Application error during token refresh:", errorMessage);
      throw new Error(errorMessage);
    }

    // Validate access token exists in successful response
    const newAccessToken = response.data.access_token;
    if (!newAccessToken) {
      console.error("Access token missing in successful response");
      throw new Error("Access token not found in refresh response");
    }

    return newAccessToken;
  } catch (error: any) {
    // Handle HTTP errors (non-200 status codes)
    const errorMessage =
      error?.response?.data?.error ||
      error.message ||
      "Failed to refresh token";
    console.error("HTTP error during token refresh:", {
      status: error?.response?.status,
      message: errorMessage,
      error: error,
    });
    throw new Error(errorMessage);
  }
}
