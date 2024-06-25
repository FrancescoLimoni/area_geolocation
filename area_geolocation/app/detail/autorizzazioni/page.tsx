"use client";

import React from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { APPS } from "@/constants/apps";
import TabController from "@/components/tab_controller";
import { Button } from "@/components/ui/button";
import LaunchAppButton from "@/components/login_button";
import Link from "next/link";
import { MdDownload, MdMenuBook } from "react-icons/md";
import ImageGrid from "@/components/image_grid";

export default function AutorizzazionePage() {
  const data = APPS[7];
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Descrizione", "Screenshot", "Dati"];
  const infoLabels = ["Versione", "Data di rilascio", "Ultimo aggiornamento"];

  // STYLES
  const activeTabStyle = "border-b-2 w-full text-sm";
  const color = "bg-autorizzazioni";

  console.log(data);

  return (
    <div className="h-screen overflow-hidden">
      <section className={`p-4 text-white ${color} `}>
        <h4>{data?.title}</h4>
        <p className="opacity-50">{data?.subtitle}</p>
      </section>
      <section className="h-full space-x-4 p-4 md:flex lg:flex xl:flex">
        <div className="flex-1">
          <TabController tabs={tabs} onTab={handleTapChange} />
          <section className="p-4">
            {activeTab == 0 ? (
              data?.description
            ) : activeTab == 1 ? (
              <ImageGrid images={["", "", "", "", ""]} />
            ) : (
              "Dati"
            )}
          </section>
        </div>
        <div className="h-full w-[28%] space-y-4">
          <section className="mb-4">
            {infoLabels.map((item, index) => (
              <section
                key={index}
                className="flex items-center justify-between border-b p-2"
              >
                <p className="text-sm">{item}</p>
                <p className="text-sm font-medium">{item}</p>
              </section>
            ))}
          </section>
          <LaunchAppButton />
          <Button asChild variant={"outline"} className="w-full border-black">
            <Link href="">
              <MdMenuBook className="mr-2" size={20} />
              Manuale
            </Link>
          </Button>
          <Button asChild variant={"outline"} className="w-full border-black">
            <Link href="">
              <MdDownload className="mr-2" size={20} />
              Scarica open data
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );

  function handleTapChange(index: number) {
    setActiveTab(index);
  }
}
