// Automatically generated schema configuration for ACLIOM
export const skillTreeCategory = {
  "id": "skillTree",
  "name": "Skill Tree",
  "icon": "icons/menus/Skill_Tree.webp",
  "canvasHeight": 2000,
  "stats": [
    {
      "key": "luckyStrikesSkill",
      "name": "Lucky Strikes",
      "type": "skill",
      "typeImage": "icons/skill_tree/Lucky_Strikes.png",
      "states": 2,
      "x": 400,
      "y": 50,
      "prereqs": [],
      "hasCrystals": false
    },
    {
      "key": "biggerBlastsSkill",
      "name": "Bigger Blasts",
      "type": "skill",
      "typeImage": "icons/skill_tree/Bigger_Blasts.png",
      "states": 2,
      "x": 240,
      "y": 150,
      "prereqs": [
        "luckyStrikesSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "oreEfficiencySkill",
      "name": "Ore Efficiency",
      "type": "skill",
      "typeImage": "icons/skill_tree/Ore_Efficiency.png",
      "states": 2,
      "x": 560,
      "y": 150,
      "prereqs": [
        "luckyStrikesSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "swingHarderSkill",
      "name": "Swing Harder",
      "type": "skill",
      "typeImage": "icons/skill_tree/Swing_Harder.png",
      "states": 2,
      "x": 240,
      "y": 250,
      "prereqs": [
        "biggerBlastsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "ingotIntuitionSkill",
      "name": "Ingot Intuition",
      "type": "skill",
      "typeImage": "icons/skill_tree/Ingot_Intuition.png",
      "states": 2,
      "x": 560,
      "y": 250,
      "prereqs": [
        "oreEfficiencySkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "arsenalAdvancementSkill",
      "name": "Arsenal Advancement",
      "type": "skill",
      "typeImage": "icons/skill_tree/Arsenal_Advancement.png",
      "states": 2,
      "x": 300,
      "y": 350,
      "prereqs": [
        "swingHarderSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "allRoundBomberSkill",
      "name": "All-Round Bomber",
      "type": "skill",
      "typeImage": "icons/skill_tree/All-Round_Bomber.png",
      "states": 2,
      "x": 180,
      "y": 350,
      "prereqs": [
        "swingHarderSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "waitMyCritsCanCritSkill",
      "name": "Wait, My Crits Can Crit",
      "type": "skill",
      "typeImage": "icons/skill_tree/Wait_My_Crits_Can_Crit.png",
      "states": 2,
      "x": 620,
      "y": 350,
      "prereqs": [
        "ingotIntuitionSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "easyProgressorSkill",
      "name": "Easy Progressor",
      "type": "skill",
      "typeImage": "icons/skill_tree/Easy_Progressor.png",
      "states": 4,
      "x": 500,
      "y": 350,
      "prereqs": [
        "ingotIntuitionSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "ppGoUpSkill",
      "name": "PP Go Up",
      "type": "skill",
      "typeImage": "icons/skill_tree/PP_Go_Up.png",
      "default": 0,
      "states": 2,
      "x": 180,
      "y": 450,
      "prereqs": [
        "allRoundBomberSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "gemChestsSkill",
      "name": "Gem & Chests",
      "type": "skill",
      "typeImage": "icons/skill_tree/Gems_&_Chests.png",
      "default": 0,
      "states": 2,
      "x": 620,
      "y": 450,
      "prereqs": [
        "waitMyCritsCanCritSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "superDamageSkill",
      "name": "Super Damage",
      "type": "skill",
      "typeImage": "icons/skill_tree/Super_Damage.png",
      "default": 0,
      "states": 2,
      "x": 180,
      "y": 550,
      "prereqs": [
        "ppGoUpSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "justWaitFasterSkill",
      "name": "Just Wait Faster",
      "type": "skill",
      "typeImage": "icons/skill_tree/Just_Wait_Faster.png",
      "default": 0,
      "states": 2,
      "x": 620,
      "y": 550,
      "prereqs": [
        "gemChestsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "heftyHammersSkill",
      "name": "Hefty Hammers",
      "type": "skill",
      "typeImage": "icons/skill_tree/Hefty_Hammers.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 650,
      "prereqs": [
        "ppGoUpSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "newField_6477Skill",
      "name": "Relic Rampage",
      "type": "skill",
      "typeImage": "icons/skill_tree/Relic_Rampage.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 650,
      "prereqs": [
        "gemChestsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "mechanicalEvolutionSkill",
      "name": "Mechanical Evolution",
      "type": "skill",
      "typeImage": "icons/skill_tree/Mechanical_Evolution.png",
      "default": 0,
      "states": 2,
      "x": 180,
      "y": 750,
      "prereqs": [
        "heftyHammersSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "chronokeeperSkill",
      "name": "Chronokeeper",
      "type": "skill",
      "typeImage": "icons/skill_tree/Hefty_Hammers.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 750,
      "prereqs": [
        "heftyHammersSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "gemBombSkill",
      "name": "Gem Bomb",
      "type": "skill",
      "typeImage": "icons/skill_tree/Gem_Bomb.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 750,
      "prereqs": [
        "newField_6477Skill"
      ],
      "hasCrystals": true
    },
    {
      "key": "treasureHunterSkill",
      "name": "Treasure Hunter",
      "type": "skill",
      "typeImage": "icons/skill_tree/Treasure_Hunter.png",
      "default": 0,
      "states": 2,
      "x": 620,
      "y": 750,
      "prereqs": [
        "newField_6477Skill"
      ],
      "hasCrystals": true
    },
    {
      "key": "demolitionExpertSkill",
      "name": "Demolition Expert",
      "type": "skill",
      "typeImage": "icons/skill_tree/Demolition_Expert.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 850,
      "prereqs": [
        "chronokeeperSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "waitMySuperCritsCanCritSkill",
      "name": "Wait My Super Crits Can Crit?",
      "type": "skill",
      "typeImage": "icons/skill_tree/Wait_My_Super_Crits_Can_Crit.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 850,
      "prereqs": [
        "gemBombSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "autobomberSkill",
      "name": "Auto-Bomber",
      "type": "skill",
      "typeImage": "icons/skill_tree/Auto-Bomber.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 950,
      "prereqs": [
        "demolitionExpertSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "perfectGoldSkill",
      "name": "Perfect Gold",
      "type": "skill",
      "typeImage": "icons/skill_tree/Perfect_Gold.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 950,
      "prereqs": [
        "waitMySuperCritsCanCritSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "flamboyantBombsSkill",
      "name": "Flamboyant Bombs",
      "type": "skill",
      "typeImage": "icons/skill_tree/Flamboyant_Bombs.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 1050,
      "prereqs": [
        "autobomberSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "moreOreMoreProblemsSkill",
      "name": "More Ore More Problems",
      "type": "skill",
      "typeImage": "icons/skill_tree/More_Ore_More_Problems.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 1050,
      "prereqs": [
        "perfectGoldSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "freeThatsAGreatPriceSkill",
      "name": "Free? That's A Great Price!",
      "type": "skill",
      "typeImage": "icons/skill_tree/Free_That's_a_Great_Price!.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 1150,
      "prereqs": [
        "flamboyantBombsSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "waitMyUltraCritsCanCritSkill",
      "name": "Wait My Ultra Crits Can Crit?",
      "type": "skill",
      "typeImage": "icons/skill_tree/Wait_My_Ultra_Crits_Can_Crit.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 1150,
      "prereqs": [
        "moreOreMoreProblemsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "doTheseUpgradesEverEndSkill",
      "name": "Do These Upgrades Ever End",
      "type": "skill",
      "typeImage": "icons/skill_tree/Do_These_Upgrades_Ever_End.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 1250,
      "prereqs": [
        "freeThatsAGreatPriceSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "opticalPhenomenonSkill",
      "name": "Optical Phenomenon",
      "type": "skill",
      "typeImage": "icons/skill_tree/Optical_Phenomenon.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 1250,
      "prereqs": [
        "waitMyUltraCritsCanCritSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "haveYouTriedGettingLuckierSkill",
      "name": "Have You Tried Getting Luckier?",
      "type": "skill",
      "typeImage": "icons/skill_tree/Have_You_Tried_Getting_Luckier.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 1350,
      "prereqs": [
        "doTheseUpgradesEverEndSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "stonksSkill",
      "name": "Stonks",
      "type": "skill",
      "typeImage": "icons/skill_tree/Stonks.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 1350,
      "prereqs": [
        "opticalPhenomenonSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "gasolineGuzzlerSkill",
      "name": "Gasoline Guzzler",
      "type": "skill",
      "typeImage": "icons/skill_tree/Gasoline_Guzzler.png",
      "default": 0,
      "states": 2,
      "x": 100,
      "y": 1450,
      "prereqs": [
        "haveYouTriedGettingLuckierSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "iHaveWaresIfYouHaveCoinSkill",
      "name": "I Have Wares, If You Have Coin",
      "type": "skill",
      "typeImage": "icons/skill_tree/I_Have_Wares,_If_You_Have_Coin.png",
      "default": 0,
      "states": 2,
      "x": 700,
      "y": 1450,
      "prereqs": [
        "stonksSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "fishingWithFriendsSkill",
      "name": "Fishing With Friends",
      "type": "skill",
      "typeImage": "icons/skill_tree/Fishing_With_Friends.png",
      "default": 0,
      "states": 4,
      "x": 100,
      "y": 1900,
      "prereqs": [
        "gasolineGuzzlerSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "yallGotAnyMoreOfThemVeinsSkill",
      "name": "Y'all Got Any More Of Them Veins?",
      "type": "skill",
      "typeImage": "icons/skill_tree/Y'all_Got_Any_More_Of_Them_Veins.png",
      "default": 0,
      "states": 2,
      "x": 180,
      "y": 1600,
      "prereqs": [
        "gasolineGuzzlerSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "savingForARainyDaySkill",
      "name": "Saving For A Rainy Day",
      "type": "skill",
      "typeImage": "icons/skill_tree/Saving_For_A_Rainy_Day.png",
      "default": 0,
      "states": 2,
      "x": 620,
      "y": 1600,
      "prereqs": [
        "iHaveWaresIfYouHaveCoinSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "letsPickUpThePaceSkill",
      "name": "Let's Pick Up The Pace",
      "type": "skill",
      "typeImage": "icons/skill_tree/Let's_Pick_Up_The_Pace.png",
      "default": 0,
      "states": 4,
      "x": 697,
      "y": 1900,
      "prereqs": [
        "iHaveWaresIfYouHaveCoinSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "friendshipEndedWithTier1ItemsSkill",
      "name": "Friendship Ended With Tier 1 Items",
      "type": "skill",
      "typeImage": "icons/skill_tree/Friendship_Ended_With_Tier_1_Items.png",
      "default": 0,
      "states": 4,
      "x": 100,
      "y": 2000,
      "prereqs": [
        "fishingWithFriendsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "whosAskingForAllTheseBarsSkill",
      "name": "Who's Asking For All These Bars?",
      "type": "skill",
      "typeImage": "icons/skill_tree/Who's_Asking_For_All_These_Bars.png",
      "default": 0,
      "states": 2,
      "x": 280,
      "y": 1500,
      "prereqs": [
        "yallGotAnyMoreOfThemVeinsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "imRunningOutOfCreativeNamesSkill",
      "name": "I'm Running Out Of Creative Names",
      "type": "skill",
      "typeImage": "icons/skill_tree/I'm_Running_Out_Of_Creative_Names.png",
      "default": 0,
      "states": 2,
      "x": 520,
      "y": 1500,
      "prereqs": [
        "savingForARainyDaySkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "withThisFishISummonTwoMoreFishSkill",
      "name": "With This Fish I Summon Two More Fish",
      "type": "skill",
      "typeImage": "icons/skill_tree/With_This_Fish_I_Summon_Two_More_Fish.png",
      "default": 0,
      "states": 4,
      "x": 700,
      "y": 2000,
      "prereqs": [
        "letsPickUpThePaceSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "motleySchoolSkill",
      "name": "Motley School",
      "type": "skill",
      "typeImage": "icons/skill_tree/Motley_School.png",
      "default": 0,
      "states": 4,
      "x": 100,
      "y": 2100,
      "prereqs": [
        "friendshipEndedWithTier1ItemsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "tonsOfDamageSkill",
      "name": "Tons Of Damage",
      "type": "skill",
      "typeImage": "icons/skill_tree/Tons_Of_Damage.png",
      "default": 0,
      "states": 2,
      "x": 300,
      "y": 1700,
      "prereqs": [
        "whosAskingForAllTheseBarsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "ctrlfStarsSkill",
      "name": "Ctrl+F 'Stars'",
      "type": "skill",
      "typeImage": "icons/skill_tree/Ctrl+F_'Stars'.png",
      "default": 0,
      "states": 2,
      "x": 500,
      "y": 1700,
      "prereqs": [
        "imRunningOutOfCreativeNamesSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "completionistGatekeeperSkill",
      "name": "Completionist Gatekeeper",
      "type": "skill",
      "typeImage": "icons/skill_tree/Completionist_Gatekeeper.png",
      "default": 0,
      "states": 2,
      "x": 700,
      "y": 2100,
      "prereqs": [],
      "hasCrystals": false
    },
    {
      "key": "thisIsGonnaTakeAWhileSkill",
      "name": "This Is Gonna Take A While..",
      "type": "skill",
      "typeImage": "icons/skill_tree/This_Is_Gonna_Take_A_While.png",
      "default": 0,
      "states": 2,
      "x": 180,
      "y": 1850,
      "prereqs": [
        "tonsOfDamageSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "blockBonkerSkill",
      "name": "Block Bonker",
      "type": "skill",
      "typeImage": "icons/skill_tree/Block_Bonker.png",
      "default": 0,
      "states": 2,
      "x": 320,
      "y": 1800,
      "prereqs": [
        "tonsOfDamageSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "avadaKedaSkill",
      "name": "Avada Keda-'",
      "type": "skill",
      "typeImage": "icons/skill_tree/Avada_Keda-.png",
      "default": 0,
      "states": 2,
      "x": 480,
      "y": 1800,
      "prereqs": [
        "ctrlfStarsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "threesACrowdSkill",
      "name": "Three's A Crowd",
      "type": "skill",
      "typeImage": "icons/skill_tree/Three's_A_Crowd.png",
      "default": 0,
      "states": 2,
      "x": 620,
      "y": 1850,
      "prereqs": [
        "ctrlfStarsSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "takeItBackNowYallSkill",
      "name": "Take it back now y'all",
      "type": "skill",
      "typeImage": "icons/skill_tree/Take_It_Back_Now_Yall.png",
      "default": 0,
      "states": 2,
      "x": 180,
      "y": 1950,
      "prereqs": [
        "thisIsGonnaTakeAWhileSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "polychromePowerSkill",
      "name": "Polychrome Power",
      "type": "skill",
      "typeImage": "icons/skill_tree/Polychrome_Power.png",
      "default": 0,
      "states": 2,
      "x": 400,
      "y": 2050,
      "prereqs": [
        "thisIsGonnaTakeAWhileSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "leprechaunsLegacySkill",
      "name": "Leprechaun's Legacy",
      "type": "skill",
      "typeImage": "icons/skill_tree/Leprechaun's_Legacy.png",
      "default": 0,
      "states": 2,
      "x": 620,
      "y": 2000,
      "prereqs": [
        "polychromePowerSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "pleaseSirDontMakeMePrestigeAgainSkill",
      "name": "Please Sir Don't Make Me Prestige Again",
      "type": "skill",
      "typeImage": "icons/skill_tree/Please_Sir_Don't_Make_Me_Prestige_Again.png",
      "default": 0,
      "states": 4,
      "x": 240,
      "y": 2150,
      "prereqs": [
        "polychromePowerSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "anyoneUpLootinTheyBugsSkill",
      "name": "Anyone Up Lootin' They Bugs",
      "type": "skill",
      "typeImage": "icons/skill_tree/Anyone_Up_Lootin'_They_Bugs.png",
      "default": 0,
      "states": 4,
      "x": 240,
      "y": 2350,
      "prereqs": [
        "pleaseSirDontMakeMePrestigeAgainSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "insaneInTheVeinGainSkill",
      "name": "Insane In The Vein Gain",
      "type": "skill",
      "typeImage": "icons/skill_tree/Insane_In_The_Vein_Gain.png",
      "default": 0,
      "states": 4,
      "x": 400,
      "y": 2150,
      "prereqs": [
        "pleaseSirDontMakeMePrestigeAgainSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "callOfTheVoidSkill",
      "name": "Call Of The Void",
      "type": "skill",
      "typeImage": "icons/skill_tree/Call_Of_The_Void.png",
      "default": 0,
      "states": 4,
      "x": 400,
      "y": 2350,
      "prereqs": [
        "anyoneUpLootinTheyBugsSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "flamingVeinsSkill",
      "name": "Flaming Veins",
      "type": "skill",
      "typeImage": "icons/skill_tree/Flaming_Veins.png",
      "default": 0,
      "states": 2,
      "x": 400,
      "y": 2250,
      "prereqs": [
        "insaneInTheVeinGainSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "ctrlcCtrlvStarsSkill",
      "name": "Ctrl+C Ctrl+V Stars",
      "type": "skill",
      "typeImage": "icons/skill_tree/Ctrl+C_Ctrl+V_Stars.png",
      "default": 0,
      "states": 4,
      "x": 560,
      "y": 2150,
      "prereqs": [
        "insaneInTheVeinGainSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "pondYieldSkill",
      "name": "Pond Yield",
      "type": "skill",
      "typeImage": "icons/skill_tree/Pond_Yield.png",
      "default": 0,
      "states": 2,
      "x": 560,
      "y": 2350,
      "prereqs": [
        "callOfTheVoidSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "frogFrenzySkill",
      "name": "Frog Frenzy",
      "type": "skill",
      "typeImage": "icons/skill_tree/Frog_Frenzy.png",
      "default": 0,
      "states": 4,
      "x": 400,
      "y": 2450,
      "prereqs": [
        "callOfTheVoidSkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "astralForgeSkill",
      "name": "Astral Forge",
      "type": "skill",
      "typeImage": "icons/skill_tree/Astral_Forge.png",
      "default": 0,
      "states": 2,
      "x": 560,
      "y": 2250,
      "prereqs": [
        "ctrlcCtrlvStarsSkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "whyAreThereStarsInMyMiningGameSkill",
      "name": "Why Are There Stars In My Mining Game",
      "type": "skill",
      "typeImage": "icons/skill_tree/Why_Are_There_Stars_In_My_Mining_Game.png",
      "default": 0,
      "states": 4,
      "x": 240,
      "y": 2450,
      "prereqs": [
        "frogFrenzySkill"
      ],
      "hasCrystals": false
    },
    {
      "key": "idleObeliskMincerSkill",
      "name": "Idle Obelisk Mincer",
      "type": "skill",
      "typeImage": "icons/skill_tree/Idle_Obelisk_Mincer.png",
      "default": 0,
      "states": 2,
      "x": 400,
      "y": 2550,
      "prereqs": [
        "frogFrenzySkill"
      ],
      "hasCrystals": true
    },
    {
      "key": "iBuriedItHereSkill",
      "name": "I Buried It Here (55.251920, -6.483423)",
      "type": "skill",
      "typeImage": "icons/skill_tree/I_Buried_It_Here.png",
      "default": 0,
      "states": 4,
      "x": 560,
      "y": 2450,
      "prereqs": [
        "frogFrenzySkill"
      ],
      "hasCrystals": false
    }
  ]
};
