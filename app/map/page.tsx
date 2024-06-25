"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { FaSearchLocation } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdFilterList } from "react-icons/md";
import LocationTile from "@/components/location_tile";
import { LOCATIONS } from "@/constants/location";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import FiltersPanel from "@/components/filters_panel";
import {
  FiltersProvider,
  hasFilterChanges,
  useFilters,
} from "@/contexts/filters_context";
import Spinner from "@/components/spinner";
import { MarkerData } from "@/types/marker_data";
import { Location } from "@/types/location";

export default function MapPage() {
  const height = "calc(100vh - 172px)";
  const [showFilters, setShowFilters] = useState(false);
  const [filteredLocations, setFilteredLocations] =
    useState<Location[]>(LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <Spinner />,
        ssr: false,
      }),
    []
  );

  const handleFilterClick = () => {
    console.log(handleFilterClick.name);
    setShowFilters(!showFilters);
  };

  const updateLocations = (locations: Location[]) => {
    console.log(updateLocations.name);

    setFilteredLocations(locations);
  };

  // const applyFitlers = (locations: Location[]) => {
  //   console.log(applyFitlers.name);

  //   setShowFilters(!showFilters);
  //   locations.filter((item) => {
  //     item.address.region === state.region;
  //     item.address.city === state.city;
  //   });
  //   setFilteredLocations(locations);
  // };

  const onLocationSelect = (data: Location) => {
    console.log(onLocationSelect.name);

    if (selectedLocation?.title === data.title) {
      setSelectedLocation(null);
      return;
    }

    setSelectedLocation(data);
  };

  return (
    <FiltersProvider>
      <div
        className={"flex h-screen overflow-x-hidden overflow-y-hidden"}
        style={{ height: height }}
      >
        {/* FILTERS */}
        {showFilters ? (
          <FiltersPanel
            className="z-10 h-full w-[48%]"
            locations={filteredLocations}
            onBack={handleFilterClick}
          />
        ) : (
          <section
            className="h-10 w-[48%] flex-col space-y-4 px-4 py-6"
            style={{ height: height }}
          >
            {/* ADDRESS */}
            <section className="flex w-full items-center overflow-clip rounded-full bg-clip-border">
              <Input
                placeholder="Indirizzo"
                className="rounded-none bg-slate-200 px-4"
              />
              <Button className={"rounded-none px-4 py-2 text-sm"}>
                Cerca
              </Button>
            </section>

            {/* RESULT AND FILTERS */}
            <section className="flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <p className="text-sm opacity-55">Risultati</p>
                <p className="text-sm font-medium">
                  {filteredLocations.length}
                </p>
              </span>
              <Button
                variant={"ghost"}
                size={"md"}
                className="p-2"
                onClick={handleFilterClick}
              >
                Filtri
                <MdFilterList className="ml-1" size={20} />
              </Button>
            </section>

            {/* LOCATIONS */}
            <section className="h-[76%] flex-1 space-y-4">
              {filteredLocations.length === 0 ? (
                <section className="flex h-full flex-col items-center justify-center space-y-4">
                  <FaSearchLocation size={40} className="text-black/25" />
                  <p className="font-medium text-black/40">Nessun risultato</p>
                </section>
              ) : (
                filteredLocations.map((item, index) => (
                  <LocationTile
                    key={index}
                    data={item}
                    onTap={() => onLocationSelect(item)}
                  />
                ))
              )}
            </section>

            {/* FOOTER */}
            <section className="flex items-center justify-between">
              <p className="text-sm">Pagina</p>

              <div className="flex items-center justify-between space-x-2">
                <Button
                  size={"sm"}
                  className="h-7 w-7 bg-primary/20 p-1 text-primary"
                >
                  <MdChevronLeft size={24} />
                </Button>
                <p className="text-sm font-medium">01</p>
                <Button
                  size={"sm"}
                  className="h-7 w-7 bg-primary/20 p-1 text-primary"
                >
                  <MdChevronRight size={24} />
                </Button>
              </div>
            </section>
          </section>
        )}

        {/* MAP */}
        <div
          className={"z-10 flex h-full w-full flex-col"}
          style={{ height: height }}
        >
          <Map
            focusOn={selectedLocation}
            markers={LOCATIONS.map((item) => {
              return {
                position: item.latLng,
                message: item.title,
              } as MarkerData;
            })}
          />
        </div>
      </div>
    </FiltersProvider>
  );
}
