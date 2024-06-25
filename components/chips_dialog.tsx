"use client";

import { UDOS } from "@/constants/udo";
// import Chip from "./chip";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Chip } from "./chip";
import { useState } from "react";
import { useFilters } from "@/contexts/filters_context";

interface ChipsDialogProps {
  title: string;
  description: string;
  data: any[];
  sectionIndex: number; // This is used only as reference to identify which data to update
}

export const ChipsDialog: React.FC<ChipsDialogProps> = ({
  title,
  description,
  data,
  sectionIndex,
}) => {
  // STATE
  const { state, dispatch } = useFilters();
  const [selection, setSelected] = useState<any[]>([]);

  // METHODS
  const handleChipTap = (
    chip: Udo | Speciality | Descrittore,
    event: React.MouseEvent<HTMLElement>
  ) => {
    console.log(handleChipTap.name);

    // event.stopPropagation(); // Prevent any unwanted behavior
    setSelected((prev) => {
      if (prev.includes(chip)) {
        return prev.filter((item) => item !== chip); // Return previos items if they are not the selected chip
      }

      return [...prev, chip]; // Return new array with previous items and append new chip
    });
  };

  const handleSelect = () => {
    console.log(handleSelect.name);
    updateFiltersContext(selection);
  };

  const handleSelectAll = (event: React.MouseEvent<HTMLElement>) => {
    console.log(handleSelectAll.name);
    event?.stopPropagation();

    if (selection.length > 0) {
      setSelected([]);
      return;
    }

    setSelected(data);
  };

  const updateFiltersContext = (data: any[]) => {
    switch (sectionIndex) {
      case 0:
        var udos = data.map((item) => {
          return item as Udo;
        });
        dispatch({ type: "SET_UDO", payload: udos });
        break;
      case 1:
        var specilities = data.map((item) => {
          return item as Speciality;
        });
        dispatch({ type: "SET_SPECIALITIES", payload: specilities });
      case 2:
        var descrittori = data.map((item) => {
          return item as Descrittore;
        });
        dispatch({ type: "SET_DESCRITTORI", payload: descrittori });
        break;

      default:
        break;
    }
  };

  return (
    <DialogContent className="flex items-end justify-end">
      <DialogHeader>
        <DialogTitle>{title.toUpperCase()}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <Button
          variant={"ghost"}
          className="w-fit p-2 text-end text-sm"
          onClick={handleSelectAll}
        >
          {selection.length > 0 ? "Deseleziona tutti" : "Seleziona tutti"}
        </Button>
        <section className="flex max-h-96 flex-wrap gap-2 overflow-hidden py-6">
          {data.map((item) => (
            <Chip
              key={item.id}
              data={item}
              isSelected={selection.includes(item)}
              onChipTap={handleChipTap}
            />
          ))}
        </section>

        <Button className="p-2" onClick={handleSelect}>
          SELEZIONA
        </Button>
      </DialogHeader>
    </DialogContent>
  );
};
