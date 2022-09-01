onEvent("recipes", event => {
  let process = (ingot, nugget, raw, crushed, dust, fluid, id) => {
    event.remove({ output: ingot, input: raw })
    event.remove({ output: ingot, input: crushed })

    event.remove({ output: ingot, input: dust })
    event.remove({ output: nugget, input: crushed, type: "create:splashing" })

    event.smelting(nugget, dust).cookingTime(40)
    event.blasting(nugget, dust).cookingTime(20)
    event.smelting(nugget, crushed)
    event.blasting(nugget, crushed)

    event.recipes.createMilling([Item.of(dust, 3)], crushed)
    event.recipes.createCrushing([Item.of(dust, 3), Item.of(dust, 3).withChance(0.5)], crushed)
    event.recipes.createSplashing([Item.of(nugget, 2)], dust)

    event.remove({ id: TC("smeltery/melting/metal/" + id + "/dust") })

    event.custom({
      "type": "tconstruct:melting",
      "ingredient": {
        "item": dust
      },
      "result": {
        "fluid": fluid,
        "amount": 300
      },
      "temperature": 500,
      "time": 15
    })
    event.remove({ id: "alloy_forgery:" + id + "_from_ores" })
    event.remove({ id: "alloy_forgery:" + id + "_from_raw_ores" })
  }
  /*let metals = [
    //0metalMod, 1metalId, 2nuggetMod, 3crushedMod, 4dustMod, 5moltenMod
    ["minecraft", "gold", "minecraft", "create", "thermal", "tconstruct"],
    ["minecraft", "iron", "minecraft", "create", "thermal", "tconstruct"],
    ["minecraft", "copper", "create", "create", "thermal", "tconstruct"],
    ["minecraft", "iron", "minecraft", "create", "thermal", "tconstruct"],
    ["create", "zinc", "create", "create", "kubejs", "tconstruct"],
    ["thermal", "tin", "thermal", "create", "thermal", "tconstruct"],
    ["thermal", "lead", "thermal", "create", "thermal"], "tconstruct",
    ["tconstruct", "cobalt", "tconstruct", "kubejs", "kubejs", "tconstruct"],


  ]
  metals.forEach(metal => {
    let ingot = metal[0] + ":" + metal[1] + "_ingot"
    let nugget = metal[2] + ":" + metal[1] + "_nugget"
    let raw = metal[0] + ":raw_" + metal[1]
    let crushed = metal[3] + ":crushed_" + metal[1] + "_ore"
    let dust = metal[4] + ":" + metal[1] + "_dust"
    let fluid = metal[5] + ":molten_" + metal[1]

    process(ingot, nugget, raw, crushed, dust, fluid, metal[1])

    event.remove({ output: ingot, input: "#" + metal[0] + ":" + metal[1] + "_ores" })
    event.remove({ output: ingot, input: "#forge::" + metal[1] + "_ores" })
    event.remove({ output: ingot, input: "#forge:ores/" + metal[1]})
    
  })*/

  onEvent('recipes', event => {

    //Drilling recipes (Items)
    //Spawning weight the bigger the number the higher chance to spawn.
    //See server config for empty chunk weight.
    //Set the recipe id with .id('...')
    //Arguments: output item(s), ore vein name in Text Component, spawning weight, extraction time in ticks at 32 RPM.
    //event.recipes.createoreexcavation.drilling('minecraft:redstone', '{"text": "My redstone vein"}', 10, 100).id("my_vein1");
    //Coal vein with 5% chance for diamond and require a diamond drill and lava for drilling
    //event.recipes.createoreexcavation.drilling([Item.of('minecraft:coal'), Item.of('minecraft:diamond').withChance(0.05)], '{"text": "My coal vein"}', 2, 1000).drill('createoreexcavation:diamond_drill').fluid('minecraft:lava').id("my_vein2");
    //Iron vein only in overworld and a stress requirement of 512 xRPM (default is 256 xRPM)
    event.recipes.createoreexcavation.drilling('thermal:raw_lead', '{"text": "lead"}', 25, 600).biomeWhitelist('forge:is_overworld').stress(128).id("lead");
    event.recipes.createoreexcavation.drilling('thermal:raw_tin', '{"text": "tin"}', 25, 600).biomeWhitelist('forge:is_overworld').stress(128).id("tin");
    event.recipes.createoreexcavation.drilling('thermal:raw_nickel', '{"text": "nickel"}', 25, 600).biomeWhitelist('forge:is_overworld').stress(128).id("nickel");
    event.recipes.createoreexcavation.drilling('mekanism:raw_uranium', '{"text": "uranium"}', 20, 600).fluid('minecraft:lava').biomeWhitelist('forge:is_overworld').stress(128).id("uranium");
    event.recipes.createoreexcavation.drilling('thermal:raw_silver', '{"text": "silver"}', 25, 600).fluid('minecraft:lava').biomeWhitelist('forge:is_overworld').stress(128).id("silver");
    event.recipes.createoreexcavation.drilling('tconstruct:raw_cobalt', '{"text": "cobalt"}', 70, 600).fluid('minecraft:lava').biomeBlacklist('forge:is_overworld').stress(128).id("cobalt");
    event.recipes.createoreexcavation.drilling('occultism:raw_iesnium', '{"text": "iesnium"}', 25, 600).fluid('minecraft:lava').biomeBlacklist('forge:is_overworld').stress(128).id("iesnium");
    event.recipes.createoreexcavation.drilling([Item.of('createoreexcavation:raw_redstone'), Item.of('thermal:cinnabar').withChance(0.20)], '{"text": "redstone"}', 2, 1000).id("redstone");
    //biomeBlacklist is also available
  
    //Fluid extractor recipes (Fluids)
    event.recipes.createoreexcavation.extracting(Fluid.of('beyond_earth:oil', 100), '{"text": "oil"}', 55, 100).drill('createoreexcavation:netherite_drill').biomeWhitelist('forge:is_overworld').stress(128).id("beyond_earth:oil");
    //The biome, stress and drill settings are the same as the drilling recipe
  })


})

