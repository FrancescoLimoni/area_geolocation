import { Location } from "@/types/location";

export const LOCATIONS: Location[] = [
  {
    title: "DISTRETTO SOCIO-SANITARIO UNICO",
    address: {
      street: "Via G. Marconi, 1",
      city: "FELTRE",
      zipcode: "32010",
      province: "BL",
      region: "Veneto",
    },
    latLng: [45.91249065145324, 11.915729640705322],
    subs: [
      {
        label: "Consultorio",
        sublabel: "Fener",
        number: 1,
      },
      {
        label: "Punto prelievo",
        sublabel: "Punto prelievo sede distrettuale",
        number: 1,
      },
    ],
  },
  {
    title: "OSPEDALE S.MARTINO DI BELLUNO",
    address: {
      street: "Via Europa, 22",
      city: "Belluno",
      zipcode: "32100",
      province: "BL",
      region: "Veneto",
    },
    latLng: [46.1399272815242, 12.202395936558315],
    subs: [
      {
        label: "Day hospital ospedaliero",
        sublabel: "U.O.C Cardiologia day hospital Belluno",
        number: 1,
      },
      {
        label: "Day surgery",
        sublabel: "U.O.C Ostetrica e Ginecologia day surgery Belluno",
        number: 1,
      },
      {
        label: "Degenza",
        sublabel: "U.O.C Urologia Belluno",
        number: 1,
      },
      {
        label: "Pronto soccorso ospedaliero E C.O.",
        sublabel: "U.O. Pronto Soccorso Belluno",
        number: 1,
      },
    ],
  },
  {
    title: "SOCIETA' NUOVA SOCIETA' COOPERATIVA SOCIALE 'IMPRESA SOCIALE'",
    address: {
      street: "Via Dozza, 22/A",
      city: "Agordo",
      zipcode: "32021",
      province: "BL",
      region: "Veneto",
    },
    latLng: [46.28316927059213, 12.039753454397731],
    subs: [
      {
        label: "Ambulatorio veterinario",
        sublabel: "Ambulatorio veterinario",
        number: 1,
      },
    ],
  },
  {
    title: "ANTEAS MONTE PERINA",
    address: {
      street: "Via Dorgnan, 19",
      city: "CESIOMAGGIORE",
      zipcode: "32030",
      province: "BL",
      region: "Veneto",
    },
    latLng: [46.06553851996695, 11.985478352622081],
    subs: [
      {
        label: "Progetto Sollievo Alzheimer Anteas",
        sublabel: "Progetto Sollievo Alzheimer Anteas",
        number: 1,
      },
    ],
  },
];
