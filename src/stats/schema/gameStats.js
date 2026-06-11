// Automatically generated schema configuration for ACLIOM
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
          "type": "number",
          "icon": "icons/stats/Pickaxe_Damage.png"
        },
        {
          "key": "pickaxe_attack_speed_per_second",
          "name": "Pickaxe Attack Speed",
          "type": "number",
          "suffix": "/s",
          "icon": "icons/stats/Pickaxe_Attack_Speed.png"
        },
        {
          "key": "pickaxe_radius_percent",
          "name": "Pickaxe Radius",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Radius.png"
        },
        {
          "key": "pickaxe_crit_chance",
          "name": "Pickaxe Crit Chance",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Crit_Chance.png"
        },
        {
          "key": "pickaxe_crit_damage",
          "name": "Pickaxe Crit Damage",
          "type": "multi",
          "icon": "icons/stats/Pickaxe_Crit_Damage.png"
        },
        {
          "key": "pickaxe_super_crit_chance",
          "name": "Pickaxe Super Crit Chance",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Super_Crit_Chance.png"
        },
        {
          "key": "pickaxe_super_crit_damage",
          "name": "Pickaxe Super Crit Damage",
          "type": "multi",
          "icon": "icons/stats/Pickaxe_Super_Crit_Damage.png"
        },
        {
          "key": "pickaxe_ultra_crit_chance",
          "name": "Pickaxe Ultra Crit Chance",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Ultra_Crit_Chance.png"
        },
        {
          "key": "pickaxe_ultra_crit_damage",
          "name": "Pickaxe Ultra Crit Damage",
          "type": "multi",
          "icon": "icons/stats/Pickaxe_Ultra_Crit_Damage.png"
        },
        {
          "key": "pickaxe_omega_crit_chance",
          "name": "Pickaxe Omega Crit Chance",
          "type": "chance",
          "icon": "icons/stats/Pickaxe_Omega_Crit_Chance.png"
        },
        {
          "key": "pickaxe_omega_crit_damage",
          "name": "Pickaxe Omega Crit Damage",
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
          "type": "number",
          "icon": "icons/prestige/Bomb_Damage.webp"
        },
        {
          "key": "bomb_crit_chance",
          "name": "Bomb Crit Chance",
          "type": "chance",
          "icon": "icons/prestige/Bomb_Damage.webp"
        },
        {
          "key": "bomb_crit_damage",
          "name": "Bomb Crit Damage",
          "type": "multi",
          "icon": "icons/prestige/Bomb_Damage.webp"
        },
        {
          "key": "bomb_recharge_speed",
          "name": "Bomb Recharge Speed",
          "type": "multi",
          "icon": "icons/prestige/Bomb_Capacity.webp"
        },
        {
          "key": "bomb_free_chance",
          "name": "Free  Bomb Chance",
          "type": "chance",
          "icon": "icons/prestige/Bomb_Capacity.webp"
        },
        {
          "key": "bomb_capacity",
          "name": "Bomb Capacity",
          "type": "cap",
          "icon": "icons/prestige/Bomb_Capacity.webp"
        },
        {
          "key": "bomb_additional_multiplier",
          "name": "Additional Bomb Multiplier",
          "type": "multi",
          "icon": "icons/stats/Additional_Bomb_Multiplier.png"
        },
        {
          "key": "bomb_super_crit_chance",
          "name": "Bomb Super Crit Chance",
          "type": "chance",
          "icon": "icons/stats/Bomb_Super_Crit_Chance.png"
        },
        {
          "key": "bomb_super_crit_damage",
          "name": "Bomb super Crit Damage",
          "type": "multi",
          "icon": "icons/stats/Bomb_Super_Crit_Damage.png"
        },
        {
          "key": "bomb_ultra_crit_chance",
          "name": "Bomb Ultra Crit Chance",
          "type": "chance",
          "icon": "icons/stats/Bomb_Ultra_Crit_Chance.png"
        },
        {
          "key": "bomb_ultra_crit_damage",
          "name": "Bomb Ultra Crit Damage",
          "type": "multi",
          "icon": "icons/stats/Bomb_Ultra_Crit_Damage.png"
        },
        {
          "key": "bomb_omega_crit_chance",
          "name": "Bomb Omega Crit Chance",
          "type": "chance",
          "icon": "icons/stats/Bomb_Omega_Crit_Chance.png"
        },
        {
          "key": "bomb_omega_crit_damage",
          "name": "Bomb Omega Crit Damage",
          "type": "multi",
          "icon": "icons/stats/Bomb_Omega_Crit_Damage.png"
        },
        {
          "key": "bomb_cherry3x_chance",
          "name": "Cherry Charge 3x Chance",
          "type": "chance",
          "icon": "icons/stats/Cherry_Charge_3x_Chance.png"
        },
        {
          "key": "bomb_battery_cap_increases",
          "name": "Bomb Capacity Gained From Battery",
          "type": "cap",
          "icon": "icons/stats/Bomb_Capacity_Gained_From_Battery.png"
        },
        {
          "key": "bomb_cap_multiplier",
          "name": "Bomb Cap Multiplier",
          "type": "multi",
          "icon": "icons/stats/Bomb_Cap_Multiplier.png"
        },
        {
          "key": "bomb_workshop_cap_increase",
          "name": "Workshop Upgrade Cap Increase",
          "type": "cap",
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
          "type": "cap",
          "icon": "icons/stats/Number_Of_Drones.png"
        },
        {
          "key": "drone_damage_percent",
          "name": "Drone Damage",
          "type": "chance",
          "icon": "icons/stats/Drone_Damage.png"
        },
        {
          "key": "drone_radius_percent",
          "name": "Drone Radius",
          "type": "chance",
          "icon": "icons/stats/Drone_Radius.png"
        },
        {
          "key": "drone_movespeed_percent",
          "name": "Drone Movespeed",
          "type": "chance",
          "icon": "icons/stats/Drone_Movespeed.png"
        },
        {
          "key": "drone_attack_speed_percent",
          "name": "Drone Attack Speed",
          "type": "chance",
          "icon": "icons/stats/Drone_Attack_Speed.png"
        },
        {
          "key": "drone_triple_damage_chance",
          "name": "Drone Triple Damage",
          "type": "chance",
          "icon": "icons/stats/Drone_Triple_Damage.png"
        },
        {
          "key": "drone_rapid_fire_chance",
          "name": "Drone Rapid Fire Chance",
          "type": "chance",
          "icon": "icons/stats/Drone_Rapid_Fire_Chance.png"
        },
        {
          "key": "drone_suit_cap",
          "name": "Drone Suit Upgrade Cap",
          "type": "cap",
          "icon": "icons/stats/Drone_Suit_Upgrade_Cap.png"
        },
        {
          "key": "coal_generation_seconds",
          "name": "Coal Generation Time",
          "type": "number",
          "suffix": "s",
          "icon": "icons/stats/Coal_Generation_Time.png"
        },
        {
          "key": "coal_fuel_duration_multi",
          "name": "Drone Fuel Duration Multiplier",
          "type": "multi",
          "icon": "icons/stats/Drone_Fuel_Duration_Multiplier.png"
        },
        {
          "key": "coal_capacity_multi",
          "name": "Coal Capacity Multiplier",
          "type": "multi",
          "icon": "icons/stats/Coal_Capacity_Multiplier.png"
        },
        {
          "key": "coal_fuel_save_chance",
          "name": "Fuel Save Chance",
          "type": "chance",
          "icon": "icons/stats/Fuel_Save_Chance.png"
        },
        {
          "key": "coal_drone_exp_multi",
          "name": "Drone Exp Gain Multiplier",
          "type": "multi",
          "icon": "icons/stats/Drone_Exp_Gain_Multiplier.png"
        },
        {
          "key": "void_portal_chance",
          "name": "Void Portal Chance",
          "type": "chance",
          "icon": "icons/stats/Void_Portal_Chance.png"
        },
        {
          "key": "void_portal_base_multi",
          "name": "Void Portal Base Multiplier",
          "type": "multi",
          "icon": "icons/stats/Void_Portal_Base_Multiplier.png"
        },
        {
          "key": "golden_void_portal_chance",
          "name": "Golden Void Portal Chance",
          "type": "chance",
          "icon": "icons/stats/Golden_Void_Portal_Chance.png"
        },
        {
          "key": "golden_void_portal_multi",
          "name": "Golden Void Portal Multi",
          "type": "multi",
          "icon": "icons/stats/Golden_Void_Portal_Multi.png"
        },
        {
          "key": "rainbow_void_portal_chance",
          "name": "Rainbow Void Portal Chance",
          "type": "chance",
          "icon": "icons/stats/Rainbow_Void_Portal_Chance.png"
        },
        {
          "key": "rainbow_void_portal_multi",
          "name": "Rainbow Void Portal Multiplier",
          "type": "multi",
          "icon": "icons/stats/Rainbow_Void_Portal_Multiplier.png"
        },
        {
          "key": "all_void_portal_multi",
          "name": "All Void Portal Multiplier",
          "type": "multi",
          "icon": "icons/stats/All_Void_Multi.png"
        },
        {
          "key": "elixir_crit_chance",
          "name": "Elixir Crit Chance",
          "type": "chance",
          "icon": "icons/stats/Elixir_Crit_Chance.png"
        },
        {
          "key": "elixir_crit_multi",
          "name": "Elixir Crit Multi",
          "type": "multi",
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
          "type": "chance",
          "icon": "icons/stats/Triple_Rock_Chance.png"
        },
        {
          "key": "ore_sell_price_multi",
          "name": "Ore Sell Price Multiplier",
          "type": "multi",
          "icon": "icons/stats/Ore_Sell_Price_Multiplier.png"
        },
        {
          "key": "ore_income_multi",
          "name": "Ore Income Multiplier",
          "type": "multi",
          "icon": "icons/stats/Ore_Income_Multiplier.png"
        },
        {
          "key": "golden_ore_chance",
          "name": "Golden Ore Chance",
          "type": "chance",
          "icon": "icons/stats/Golden_Ore_Chance.png"
        },
        {
          "key": "golden_ore_multi",
          "name": "Golden Ore Multiplier",
          "type": "multi",
          "icon": "icons/stats/Golden_Ore_Multiplier.png"
        },
        {
          "key": "golden_floor_chance",
          "name": "Golden Floor Chance",
          "type": "chance",
          "icon": "icons/stats/Golden_Floor_Chance.png"
        },
        {
          "key": "golden_floor_multi",
          "name": "Golden Floor Multiplier",
          "type": "multi",
          "icon": "icons/stats/Golden_Floor_Multiplier.png"
        },
        {
          "key": "rainbow_floor_chance",
          "name": "Rainbow Floor Chance",
          "type": "chance",
          "icon": "icons/stats/Rainbow_Floor_Chance.png"
        },
        {
          "key": "rainbow_floor_multi",
          "name": "Rainbow Floor Multiplier",
          "type": "multi",
          "icon": "icons/stats/Rainbow_Floor_Multiplier.png"
        },
        {
          "key": "galactic_floor_chance",
          "name": "Galactic Rainbow Floor Chance",
          "type": "chance",
          "icon": "icons/stats/Galactic_Rainbow_Floor_Chance.png"
        },
        {
          "key": "galactic_floor_multi",
          "name": "Galactic Rainbow Floor Multiplier",
          "type": "multi",
          "icon": "icons/stats/Galactic_Rainbow_Floor_Multiplier.png"
        },
        {
          "key": "bar_output_multi",
          "name": "Bar Output Multiplier",
          "type": "multi",
          "icon": "icons/prestige/Bar_Output_Multiplier.webp"
        },
        {
          "key": "prismatic_floor_chance",
          "name": "Prismatic Galactic Floor Chance",
          "type": "chance",
          "icon": "icons/stats/Prismatic_Galactic_Floor_Chance.png"
        },
        {
          "key": "prismatic_floor_multi",
          "name": "Prismatic Galactic Floor Multi",
          "type": "multi",
          "icon": "icons/stats/Prismatic_Galactic_Floor_Multi.png"
        },
        {
          "key": "pizzas_eaten",
          "name": "Pizzas Eaten",
          "type": "cap",
          "icon": "icons/stats/Pizzas_Eaten.png"
        },
        {
          "key": "steak_eaten",
          "name": "Steaks Eaten",
          "type": "cap",
          "icon": "icons/stats/Steaks_Eaten.png"
        },
        {
          "key": "all_floor_multipliers",
          "name": "All Floor Multis",
          "type": "multi",
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
          "type": "chance",
          "icon": "icons/stats/Free_Craft_Chance.png"
        },
        {
          "key": "double_craft_chance",
          "name": "Double Craft Chance",
          "type": "chance",
          "icon": "icons/stats/Double_Craft_Chance.png"
        },
        {
          "key": "triple_craft_chance",
          "name": "Triple Craft Chance",
          "type": "chance",
          "icon": "icons/stats/Triple_Craft_Chance.png"
        },
        {
          "key": "craft_5x_chance",
          "name": "5x Craft Chance",
          "type": "chance",
          "icon": "icons/stats/5x_Craft_Chance.png"
        },
        {
          "key": "craft_10x_chance",
          "name": "10x Craft Chance",
          "type": "chance",
          "icon": "icons/stats/10x_Craft_Chance.png"
        },
        {
          "key": "craft_20x_chance",
          "name": "20x Craft Chance",
          "type": "chance",
          "icon": "icons/stats/20x_Craft_Chance.png"
        },
        {
          "key": "craft_100x_chance",
          "name": "100x Craft Chance",
          "type": "chance",
          "icon": "icons/stats/100x_Craft_Chance.png"
        },
        {
          "key": "bar_output_multi",
          "name": "Bar Output Multiplier",
          "type": "multi",
          "icon": "icons/stats/Bar_Output_Multiplier.png"
        },
        {
          "key": "bar_upgrade_cost_reduction",
          "name": "Bar Cost Reduction",
          "type": "reduction",
          "icon": "icons/stats/Bar_Cost_Reduction.png"
        },
        {
          "key": "bar_craft_cost_multi",
          "name": "Bar Craft Cost ",
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
          "type": "multi",
          "suffix": "s",
          "icon": "icons/stats/Bonus_Obelisk_Fight_Length.png"
        },
        {
          "key": "obelisk_cooldown_multi",
          "name": "Obelisk Cooldown",
          "type": "reduction",
          "icon": "icons/stats/Obelisk_Cooldown.png"
        },
        {
          "key": "obelisk_armor_reduction",
          "name": "Obelisk Armor Reduction",
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
          "type": "cap",
          "icon": "icons/stats/Xp_Level_Cap.png"
        },
        {
          "key": "prestige_point_multi",
          "name": "Prestige Point Gain Multiplier",
          "type": "multi",
          "icon": "icons/stats/Prestige_Point_Gain_Multiplier.png"
        },
        {
          "key": "experience_multi",
          "name": "Experience Gain Multiplier",
          "type": "multi",
          "icon": "icons/stats/Experience_Gain_Multiplier.png"
        },
        {
          "key": "floor_clear_requirement_multi",
          "name": "Floor Clear Requirement",
          "type": "reduction",
          "icon": "icons/stats/Floor_Clear_Requirement.png"
        },
        {
          "key": "artifact_cap_increase",
          "name": "Artifact Upgrade Cap Increase",
          "type": "number",
          "icon": "icons/stats/Artifact_Upgrade_Cap_Increase.png"
        },
        {
          "key": "artifact_tier4_cap_increase",
          "name": "Artifact Tier 4 Cap Increase",
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
          "type": "multi",
          "icon": "icons/stats/Lootbug_Spawn_Rate_Multiplier.png"
        },
        {
          "key": "lootbug_triple_chance",
          "name": "Triple Lootbug Chance",
          "type": "chance",
          "icon": "icons/stats/Triple_Lootbug_Chance.png"
        },
        {
          "key": "lootbug_golden_chance",
          "name": "Golden Lootbug Chance",
          "type": "chance",
          "icon": "icons/stats/Golden_Lootbug_Chance.png"
        },
        {
          "key": "lootbug_bank_cap",
          "name": "Banked Lootbug Cap",
          "type": "cap",
          "icon": "icons/stats/Banked_Lootbug_Cap.png"
        },
        {
          "key": "lootbug_gem_cost_reduction",
          "name": "Lootbug Gem Cost Reduction",
          "type": "reduction",
          "icon": "icons/stats/Lootbug_Gem_Cost_Reduction.png"
        },
        {
          "key": "lootbug_loot_multi",
          "name": "Lootbug Loot Multiplier",
          "type": "multi",
          "icon": "icons/stats/Lootbug_Loot_Multiplier.png"
        },
        {
          "key": "lootfrog_lanterns_used",
          "name": "Lanterns Used",
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
          "type": "number",
          "icon": "icons/stats/Lootfrogs_Caught.png"
        },
        {
          "key": "golden_lootfrogs_caught",
          "name": "Golden Lootfrogs Caught",
          "type": "number",
          "icon": "icons/stats/Golden_Lootfrogs_Caught.png"
        },
        {
          "key": "lootfrog_capacity",
          "name": "Lootfrog Capacity",
          "type": "cap",
          "icon": "icons/stats/Lootfrog_Capacity.png"
        },
        {
          "key": "lootfrog_loot_multi",
          "name": "Lootfrog Loot Multiplier",
          "type": "multi",
          "icon": "icons/stats/Lootfrog_Loot_Multiplier.png"
        },
        {
          "key": "lootfrog_golden_chance",
          "name": "Golden  Lootfrog Chance",
          "type": "chance",
          "icon": "icons/stats/Golden_Lootfrog_Chance.png"
        },
        {
          "key": "lootfrog_golden_multi",
          "name": "Golden Lootfrog Multiplier",
          "type": "multi",
          "icon": "icons/stats/Golden_Lootfrog_Multiplier.png"
        },
        {
          "key": "lootfrog_triple_spawn_chance",
          "name": "Lootfrog Triple Spawn Chance",
          "type": "chance",
          "icon": "icons/stats/Frog_Frenzy.png"
        },
        {
          "key": "lootfrog_10x_spawn_chance",
          "name": "Lootfrog 10x Spawn Chance",
          "type": "chance",
          "icon": "icons/stats/Lootfrog_10x_Spawn_Chance.png"
        },
        {
          "key": "lootfrog_big_chance",
          "name": "Big Lootfrog Chance",
          "type": "chance",
          "icon": "icons/stats/Big_Lootfrog_Chance.png"
        },
        {
          "key": "lootfrog_big_multi",
          "name": "Big Lootfrog Multi",
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
          "icon": "icons/stats/Chance_For_2x_Chests.png"
        },
        {
          "key": "chest_meter_multi",
          "name": "Chest Meter Gain Multiplier",
          "type": "multi",
          "icon": "icons/stats/Chest_Meter_Gain_Multiplier.png"
        },
        {
          "key": "chest_items_bonus",
          "name": "Items Contained In Chests",
          "type": "cap",
          "icon": "icons/stats/Items_Contained_In_Chests.png"
        },
        {
          "key": "freebie_gems_bonus",
          "name": "Bonus Gems From Freebie Pack",
          "type": "cap",
          "icon": "icons/stats/Bonus_Gems_From_Freebie_Pack.png"
        },
        {
          "key": "freebie_5x_chance",
          "name": "Chance For Freebie Jackpot",
          "type": "chance",
          "icon": "icons/stats/Chance_For_Freebie_Jackpot.png"
        },
        {
          "key": "freebie_refresh_chance",
          "name": "Instant Refresh Chance",
          "type": "chance",
          "icon": "icons/stats/Instant_Refresh_Chance.png"
        },
        {
          "key": "freebie_bank_cap",
          "name": "Banked Freebie Cap",
          "type": "cap",
          "icon": "icons/stats/Banked_Freebie_Cap.png"
        },
        {
          "key": "freebie_cooldown_seconds",
          "name": "Freebie Cooldown",
          "type": "cap",
          "icon": "icons/stats/Freebie_Cooldown.png",
          "suffix": "s"
        },
        {
          "key": "stonks_chance",
          "name": "Stonks Chance",
          "type": "chance",
          "icon": "icons/stats/Stonks_Chance.png"
        },
        {
          "key": "stonks_multi",
          "name": "Stonks Freebie Multiplier",
          "type": "multi",
          "icon": "icons/stats/Stonks_Freebie_Multiplier.png"
        },
        {
          "key": "super_stonks_chance",
          "name": "Super Stonks Chance",
          "type": "chance",
          "icon": "icons/stats/Super_Stonks_Chance.png"
        },
        {
          "key": "super_stonks_multi",
          "name": "Super Stonks Multiplier",
          "type": "multi",
          "icon": "icons/stats/Super_Stonks_Multiplier.png"
        },
        {
          "key": "ultra_stonks_chance",
          "name": "Ultra Stonks Chance",
          "type": "chance",
          "icon": "icons/stats/Ultra_Stonks_Chance.png"
        },
        {
          "key": "ultra_stonks_multi",
          "name": "Ultra Stonks Multiplier",
          "type": "multi",
          "icon": "icons/stats/Ultra_Stonks_Multiplier.png"
        },
        {
          "key": "all_stonks_multi",
          "name": "All Stonks Multi",
          "type": "multi",
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
          "icon": "icons/stats/Contract_Cost_Reduction.png"
        },
        {
          "key": "contract_double_points_chance",
          "name": "Double Contract Point Chance",
          "type": "chance",
          "icon": "icons/stats/Double_Contract_Point_Chance.png"
        },
        {
          "key": "contract_triple_points_chance",
          "name": "Triple Contract Point Chance",
          "type": "chance",
          "icon": "icons/stats/Triple_Contract_Point_Chance.png"
        },
        {
          "key": "contract_5x_points_chance",
          "name": "5x Contract Point Chance",
          "type": "chance",
          "icon": "icons/stats/5x_Contract_Point_Chance.png"
        },
        {
          "key": "contract_10x_points_chance",
          "name": "10x Contract Point Chance",
          "type": "chance",
          "icon": "icons/stats/10x_Contract_Point_Chance.png"
        },
        {
          "key": "contract_points_rewarded",
          "name": "Contract Points Rewarded",
          "type": "cap",
          "icon": "icons/stats/Contract_Points_Rewarded.png"
        },
        {
          "key": "contract_cap_increase",
          "name": "Contract Upgrade Cap Increase",
          "type": "cap",
          "icon": "icons/stats/Contract_Upgrade_Cap_Increase.png"
        },
        {
          "key": "contract_upgrade_cost_reduction",
          "name": "Contract Upgrade Cost Reduction",
          "type": "reduction",
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
          "type": "multi",
          "icon": "icons/stats/Vein_Spawn_Rate_Multiplier.png"
        },
        {
          "key": "vein_income_multi",
          "name": "Vein Income Multiplier",
          "type": "multi",
          "icon": "icons/stats/Vein_Income_Multiplier.png"
        },
        {
          "key": "golden_vein_chance",
          "name": "Golden Vein Chance",
          "type": "chance",
          "icon": "icons/stats/Golden_Vein_Chance.png"
        },
        {
          "key": "golden_vein_multi",
          "name": "Golden Vein Multiplier",
          "type": "multi",
          "icon": "icons/stats/Golden_Vein_Multiplier.png"
        },
        {
          "key": "rainbow_vein_chance",
          "name": "Rainbow Vein Chance",
          "type": "chance",
          "icon": "icons/stats/Rainbow_Vein_Chance.png"
        },
        {
          "key": "rainbow_vein_multi",
          "name": "Rainbow Vein Multiplier",
          "type": "multi",
          "icon": "icons/stats/Rainbow_Vein_Multiplier.png"
        },
        {
          "key": "gleaming_vein_chance",
          "name": "Gleaming Vein Chance",
          "type": "chance",
          "icon": "icons/stats/Gleaming_Vein_Chance.png"
        },
        {
          "key": "gleaming_vein_multi",
          "name": "Gleaming Vein Multiplier",
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
          "type": "number",
          "icon": "icons/stats/Star_Spawn_Rate_Multiplier.png"
        },
        {
          "key": "star_auto_catch_chance",
          "name": "Auto-Catch Chance",
          "type": "chance",
          "icon": "icons/stats/Auto-Catch_Chance.png"
        },
        {
          "key": "star_double_spawn_chance",
          "name": "Star Double Spawn Chance",
          "type": "chance",
          "icon": "icons/stats/Star_Double_Spawn_Chance.png"
        },
        {
          "key": "star_triple_spawn_chance",
          "name": "Star Triple Spawn Chance",
          "type": "chance",
          "icon": "icons/stats/Star_Triple_Spawn_Chance.png"
        },
        {
          "key": "super_star_spawn_multi",
          "name": "Super Star Spawn Rate Multiplier",
          "type": "multi",
          "icon": "icons/stats/Super_Star_Spawn_Rate_Multiplier.png"
        },
        {
          "key": "super_star_triple_chance",
          "name": "Super Star Triple Chance",
          "type": "chance",
          "icon": "icons/stats/Super_Star_Triple_Chance.png"
        },
        {
          "key": "super_star_10x_chance",
          "name": "Super Star 10x Spawn Chance",
          "type": "chance",
          "icon": "icons/stats/Super_Star_10x_Spawn_Chance.png"
        },
        {
          "key": "star_supernova_chance",
          "name": "Star Supernova Chance",
          "type": "chance",
          "icon": "icons/stats/Star_Supernova_Chance.png"
        },
        {
          "key": "star_supernova_multi",
          "name": "Star Supernova Multiplier",
          "type": "multi",
          "icon": "icons/stats/Star_Supernova_Multiplier.png"
        },
        {
          "key": "super_star_supernova_chance",
          "name": "Super Star Supernova Chance",
          "type": "chance",
          "icon": "icons/stats/Super_Star_Supernova_Chance.png"
        },
        {
          "key": "super_star_supernova_multi",
          "name": "Super Star Supernova Multiplier",
          "type": "multi",
          "icon": "icons/stats/Super_Star_Supernova_Multiplier.png"
        },
        {
          "key": "star_supergiant_chance",
          "name": "Star Supergiant Chance",
          "type": "chance",
          "icon": "icons/stats/Star_Supergiant_Chance.png"
        },
        {
          "key": "star_supergiant_multi",
          "name": "Star Supergiant Multiplier",
          "type": "multi",
          "icon": "icons/stats/Star_Supergiant_Multiplier.png"
        },
        {
          "key": "super_star_supergiant_chance",
          "name": "Super Star Supergiant Chance",
          "type": "chance",
          "icon": "icons/stats/Super_Star_Supergiant_Chance.png"
        },
        {
          "key": "super_star_supergiant_multi",
          "name": "Super Star Supergiant Multiplier",
          "type": "multi",
          "icon": "icons/stats/Super_Star_Supergiant_Multiplier.png"
        },
        {
          "key": "star_radiant_chance",
          "name": "Star Radiant Chance",
          "type": "chance",
          "icon": "icons/stats/Star_Radiant_Chance.png"
        },
        {
          "key": "star_radiant_multi",
          "name": "Star Radiant Multiplier",
          "type": "multi",
          "icon": "icons/stats/Star_Radiant_Multi.png"
        },
        {
          "key": "super_star_radiant_chance",
          "name": "Super Star Radiant Chance",
          "type": "chance",
          "icon": "icons/stats/Super_Star_Radiant_Chance.png"
        },
        {
          "key": "super_star_radiant_multi",
          "name": "Super Star Radiant Multi",
          "type": "multi",
          "icon": "icons/stats/Super_Star_Radiant_Multi.png"
        },
        {
          "key": "all_star_multi",
          "name": "All Star Multiplier",
          "type": "multi",
          "icon": "icons/stats/All_Star_Multiplier.png"
        },
        {
          "key": "novagiant_combo_multi",
          "name": "Novagiant Combo Multiplier",
          "type": "multi",
          "icon": "icons/stats/Novagiant_Combo_Multiplier.png"
        },
        {
          "key": "candy_eaten",
          "name": "Candy Eaten",
          "type": "cap",
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
          "type": "number",
          "icon": "icons/stats/Fishing_Rod_Power.png"
        },
        {
          "key": "fishing_drone_capacity",
          "name": "Fishing Drone Capacity",
          "type": "cap",
          "icon": "icons/stats/Fishing_Drone_Capacity.png"
        },
        {
          "key": "fishing_drone_power",
          "name": "Fishing Drone Base Power",
          "type": "number",
          "icon": "icons/stats/Fishing_Drone_Base_Power.png"
        },
        {
          "key": "fishing_drone_multiplier",
          "name": "Drone Power Multiplier",
          "type": "multi",
          "icon": "icons/stats/Drone_Power_Multiplier.png"
        },
        {
          "key": "fishing_income_multi",
          "name": "Fishing Income Multiplier",
          "type": "multi",
          "icon": "icons/stats/Fish_Income_Multiplier.png"
        },
        {
          "key": "fishing_tick_reduction_seconds",
          "name": "Fishing Tick Reduction",
          "type": "reduction",
          "suffix": "s",
          "icon": "icons/stats/Fishing_Tick_Reduction.png"
        },
        {
          "key": "fishing_double_tick_chance",
          "name": "Double Fish Tick Chance",
          "type": "chance",
          "icon": "icons/stats/Double_Fish_Tick_Chance.png"
        },
        {
          "key": "fishing_triple_tick_chance",
          "name": "Triple Fish Tick Chance",
          "type": "chance",
          "icon": "icons/stats/Triple_Fish_Tick_Chance.png"
        },
        {
          "key": "fishing_5x_tick_chance",
          "name": "5x Fish Tick Chance",
          "type": "chance",
          "icon": "icons/stats/5x_Fish_Tick_Chance.png"
        },
        {
          "key": "fishing_token_multi",
          "name": "Fish Income Multiplier",
          "type": "multi",
          "icon": "icons/stats/Fish_Token_Gain_Multiplier.png"
        },
        {
          "key": "fishing_notice_requirement",
          "name": "Notice Fish Requirement",
          "type": "reduction",
          "icon": "icons/stats/Notice_Fish_Requirement.png",
          "suffix": ""
        },
        {
          "key": "fishing_tiny_notice_chance",
          "name": "Tiny Notice Chance",
          "type": "chance",
          "icon": "icons/stats/Tiny_Notice_Chance.png"
        },
        {
          "key": "fishing_shiny_chance",
          "name": "Shiny Fish Chance",
          "type": "chance",
          "icon": "icons/stats/Shiny_Fish_Chance.png"
        },
        {
          "key": "fishing_shiny_multi",
          "name": "Shiny Multiplier",
          "type": "multi",
          "icon": "icons/stats/Shiny_Multiplier.png"
        },
        {
          "key": "fishing_super_shiny_chance",
          "name": "Super Shiny Fish Chance",
          "type": "chance",
          "icon": "icons/stats/Super_Shiny_Fish_Chance.png"
        },
        {
          "key": "fishing_super_shiny_multi",
          "name": "Super Shiny Multiplier",
          "type": "multi",
          "icon": "icons/stats/Super_Shiny_Multiplier.png"
        },
        {
          "key": "fishing_tier2_dock_multi",
          "name": "Tier 2 Dock Power",
          "type": "multi",
          "icon": "icons/stats/Tier_2_Dock_Power.png"
        },
        {
          "key": "fishing_tick_speed",
          "name": "Base Fishing Tick Speed",
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
          "type": "multi",
          "icon": "icons/stats/Game_Speed_Multiplier.png"
        },
        {
          "key": "item_duration_multi",
          "name": "Item Duration Multiplier",
          "type": "multi",
          "icon": "icons/stats/Item_Duration_Multiplier.png"
        },
        {
          "key": "gem_upgrade_cap_increase",
          "name": "Gem Upgrade Cap Increase",
          "type": "cap",
          "icon": "icons/stats/Gem_Upgrade_Cap_Increase.png"
        },
        {
          "key": "pet_levelup_chance_multi",
          "name": "Pet Level Up Chance",
          "type": "multi",
          "icon": "icons/stats/Pet_Level_Up_Chance.png"
        },
        {
          "key": "bomb_of_plenty_make_gold_chance",
          "name": "Bomb of Plenty Make Gold Chance",
          "type": "chance",
          "icon": "icons/stats/Bomb_of_Plenty_Golden.png"
        },
        {
          "key": "bomb_of_plenty_multi",
          "name": "Bomb of Plenty Multi",
          "type": "multi",
          "icon": "icons/stats/Bomb_of_Plenty.png"
        },
        {
          "key": "bomb_trans_apply_bop_chance",
          "name": "Transmuter Bomb Apply Chance",
          "type": "chance",
          "icon": "icons/stats/Transmuter_Bomb_Golden.png"
        },
        {
          "key": "bomb_transmuter_multi",
          "name": "Transmuter Bomb Multi",
          "type": "multi",
          "icon": "icons/stats/Transmuter_Bomb.png"
        }
      ]
    }
  ]
};
