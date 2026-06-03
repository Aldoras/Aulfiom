export const craftCategory = {
  id: "craft",
  name: "Craft",
  icon: "icons/menus/Craft.webp",
  stats: [
    {
      key: "barCost",
      name: "Bar Craft cost",
      desc: "decreases amount of Ores needed per Bar to be crafted",
      type: "number",
      default: 1,
      min: 0,
      max: 1,
      step: 0.01,
      unit: "multiplier",
      icon: "icons/crafting/Bar_Craft_Cost.webp"
    },
    {
      key: "freeCraft",
      name: "Free Craft Chance ",
      desc: "chance for a crafting action to not consume ore",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 1,
      unit: "percent",
      icon: "icons/crafting/Free_Craft_Chance.webp"
    },
        {
      key: "doubleCraft",
      name: "Double Craft Chance ",
      desc: "hance for a craft to give 2x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 1,
      unit: "percent",
      icon: "icons/crafting/Double_Craft_Chance.webp"
    },
        {
      key: "tripleCraft",
      name: "Triple Craft Chance ",
      desc: "chance for a craft to give 3x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 1,
      unit: "percent",
      icon: "icons/crafting/Triple_Craft_Chance.webp"
    },
        {
      key: "fivexCraft",
      name: "5x Craft Chance ",
      desc: " chance for a craft to give 5x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.01,
      unit: "percent",
      icon: "icons/crafting/5x_Craft_Chance.webp"
    },
        {
      key: "tenxCraft",
      name: "10x Craft Chance ",
      desc: "chance for a craft to give 10x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.01,
      unit: "percent",
      icon: "icons/crafting/10x_Craft_Chance.webp"
    },
        {
      key: "twentyxCraft",
      name: "20x Craft Chance ",
      desc: "chance for a craft to give 20x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.01,
      unit: "percent",
      icon: "icons/crafting/20x_Craft_Chance.webp"
    },
        {
      key: "hundredxCraft",
      name: "100x Craft Chance ",
      desc: "chance for a craft to give 100x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.01,
      unit: "percent",
      icon: "icons/crafting/100x_Craft_Chance.webp"
    },
        {
      key: "barOutputMulti",
      name: "Bar Output Multiplier ",
      desc: "cprovides a multiplier to total amount of bars you receive from sources of bar creation like crafting",
      type: "number",
      default: 0,
      min: 0,
      step: 0.01,
      unit: "multiplier",
      icon: "icons/crafting/Bar_Output_Multiplier.webp"
    }
  ]
};