onEvent('item.tags', event => {

  global.trades.forEach(element => {
		event.get('forge:trade_cards').add(`kubejs:trade_card_${element}`)
	});

	global.professions.forEach(element => {
		event.get('forge:profession_cards').add(`kubejs:profession_card_${element}`)
	});


  event.get('thermal:crafting/dies').add('#forge:trade_cards')
	event.get('thermal:crafting/dies').add('#forge:profession_cards')

	event.get("forge:plates/steel").add("beyond_earth:compressed_steel")

  event.get("forge:insulating").add("immersiveengineering:insulating_glass")
  event.get("forge:insulating").add("immersiveengineering:slag_glass")

  event.get("forge:saws").add("kubejs:stone_saw")
  event.get("forge:saws").add("kubejs:iron_saw")
	event.get("forge:saws").add("kubejs:diamond_saw")
  event.get("forge:saws").add("kubejs:netherite_saw")

  event.get("forge:dyes/red").add("thermal:ruby_dust")
  event.get("forge:dyes/blue").add("thermal:sapphire_dust")

  event.get("twilightforest:portal/activator").remove("minecraft:diamond")
  event.get("twilightforest:portal/activator").add("thermal:enderium_ingot")

  event.get("forge:ingots/nickel").remove("immersiveengineering:ingot_nickel")
  event.get("forge:ingots/nickel").remove("exnihilosequentia:nickel_ingot")
  event.get("forge:ingots/lead").remove("immersiveengineering:ingot_lead")
  event.get("forge:ingots/lead").remove("exnihilosequentia:lead_ingot")
  event.get("forge:ingots/silver").remove("immersiveengineering:ingot_silver")
  event.get("forge:ingots/silver").remove("exnihilosequentia:silver_ingot")
  event.get("forge:ingots/uranium").remove("immersiveengineering:ingot_uranium")
  event.get("forge:ingots/uranium").remove("exnihilosequentia:uranium_ingot")
  event.get("forge:ingots/constantan").remove("immersiveengineering:ingot_constantan")
  event.get("forge:ingots/electrum").remove("immersiveengineering:ingot_electrum")
  event.get("forge:ingots/steel").remove("immersiveengineering:ingot_steel")
  event.get("forge:ingots/steel").remove("beyond_earth:steel_ingot")
  event.get("forge:ingots/tin").remove("exnihilosequentia:tin_ingot")
  event.get("forge:ingots/aluminum").remove("exnihilosequentia:aluminum_ingot")
  event.get("forge:ingots/zinc").remove("exnihilosequentia:zinc_ingot")

  event.get("forge:nuggets/nickel").remove("immersiveengineering:nugget_nickel")
  event.get("forge:nuggets/lead").remove("immersiveengineering:nugget_lead")
  event.get("forge:nuggets/silver").remove("immersiveengineering:nugget_silver")
  event.get("forge:nuggets/uranium").remove("immersiveengineering:nugget_uranium")
  event.get("forge:nuggets/constantan").remove("immersiveengineering:nugget_constantan")
  event.get("forge:nuggets/electrum").remove("immersiveengineering:nugget_electrum")
  event.get("forge:nuggets/steel").remove("immersiveengineering:nugget_steel")
  event.get("forge:nuggets/copper").remove("immersiveengineering:nugget_copper")

  event.get("forge:plates/nickel").remove("immersiveengineering:plate_nickel")
  event.get("forge:plates/lead").remove("immersiveengineering:plate_lead")
  event.get("forge:plates/silver").remove("immersiveengineering:plate_silver")
  event.get("forge:plates/constantan").remove("immersiveengineering:plate_constantan")
  event.get("forge:plates/electrum").remove("immersiveengineering:plate_electrum")
  event.get("forge:plates/steel").remove("immersiveengineering:plate_steel")
  event.get("forge:plates/copper").remove("immersiveengineering:plate_copper")
  event.get("forge:plates/iron").remove("immersiveengineering:plate_iron")
  event.get("forge:plates/gold").remove("immersiveengineering:plate_gold")

  event.get("forge:plates/iron").remove("beyond_earth:iron_plate")

  event.get("forge:dusts/nickel").remove("immersiveengineering:dust_nickel")
  event.get("forge:dusts/lead").remove("immersiveengineering:dust_lead")
  event.get("forge:dusts/silver").remove("immersiveengineering:dust_silver")
  event.get("forge:dusts/uranium").remove("immersiveengineering:dust_uranium")
  event.get("forge:dusts/constantan").remove("immersiveengineering:dust_constantan")
  event.get("forge:dusts/electrum").remove("immersiveengineering:dust_electrum")
  event.get("forge:dusts/steel").remove("immersiveengineering:dust_steel")
  event.get("forge:dusts/copper").remove("immersiveengineering:dust_copper")
  event.get("forge:dusts/iron").remove("immersiveengineering:dust_iron")
  event.get("forge:dusts/gold").remove("immersiveengineering:dust_gold")

})