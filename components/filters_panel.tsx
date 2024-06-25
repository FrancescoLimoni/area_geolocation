import { Button } from "./ui/button";
import { MdArrowBack } from "react-icons/md";
import { Checkbox } from "./ui/checkbox";
import { MdAdd } from "react-icons/md";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UDOS } from "@/constants/udo";
import { useState } from "react";
import { ChipsDialog } from "./chips_dialog";
import { hasFilterChanges, useFilters } from "@/contexts/filters_context";
import { SPECIALITIES } from "@/constants/spicialities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { PROVINCE } from "@/constants/province";
import { Location } from "@/types/location";

interface FilterPanelProps {
  className?: string;
  locations: Location[];
  onBack?: () => void;
}

export default function FiltersPanel({
  className,
  locations,
  onBack: handleBackClick,

}: FilterPanelProps) {
  // STATE
  const [cities, setCities] = useState<string[] | null>(null);
  const { state, dispatch } = useFilters();

  // STYLES
  const wrapEmptyStyle =
    "grid h-full w-full items-center justify-center rounded-md bg-slate-100 p-8";
  const sectionStyle =
    "flex-grow flex-col items-center justify-between space-y-2 overflow-hidden border-b py-4";
  const dropdownTriggerStyle =
    "overflow-hidden text-ellipsis rounded-md bg-slate-200 p-2 w-1/2 items-center justify-center flex font-medium text-ellipsis overflow-hidden text-start text-sm";

  // METHODS
  const handleResetTap = () => {
    console.log(handleResetTap.name);
    dispatch({ type: "RESET_FILTERS" });
  };

  const handleCheckboxTap = (selectionId: number) => {
    console.log(handleCheckboxTap.name);

    switch (selectionId) {
      case 0:
        dispatch({ type: "SET_DISCIPLINE", payload: !state.discipline });
        break;
      case 1:
        dispatch({ type: "SET_BRANCHE", payload: !state.branche });
        break;
      default:
        break;
    }
  };

  const handleApplyClick = () => {
    var hasChanges = hasFilterChanges(state);

    if (!hasChanges) {
      console.log("No changes");
      return;
    }

    // APPLY FILTERS
    console.log("state:", state);
    
  };

  const handleRemoveTap = (sectionId: number) => {
    console.log(handleRemoveTap.name);

    dispatch({ type: "SET_UDO", payload: [] });
  };

  const handleRegionTap = (item: {
    regione: string;
    provincia: {
      nome: string;
      sigla: string;
    }[];
  }) => {
    console.log(handleRegionTap.name);

    console.log("state.region:", state.region);
    console.log("item.regione:", item.regione);

    if (state.region === item.regione) {
      dispatch({ type: "SET_REGION", payload: null });
      setCities((prev) => null);
      console.log("state:", state);

      return;
    }
    dispatch({ type: "SET_REGION", payload: item.regione });
    setCities((prev) => item.provincia.map((item) => item.nome));
    console.log("state", state);
  };

  const handleCityTap = (city: string) => {
    console.log(handleCityTap.name);

    if (state.city === city) {
      dispatch({ type: "SET_CITY", payload: null });
      return;
    }
    dispatch({ type: "SET_CITY", payload: city });

    console.log("state", state);
  };

  return (
    <section
      className={`relative h-full overflow-y-auto bg-white px-4 ${className} `}
    >
      {/* TITLE & BUTTONS */}
      <section className="sticky top-0 flex items-center justify-between bg-background py-4 shadow-sm">
        <section className="flex items-center space-x-2">
          <Button variant={"ghost"} className="p-2">
            <MdArrowBack onClick={handleBackClick} size={24} />
          </Button>
          <h4>Filtri</h4>
        </section>
        <section className="flex items-center space-x-2">
          <Button
            variant={"ghost"}
            onClick={handleResetTap}
            className="py-2 text-sm text-black/50"
          >
            Reset
          </Button>
          <Button className="py-2 text-sm" onClick={handleApplyClick}>
            Applica
          </Button>
        </section>
      </section>

      {/* COMUNE & REGION */}
      <section>
        <section className="flex items-center justify-between space-x-2 border-b py-4">
          <p>Regione</p>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`${dropdownTriggerStyle} ${state.region != null ? "text-primary" : "text-primary/50"} `}
            >
              {state.region ?? "Regione"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-4">
              {PROVINCE.map((item) => (
                <DropdownMenuItem
                  key={item.regione}
                  className={
                    "rounded-md p-2 text-primary " +
                    (state.region === item.regione
                      ? "bg-primary/10"
                      : "bg-transparent")
                  }
                  onClick={() => handleRegionTap(item)}
                >
                  {item.regione}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
        <section className="flex items-center justify-between space-x-2 border-b py-4">
          <p>Comune</p>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`${dropdownTriggerStyle} ${state.city != null ? "text-primary" : "text-primary/50"} `}
            >
              {state.city ?? "Comune"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-4">
              {cities?.map((item) => (
                <DropdownMenuItem
                  key={item}
                  className={
                    "rounded-md p-2 text-primary " +
                    (state.city === item ? "bg-primary/10" : "bg-transparent")
                  }
                  onClick={() => handleCityTap(item)}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </section>

      {/* DISCIPLINE */}
      <section className="flex items-center justify-between border-b py-4">
        <p>Discipline</p>
        <Checkbox
          checked={state.discipline}
          onCheckedChange={() => handleCheckboxTap(0)}
        />
      </section>

      {/* BRANCHE */}
      <section className="flex items-center justify-between border-b py-4">
        <p>Branche</p>
        <Checkbox
          checked={state.branche}
          onCheckedChange={() => handleCheckboxTap(1)}
        />
      </section>

      {/* TIPO UDO */}
      <section className={sectionStyle}>
        <section className="flex items-center justify-between space-x-1">
          <p>Tipo UDO</p>
          <section className="flex space-x-1">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => handleRemoveTap(0)}
              className="py-2 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Rimuovi
            </Button>
            <Dialog>
              <DialogTrigger>
                <Button variant={"ghost"} size={"sm"}>
                  <MdAdd size={20} />
                </Button>
                <ChipsDialog
                  title={"udo"}
                  description={"Seleziona il tipo di UDO"}
                  data={UDOS}
                  sectionIndex={0}
                />
              </DialogTrigger>
            </Dialog>
          </section>
        </section>

        <section className={wrapEmptyStyle}>
          {state.udos.length > 0 ? (
            <section>UDO: {state.udos.length}</section>
          ) : (
            <p className="justify-center text-center text-sm text-black/50">
              Non ci sono filtri attivi
            </p>
          )}
        </section>
      </section>

      {/* SPECIALITÀ */}
      <section className={sectionStyle}>
        <section className="flex items-center justify-between space-x-1">
          <p>Specialità</p>
          <section className="flex space-x-1">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => handleRemoveTap(1)}
              className="py-2 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Rimuovi
            </Button>
            <Dialog>
              <DialogTrigger>
                <Button variant={"ghost"} size={"sm"}>
                  <MdAdd size={20} />
                </Button>
                <ChipsDialog
                  title={"specilità"}
                  description={"Seleziona il tipo di specialità"}
                  data={SPECIALITIES}
                  sectionIndex={1}
                />
              </DialogTrigger>
            </Dialog>
          </section>
        </section>
        <section className={wrapEmptyStyle}>
          {state.specialities.length > 0 ? (
            <section>Specilities: {state.specialities.length}</section>
          ) : (
            <p className="justify-center text-center text-sm text-black/50">
              Non ci sono filtri attivi
            </p>
          )}
        </section>
      </section>

      {/* DESCRITTORI */}
      <section className={sectionStyle}>
        <section className="flex items-center justify-between space-x-1">
          <p>Descrittori</p>
          <section className="flex space-x-1">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="py-2 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Rimuovi
            </Button>
            <Button variant={"ghost"} size={"sm"}>
              <MdAdd size={20} />
            </Button>
          </section>
        </section>
        <section className={wrapEmptyStyle}>
          <p className="justify-center text-center text-sm text-black/50">
            Non ci sono filtri attivi
          </p>
        </section>
      </section>
    </section>
  );
}
