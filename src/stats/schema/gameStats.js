// Automatically generated schema configuration for Idle Obelisk Miner Hub
export const gameStatsCategory = {
  "id": "gameStats",
  "name": "Game Stats",
  "icon": "icons/menus/Prestige.webp",
  "tabs": [
    {
      "id": "pickaxe",
      "name": "Pickaxe",
      "stats": [
        {
          "key": "pickaxe_damage",
          "name": "Pickaxe Damage",
          "desc": "Base damage dealt by pickaxe swings",
          "type": "number",
          "icon": "icons/stats/Pickaxe_Damage.png"
        },
        {
          "key": "pickaxe_attack_speed_per_second",
          "name": "Pickaxe Attack Speed",
          "desc": "Swings per second",
          "type": "number",
          "suffix": "/s",
          "icon": "icons/stats/Pickaxe_Attack_Speed.png"
        },
        {
          "key": "pickaxe_radius_percent",
          "name": "Pickaxe Radius",
          "desc": "AoE radius of pickaxe mining area",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Radius.png"
        },
        {
          "key": "pickaxe_crit_chance",
          "name": "Pickaxe Crit Chance",
          "desc": "Chance to land critical strikes",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Crit_Chance.png"
        },
        {
          "key": "pickaxe_crit_damage",
          "name": "Pickaxe Crit Damage",
          "desc": "Critical strike damage multiplier",
          "type": "multi",
          "icon": "icons/stats/Pickaxe_Crit_Damage.png"
        },
        {
          "key": "pickaxe_super_crit_chance",
          "name": "Pickaxe Super Crit Chance",
          "desc": "Chance to land super critical strikes",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Super_Crit_Chance.png"
        },
        {
          "key": "pickaxe_super_crit_damage",
          "name": "Pickaxe Super Crit Damage",
          "desc": "Super critical strike damage multiplier",
          "type": "multi",
          "icon": "icons/stats/Pickaxe_Super_Crit_Damage.png"
        },
        {
          "key": "pickaxe_ultra_crit_chance",
          "name": "Pickaxe Ultra Crit Chance",
          "desc": "Chance to land ultra critical strikes",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Ultra_Crit_Chance.png"
        },
        {
          "key": "pickaxe_ultra_crit_damage",
          "name": "Pickaxe Ultra Crit Damage",
          "desc": "Ultra critical strike damage multiplier",
          "type": "multi",
          "icon": "icons/stats/Pickaxe_Ultra_Crit_Damage.png"
        },
        {
          "key": "pickaxe_omega_crit_chance",
          "name": "Pickaxe Omega Crit Chance",
          "desc": "Chance to land omega critical strikes",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Omega_Crit_Chance.png"
        },
        {
          "key": "pickaxe_omega_crit_damage",
          "name": "Pickaxe Omega Crit Damage",
          "desc": "Omega critical strike damage multiplier",
          "type": "multi",
          "icon": "icons/stats/Pickaxe_Omega_Crit_Damage.png"
        }
      ]
    },
    {
      "id": "bombs",
      "name": "Bombs",
      "stats": [
        {
          "key": "bomb_damage",
          "name": "Bomb Damage",
          "desc": "Base explosive damage of bombs",
          "type": "number",
          "icon": "icons/prestige/Bomb_Damage.webp"
        },
        {
          "key": "bomb_crit_chance",
          "name": "Bomb Crit Chance",
          "desc": "Chance for bomb blasts to critically hit",
          "type": "chance",
          "icon": "icons/prestige/Bomb_Damage.webp"
        },
        {
          "key": "bomb_crit_damage",
          "name": "Bomb Crit Damage",
          "desc": "Multiplier to critical bomb damage",
          "type": "multi",
          "icon": "icons/prestige/Bomb_Damage.webp"
        },
        {
          "key": "bomb_recharge_speed",
          "name": "Bomb Recharge Speed",
          "desc": "Recharging speed index for bomb fabrication",
          "type": "multi",
          "icon": "icons/prestige/Bomb_Capacity.webp"
        },
        {
          "key": "bomb_free_chance",
          "name": "Free  Bomb Chance",
          "desc": "Chance to detonate a bomb without consuming stock",
          "type": "chance",
          "icon": "icons/prestige/Bomb_Capacity.webp"
        },
        {
          "key": "bomb_capacity",
          "name": "Bomb Capacity",
          "desc": "Max inventory storage for bombs",
          "type": "cap",
          "icon": "icons/prestige/Bomb_Capacity.webp"
        },
        {
          "key": "bomb_additional_multiplier",
          "name": "Additional Bomb Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "",
          "icon": "icons/stats/Additional_Bomb_Multiplier.png"
        },
        {
          "key": "bomb_super_crit_chance",
          "name": "Bomb Super Crit Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bomb_Super_Crit_Chance.png"
        },
        {
          "key": "bomb_super_crit_damage",
          "name": "Bomb super Crit Damage",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bomb_Super_Crit_Damage.png"
        },
        {
          "key": "bomb_ultra_crit_chance",
          "name": "Bomb Ultra Crit Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bomb_Ultra_Crit_Chance.png"
        },
        {
          "key": "bomb_ultra_crit_damage",
          "name": "Bomb Ultra Crit Damage",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bomb_Ultra_Crit_Damage.png"
        },
        {
          "key": "bomb_omega_crit_chance",
          "name": "Bomb Omega Crit Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bomb_Omega_Crit_Chance.png"
        },
        {
          "key": "bomb_omega_crit_damage",
          "name": "Bomb Omega Crit Damage",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bomb_Omega_Crit_Damage.png"
        },
        {
          "key": "bomb_cherry3x_chance",
          "name": "Cherry Charge 3x Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Cherry_Charge_3x_Chance.png"
        },
        {
          "key": "bomb_battery_cap_increases",
          "name": "Bomb Capacity Gained From Battery",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bomb_Capacity_Gained_From_Battery.png"
        },
        {
          "key": "bomb_cap_multiplier",
          "name": "Bomb Cap Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bomb_Cap_Multiplier.png"
        },
        {
          "key": "bomb_workshop_cap_increase",
          "name": "Workshop Upgrade Cap Increase",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Workshop_Upgrade_Cap_Increase.png"
        }
      ]
    },
    {
      "id": "drones",
      "name": "Drones ",
      "stats": [
        {
          "key": "drone_count",
          "name": "Number Of Drones",
          "desc": "Number of currently active drones",
          "type": "cap",
          "icon": "icons/stats/Number_Of_Drones.png"
        },
        {
          "key": "drone_damage_percent",
          "name": "Drone Damage",
          "desc": "Drone damage boost",
          "type": "chance",
          "icon": "icons/stats/Drone_Damage.png"
        },
        {
          "key": "drone_radius_percent",
          "name": "Drone Radius",
          "desc": "Drone collection/mining radius boost",
          "type": "chance",
          "icon": "icons/stats/Drone_Radius.png"
        },
        {
          "key": "drone_movespeed_percent",
          "name": "Drone Movespeed",
          "desc": "Drone movement speed boost",
          "type": "chance",
          "icon": "icons/stats/Drone_Movespeed.png"
        },
        {
          "key": "drone_attack_speed_percent",
          "name": "Drone Attack Speed",
          "desc": "Drone attack speed boost",
          "type": "chance",
          "icon": "icons/stats/Drone_Attack_Speed.png"
        },
        {
          "key": "drone_triple_damage_chance",
          "name": "Drone Triple Damage",
          "desc": "Chance for drone attacks to deal triple damage",
          "type": "chance",
          "icon": "icons/stats/Drone_Triple_Damage.png"
        },
        {
          "key": "drone_rapid_fire_chance",
          "name": "Drone Rapid Fire Chance",
          "desc": "Chance for drones to enter rapid fire",
          "type": "chance",
          "icon": "icons/stats/Drone_Rapid_Fire_Chance.png"
        },
        {
          "key": "drone_suit_cap",
          "name": "Drone Suit Upgrade Cap",
          "desc": "Capacity limit of the player's drone suit",
          "type": "cap",
          "icon": "icons/stats/Drone_Suit_Upgrade_Cap.png"
        },
        {
          "key": "coal_generation_seconds",
          "name": "Coal Generation Time",
          "desc": "Interval in seconds to generate coal",
          "type": "number",
          "suffix": "s",
          "icon": "icons/stats/Coal_Generation_Time.png"
        },
        {
          "key": "coal_fuel_duration_multi",
          "name": "Drone Fuel Duration Multiplier",
          "desc": "Multiplier applied to coal burn durations",
          "type": "multi",
          "icon": "icons/stats/Drone_Fuel_Duration_Multiplier.png"
        },
        {
          "key": "coal_capacity_multi",
          "name": "Coal Capacity Multiplier",
          "desc": "Multiplier applied to max coal capacity",
          "type": "multi",
          "icon": "icons/stats/Coal_Capacity_Multiplier.png"
        },
        {
          "key": "coal_fuel_save_chance",
          "name": "Fuel Save Chance",
          "desc": "Chance to run fuel systems without consuming fuel",
          "type": "chance",
          "icon": "icons/stats/Fuel_Save_Chance.png"
        },
        {
          "key": "coal_drone_exp_multi",
          "name": "Drone Exp Gain Multiplier",
          "desc": "Multiplier to drone experience gained via coal",
          "type": "multi",
          "icon": "icons/stats/Drone_Exp_Gain_Multiplier.png"
        },
        {
          "key": "void_portal_chance",
          "name": "Void Portal Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Void_Portal_Chance.png"
        },
        {
          "key": "void_portal_base_multi",
          "name": "Void Portal Base Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Void_Portal_Base_Multiplier.png"
        },
        {
          "key": "golden_void_portal_chance",
          "name": "Golden Void Portal Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Golden_Void_Portal_Chance.png"
        },
        {
          "key": "golden_void_portal_multi",
          "name": "Golden Void Portal Multi",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Golden_Void_Portal_Multi.png"
        },
        {
          "key": "rainbow_void_portal_chance",
          "name": "Rainbow Void Portal Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Rainbow_Void_Portal_Chance.png"
        },
        {
          "key": "rainbow_void_portal_multi",
          "name": "Rainbow Void Portal Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Rainbow_Void_Portal_Multiplier.png"
        },
        {
          "key": "all_void_portal_multi",
          "name": "All Void Portal Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/All_Void_Multi.png"
        },
        {
          "key": "elixir_crit_chance",
          "name": "Elixir Crit Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Elixir_Crit_Chance.png"
        },
        {
          "key": "elixir_crit_multi",
          "name": "Elixir Crit Multi",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Elixir_Crit_Multi.png"
        }
      ]
    },
    {
      "id": "ore",
      "name": "Ores",
      "stats": [
        {
          "key": "multi_rock_chance",
          "name": "Triple Rock Chance",
          "desc": "Chance to strike multiple rocks simultaneously",
          "type": "chance",
          "icon": "icons/stats/Triple_Rock_Chance.png"
        },
        {
          "key": "ore_sell_price_multi",
          "name": "Ore Sell Price Multiplier",
          "desc": "Multiplier applied to ore sell prices",
          "type": "multi",
          "icon": "icons/stats/Ore_Sell_Price_Multiplier.png"
        },
        {
          "key": "ore_income_multi",
          "name": "Ore Income Multiplier",
          "desc": "Multiplier applied to ore drops",
          "type": "multi",
          "icon": "icons/stats/Ore_Income_Multiplier.png"
        },
        {
          "key": "golden_ore_chance",
          "name": "Golden Ore Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Golden_Ore_Chance.png"
        },
        {
          "key": "golden_ore_multi",
          "name": "Golden Ore Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Golden_Ore_Multiplier.png"
        },
        {
          "key": "golden_floor_chance",
          "name": "Golden Floor Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Golden_Floor_Chance.png"
        },
        {
          "key": "golden_floor_multi",
          "name": "Golden Floor Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Golden_Floor_Multiplier.png"
        },
        {
          "key": "rainbow_floor_chance",
          "name": "Rainbow Floor Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Rainbow_Floor_Chance.png"
        },
        {
          "key": "rainbow_floor_multi",
          "name": "Rainbow Floor Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Rainbow_Floor_Multiplier.png"
        },
        {
          "key": "galactic_floor_chance",
          "name": "Galactic Rainbow Floor Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Galactic_Rainbow_Floor_Chance.png"
        },
        {
          "key": "galactic_floor_multi",
          "name": "Galactic Rainbow Floor Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Galactic_Rainbow_Floor_Multiplier.png"
        },
        {
          "key": "bar_output_multi",
          "name": "Bar Output Multiplier",
          "desc": "Multiplier to the amount of bars crafted",
          "type": "multi",
          "icon": "icons/prestige/Bar_Output_Multiplier.webp"
        },
        {
          "key": "prismatic_floor_chance",
          "name": "Prismatic Galactic Floor Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Prismatic_Galactic_Floor_Chance.png"
        },
        {
          "key": "prismatic_floor_multi",
          "name": "Prismatic Galactic Floor Multi",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Prismatic_Galactic_Floor_Multi.png"
        },
        {
          "key": "pizzas_eaten",
          "name": "Pizzas Eaten",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Pizzas_Eaten.png"
        },
        {
          "key": "steak_eaten",
          "name": "Steaks Eaten",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Steaks_Eaten.png"
        },
        {
          "key": "all_floor_multipliers",
          "name": "All Floor Multis",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/All_Floor_Multis_(Gold,Rainbow,Galactic).png"
        }
      ]
    },
    {
      "id": "crafting",
      "name": "Crafting",
      "stats": [
        {
          "key": "free_craft_chance",
          "name": "Free Craft Chance",
          "desc": "Chance to craft items without consuming materials",
          "type": "chance",
          "icon": "icons/stats/Free_Craft_Chance.png"
        },
        {
          "key": "double_craft_chance",
          "name": "Double Craft Chance",
          "desc": "Chance to receive 2x bars from a single craft",
          "type": "chance",
          "icon": "icons/stats/Double_Craft_Chance.png"
        },
        {
          "key": "triple_craft_chance",
          "name": "Triple Craft Chance",
          "desc": "Chance to receive 3x bars from a single craft",
          "type": "chance",
          "icon": "icons/stats/Triple_Craft_Chance.png"
        },
        {
          "key": "craft_5x_chance",
          "name": "5x Craft Chance",
          "desc": "Chance to receive 5x bars from a single craft",
          "type": "chance",
          "icon": "icons/stats/5x_Craft_Chance.png"
        },
        {
          "key": "craft_10x_chance",
          "name": "10x Craft Chance",
          "desc": "Chance to receive 10x bars from a single craft",
          "type": "chance",
          "icon": "icons/stats/10x_Craft_Chance.png"
        },
        {
          "key": "craft_20x_chance",
          "name": "20x Craft Chance",
          "desc": "Chance to receive 20x bars from a single craft",
          "type": "chance",
          "icon": "icons/stats/20x_Craft_Chance.png"
        },
        {
          "key": "craft_100x_chance",
          "name": "100x Craft Chance",
          "desc": "Chance to receive 100x bars from a single craft",
          "type": "chance",
          "icon": "icons/stats/100x_Craft_Chance.png"
        },
        {
          "key": "bar_output_multi",
          "name": "Bar Output Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bar_Output_Multiplier.png"
        },
        {
          "key": "bar_upgrade_cost_reduction",
          "name": "Bar Cost Reduction",
          "desc": "Reduction to upgrade costs involving bars",
          "type": "reduction",
          "icon": "icons/stats/Bar_Cost_Reduction.png"
        },
        {
          "key": "bar_craft_cost_multi",
          "name": "Bar Craft Cost ",
          "desc": "Reduction to ores required for bar crafting",
          "type": "reduction",
          "icon": "icons/stats/Bar_Craft_Cost.png"
        }
      ]
    },
    {
      "id": "obelisk",
      "name": "Obelisk",
      "stats": [
        {
          "key": "obelisk_timer_add",
          "name": "Bonus Obelisk Fight Length",
          "desc": "Additional seconds added to Obelisk active timers",
          "type": "multi",
          "suffix": "s",
          "icon": "icons/stats/Bonus_Obelisk_Fight_Length.png"
        },
        {
          "key": "obelisk_cooldown_multi",
          "name": "Obelisk Cooldown",
          "desc": "Cooldown reduction scale for the Obelisk active",
          "type": "reduction",
          "icon": "icons/stats/Obelisk_Cooldown.png"
        },
        {
          "key": "obelisk_armor_reduction",
          "name": "Obelisk Armor Reduction",
          "desc": "Scale of armor ignored/reduced by the Obelisk",
          "type": "reduction",
          "icon": "icons/prestige/Obelisk_Armor_Reduction.webp"
        }
      ]
    },
    {
      "id": "prestige",
      "name": "Prestige",
      "stats": [
        {
          "key": "xp_level_cap",
          "name": "XP Level Cap",
          "desc": "Maximum level cap for experience level",
          "type": "cap",
          "icon": "icons/stats/Xp_Level_Cap.png"
        },
        {
          "key": "prestige_point_multi",
          "name": "Prestige Point Gain Multiplier",
          "desc": "Multiplier applied to prestige points earned",
          "type": "multi",
          "icon": "icons/stats/Prestige_Point_Gain_Multiplier.png"
        },
        {
          "key": "experience_multi",
          "name": "Experience Gain Multiplier",
          "desc": "Multiplier applied to all experience points gained",
          "type": "multi",
          "icon": "icons/stats/Experience_Gain_Multiplier.png"
        },
        {
          "key": "floor_clear_requirement_multi",
          "name": "Floor Clear Requirement",
          "desc": "Scale of requirements to clear floors (lower is better)",
          "type": "reduction",
          "icon": "icons/stats/Floor_Clear_Requirement.png"
        },
        {
          "key": "artifact_cap_increase",
          "name": "Artifact Upgrade Cap Increase",
          "desc": "Increase to the artifact capacity limits",
          "type": "number",
          "icon": "icons/stats/Artifact_Upgrade_Cap_Increase.png"
        },
        {
          "key": "artifact_tier4_cap_increase",
          "name": "Artifact Tier 4 Cap Increase",
          "desc": "Increase to Tier 4 artifact limits",
          "type": "number",
          "icon": "icons/stats/Artifact_Tier_4_Cap_Increase.png"
        }
      ]
    },
    {
      "id": "lootbugs",
      "name": "Lootbugs",
      "stats": [
        {
          "key": "lootbug_spawn_rate",
          "name": "Lootbug Spawn Rate Multiplier",
          "desc": "Base rate at which lootbugs spawn",
          "type": "multi",
          "icon": "icons/stats/Lootbug_Spawn_Rate_Multiplier.png"
        },
        {
          "key": "lootbug_triple_chance",
          "name": "Triple Lootbug Chance",
          "desc": "Chance for lootbugs to spawn in triplets",
          "type": "chance",
          "icon": "icons/stats/Triple_Lootbug_Chance.png"
        },
        {
          "key": "lootbug_golden_chance",
          "name": "Golden Lootbug Chance",
          "desc": "Chance for a spawned lootbug to be golden",
          "type": "chance",
          "icon": "icons/stats/Golden_Lootbug_Chance.png"
        },
        {
          "key": "lootbug_bank_cap",
          "name": "Banked Lootbug Cap",
          "desc": "Maximum capacity limit of the lootbug bank",
          "type": "cap",
          "icon": "icons/stats/Banked_Lootbug_Cap.png"
        },
        {
          "key": "lootbug_gem_cost_reduction",
          "name": "Lootbug Gem Cost Reduction",
          "desc": "Reduction to gem costs from lootbug bank upgrades",
          "type": "reduction",
          "icon": "icons/stats/Lootbug_Gem_Cost_Reduction.png"
        },
        {
          "key": "lootbug_loot_multi",
          "name": "Lootbug Loot Multiplier",
          "desc": "Multiplier applied to lootbug drops",
          "type": "multi",
          "icon": "icons/stats/Lootbug_Loot_Multiplier.png"
        },
        {
          "key": "lootfrog_lanterns_used",
          "name": "Lanterns Used",
          "desc": "Number of lanterns active/used",
          "type": "number",
          "icon": "icons/stats/Lanterns_Used.png"
        }
      ]
    },
    {
      "id": "lootfrogs",
      "name": "Lootfrogs",
      "stats": [
        {
          "key": "lootfrogs_caught",
          "name": "Lootfrogs Caught",
          "desc": "Total amount of normal lootfrogs caught",
          "type": "number",
          "icon": "icons/stats/Lootfrogs_Caught.png"
        },
        {
          "key": "golden_lootfrogs_caught",
          "name": "Golden Lootfrogs Caught",
          "desc": "Total amount of golden lootfrogs caught",
          "type": "number",
          "icon": "icons/stats/Golden_Lootfrogs_Caught.png"
        },
        {
          "key": "lootfrog_capacity",
          "name": "Lootfrog Capacity",
          "desc": "Max inventory storage capacity for lootfrogs",
          "type": "cap",
          "icon": "icons/stats/Lootfrog_Capacity.png"
        },
        {
          "key": "lootfrog_loot_multi",
          "name": "Lootfrog Loot Multiplier",
          "desc": "Multiplier applied to lootfrog capture rewards",
          "type": "multi",
          "icon": "icons/stats/Lootfrog_Loot_Multiplier.png"
        },
        {
          "key": "lootfrog_golden_chance",
          "name": "Golden  Lootfrog Chance",
          "desc": "Chance for a spawned lootfrog to be golden",
          "type": "chance",
          "icon": "icons/stats/Golden_Lootfrog_Chance.png"
        },
        {
          "key": "lootfrog_golden_multi",
          "name": "Golden Lootfrog Multiplier",
          "desc": "Multiplier applied to golden lootfrog capture rewards",
          "type": "multi",
          "icon": "icons/stats/Golden_Lootfrog_Multiplier.png"
        },
        {
          "key": "lootfrog_triple_spawn_chance",
          "name": "Lootfrog Triple Spawn Chance",
          "desc": "Chance to spawn 3x lootfrogs simultaneously",
          "type": "chance",
          "icon": "icons/stats/Frog_Frenzy.png"
        },
        {
          "key": "lootfrog_10x_spawn_chance",
          "name": "Lootfrog 10x Spawn Chance",
          "desc": "Chance to spawn 10x lootfrogs simultaneously",
          "type": "chance",
          "icon": "icons/stats/Lootfrog_10x_Spawn_Chance.png"
        },
        {
          "key": "lootfrog_big_chance",
          "name": "Big Lootfrog Chance",
          "desc": "Chance for a spawned lootfrog to be giant",
          "type": "chance",
          "icon": "icons/stats/Big_Lootfrog_Chance.png"
        },
        {
          "key": "lootfrog_big_multi",
          "name": "Big Lootfrog Multi",
          "desc": "Multiplier applied to giant lootfrog capture rewards",
          "type": "multi",
          "icon": "icons/stats/Big_Lootfrog_Multi.png"
        }
      ]
    },
    {
      "id": "chests",
      "name": "Chests",
      "stats": [
        {
          "key": "chest_double_chance",
          "name": "Chance For 2x Chests",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Chance_For_2x_Chests.png"
        },
        {
          "key": "chest_meter_multi",
          "name": "Chest Meter Gain Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Chest_Meter_Gain_Multiplier.png"
        },
        {
          "key": "chest_items_bonus",
          "name": "Items Contained In Chests",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Items_Contained_In_Chests.png"
        },
        {
          "key": "freebie_gems_bonus",
          "name": "Bonus Gems From Freebie Pack",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Bonus_Gems_From_Freebie_Pack.png"
        },
        {
          "key": "freebie_5x_chance",
          "name": "Chance For Freebie Jackpot",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Chance_For_Freebie_Jackpot.png"
        },
        {
          "key": "freebie_refresh_chance",
          "name": "Instant Refresh Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Instant_Refresh_Chance.png"
        },
        {
          "key": "freebie_bank_cap",
          "name": "Banked Freebie Cap",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Banked_Freebie_Cap.png"
        },
        {
          "key": "freebie_cooldown_seconds",
          "name": "Freebie Cooldown",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "",
          "icon": "icons/stats/Freebie_Cooldown.png",
          "suffix": "s"
        },
        {
          "key": "stonks_chance",
          "name": "Stonks Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Stonks_Chance.png"
        },
        {
          "key": "stonks_multi",
          "name": "Stonks Freebie Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Stonks_Freebie_Multiplier.png"
        },
        {
          "key": "super_stonks_chance",
          "name": "Super Stonks Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Stonks_Chance.png"
        },
        {
          "key": "super_stonks_multi",
          "name": "Super Stonks Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Stonks_Multiplier.png"
        },
        {
          "key": "ultra_stonks_chance",
          "name": "Ultra Stonks Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Ultra_Stonks_Chance.png"
        },
        {
          "key": "ultra_stonks_multi",
          "name": "Ultra Stonks Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Ultra_Stonks_Multiplier.png"
        },
        {
          "key": "all_stonks_multi",
          "name": "All Stonks Multi",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/All_Stonks_Multi.png"
        }
      ]
    },
    {
      "id": "contracts",
      "name": "Contracts",
      "stats": [
        {
          "key": "contract_cost_reduction",
          "name": "Contract Cost Reduction",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Contract_Cost_Reduction.png"
        },
        {
          "key": "contract_double_points_chance",
          "name": "Double Contract Point Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Double_Contract_Point_Chance.png"
        },
        {
          "key": "contract_triple_points_chance",
          "name": "Triple Contract Point Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Triple_Contract_Point_Chance.png"
        },
        {
          "key": "contract_5x_points_chance",
          "name": "5x Contract Point Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/5x_Contract_Point_Chance.png"
        },
        {
          "key": "contract_10x_points_chance",
          "name": "10x Contract Point Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/10x_Contract_Point_Chance.png"
        },
        {
          "key": "contract_points_rewarded",
          "name": "Contract Points Rewarded",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Contract_Points_Rewarded.png"
        },
        {
          "key": "contract_cap_increase",
          "name": "Contract Upgrade Cap Increase",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Contract_Upgrade_Cap_Increase.png"
        },
        {
          "key": "contract_upgrade_cost_reduction",
          "name": "Contract Upgrade Cost Reduction",
          "type": "reduction",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Contract_Upgrade_Cost_Reduction.png"
        }
      ]
    },
    {
      "id": "veins",
      "name": "Veins",
      "stats": [
        {
          "key": "vein_spawn_rate_multi",
          "name": "Vein Spawn Rate Multiplier",
          "desc": "Multiplier to the spawn rate of veins",
          "type": "multi",
          "icon": "icons/stats/Vein_Spawn_Rate_Multiplier.png"
        },
        {
          "key": "vein_income_multi",
          "name": "Vein Income Multiplier",
          "desc": "Global multiplier to income generated from veins",
          "type": "multi",
          "icon": "icons/stats/Vein_Income_Multiplier.png"
        },
        {
          "key": "golden_vein_chance",
          "name": "Golden Vein Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Golden_Vein_Chance.png"
        },
        {
          "key": "golden_vein_multi",
          "name": "Golden Vein Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Golden_Vein_Multiplier.png"
        },
        {
          "key": "rainbow_vein_chance",
          "name": "Rainbow Vein Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Rainbow_Vein_Chance.png"
        },
        {
          "key": "rainbow_vein_multi",
          "name": "Rainbow Vein Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Rainbow_Vein_Multiplier.png"
        },
        {
          "key": "gleaming_vein_chance",
          "name": "Gleaming Vein Chance",
          "desc": "Chance for Gleaming Veins to spawn",
          "type": "chance",
          "icon": "icons/stats/Gleaming_Vein_Chance.png"
        },
        {
          "key": "gleaming_vein_multi",
          "name": "Gleaming Vein Multiplier",
          "desc": "Multiplier applied to gleaming vein yields",
          "type": "multi",
          "icon": "icons/stats/Gleaming_Vein_Multiplier.png"
        }
      ]
    },
    {
      "id": "stars",
      "name": "Stars",
      "stats": [
        {
          "key": "star_spawn_rate",
          "name": "Star Spawn Rate Multiplier",
          "desc": "Rate at which stars spawn on screen",
          "type": "number",
          "icon": "icons/stats/Star_Spawn_Rate_Multiplier.png"
        },
        {
          "key": "star_auto_catch_chance",
          "name": "Auto-Catch Chance",
          "desc": "Chance for stars to be collected automatically",
          "type": "chance",
          "icon": "icons/stats/Auto-Catch_Chance.png"
        },
        {
          "key": "star_double_spawn_chance",
          "name": "Star Double Spawn Chance",
          "desc": "Chance for stars to spawn in pairs",
          "type": "chance",
          "icon": "icons/stats/Star_Double_Spawn_Chance.png"
        },
        {
          "key": "star_triple_spawn_chance",
          "name": "Star Triple Spawn Chance",
          "desc": "Chance for stars to spawn in triplets",
          "type": "chance",
          "icon": "icons/stats/Star_Triple_Spawn_Chance.png"
        },
        {
          "key": "super_star_spawn_multi",
          "name": "Super Star Spawn Rate Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_Spawn_Rate_Multiplier.png"
        },
        {
          "key": "super_star_triple_chance",
          "name": "Super Star Triple Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_Triple_Chance.png"
        },
        {
          "key": "super_star_10x_chance",
          "name": "Super Star 10x Spawn Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_10x_Spawn_Chance.png"
        },
        {
          "key": "star_supernova_chance",
          "name": "Star Supernova Chance",
          "desc": "Chance for stars to explode as Supernovas",
          "type": "chance",
          "icon": "icons/stats/Star_Supernova_Chance.png"
        },
        {
          "key": "star_supernova_multi",
          "name": "Star Supernova Multiplier",
          "desc": "Multiplier to Supernova collections",
          "type": "multi",
          "icon": "icons/stats/Star_Supernova_Multiplier.png"
        },
        {
          "key": "super_star_supernova_chance",
          "name": "Super Star Supernova Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_Supernova_Chance.png"
        },
        {
          "key": "super_star_supernova_multi",
          "name": "Super Star Supernova Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_Supernova_Multiplier.png"
        },
        {
          "key": "star_supergiant_chance",
          "name": "Star Supergiant Chance",
          "desc": "Chance for stars to be Supergiants",
          "type": "chance",
          "icon": "icons/stats/Star_Supergiant_Chance.png"
        },
        {
          "key": "star_supergiant_multi",
          "name": "Star Supergiant Multiplier",
          "desc": "Multiplier to Supergiant Star collections",
          "type": "multi",
          "icon": "icons/stats/Star_Supergiant_Multiplier.png"
        },
        {
          "key": "super_star_supergiant_chance",
          "name": "Super Star Supergiant Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_Supergiant_Chance.png"
        },
        {
          "key": "super_star_supergiant_multi",
          "name": "Super Star Supergiant Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_Supergiant_Multiplier.png"
        },
        {
          "key": "star_radiant_chance",
          "name": "Star Radiant Chance",
          "desc": "Chance for stars to be Radiant",
          "type": "chance",
          "icon": "icons/stats/Star_Radiant_Chance.png"
        },
        {
          "key": "star_radiant_multi",
          "name": "Star Radiant Multiplier",
          "desc": "Multiplier to Radiant Star collections",
          "type": "multi",
          "icon": "icons/stats/Star_Radiant_Multi.png"
        },
        {
          "key": "super_star_radiant_chance",
          "name": "Super Star Radiant Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_Radiant_Chance.png"
        },
        {
          "key": "super_star_radiant_multi",
          "name": "Super Star Radiant Multi",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Super_Star_Radiant_Multi.png"
        },
        {
          "key": "all_star_multi",
          "name": "All Star Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/All_Star_Multiplier.png"
        },
        {
          "key": "novagiant_combo_multi",
          "name": "Novagiant Combo Multiplier",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Novagiant_Combo_Multiplier.png"
        },
        {
          "key": "candy_eaten",
          "name": "Candy Eaten",
          "type": "cap",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Candy_Eaten.png"
        }
      ]
    },
    {
      "id": "fishing",
      "name": "Fishing",
      "stats": [
        {
          "key": "fishing_rod_power",
          "name": "Fishing Rod Power",
          "desc": "Fishing power of the rod",
          "type": "number",
          "icon": "icons/stats/Fishing_Rod_Power.png"
        },
        {
          "key": "fishing_drone_capacity",
          "name": "Fishing Drone Capacity",
          "desc": "Max inventory capacity of the fishing drone",
          "type": "cap",
          "icon": "icons/stats/Fishing_Drone_Capacity.png"
        },
        {
          "key": "fishing_drone_power",
          "name": "Fishing Drone Base Power",
          "desc": "Power rating of the fishing drone",
          "type": "number",
          "icon": "icons/stats/Fishing_Drone_Base_Power.png"
        },
        {
          "key": "fishing_drone_multiplier",
          "name": "Drone Power Multiplier",
          "desc": "Multiplier to fishing drone productivity",
          "type": "multi",
          "icon": "icons/stats/Drone_Power_Multiplier.png"
        },
        {
          "key": "fishing_income_multi",
          "name": "Fishing Income Multiplier",
          "desc": "Multiplier applied to money/resources caught fishing",
          "type": "multi",
          "icon": "icons/stats/Fish_Income_Multiplier.png"
        },
        {
          "key": "fishing_tick_reduction_seconds",
          "name": "Fishing Tick Reduction",
          "desc": "Seconds subtracted from fishing interval",
          "type": "reduction",
          "suffix": "s",
          "icon": "icons/stats/Fishing_Tick_Reduction.png"
        },
        {
          "key": "fishing_double_tick_chance",
          "name": "Double Fish Tick Chance",
          "desc": "Chance to tick twice per interval",
          "type": "chance",
          "icon": "icons/stats/Double_Fish_Tick_Chance.png"
        },
        {
          "key": "fishing_triple_tick_chance",
          "name": "Triple Fish Tick Chance",
          "desc": "Chance to tick three times per interval",
          "type": "chance",
          "icon": "icons/stats/Triple_Fish_Tick_Chance.png"
        },
        {
          "key": "fishing_5x_tick_chance",
          "name": "5x Fish Tick Chance",
          "desc": "Chance to tick five times per interval",
          "type": "chance",
          "icon": "icons/stats/5x_Fish_Tick_Chance.png"
        },
        {
          "key": "fishing_token_multi",
          "name": "Fish Income Multiplier",
          "desc": "Multiplier applied to fishing tokens gained",
          "type": "multi",
          "icon": "icons/stats/Fish_Token_Gain_Multiplier.png"
        },
        {
          "key": "fishing_notice_requirement",
          "name": "Notice Fish Requirement",
          "type": "reduction",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Notice_Fish_Requirement.png",
          "suffix": ""
        },
        {
          "key": "fishing_tiny_notice_chance",
          "name": "Tiny Notice Chance",
          "type": "chance",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Tiny_Notice_Chance.png"
        },
        {
          "key": "fishing_shiny_chance",
          "name": "Shiny Fish Chance",
          "desc": "Chance to catch shiny fish",
          "type": "chance",
          "icon": "icons/stats/Shiny_Fish_Chance.png"
        },
        {
          "key": "fishing_shiny_multi",
          "name": "Shiny Multiplier",
          "desc": "Multiplier applied to shiny fish values",
          "type": "multi",
          "icon": "icons/stats/Shiny_Multiplier.png"
        },
        {
          "key": "fishing_super_shiny_chance",
          "name": "Super Shiny Fish Chance",
          "desc": "Chance to catch super shiny fish",
          "type": "chance",
          "icon": "icons/stats/Super_Shiny_Fish_Chance.png"
        },
        {
          "key": "fishing_super_shiny_multi",
          "name": "Super Shiny Multiplier",
          "desc": "Multiplier applied to super shiny fish values",
          "type": "multi",
          "icon": "icons/stats/Super_Shiny_Multiplier.png"
        },
        {
          "key": "fishing_tier2_dock_multi",
          "name": "Tier 2 Dock Power",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Tier_2_Dock_Power.png"
        },
        {
          "key": "fishing_tick_speed",
          "name": "Base Fishing Tick Speed",
          "desc": "Base tick speed for fishing checks",
          "type": "cap",
          "icon": "icons/stats/Archaeology_Crosshair_Auto-Tap.png",
          "suffix": "s"
        }
      ]
    },
    {
      "id": "misc",
      "name": "Misc",
      "stats": [
        {
          "key": "game_speed_multi",
          "name": "Game Speed Multiplier",
          "desc": "Global multiplier to speed up game logic tick rate",
          "type": "multi",
          "icon": "icons/stats/Game_Speed_Multiplier.png"
        },
        {
          "key": "item_duration_multi",
          "name": "Item Duration Multiplier",
          "desc": "Increases the active duration of items/buffs",
          "type": "multi",
          "icon": "icons/stats/Item_Duration_Multiplier.png"
        },
        {
          "key": "gem_upgrade_cap_increase",
          "name": "Gem Upgrade Cap Increase",
          "desc": "Increase to the gem upgrade levels limit",
          "type": "cap",
          "icon": "icons/stats/Gem_Upgrade_Cap_Increase.png"
        },
        {
          "key": "pet_levelup_chance_multi",
          "name": "Pet Level Up Chance",
          "type": "multi",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "input": "slider",
          "icon": "icons/stats/Pet_Level_Up_Chance.png"
        }
      ]
    }
  ]
};
