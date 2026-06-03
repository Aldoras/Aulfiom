export const floorsCategory = {
  id: "floors",
  name: "Floors",
  icon: "icons/menus/Blank.webp",
  stats: [
    {
      key: "goldenFloorChance",
      name: "Golden Floor Chance",
      desc: "decreases amount of Ores needed per Bar to be crafted",
      type: "number",
      default: 1,
      min: 0,
      max: 100,
      step: 1,
      unit: "percent",
      icon: "icons/floors/Golden_Floor_Chance.webp"
    },
    {
      key: "goldenFloorMultiplier",
      name: "Golden Floor Multiplier",
      desc: "chance for a crafting action to not consume ore",
      type: "number",
      default: 0,
      min: 0,
      step: 1,
      unit: "multiplier",
      icon: "icons/floors/Golden_Floor_Multiplier.webp"
    },
        {
      key: "rainbowFloorChance",
      name: "Rainbow Floor Chance",
      desc: "hance for a craft to give 2x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 1,
      unit: "percent",
      icon: "icons/floors/Rainbow_Floor_Chance.webp"
    },
        {
      key: "rainBowFloorMultiplier",
      name: "Rainbow Floor Multiplier",
      desc: "chance for a craft to give 3x bars",
      type: "number",
      default: 0,
      min: 0,
      step: 1,
      unit: "multiplier",
      icon: "icons/floors/Rainbow_Floor_Multiplier.webp"
    },
        {
      key: "galacticFloorChance",
      name: "Galactic Rainbow Floor Chance",
      desc: " chance for a craft to give 5x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.01,
      unit: "percent",
      icon: "icons/floors/Galactic_Rainbow_Floor_Chance.webp"
    },
        {
      key: "galacticFloorMultiplier",
      name: "Galactic Rainbow Floor Multiplier",
      desc: "chance for a craft to give 10x bars",
      type: "number",
      default: 0,
      min: 0,
      step: 1,
      unit: "multiplier",
      icon: "icons/floors/Galactic_Rainbow_Floor_Multiplier.webp"
    },
        {
      key: "prismaticFloorChance",
      name: "Prismatic Galactic Rainbow Floor Chance",
      desc: "chance for a craft to give 20x bars",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 0.01,
      unit: "percent",
      icon: "icons/floors/Prismatic_Galactic_Floor_Chance.webp"
    },
        {
      key: "prismaticFloorMultiplier",
      name: "Prismatic Floor multiplier ",
      desc: "chance for a craft to give 100x bars",
      type: "number",
      default: 0,
      min: 0,
      step: 1,
      unit: "percent",
      icon: "icons/floors/Prismatic_Galactic_Floor_Multi.webp"
    },
        {
      key: "allFloorMulti",
      name: "All Floor Multis",
      desc: "like crafting",
      type: "number",
      default: 0,
      min: 0,
      step: 0.01,
      unit: "multiplier",
      icon: "icons/floors/All_Floor_Multis_(Gold,Rainbow,Galactic).webp"
    }
  ]
};
