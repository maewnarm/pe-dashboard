import { OrganizeType } from "@/types/maindashboard";

export const OrganizeByProduct: { [product: string]: OrganizeType } = {
  alt: {
    part: [
      {
        name: "Alternator Assy",
        pic: "/parts/alt-assy-2.png",
        row: 3,
      },
      {
        name: "Rotor assy",
        pic: "/parts/alt-rotor-2.png",
        row: 2,
      },
      {
        name: "Slip ring assy",
        pic: "/parts/alt-slipring-1.png",
        row: 2,
      },
      {
        name: "Stator assy",
        pic: "/parts/alt-stator-1.png",
        row: 4,
      },
      {
        name: "Rectifier assy",
        pic: "/parts/alt-rectifier-1.png",
        row: 2,
      },
      {
        name: "Frame Drive",
        pic: "/parts/alt-framedr-1.png",
        row: 1,
      },
      {
        name: "Frame Rear",
        pic: "/parts/alt-framerr-1.png",
        row: 1,
      },
    ],
    assy: [
      {
        name: "Alternator Assy",
        pic: "/parts/alt-assy-2.png",
        row: 15,
      },
    ],
    fm: [
      {
        name: "Factory Manager (FM)",
        pic: "/person/1.png",
        row: 15,
      },
    ],
    mgr: [
      {
        name: "Manager - Alternator assy",
        pic: "/person/2.png",
        row: 3,
      },
      {
        name: "Manager - Rotor,Slip ring assy",
        pic: "/person/3.png",
        row: 4,
      },
      {
        name: "Manager - Stator assy",
        pic: "/person/1.png",
        row: 4,
      },
      {
        name: "Manager - Rectifier assy",
        pic: "/person/2.png",
        row: 2,
      },
      {
        name: "Manager - Frame Drive,Rear",
        pic: "/person/mgr.png",
        row: 2,
      },
    ],
    tl: [
      {
        name: "TL - Alternator assy",
        pic: "/person/5.png",
        row: 3,
      },
      {
        name: "TL - Rotor assy",
        pic: "/person/6.png",
        row: 2,
      },
      {
        name: "TL - Slip ring assy",
        pic: "/person/tl.png",
        row: 2,
      },
      {
        name: "TL - Stator assy",
        pic: "/person/8.png",
        row: 4,
      },
      {
        name: "TL - Rectifier assy",
        pic: "/person/tl.png",
        row: 2,
      },
      {
        name: "TL - Frame Drive,Rear assy",
        pic: "/person/tl.png",
        row: 2,
      },
    ],
  },
};

export const OrganizeRow: { [product: string]: number } = {
  alt: 15,
};
