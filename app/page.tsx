import React from "react";
import Image from "next/image";
import background from "@/public/doctor.png";
import { APPS } from "@/constants/apps";
import AppCard from "@/components/app_card";
import { UserProvider } from "@/contexts/user_context";

export default function MainPage() {
  return (
    <UserProvider>
      <div className="">
        {/* IMAGE */}
        <div className="relative h-[280px] w-full">
          <Image
            src={background}
            alt="background_doctor"
            objectFit="cover"
            layout="fill"
          />
        </div>

        {/* GRID VIEW */}
        <p className="pt-8 text-center text-lg font-medium">Ecosistema</p>
        <div className="grid gap-4 p-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {APPS.map((item) => (
            <AppCard key={item.id} app={item} />
          ))}
        </div>
      </div>
    </UserProvider>
  );
}
