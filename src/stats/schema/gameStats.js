export const gameStatsCategory = {
  id: "gameStats",
  name: "Game Stats",
  icon: "icons/menus/Prestige.webp",
  tabs: [
    {
      id: "general",
      name: "General & Prestige",
      stats: [
        { key: "experience_multi", name: "Experience Multiplier", desc: "Multiplier applied to all experience points gained", type: "multi", icon: "icons/prestige/Experience_Gain_Multiplier.webp" },
        { key: "prestige_point_multi", name: "Prestige Point Multiplier", desc: "Multiplier applied to prestige points earned", type: "multi", icon: "icons/prestige/Prestige_Point_Gain_Multiplier.webp" },
        { key: "game_speed_multi", name: "Game Speed Multiplier", desc: "Global multiplier to speed up game logic tick rate", type: "multi", icon: "icons/prestige/Item_Duration_Multiplier.webp" },
        { key: "item_duration_multi", name: "Item Duration Multiplier", desc: "Increases the active duration of items/buffs", type: "multi", icon: "icons/prestige/Item_Duration_Multiplier.webp" },
        { key: "xp_level_cap", name: "XP Level Cap", desc: "Maximum level cap for experience level", type: "cap", icon: "icons/prestige/Experience_Gain_Multiplier.webp" },
        { key: "gem_upgrade_cap_increase", name: "Gem Upgrade Cap Increase", desc: "Increase to the gem upgrade levels limit", type: "number", icon: "icons/prestige/Experience_Gain_Multiplier.webp" },
        { key: "artifact_cap_increase", name: "Artifact Cap Increase", desc: "Increase to the artifact capacity limits", type: "number", icon: "icons/prestige/Experience_Gain_Multiplier.webp" },
        { key: "artifact_tier4_cap_increase", name: "Artifact Tier 4 Cap Increase", desc: "Increase to Tier 4 artifact limits", type: "number", icon: "icons/prestige/Experience_Gain_Multiplier.webp" }
      ]
    },
    {
      id: "mining",
      name: "Mining & Pickaxe",
      stats: [
        { key: "pickaxe_damage", name: "Pickaxe Damage", desc: "Base damage dealt by pickaxe swings", type: "number", icon: "icons/prestige/Pickaxe_Damage.webp" },
        { key: "pickaxe_attack_speed_per_second", name: "Pickaxe Attack Speed", desc: "Swings per second", type: "number", suffix: "/s", icon: "icons/prestige/Pickaxe_Damage.webp" },
        { key: "pickaxe_radius_percent", name: "Pickaxe Radius", desc: "AoE radius of pickaxe mining area", type: "chance", icon: "icons/prestige/Pickaxe_Radius.webp" },
        { key: "multi_rock_chance", name: "Multi Rock Chance", desc: "Chance to strike multiple rocks simultaneously", type: "chance", icon: "icons/prestige/Pickaxe_Radius.webp" },
        { key: "pickaxe_crit_chance", name: "Pickaxe Crit Chance", desc: "Chance to land critical strikes", type: "chance", icon: "icons/prestige/Pickaxe_Damage.webp" },
        { key: "pickaxe_crit_damage", name: "Pickaxe Crit Damage", desc: "Critical strike damage multiplier", type: "multi", icon: "icons/prestige/Pickaxe_Damage.webp" },
        { key: "pickaxe_super_crit_chance", name: "Pickaxe Super Crit Chance", desc: "Chance to land super critical strikes", type: "chance", icon: "icons/prestige/Pickaxe_Super_Crit_Chance.webp" },
        { key: "pickaxe_super_crit_damage", name: "Pickaxe Super Crit Damage", desc: "Super critical strike damage multiplier", type: "multi", icon: "icons/prestige/Pickaxe_Super_Crit_Chance.webp" },
        { key: "pickaxe_ultra_crit_chance", name: "Pickaxe Ultra Crit Chance", desc: "Chance to land ultra critical strikes", type: "chance", icon: "icons/prestige/Pickaxe_Super_Crit_Chance.webp" },
        { key: "pickaxe_ultra_crit_damage", name: "Pickaxe Ultra Crit Damage", desc: "Ultra critical strike damage multiplier", type: "multi", icon: "icons/prestige/Pickaxe_Super_Crit_Chance.webp" },
        { key: "pickaxe_omega_crit_chance", name: "Pickaxe Omega Crit Chance", desc: "Chance to land omega critical strikes", type: "chance", icon: "icons/prestige/Pickaxe_Omega_Crit_Chance.webp" },
        { key: "pickaxe_omega_crit_damage", name: "Pickaxe Omega Crit Damage", desc: "Omega critical strike damage multiplier", type: "multi", icon: "icons/prestige/Pickaxe_Omega_Crit_Chance.webp" }
      ]
    },
    {
      id: "veins_floors",
      name: "Veins & Floors",
      stats: [
        { key: "gleaming_vein_chance", name: "Gleaming Vein Chance", desc: "Chance for Gleaming Veins to spawn", type: "chance", icon: "icons/prestige/Vein_Spawn_Rate_Multiplier.webp" },
        { key: "gleaming_vein_multi", name: "Gleaming Vein Multiplier", desc: "Multiplier applied to gleaming vein yields", type: "multi", icon: "icons/prestige/Vein_Spawn_Rate_Multiplier.webp" },
        { key: "vein_spawn_rate_multi", name: "Vein Spawn Rate Multiplier", desc: "Multiplier to the spawn rate of veins", type: "multi", icon: "icons/prestige/Vein_Spawn_Rate_Multiplier.webp" },
        { key: "vein_income_multi", name: "Vein Income Multiplier", desc: "Global multiplier to income generated from veins", type: "multi", icon: "icons/prestige/Vein_Spawn_Rate_Multiplier.webp" },
        { key: "golden_floor_chance", name: "Golden Floor Chance", desc: "Chance to encounter a Golden Floor", type: "chance", icon: "icons/prestige/Floor_Clear_Requirement.webp" },
        { key: "golden_floor_multi", name: "Golden Floor Multiplier", desc: "Multiplier applied to golden floor rewards", type: "multi", icon: "icons/prestige/Floor_Clear_Requirement.webp" },
        { key: "prismatic_floor_chance", name: "Prismatic Floor Chance", desc: "Chance to encounter a Prismatic Floor", type: "chance", icon: "icons/prestige/Floor_Clear_Requirement.webp" },
        { key: "prismatic_floor_multi", name: "Prismatic Floor Multiplier", desc: "Multiplier applied to prismatic floor rewards", type: "multi", icon: "icons/prestige/Floor_Clear_Requirement.webp" },
        { key: "galactic_floor_chance", name: "Galactic Floor Chance", desc: "Chance to encounter a Galactic Floor", type: "chance", icon: "icons/prestige/Floor_Clear_Requirement.webp" },
        { key: "galactic_floor_multi", name: "Galactic Floor Multiplier", desc: "Multiplier applied to galactic floor rewards", type: "multi", icon: "icons/prestige/Floor_Clear_Requirement.webp" },
        { key: "rainbow_floor_chance", name: "Rainbow Floor Chance", desc: "Chance to encounter a Rainbow Floor", type: "chance", icon: "icons/prestige/Floor_Clear_Requirement.webp" },
        { key: "rainbow_floor_multi", name: "Rainbow Floor Multiplier", desc: "Multiplier applied to rainbow floor rewards", type: "multi", icon: "icons/prestige/Floor_Clear_Requirement.webp" },
        { key: "floor_clear_requirement_multi", name: "Floor Clear Requirement Multiplier", desc: "Scale of requirements to clear floors (lower is better)", type: "reduction", icon: "icons/prestige/Floor_Clear_Requirement.webp" }
      ]
    },
    {
      id: "crafting",
      name: "Ores & Crafting",
      stats: [
        { key: "ore_income_multi", name: "Ore Income Multiplier", desc: "Multiplier applied to ore drops", type: "multi", icon: "icons/prestige/Ore_Sell_Price_Multiplier.webp" },
        { key: "ore_sell_price_multi", name: "Ore Sell Price Multiplier", desc: "Multiplier applied to ore sell prices", type: "multi", icon: "icons/prestige/Ore_Sell_Price_Multiplier.webp" },
        { key: "bar_craft_cost_multi", name: "Bar Craft Cost Multiplier", desc: "Reduction to ores required for bar crafting", type: "reduction", icon: "icons/prestige/Free_Craft_Chance.webp" },
        { key: "bar_output_multi", name: "Bar Output Multiplier", desc: "Multiplier to the amount of bars crafted", type: "multi", icon: "icons/prestige/Bar_Output_Multiplier.webp" },
        { key: "bar_upgrade_cost_reduction", name: "Bar Upgrade Cost Reduction", desc: "Reduction to upgrade costs involving bars", type: "reduction", icon: "icons/prestige/Free_Craft_Chance.webp" },
        { key: "free_craft_chance", name: "Free Craft Chance", desc: "Chance to craft items without consuming materials", type: "chance", icon: "icons/prestige/Free_Craft_Chance.webp" },
        { key: "double_craft_chance", name: "Double Craft Chance", desc: "Chance to receive 2x bars from a single craft", type: "chance", icon: "icons/prestige/Free_Craft_Chance.webp" },
        { key: "triple_craft_chance", name: "Triple Craft Chance", desc: "Chance to receive 3x bars from a single craft", type: "chance", icon: "icons/prestige/Triple_Craft_Chance.webp" },
        { key: "craft_5x_chance", name: "5x Craft Chance", desc: "Chance to receive 5x bars from a single craft", type: "chance", icon: "icons/prestige/Triple_Craft_Chance.webp" },
        { key: "craft_10x_chance", name: "10x Craft Chance", desc: "Chance to receive 10x bars from a single craft", type: "chance", icon: "icons/prestige/Triple_Craft_Chance.webp" },
        { key: "craft_20x_chance", name: "20x Craft Chance", desc: "Chance to receive 20x bars from a single craft", type: "chance", icon: "icons/prestige/Triple_Craft_Chance.webp" },
        { key: "craft_100x_chance", name: "100x Craft Chance", desc: "Chance to receive 100x bars from a single craft", type: "chance", icon: "icons/prestige/Triple_Craft_Chance.webp" }
      ]
    },
    {
      id: "drones",
      name: "Drones & Companions",
      stats: [
        { key: "drone_count", name: "Drone Count", desc: "Number of currently active drones", type: "cap", icon: "icons/menus/Drones.webp" },
        { key: "drone_suit_cap", name: "Drone Suit Capacity", desc: "Capacity limit of the player's drone suit", type: "cap", icon: "icons/menus/Drones.webp" },
        { key: "drone_damage_percent", name: "Drone Damage Modifier", desc: "Drone damage boost", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "drone_movespeed_percent", name: "Drone Move Speed Modifier", desc: "Drone movement speed boost", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "drone_radius_percent", name: "Drone Radius Modifier", desc: "Drone collection/mining radius boost", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "drone_attack_speed_percent", name: "Drone Attack Speed Modifier", desc: "Drone attack speed boost", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "drone_rapid_fire_chance", name: "Drone Rapid Fire Chance", desc: "Chance for drones to enter rapid fire", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "drone_triple_damage_chance", name: "Drone Triple Damage Chance", desc: "Chance for drone attacks to deal triple damage", type: "chance", icon: "icons/menus/Drones.webp" }
      ]
    },
    {
      id: "fishing",
      name: "Fishing",
      stats: [
        { key: "fishing_tick_speed", name: "Fishing Tick Speed", desc: "Base tick speed for fishing checks", type: "number", icon: "icons/menus/Craft.webp" },
        { key: "fishing_tick_reduction_seconds", name: "Fishing Tick Reduction", desc: "Seconds subtracted from fishing interval", type: "reduction", suffix: "s", icon: "icons/menus/Craft.webp" },
        { key: "fishing_rod_power", name: "Fishing Rod Power", desc: "Fishing power of the rod", type: "number", icon: "icons/menus/Craft.webp" },
        { key: "fishing_income_multi", name: "Fishing Income Multiplier", desc: "Multiplier applied to money/resources caught fishing", type: "multi", icon: "icons/menus/Craft.webp" },
        { key: "fishing_token_multi", name: "Fishing Token Multiplier", desc: "Multiplier applied to fishing tokens gained", type: "multi", icon: "icons/menus/Craft.webp" },
        { key: "fishing_double_tick_chance", name: "Fishing Double Tick Chance", desc: "Chance to tick twice per interval", type: "chance", icon: "icons/menus/Craft.webp" },
        { key: "fishing_triple_tick_chance", name: "Fishing Triple Tick Chance", desc: "Chance to tick three times per interval", type: "chance", icon: "icons/menus/Craft.webp" },
        { key: "fishing_5x_tick_chance", name: "Fishing 5x Tick Chance", desc: "Chance to tick five times per interval", type: "chance", icon: "icons/menus/Craft.webp" },
        { key: "fishing_shiny_chance", name: "Fishing Shiny Chance", desc: "Chance to catch shiny fish", type: "chance", icon: "icons/menus/Craft.webp" },
        { key: "fishing_shiny_multi", name: "Fishing Shiny Multiplier", desc: "Multiplier applied to shiny fish values", type: "multi", icon: "icons/menus/Craft.webp" },
        { key: "fishing_super_shiny_chance", name: "Fishing Super Shiny Chance", desc: "Chance to catch super shiny fish", type: "chance", icon: "icons/menus/Craft.webp" },
        { key: "fishing_super_shiny_multi", name: "Fishing Super Shiny Multiplier", desc: "Multiplier applied to super shiny fish values", type: "multi", icon: "icons/menus/Craft.webp" },
        { key: "fishing_drone_capacity", name: "Fishing Drone Capacity", desc: "Max inventory capacity of the fishing drone", type: "cap", icon: "icons/menus/Craft.webp" },
        { key: "fishing_drone_multiplier", name: "Fishing Drone Multiplier", desc: "Multiplier to fishing drone productivity", type: "multi", icon: "icons/menus/Craft.webp" },
        { key: "fishing_drone_power", name: "Fishing Drone Power", desc: "Power rating of the fishing drone", type: "number", icon: "icons/menus/Craft.webp" }
      ]
    },
    {
      id: "creatures",
      name: "Creatures & Catching",
      stats: [
        { key: "lootbug_spawn_rate", name: "Lootbug Spawn Rate", desc: "Base rate at which lootbugs spawn", type: "number", icon: "icons/menus/Construct.webp" },
        { key: "lootbug_loot_multi", name: "Lootbug Loot Multiplier", desc: "Multiplier applied to lootbug drops", type: "multi", icon: "icons/menus/Construct.webp" },
        { key: "lootbug_triple_chance", name: "Lootbug Triple Spawn Chance", desc: "Chance for lootbugs to spawn in triplets", type: "chance", icon: "icons/menus/Construct.webp" },
        { key: "lootbug_golden_chance", name: "Lootbug Golden Chance", desc: "Chance for a spawned lootbug to be golden", type: "chance", icon: "icons/menus/Construct.webp" },
        { key: "lootbug_bank_cap", name: "Lootbug Bank Cap", desc: "Maximum capacity limit of the lootbug bank", type: "cap", icon: "icons/menus/Construct.webp" },
        { key: "lootbug_gem_cost_reduction", name: "Lootbug Gem Cost Reduction", desc: "Reduction to gem costs from lootbug bank upgrades", type: "reduction", icon: "icons/menus/Construct.webp" },
        { key: "lootfrogs_caught", name: "Lootfrogs Caught", desc: "Total amount of normal lootfrogs caught", type: "number", icon: "icons/menus/Construct.webp" },
        { key: "golden_lootfrogs_caught", name: "Golden Lootfrogs Caught", desc: "Total amount of golden lootfrogs caught", type: "number", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_capacity", name: "Lootfrog Capacity", desc: "Max inventory storage capacity for lootfrogs", type: "cap", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_loot_multi", name: "Lootfrog Loot Multiplier", desc: "Multiplier applied to lootfrog capture rewards", type: "multi", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_golden_chance", name: "Lootfrog Golden Chance", desc: "Chance for a spawned lootfrog to be golden", type: "chance", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_golden_multi", name: "Lootfrog Golden Multiplier", desc: "Multiplier applied to golden lootfrog capture rewards", type: "multi", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_big_chance", name: "Lootfrog Big Chance", desc: "Chance for a spawned lootfrog to be giant", type: "chance", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_big_multi", name: "Lootfrog Big Multiplier", desc: "Multiplier applied to giant lootfrog capture rewards", type: "multi", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_10x_spawn_chance", name: "Lootfrog 10x Spawn Chance", desc: "Chance to spawn 10x lootfrogs simultaneously", type: "chance", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_triple_spawn_chance", name: "Lootfrog Triple Spawn Chance", desc: "Chance to spawn 3x lootfrogs simultaneously", type: "chance", icon: "icons/menus/Construct.webp" },
        { key: "lootfrog_lanterns_used", name: "Lootfrog Lanterns Used", desc: "Number of lanterns active/used", type: "number", icon: "icons/menus/Construct.webp" }
      ]
    },
    {
      id: "stars",
      name: "Stars & Stonks",
      stats: [
        { key: "star_spawn_rate", name: "Star Spawn Rate", desc: "Rate at which stars spawn on screen", type: "number", icon: "icons/menus/Drones.webp" },
        { key: "star_auto_catch_chance", name: "Star Auto Catch Chance", desc: "Chance for stars to be collected automatically", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "star_double_spawn_chance", name: "Star Double Spawn Chance", desc: "Chance for stars to spawn in pairs", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "star_triple_spawn_chance", name: "Star Triple Spawn Chance", desc: "Chance for stars to spawn in triplets", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "star_radiant_chance", name: "Star Radiant Chance", desc: "Chance for stars to be Radiant", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "star_radiant_multi", name: "Star Radiant Multiplier", desc: "Multiplier to Radiant Star collections", type: "multi", icon: "icons/menus/Drones.webp" },
        { key: "star_supergiant_chance", name: "Star Supergiant Chance", desc: "Chance for stars to be Supergiants", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "star_supergiant_multi", name: "Star Supergiant Multiplier", desc: "Multiplier to Supergiant Star collections", type: "multi", icon: "icons/menus/Drones.webp" },
        { key: "star_supernova_chance", name: "Star Supernova Chance", desc: "Chance for stars to explode as Supernovas", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "star_supernova_multi", name: "Star Supernova Multiplier", desc: "Multiplier to Supernova collections", type: "multi", icon: "icons/menus/Drones.webp" },
        { key: "stonks_chance", name: "Stonks Chance", desc: "Chance to trigger a Stonks event", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "stonks_multi", name: "Stonks Multiplier", desc: "Multiplier applied during Stonks event", type: "multi", icon: "icons/menus/Drones.webp" },
        { key: "super_stonks_chance", name: "Super Stonks Chance", desc: "Chance to trigger a Super Stonks event", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "super_stonks_multi", name: "Super Stonks Multiplier", desc: "Multiplier applied during Super Stonks event", type: "multi", icon: "icons/menus/Drones.webp" },
        { key: "ultra_stonks_chance", name: "Ultra Stonks Chance", desc: "Chance to trigger an Ultra Stonks event", type: "chance", icon: "icons/menus/Drones.webp" },
        { key: "ultra_stonks_multi", name: "Ultra Stonks Multiplier", desc: "Multiplier applied during Ultra Stonks event", type: "multi", icon: "icons/menus/Drones.webp" }
      ]
    },
    {
      id: "obelisk",
      name: "Obelisk & Statues",
      stats: [
        { key: "obelisk_cooldown_multi", name: "Obelisk Cooldown Multiplier", desc: "Cooldown reduction scale for the Obelisk active", type: "reduction", icon: "icons/prestige/Obelisk_Cooldown.webp" },
        { key: "obelisk_armor_reduction", name: "Obelisk Armor Reduction", desc: "Scale of armor ignored/reduced by the Obelisk", type: "reduction", icon: "icons/prestige/Obelisk_Armor_Reduction.webp" },
        { key: "obelisk_timer_add", name: "Obelisk Timer Add", desc: "Additional seconds added to Obelisk active timers", type: "number", suffix: "s", icon: "icons/prestige/Obelisk_Cooldown.webp" }
      ]
    },
    {
      id: "bombs_coal",
      name: "Coal & Bombs",
      stats: [
        { key: "coal_generation_seconds", name: "Coal Generation Interval", desc: "Interval in seconds to generate coal", type: "number", suffix: "s", icon: "icons/menus/Construct.webp" },
        { key: "coal_capacity_multi", name: "Coal Capacity Multiplier", desc: "Multiplier applied to max coal capacity", type: "multi", icon: "icons/menus/Construct.webp" },
        { key: "coal_fuel_save_chance", name: "Coal Fuel Save Chance", desc: "Chance to run fuel systems without consuming fuel", type: "chance", icon: "icons/menus/Construct.webp" },
        { key: "coal_fuel_duration_multi", name: "Coal Fuel Duration Multiplier", desc: "Multiplier applied to coal burn durations", type: "multi", icon: "icons/menus/Construct.webp" },
        { key: "coal_drone_exp_multi", name: "Coal Drone EXP Multiplier", desc: "Multiplier to drone experience gained via coal", type: "multi", icon: "icons/menus/Construct.webp" },
        { key: "bomb_capacity", name: "Bomb Capacity", desc: "Max inventory storage for bombs", type: "cap", icon: "icons/prestige/Bomb_Capacity.webp" },
        { key: "bomb_damage", name: "Bomb Damage", desc: "Base explosive damage of bombs", type: "number", icon: "icons/prestige/Bomb_Damage.webp" },
        { key: "bomb_crit_chance", name: "Bomb Crit Chance", desc: "Chance for bomb blasts to critically hit", type: "chance", icon: "icons/prestige/Bomb_Damage.webp" },
        { key: "bomb_crit_damage", name: "Bomb Crit Damage", desc: "Multiplier to critical bomb damage", type: "multi", icon: "icons/prestige/Bomb_Damage.webp" },
        { key: "bomb_recharge_speed", name: "Bomb Recharge Speed", desc: "Recharging speed index for bomb fabrication", type: "number", icon: "icons/prestige/Bomb_Capacity.webp" },
        { key: "bomb_free_chance", name: "Bomb Free Chance", desc: "Chance to detonate a bomb without consuming stock", type: "chance", icon: "icons/prestige/Bomb_Capacity.webp" }
      ]
    }
  ]
};
