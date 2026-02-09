export const dronesCategory = {
  id: "drones",
  name: "Drones",
  icon: "icons/menus/Drones.webp",
  stats: [
    {
      type: "group",
      key: "drones",
      name: "Drone Bay",
      desc: "Configure each drone",
      layout: "row",
      items: [
        { id: "bear", label: "Bear", icon: "icons/drones/Drone_Bear.webp" },
        { id: "chain", label: "Chain", icon: "icons/drones/Drone_Chain.webp" },
        { id: "prismatic", label: "Prismatic", icon: "icons/drones/Drone_Prism.webp" },
        { id: "elixir", label: "Elixir", icon: "icons/drones/Drone_Elixir.webp" },
        { id: "void", label: "Void", icon: "icons/drones/Drone_Void.webp" }
      ],
      fields: [
        { key: "level", name: "Level", type: "number", default: 0 },
        { key: "grade", name: "Grade", type: "number", default: 0 },
        { key: "active", name: "Active", type: "checkbox", default: false },
        { key: "fueled", name: "Fueled", type: "checkbox", default: false }
      ]
    }
  ]
};
