"use client";

import logo from "@/public/area_logo2.png";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "./ui/dialog";
import LoginDialog from "./login_dialog";
import { Button } from "./ui/button";
import { UserApi } from "@/api/user_api";
import Spinner from "./spinner";
import { useState } from "react";
import { useUser } from "@/contexts/user_context";
import { CAS_CHECK_CLIENT } from "@/constants/end_point";
import { toast } from "sonner";
import { checkCASClient, getTicket } from "@/services/authService";

export default function NavBar() {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // METHODS
  const mockLogin = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    user.dispatch({
      type: "SET_USER",
      payload: {
        id: 1,
        firstname: "Francesco",
        lastname: "Limoni",
        email: "francesco.limoni@3di.it",
      },
    });
  };

  const handleLoginTap = async () => {
    console.log(handleLoginTap.name);
    setIsLoading(true);
    getTicket();
    setIsLoading(false);
  };

  const handleLogoutTap = async () => {
    console.log(handleLoginTap.name);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    user.dispatch({ type: "RESET_USER" });

    setIsLoading(false);
  };

  return (
    <header className="fixed top-0 z-20 flex w-full items-center justify-between bg-white p-4 shadow-md">
      <Link href={"/"}>
        <Image src={logo} alt="logo regione venet" width={180} height={80} />
      </Link>
      <section className="flex items-center space-x-6">
        <section className="flex items-center space-x-1">
          <Link className="header_link" href={"/map"}>
            Contatti
          </Link>
          <Separator
            orientation="vertical"
            className="h-4 w-[1.2px] bg-black opacity-45"
          />
          <Link className="header_link" href={""}>
            Manuali
          </Link>
        </section>

        {user.state.email ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>FL</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel>
                Francesco Limoni
                <p className="text-sm font-normal opacity-50">
                  francesco.limoni@3di.it
                </p>
              </DropdownMenuLabel>{" "}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogoutTap}
                className="space-x-2 font-medium text-red-500"
              >
                <MdLogout />
                <span>Esci</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className={"h-10 w-28 py-2 disabled:bg-primary disabled:text-white"}
            onClick={handleLoginTap}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner className={"h-6 w-6 bg-transparent"} />
            ) : (
              "Accedi"
            )}
          </Button>
        )}
      </section>
    </header>
  );
}
