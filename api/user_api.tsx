import { CAS_CHECK_CLIENT, CAS_LOGIN } from "@/constants/end_point";

export class UserApi {
  // LOGIN CALL TO CAS
  static async login(): Promise<Response> {
    console.log(UserApi.login.name);
    
    const options: RequestInit = {
      method: "GET",
    };

    return fetch(CAS_LOGIN, options);
  }

  static async checkCASClient(ticket: string) {
    console.log(UserApi.checkCASClient.name);

    const options: RequestInit = {
      method: "GET",
    };

    // PARAMS
    const queryParams = new URLSearchParams({ ticket }).toString();
    const url = `${CAS_CHECK_CLIENT}?${queryParams}`;

    return fetch(url, options);
  }
}
