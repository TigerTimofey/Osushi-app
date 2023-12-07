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
    name: "Tasuta Kojuvedu 0€",
    img: images.delivery,
    bgColor: COLORS.purple,
    numericPrice: 0,
    info: "Tasuta kohaletoimetamine ainult äpis kaudu tehtud tellimustele",
    type: "KAMPAANIA",
    cost: true,
  },
  {
    id: 102,
    name: "Tasuta maki",
    img: images.free,
    type: "KAMPAANIA",
    info: "Hankige tempel igale üle 20 euro suurusele tellimusele. Viis plaastrit annab võimaluse saada tasuta sushit.",
    numericPrice: "",
    bgColor: COLORS.purple,
    cost: false,
  },
  {
    id: 103,
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
