import { images, COLORS } from "..";

export const campaignData = [
  {
    id: 100,
    name: "Uue Aasta",
    img: images.kampaania,
    bgColor: COLORS.purple,
    numericPrice: 39.99,
    type: "KAMPAANIA",
    info: "Premium philadelphia maki (10tk)\nWakame califa (10tk)\nTempura hiidrevetitega (10tk)\nKyoto surimi maki (10tk)",
    extraInfo: "Uue Aasta pakkumine kehtib ainult 31.12 kuni 19:00",
    cost: true,
  },
  {
    id: 101,
    name: "O! Tellimus",
    img: images.otellimus,
    bgColor: COLORS.purple,
    numericPrice: "",
    type: "KAMPAANIA",
    info: "Pakume teile sushit teie eelarve alusel",
    extraInfo: "LINK HERE",
    cost: false,
  },
  {
    id: 102,
    name: "Kojuvedu 0€",
    img: images.delivery,
    bgColor: COLORS.purple,
    numericPrice: "",
    info: "Üle 50 euro tellimustele kohaletoimetamine tasuta",
    type: "KAMPAANIA",
    cost: false,
  },
  {
    id: 103,
    name: "Tasuta maki",
    img: images.free,
    type: "KAMPAANIA",
    info: "Hankige tempel igale üle 20 euro suurusele tellimusele. Viis plaastrit annab võimaluse saada tasuta sushit.",
    numericPrice: "",
    bgColor: COLORS.purple,
    cost: false,
  },
  {
    id: 104,
    name: "Üks + Üks",
    img: images.uks,
    bgColor: COLORS.purple,
    numericPrice: 14.9,
    type: "KAMPAANIA",
    info: "Philadelphia maki (10tk)\nKana tempura (10tk)",
    cost: true,
  },
];

export default campaignData;
