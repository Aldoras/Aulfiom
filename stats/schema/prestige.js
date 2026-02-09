export const prestigeCategory = {
  id: "prestige",
  name: "Prestige",
  icon: "icons/menus/Prestige.webp",
  tabs: [
    { id: "tier1", name: "Tier 1", stats: [
                {
        key: "pickaxeDmg",
        name: "Pickaxe Damage",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 32,
        step: 1,
        icon: "icons/prestige/Pickaxe_Damage.webp"
        },
        {
        key: "pickaxeCost",
        name: "Pickaxe Cost",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 12,
        step: 1,
        icon: "icons/prestige/Pickaxe_Cost.webp"
        },
                {
        key: "experienceGain",
        name: "Experience Gain",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 27,
        step: 1,
        icon: "icons/prestige/Experience_Gain_Multiplier.webp"
        },
                {
        key: "freecraftChance",
        name: "Free Craft Chance",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Free_Craft_Chance.webp"
        },
                        {
        key: "triplecraftChance",
        name: "Triple Craft Chance",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Triple_Craft_Chance.webp"
        },
                {
        key: "pickaxeRadius",
        name: "Pickaxe Radius",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 12,
        step: 1,
        icon: "icons/prestige/Pickaxe_Radius.webp"
        },
                {
        key: "oresellPrice",
        name: "Ore Sell Price",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Ore_Sell_Price_Multiplier.webp"
        },
                {
        key: "itemDuration",
        name: "Item Duration",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Item_Duration_Multiplier.webp"
        },
                {
        key: "bombDamage",
        name: "Bomb Damage",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 32,
        step: 1,
        icon: "icons/prestige/Bomb_Damage.webp"
        },
                {
        key: "obeliskCooldown",
        name: "Obelisk Cooldown",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Obelisk_Cooldown.webp"
        },
    ] },
    { id: "tier2", name: "Tier 2", stats: [
                        {
        key: "pickaxeDamage",
        name: "Pickaxe Damage",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 32,
        step: 1,
        icon: "icons/prestige/Pickaxe_Damage.webp"
        },
           {
        key: "bombDamage",
        name: "Bomb Damage",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 32,
        step: 1,
        icon: "icons/prestige/Bomb_Damage.webp"
        },
           {
        key: "prestigePointGain",
        name: "Prestige Point Gain",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Prestige_Point_Gain_Multiplier.webp"
        },
           {
        key: "pickaxeSuperCritChance",
        name: "Pickaxe Super Crit Chance",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Pickaxe_Super_Crit_Chance.webp"
        },
           {
        key: "floorClearRequirement",
        name: "Floor Clear Requirement",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Floor_Clear_Requirement.webp"
        },
    ] },
    { id: "tier3", name: "Tier 3", stats: [
           {
        key: "pickaxeDamagePerStatueOwned",
        name: "Pickaxe Damage Per Statue Owned",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 52,
        step: 1,
        icon: "icons/prestige/Pickaxe_Damage_Per_Statue_Owned.webp"
        },
           {
        key: "bombDamagePerStatueOwned",
        name: "Bomb Damage Per Statue Owned",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 52,
        step: 1,
        icon: "icons/prestige/_Per_Statue_Owned.webp"
        },
           {
        key: "pickaxeOmegaCritChance",
        name: "Pickaxe Omega Crit Chance",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 37,
        step: 1,
        icon: "icons/prestige/Pickaxe_Omega_Crit_Chance.webp"
        },
           {
        key: "barOutputMultiplier",
        name: "Bar Output Multiplier",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 37,
        step: 1,
        icon: "icons/prestige/Bar_Output_Multiplier.webp"
        },
                   {
        key: "veinSpawnRateMultiplier",
        name: "Vein Spawn Rate Multiplier",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Vein_Spawn_Rate_Multiplier.webp"
        },
    ] },
    { id: "tier4", name: "Tier 4", stats: [
                  {
        key: "pickaxeDamage",
        name: "Pickaxe Damage",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 32,
        step: 1,
        icon: "icons/prestige/Pickaxe_Damage.webp"
        },
           {
        key: "bombDamage",
        name: "Bomb Damage",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 32,
        step: 1,
        icon: "icons/prestige/Bomb_Damage.webp"
        },
           {
        key: "bombSuperCritChance",
        name: "Bomb Super Crit Chance",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Bomb_Super_Crit_Chance.webp"
        },
           {
        key: "obeliskArmor",
        name: "Obelisk Armor",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Obelisk_Armor_Reduction.webp"
        },
                   {
        key: "bombCapactiy",
        name: "Bomb Capacity",
        type: "number",
        input: "slider",
        default: 0,
        min: 0,
        max: 17,
        step: 1,
        icon: "icons/prestige/Bomb_Capacity.webp"
        }, 
    ] }
  ],
  stats: []
}