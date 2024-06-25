import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LOCATIONS } from "@/constants/location";
import { Location } from "@/types/location";
import { map } from "leaflet";
import { useState } from "react";

interface LocationProps {
  data: Location;
  onTap: () => void;
}

export default function LocationTile({
  data: { title, address, subs },
  onTap,
}: LocationProps) {
  return (
    <Accordion
      type="multiple"
      onClick={onTap}
      className="w-full overflow-hidden rounded-lg border-[0.8px] border-black/40"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="flex cursor-pointer items-center justify-between p-4 text-start hover:bg-slate-50"
          onClick={onTap}
        >
          <section>
            <p className="font-medium">{title}</p>
            <p className="text-sm font-normal">{`${address.street}, ${address.city}, ${address.zipcode}, ${address.province}`}</p>
          </section>
        </AccordionTrigger>

        {subs.map((item, index) => (
          <LocationContent
            key={index}
            {...item}
            className={
              index < subs.length - 1 ? "border-b border-black/10" : ""
            }
          />
        ))}
      </AccordionItem>
    </Accordion>
  );
}

interface LocationContentProps {
  label: string;
  sublabel: string;
  number: number;
  className: string;
}

function LocationContent({
  label,
  sublabel,
  number,
  className,
}: LocationContentProps) {
  return (
    <AccordionContent
      className={`flex items-center justify-between space-x-2 bg-slate-50 p-4 ${className}`}
    >
      <p className="flex-1 truncate text-sm font-medium">{label}</p>
      <section className="flex w-1/3 items-center space-x-2">
        <p className="flex-1 text-ellipsis text-right text-xs text-black/50">
          {sublabel}
        </p>
        <div className="h-6 w-6 rounded-full bg-primary/20 py-0.5 text-center font-medium text-primary">
          {number}
        </div>
      </section>
    </AccordionContent>
  );
}
