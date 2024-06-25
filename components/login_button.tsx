"use client";

import React, { use } from "react";
import { useUser } from "@/contexts/user_context";
import { Button } from "./ui/button";
import Spinner from "./spinner";
import { UserApi } from "@/api/user_api";
import { toast } from "sonner";
import { set } from "react-hook-form";
import { getTicket } from "@/services/authService";

export default function LaunchAppButton() {
  const user = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  // TOAST
  const errorToast = (message: string) => {
    return toast.error(message, {
      cancel: true,
      className: "bg-red-100 border-red-500 text-red-500",
    });
  };

  // METHODS
  const handleLoginTap = async () => {
    console.log(handleLoginTap.name);
    setIsLoading(true);
    var ticket: string;

    await getTicket()
      .catch((err) => {
        errorToast(err.message);
        setIsLoading(false);
        return;
      })
      .then((res) => {
        ticket = res!;
        console.log(ticket);
        setIsLoading(false);
      });

    const result = await UserApi.checkCASClient(ticket!);
  };
  return user.state.email == null ? (
    <Button
      className={"h-16 w-full p-4 disabled:bg-primary disabled:text-white"}
      onClick={handleLoginTap}
      disabled={isLoading}
    >
      {isLoading ? <Spinner className={"h-6 w-6 bg-transparent"} /> : "Accedi"}
    </Button>
  ) : null;
}
