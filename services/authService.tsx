import { UserApi } from "@/api/user_api";

export const getTicket = async () => {
  console.log(getTicket.name);

  try {
    const result = await UserApi.login();
    console.log("result", result);

    if (result.status != 200)
      throw Error("Login non riuscito: status code != 200");
    if (result.redirected) window.open(result.url);

    // const ticket = result.url.split("ticket=")[1];
    // console.log("result", result);
    // window.location.href = result.url;
    // return ticket;
  } catch (error) {
    console.error("UserApi.login.name", error);
    throw error as Error;
  }
};

export const checkCASClient = async (ticket: string) => {
  try {
    if (!ticket) throw Error("Ticket non presente");
    const result = await UserApi.checkCASClient(ticket);
    if (result.status != 200) throw Error("Errore durante il check del client");
    console.log(result);

    if (result.redirected) {
      window.location.href = result.url;
    }
  } catch (error) {
    console.error(error);
    throw error as Error;
  }
};
