import { images, COLORS } from "..";

export const campaignData = [
  {
    id: 0,
    name: "Uue Aasta",
    img: images.kampaania,
    bgColor: COLORS.purple,
    price: "39,99€",
    type: "KAMPAANIA",
    info: "Uue Aasta pakkumine kehtib ainult 31.12 kuni 19:00",
    cost: true,
  },
  {
    id: 1,
    name: "Kojuvedu 0€",
    img: images.delivery,
    bgColor: COLORS.purple,
    type: "KAMPAANIA",
    cost: false,
  },
  {
    id: 2,
    name: "Tasuta maki",
    img: images.free,
    type: "KAMPAANIA",
    bgColor: COLORS.purple,
    cost: false,
  },
  {
    id: 3,
    name: "Üks + Üks",
    img: images.uks,
    bgColor: COLORS.purple,
    type: "KAMPAANIA",
    cost: true,
  },
];

export default campaignData;
