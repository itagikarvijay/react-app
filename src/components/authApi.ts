import axios from "axios";
import type { AxiosResponse } from "axios";

interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}



export async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  try {
    const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
      "/oauth2/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: "frontend-app",
          password: "super-secure-secret",
        },
      }
    );

    return response.data;

  } catch (error: any) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}
