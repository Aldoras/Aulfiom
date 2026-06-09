// Automatically generated schema configuration for Idle Obelisk Miner Hub
export const skillTreeCategory = {
  "id": "skillTree",
  "name": "Skill Tree",
  "icon": "icons/menus/Skill_Tree.webp",
  "canvasHeight": 2000,
  "stats": [
    {
      "key": "swingHarderSkill",
      "name": "Swing Harder",
      "type": "skill",
      "typeImage": "icons/skill_tree/Swing_Harder.webp",
      "states": 2,
      "x": 300,
      "y": 1700,
      "prereqs": [
        "biggerBlastsSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "ingotIntuitionSkill",
      "name": "Ingot Intuition",
      "type": "skill",
      "typeImage": "icons/skill_tree/Ingot_Intuition.webp",
      "states": 2,
      "x": 700,
      "y": 220,
      "prereqs": [
        "oreEfficiencySkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "arsenalAdvancementSkill",
      "name": "Arsenal Advancement",
      "type": "skill",
      "typeImage": "icons/skill_tree/Arsenal_Advancement.webp",
      "states": 2,
      "x": 35,
      "y": 22,
      "prereqs": [
        "swingHarderSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "oreEfficiencySkill",
      "name": "Ore Efficiency",
      "type": "skill",
      "typeImage": "icons/skill_tree/Ore_Efficiency.webp",
      "states": 2,
      "x": 70,
      "y": 10,
      "prereqs": [
        "luckyStrikesSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "allRoundBomberSkill",
      "name": "All-Round Bomber",
      "type": "skill",
      "typeImage": "icons/skill_tree/All-Round_Bomber.webp",
      "states": 2,
      "x": 25,
      "y": 22,
      "prereqs": [
        "swingHarderSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "biggerBlastsSkill",
      "name": "Bigger Blasts",
      "type": "skill",
      "typeImage": "icons/skill_tree/Bigger_Blasts.webp",
      "states": 2,
      "x": 30,
      "y": 10,
      "prereqs": [
        "luckyStrikesSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "luckyStrikesSkill",
      "name": "Lucky Strikes",
      "type": "skill",
      "typeImage": "icons/skill_tree/Lucky_Strikes.webp",
      "states": 2,
      "x": 50,
      "y": 5,
      "prereqs": [],
      "hasCrystals": false
    },
    {
      "key": "waitMyCritsCanCritSkill",
      "name": "Wait, My Crits Can Crit",
      "type": "skill",
      "typeImage": "icons/skill_tree/Wait_My_Crits_Can_Crit.webp",
      "states": 2,
      "x": 75,
      "y": 22,
      "prereqs": [
        "ingotIntuitionSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "fffTest",
      "name": "Test",
      "type": "skill",
      "typeImage": "icons/skill_tree/Wait_My_Crits_Can_Crit.webp",
      "states": 4,
      "x": 50,
      "y": 89,
      "prereqs": [
        "waitMyCritsCanCritSkill"
      ],
      "hasCrystals": true
    }
  ]
};
