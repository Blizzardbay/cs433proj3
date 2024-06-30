// Project 3 CMSC 433: Created By: Darrian Corkadel, <List names here>
var image_loading_done = false;
var database_loading_done = false;
var game_loading_done = false;
var loading_done = false;
var playerPokemon;
var enemyPokemon;
var allPokemons = [];
document.getElementById('fightMenu').style.display = 'none';

async function databaseFinishedLoading() {
	// Runs upload.js and waits for it to stop running
	const database_loading = await import("./upload.js");
	// Then checks
	var temp_loading_done = await database_loading.checkState();
	
	var loading_div = document.getElementById("Loading");
	var complete_div = document.getElementById("CompletedLoading");
	loading_div.style.display = "none";
	complete_div.style.display = "block";
	database_loading_done = true;
	// First load the resources
	waitForLoad();
}

databaseFinishedLoading();

//menu handling
$(document).ready(function() {
	var MenuMusic = document.getElementById("MenuMusic");
	var SoundSettings = $("#SoundSettings");
	var volumeControl = $("#volumeControl");
	var MenuOptionButton = $("#MenuOptionButton");

	$("#PlayButton").click(function () {
		console.log("Play button clicked");
		if (image_loading_done == true && database_loading_done == true && game_loading_done == true) {
			loading_done = true;
			$("#heading").hide();
			$("#menu").hide();
			$("#screen").show();
			$("#MenuOptionButton").show();

			startGame();
		} 
		else {
			console.log("Loading not done yet");
		}
	});

	$("#SoundSettingsButton").click(function () {
		SoundSettings.show();
	});

	$("#CloseSound").click(function () {
		SoundSettings.hide();
	});

	$("#QuitButton").click(function () {
		$("#menu").remove();
		$("#screen").show(); 
		startGame();
		alert("Quitting the game.");
		MenuMusic.pause();
		window.location.href = "proj3.html";
	});

	MenuOptionButton.click(function () {
		document.getElementById('fightMenu').style.display = 'none';
		$("#screen").hide();
		$("#menu").show();
		MenuOptionButton.hide();
		exitLoop();
	});

	volumeControl.on("input", function () {
		MenuMusic.volume = this.value / 100;
	});
	$("#FightButton").click(function () {
		console.log("Fight button clicked");
		fight();
	});
});

function initializeGame() {
	// Randomly select player and enemy Pokémon from the Loaded data
	playerPokemon = allPokemons[Math.floor(Math.random() * allPokemons.length)];
	enemyPokemon = allPokemons[Math.floor(Math.random() * allPokemons.length)];

	// Set initial HP for the selected Pokémon
	playerPokemon.hp = 100; // or use actual data if available
	enemyPokemon.hp = 50; // or use actual data if available

	// Display initial Pokémon info
	console.log("Player Pokémon:", playerPokemon);
	console.log("Enemy Pokémon:", enemyPokemon);
}

// Function to parse the image list and create Pokemon stats
function parsePokemonList() {
	var pokemonList = [];
	image_load_list.forEach(function (imageName) {
		var pokemonName = imageName.split(".")[0].replace(/[0-9]/g, "");
		pokemonList.push({
			name: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1),
			hp: Math.floor(Math.random() * 100) + 50, // Random HP between 50 and 150
			attack: Math.floor(Math.random() * 20) + 5, // Random attack between 5 and 25
		});
	});
	return pokemonList;
}

// Function to get a random Pokemon from the list
function getRandomPokemon(pokemonList) {
	var index = Math.floor(Math.random() * pokemonList.length);
	return Object.assign({}, pokemonList[index]);
}

// Function to update the battle log
function updateBattleLog() {
	var battleLog = document.getElementById("battleLog");
	battleLog.innerHTML =
	playerPokemon.name +
	" HP: " +
	playerPokemon.hp +
	"<br>" +
	enemyPokemon.name +
	" HP: " +
	enemyPokemon.hp;
}

// Basic battle logic for the fight button
function fight() {
	// Player attacks enemy
	enemyPokemon.hp -= playerPokemon.attack;
	if (enemyPokemon.hp <= 0) {
		alert(playerPokemon.name + " wins!");
		resetGame();
		return;
	}

	// Enemy attacks player
	playerPokemon.hp -= enemyPokemon.attack;
	if (playerPokemon.hp <= 0) {
		alert(enemyPokemon.name + " wins!");
		resetGame();
		return;
	}

	// Update battle log
	updateBattleLog();
}

// !TODO someone implement this function!!!!!!!
function selectStarterPokemon(pokemon) {
	switch(pokemon) {
		case "Balbasaur": {
			
			break;
		}
		case "Charmander": {
			
			break;
		}
		case "Squirtle" : {
			
			break;
		}
		default: {
			break;
		}
	}
}

// Reset game after win/loss
function resetGame() {
	playerPokemon = getRandomPokemon(parsePokemonList());
	enemyPokemon = getRandomPokemon(parsePokemonList());
	updateBattleLog();
}

// Image variables
var image_load_list=["004Charmander.png","005Charmeleon.png","006Charizard.png","007Squirtle.png","008Wartortle.png","009Blastoise.png","010Caterpie.png","011Metapod.png","012Butterfree.png","013Weedle.png","014Kakuna.png","015Beedrill.png","016Pidgey.png","017Pidgeotto.png","018Pidgeot.png","019Rattata.png","021Spearow.png","022Fearow.png","023Ekans.png","024Arbok.png","025Pikachu.png","026Raichu.png","027Sandshrew.png","028Sandslash.png","029Nidoran.png","030Nidorina.png","031Nidoqueen.png","032Nidoran.png","033Nidorino.png","034Nidoking.png","035Clefairy.png","036Clefable.png","037Vulpix.png","038Ninetales.png","039Jigglypuff.png","040Wigglytuff.png","041Zubat.png","042Golbat.png","043Oddish.png","044Gloom.png","045Vileplume.png","046Paras.png","047Parasect.png","048Venonat.png","049Venomoth.png","050Diglett.png","051Dugtrio.png","052Meowth.png","053Persian.png","054Psyduck.png","055Golduck.png","056Mankey.png","057Primeape.png","058Growlithe.png","059Arcanine.png","060Poliwag.png","061Poliwhirl.png","062Poliwrath.png","063Abra.png","064Kadabra.png","065Alakazam.png","066Machop.png","067Machoke.png","068Machamp.png","069Bellsprout.png","070Weepinbell.png","071Victreebel.png","072Tentacool.png","073Tentacruel.png","074Geodude.png","075Graveler.png","076Golem.png","077Ponyta.png","078Rapidash.png","079Slowpoke.png","080Slowbro.png","081Magnemite.png","082Magneton.png","083Farfetch'd.png","084Doduo.png","085Dodrio.png","086Seel.png","087Dewgong.png","088Grimer.png","089Muk.png","090Shellder.png","091Cloyster.png","092Gastly.png","093Haunter.png","094Gengar.png","095Onix.png","096Drowzee.png","097Hypno.png","098Krabby.png","099Kingler.png","100Voltorb.png","101Electrode.png","102Exeggcute.png","103Exeggutor.png","104Cubone.png","105Marowak.png","106Hitmonlee.png","107Hitmonchan.png","108Lickitung.png","109Koffing.png","110Weezing.png","111Rhyhorn.png","112Rhydon.png","113Chansey.png","114Tangela.png","115Kangaskhan.png","116Horsea.png","117Seadra.png","118Goldeen.png","119Seaking.png","120Staryu.png","121Starmie.png","122Mr._Mime.png","123Scyther.png","124Jynx.png","125Electabuzz.png","126Magmar.png","127Pinsir.png","128Tauros.png","129Magikarp.png","130Gyarados.png","131Lapras.png","132Ditto.png","133Eevee.png","134Vaporeon.png","135Jolteon.png","136Flareon.png","137Porygon.png","138Omanyte.png","139Omastar.png","140Kabuto.png","141Kabutops.png","142Aerodactyl.png","143Snorlax.png","144Articuno.png","145Zapdos.png","146Moltres.png","147Dratini.png","148Dragonair.png","149Dragonite.png","150Mewtwo-Mega_X.png","150Mewtwo-Mega_Y.png","150Mewtwo.png","151Mew.png"];
var image_list = {};
// Main engine variables
var current_scene = "OPENWORLD"; // Mainly used for switching the entire content of the screen
var scene_state = "POKEMON_SELECTION"; // Used for updating sub-menus or overlays when a scene is running
var running_interval = null; // The interval running the mainLoop function
// Loading checks / database loading checks
function waitForLoad() {
	// Load all of the images
	var complete_images = 0;
	for (var i = 0; i < image_load_list.length; i++) {
		image_list[image_load_list[i]] = new Image();
		image_list[image_load_list[i]].src = "1st Generation\\" + image_load_list[i];
		image_list[image_load_list[i]].onload = function () {
			complete_images = complete_images + 1;
			if (complete_images == image_load_list.length) {
				image_loading_done = true; // Loading is indicated to be done
			}
		};
	}

	// Load Pokémon data from the server
	$.ajax({
	url: "loadData.php",
	method: "GET",
	dataType: "json",
	success: function (data) {
		allPokemons = data;

		// Initialize player and enemy Pokémon after data is loaded
		initializeGame();
		game_loading_done = true;
	},
	error: function (jqXHR, textStatus, errorThrown) {
		console.error("Failed to load Pokémon data:", textStatus, errorThrown);
	},
	});
}
// NOTE: owwe : Open_World World_Exploration
// NOTE: owps : Open World Pokemon Selection
var owwe_player = null;
var owwe_purple = null;
var owwe_world_objects = null;
var owwe_grass_objects = null;

var owps_background = null;

var owps_bulbasaur = null;
var owps_charmander = null;
var owps_squirtle = null;

var owps_title = null;

var owps_desc_bulbasaur = null;
var owps_desc_charmander = null;
var owps_desc_squirtle = null;

var owps_select_bulbasaur = null;
var owps_select_charmander = null;
var owps_select_squirtle = null;

function startGame() {
	console.log("Game started with the following Pokémon data:", allPokemons); // debug check
	if(loading_done == true) {
		var canvas = document.getElementById("screen");
		canvas.oncontextmenu = function(menu) { menu.preventDefault(); menu.stopPropagation(); }
		
		owps_background = new Rect(1280 * 0.125, 720 * 0.25, 0.75 * 1280, 0.5 * 720);
		owps_background.setColor("grey");

		owps_bulbasaur = new Rect((1280 * 0.125) + 8.4, 720 * 0.25, 300, 300);
		owps_bulbasaur.setImg("009");
		owps_charmander = new Rect((1280 * 0.125) + ((0.75 * 1280) *(1/3)) + 8.4, 720 * 0.25, 300, 300);
		owps_charmander.setImg("004");
		owps_squirtle = new Rect((1280 * 0.125) + ((0.75 * 1280) * (2/3)) + 8.4, 720 * 0.25, 300, 300);
		owps_squirtle.setImg("007");

		owps_title = new Rect((1280 * 0.125), 720 * (1/16), (0.75 * 1280), 720 * (2/16));
		owps_title.setColor("white");
		owps_title.setText("Please Pick A Starting Pokemon!", "32px serif", "black", "center", "center");

		owps_desc_bulbasaur = new Rect((1280 * 0.125), (720 * 0.25) + 300, ((0.75 * 1280) * (1/3)), 60);
		owps_desc_bulbasaur.setColor("green");
		owps_desc_bulbasaur.setText("Bulbasaur Grass Type", "32px serif", "white", "center", "center");
		owps_desc_charmander = new Rect((1280 * 0.125) + ((0.75 * 1280) * (1/3)), (720 * 0.25) + 300, ((0.75 * 1280) *(1/3)), 60);
		owps_desc_charmander.setColor("red");
		owps_desc_charmander.setText("Charmander Fire Type", "32px serif", "white", "center", "center");
		owps_desc_squirtle = new Rect((1280 * 0.125) + ((0.75 * 1280) * (2/3)), (720 * 0.25) + 300, ((0.75 * 1280) * (1/3)), 60);
		owps_desc_squirtle.setColor("blue");
		owps_desc_squirtle.setText("Squirtle Water Type", "32px serif", "white", "center", "center");

		owps_select_bulbasaur = new Rect((1280 * 0.125) + (((0.75 * 1280) * (1/3)) * 0.125), (720 * 0.75) + 30, ((0.75 * 1280) * (1/3)) * 0.75, 60);
		owps_select_bulbasaur.setColor("rgba(0,64,0,1");
		owps_select_bulbasaur.setText("Select", "32px serif", "white", "center", "center");
		owps_select_bulbasaur.addEvent("OPENWORLD", "POKEMON_SELECTION", "click", function(event, rect) { selectStarterPokemon("Balbasaur"); scene_state = "WORLD_EXPLORATION"; });
		owps_select_bulbasaur.addEvent("OPENWORLD", "POKEMON_SELECTION", "hover", function(event, rect) { rect.setColor("rgba(0,96,0,1"); });
		owps_select_bulbasaur.addEvent("OPENWORLD", "POKEMON_SELECTION", "nohover", function(event, rect) { rect.setColor("rgba(0,64,0,1"); });
		owps_select_charmander = new Rect((1280 * 0.125) + ((0.75 * 1280) * (1/3)) + (((0.75 * 1280) * (1/3)) * 0.125), (720 * 0.75) + 30, ((0.75 * 1280) * (1/3)) * 0.75, 60);
		owps_select_charmander.setColor("rgba(127,0,0,1");
		owps_select_charmander.setText("Select", "32px serif", "white", "center", "center");
		owps_select_charmander.addEvent("OPENWORLD", "POKEMON_SELECTION", "click", function(event, rect) { selectStarterPokemon("Charmander"); scene_state = "WORLD_EXPLORATION"; });
		owps_select_charmander.addEvent("OPENWORLD", "POKEMON_SELECTION", "hover", function(event, rect) { rect.setColor("rgba(163,0,0,1"); });
		owps_select_charmander.addEvent("OPENWORLD", "POKEMON_SELECTION", "nohover", function(event, rect) { rect.setColor("rgba(127,0,0,1"); });
		owps_select_squirtle = new Rect((1280 * 0.125) + ((0.75 * 1280) * (2/3)) + (((0.75 * 1280) * (1/3)) * 0.125), (720 * 0.75) + 30, ((0.75 * 1280) * (1/3)) * 0.75, 60);
		owps_select_squirtle.setColor("rgba(0,0,127,1");
		owps_select_squirtle.setText("Select", "32px serif", "white", "center", "center");
		owps_select_squirtle.addEvent("OPENWORLD", "POKEMON_SELECTION", "click", function(event, rect) { selectStarterPokemon("Squirtle"); scene_state = "WORLD_EXPLORATION"; });
		owps_select_squirtle.addEvent("OPENWORLD", "POKEMON_SELECTION", "hover", function(event, rect) { rect.setColor("rgba(0,0,163,1"); });
		owps_select_squirtle.addEvent("OPENWORLD", "POKEMON_SELECTION", "nohover", function(event, rect) { rect.setColor("rgba(0,0,127,1"); });
		
		
		owwe_player = new Rect(40,40,40,40);
		owwe_player.setColor("blue");
		owwe_player.addEventKeyboard("OPENWORLD","WORLD_EXPLORATION", "keydown", 'w', function(event, rect) { rect.setYPos(rect.ypos() - 10); });
		owwe_player.addEventKeyboard("OPENWORLD","WORLD_EXPLORATION", "keydown", "a", function(event, rect) { rect.setXPos(rect.xpos() - 10); });
		owwe_player.addEventKeyboard("OPENWORLD","WORLD_EXPLORATION", "keydown", 's', function(event, rect) { rect.setYPos(rect.ypos() + 10); });
		owwe_player.addEventKeyboard("OPENWORLD","WORLD_EXPLORATION", "keydown", 'd', function(event, rect) { rect.setXPos(rect.xpos() + 10); });
		owwe_player.setCollisions("OPENWORLD", true, "Dynamic");

		owwe_purple = new Rect(256,128,100,64);
		owwe_purple.setColor("rgba(5,0,0,0)");
		
		owwe_world_objects = [];
		owwe_grass_objects = [];
		var str = "\
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm\n\
m    g    g     g              m\n\
m   g   g    g                 m\n\
mmm g  mm g   mm               m\n\
m                              m\n\
m g ggg g g g gg               m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mgg gg gg gg gg g              m\n\
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm\n\
		";
		var temp_x = 0;
		var temp_y = 0;

		for(var i = 0; i < str.length;i++) {
			if(str.charAt(i) === 'm') {
				var temp = new Rect(temp_x, temp_y, 40, 40);
				temp.setColor("grey");
				temp.setCollisions("OPENWORLD", true, "Static");
				temp_x = temp_x + 40;
				owwe_world_objects.push(temp);
			}
			else {
				if(str.charAt(i) === 'g') {
					var temp = new Rect(temp_x, temp_y, 40, 40);
					temp.setColor("rgba(0,127,0,1)");
					temp_x = temp_x + 40;
					owwe_grass_objects.push(temp);
				}
				else {
					if(str.charAt(i) === '\n') {
					temp_x = 0;
					temp_y = temp_y + 40;
					}
					else {
						temp_x = temp_x + 40;
					}
				}
			}
		}
		// Run the main loop function
		running_interval = setInterval(mainLoop, 7); // Note: 7ms ~= 144fps
	}
}
function exitGame() {
	if(loading_done == true) {
		exitLoop();
		// Clean up non-game related resources
	}
}
// Drawing functions / Classes
class CollisionSolver {
	static addRect(scene_name, rect) {
		if(rect.collisionType() == "Static") {
			if(scene_name in CollisionSolver.#static_objects) {
				CollisionSolver.#static_objects[scene_name].push([rect.id().toString(),rect]);
				CollisionSolver.#static_count = CollisionSolver.#static_count + 1;
			}
			else {
				CollisionSolver.#static_objects[scene_name] = [[rect.id().toString(),rect]];
				CollisionSolver.#static_count = CollisionSolver.#static_count + 1;
			}
		}
		else {
			if(rect.collisionType() == "Dynamic") {
				if(scene_name in CollisionSolver.#dynamic_objects) {
					CollisionSolver.#dynamic_objects[scene_name].push([rect.id().toString(),rect]);
					CollisionSolver.#dynamic_count = CollisionSolver.#dynamic_count + 1;
				}
				else {
					CollisionSolver.#dynamic_objects[scene_name] = [[rect.id().toString(),rect]];
					CollisionSolver.#dynamic_count = CollisionSolver.#dynamic_count + 1;
				}
			}
			else {
				console.log("<-- ERROR addRect: " + rect.collisionType() + " not found. -->");
			}
		}
	}
	static removeRect(scene_name, rect) {
		if(rect.collisionType() == "Static") {
			if(scene_name in CollisionSolver.#static_objects) {
				for(var i = 0; i < CollisionSolver.#static_objects[scene_name].length;i++) {
					if(rect.id().toString() == CollisionSolver.#static_objects[scene_name][i][0]) {
						CollisionSolver.#static_objects[scene_name].splice(i, 1);
						break;
					}
				}
				CollisionSolver.#static_count = CollisionSolver.#static_count - 1;
			}
		}
		else {
			if(rect.collisionType() == "Dynamic") {
				if(scene_name in CollisionSolver.#dynamic_objects) {
					for(var i = 0; i < CollisionSolver.#dynamic_objects[scene_name].length;i++) {
						if(rect.id().toString() == CollisionSolver.#dynamic_objects[scene_name][i][0]) {
							CollisionSolver.#dynamic_objects[scene_name].splice(i, 1);
							break;
						}
					}
					CollisionSolver.#dynamic_count = CollisionSolver.#dynamic_count - 1;
				}
			}
			else {
				console.log("<-- ERROR removeRect: " + rect.collisionType() + " not found. -->");
			}
		}
	}
	static resolveCollisions() {
		if(CollisionSolver.#dynamic_count > 0 && CollisionSolver.#static_count > 0) {
			if(current_scene in CollisionSolver.#dynamic_objects) {
				if(current_scene in CollisionSolver.#static_objects) {
					for(let dyn of CollisionSolver.#dynamic_objects[current_scene]) {
						var value_dyn = dyn[1];
						for(let stat of CollisionSolver.#static_objects[current_scene]) {
							var value_stat = stat[1];
							var width_dyn = value_dyn.width();
							var height_dyn = value_dyn.height();
							var posx_dyn = value_dyn.xpos();
							var posy_dyn = value_dyn.ypos();
							
							var points_dyn = [[posx_dyn, posy_dyn],[posx_dyn + width_dyn, posy_dyn],[posx_dyn + width_dyn, posy_dyn + height_dyn],[posx_dyn, posy_dyn + height_dyn]];
							var center_dyn = [posx_dyn + (width_dyn / 2), posy_dyn + (height_dyn / 2)];
							
							var width_stat = value_stat.width();
							var height_stat = value_stat.height();
							var posx_stat = value_stat.xpos();
							var posy_stat = value_stat.ypos();
							
							var points_stat = [[posx_stat, posy_stat],[posx_stat + width_stat, posy_stat],[posx_stat + width_stat, posy_stat + height_stat],[posx_stat, posy_stat + height_stat]];
							// Note: we are breaking after b/c the next conflict will
							// be solved in the next frame
							for(var i = 0; i < points_dyn.length;i++) {
								var line_dyn = [center_dyn, points_dyn[i]];
								for(var j = 0; j < points_stat.length;j++) {
									var edge_stat = [points_stat[j], points_stat[(j + 1) % points_stat.length]];
									
									var d = ((line_dyn[0][0] - line_dyn[1][0])*(edge_stat[0][1] - edge_stat[1][1])) - ((line_dyn[0][1] - line_dyn[1][1])*(edge_stat[0][0] - edge_stat[1][0]));
									
									var t = (((line_dyn[0][0] - edge_stat[0][0])*(edge_stat[0][1] - edge_stat[1][1])) - ((line_dyn[0][1] - edge_stat[0][1])*(edge_stat[0][0] - edge_stat[1][0])))/d;
									
									var u = -(((line_dyn[0][0] - line_dyn[1][0])*(line_dyn[0][1] - edge_stat[0][1])) - ((line_dyn[0][1] - line_dyn[1][1])*(line_dyn[0][0] - edge_stat[0][0])))/d;
									
									if(u >= 0 && u <= 1.0 && t >= 0 && t <= 1.0) {
										if(value_dyn.xpos() < value_stat.xpos()) {
											value_dyn.setXPos(posx_dyn + ((1.0 - t) * (line_dyn[0][0] - line_dyn[1][0])));
										}
										if(value_dyn.xpos() > value_stat.xpos()) {
											value_dyn.setXPos(posx_dyn + ((1.0 - t) * (line_dyn[0][0] - line_dyn[1][0])));
											if(value_dyn.ypos() > value_stat.ypos()) {
												value_dyn.setYPos(posy_dyn + ((1.0 - t) * (line_dyn[0][1] - line_dyn[1][1])));
											}
											if(value_dyn.ypos() < value_stat.ypos()) {
												value_dyn.setYPos(posy_dyn + ((1.0 - t) * (line_dyn[0][1] - line_dyn[1][1])));
											}
											break;
										}
										if(value_dyn.ypos() > value_stat.ypos()) {
											value_dyn.setYPos(posy_dyn + ((1.0 - t) * (line_dyn[0][1] - line_dyn[1][1])));
										}
										if(value_dyn.ypos() < value_stat.ypos()) {
											value_dyn.setYPos(posy_dyn + ((1.0 - t) * (line_dyn[0][1] - line_dyn[1][1])));
											break;
										}
									}
									
								}	
							}
						}
					}
				}
			}
		}
	}
	static testCollisions(rect1, rect2) {
		// AABB - Axis Aligned Bounding Box
		if(rect1.xpos() + rect1.width() >= rect2.xpos() && rect1.xpos() <= rect2.xpos() + rect2.width() &&
				rect1.ypos() + rect1.height() >= rect2.ypos() && rect1.ypos() <= rect2.ypos() + rect2.height()) {
			return true;
		}
		else {
			return false;
		}
	}
	static testInside(rect1, rect2) {
		// AABB - Axis Aligned Bounding Box
		if(rect1.xpos() + rect1.width() > rect2.xpos() && rect1.xpos() < rect2.xpos() + rect2.width() &&
				rect1.ypos() + rect1.height() > rect2.ypos() && rect1.ypos() < rect2.ypos() + rect2.height()) {
			return true;
		}
		else {
			return false;
		}
	}
	static #dynamic_objects = {};
	static #dynamic_count = 0;
	static #static_objects = {};
	static #static_count = 0;
}
class EventHandler {
	static handleKeyDown(event) {
		var index = current_scene + scene_state;
		 if(index in EventHandler.#event_keydown) {
			 if(EventHandler.#event_keydown[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_keydown[index].length;i++) {
					 if(event.keyCode == EventHandler.#event_keydown[index][i][0]) {
						 EventHandler.#event_keydown[index][i][1](event);
					 }
				 }
			 }
		}
	}
	static handleKeyUp(event) {
		var index = current_scene + scene_state;
		if(index in EventHandler.#event_keyup) {
			 if(EventHandler.#event_keyup[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_keyup[index].length;i++) {
					 if(event.keyCode == EventHandler.#event_keyup[index][i][0]) {
						 EventHandler.#event_keyup[index][i][1](event);
					 }
				 }
			 }
		}
	}
	static handleKeyPress(event) {
		var index = current_scene + scene_state;
		if(index in EventHandler.#event_keypress) {
			 if(EventHandler.#event_keypress[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_keypress[index].length;i++) {
					 if(event.keyCode == EventHandler.#event_keypress[index][i][0]) {
						 EventHandler.#event_keypress[index][i][1](event);
					 }
				 }
			 }
		}
	}
	static handleMLeftDown(event) {
		var index = current_scene + scene_state;
		if(index in EventHandler.#event_mouseleftdown) {
			 if(EventHandler.#event_mouseleftdown[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_mouseleftdown[index].length;i++) {
					 EventHandler.#event_mouseleftdown[index][i](event);
				 }
			 }
		}
	}
	static handleClick(event, mouse_x, mouse_y) {
		var index = current_scene + scene_state;
		if(index in EventHandler.#event_click) {
			 if(EventHandler.#event_click[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_click[index].length;i++) {
					 var temp = new Rect(mouse_x, mouse_y, 1, 1);
					 if(CollisionSolver.testCollisions(temp, EventHandler.#event_click[index][i][0])) {
						 EventHandler.#event_click[index][i][1](event);
					 }
				 }
			 }
		}
	}
	static handleMRightDown(event) {
		var index = current_scene + scene_state;
		if(index in EventHandler.#event_mouserightdown) {
			 if(EventHandler.#event_mouserightdown[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_mouserightdown[index].length;i++) {
					 EventHandler.#event_mouserightdown[index][i](event);
				 }
			 }
		}
	}
	static handleMLeftUp(event) {
		var index = current_scene + scene_state;
		if(index in EventHandler.#event_mouseleftup) {
			 if(EventHandler.#event_mouseleftup[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_mouseleftup[index].length;i++) {
					 EventHandler.#event_mouseleftup[index][i](event);
				 }
			 }
		}
	}
	static handleMRightUp(event) {
		var index = current_scene + scene_state;
		if(index in EventHandler.#event_mouserightup) {
			 if(EventHandler.#event_mouserightup[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_mouserightup[index].length;i++) {
					 EventHandler.#event_mouserightup[index][i](event);
				 }
			 }
		}
	}
	static handleMHover(event, mouse_x, mouse_y) {
		var index = current_scene + scene_state;
		if(index in EventHandler.#event_mousehover) {
			 if(EventHandler.#event_mousehover[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_mousehover[index].length;i++) {
					 var temp = new Rect(mouse_x, mouse_y, 1, 1);
					 if(CollisionSolver.testCollisions(temp, EventHandler.#event_mousehover[index][i][0])) {
						 EventHandler.#event_mousehover[index][i][1](event);
					 }
				 }
			 }
		}
		if(index in EventHandler.#event_mousenohover) {
			 if(EventHandler.#event_mousenohover[index] !== undefined) {
				 for(var i = 0; i < EventHandler.#event_mousenohover[index].length;i++) {
					 var temp = new Rect(mouse_x, mouse_y, 1, 1);
					 if(!CollisionSolver.testCollisions(temp, EventHandler.#event_mousenohover[index][i][0])) {
						 EventHandler.#event_mousenohover[index][i][1](event);
					 }
				 }
			 }
		}
	}
	// For keyboard events
	static addEventKeyboard(scene_name, event_type, key, callback) {
		switch(event_type) {
			case "keydown": {
				if(!(scene_name in EventHandler.#event_keydown)) {
					EventHandler.#event_keydown[scene_name] = [[key, callback]];
				}
				else {
					EventHandler.#event_keydown[scene_name].push([key, callback]);
				}
				break;
			}
			case "keyup": {
				if(!(scene_name in EventHandler.#event_keyup)) {
					EventHandler.#event_keyup[scene_name] = [[key, callback]];
				}
				else {
					EventHandler.#event_keyup[scene_name].push([key, callback]);
				}
				break;
			}
			case "keypress": {
				if(!(scene_name in EventHandler.#event_keypress)) {
					EventHandler.#event_keypress[scene_name] = [[key, callback]];
				}
				else {
					EventHandler.#event_keypress[scene_name].push([key, callback]);
				}
				break;
			}
			default: {
				console.log("<-- ERROR addEvent: " + event_type + " not found. -->");
				break;
			}
		}
	}
	// For non-keyboard events
	static addEventMouse(scene_name, event_type, callback) {
		switch(event_type) {
			case "mouseleftdown": {
				if(!(scene_name in EventHandler.#event_mouseleftdown)) {
					EventHandler.#event_mouseleftdown[scene_name] = [callback];
				}
				else {
					EventHandler.#event_mouseleftdown[scene_name].push(callback);
				}
				break;
			}
			case "mouserightdown": {
				if(!(scene_name in EventHandler.#event_mouserightdown)) {
					EventHandler.#event_mouserightdown[scene_name] = [callback];
				}
				else {
					EventHandler.#event_mouserightdown[scene_name].push(callback);
				}
				break;
			}
			case "mouseleftup": {
				if(!(scene_name in EventHandler.#event_mouseleftup)) {
					EventHandler.#event_mouseleftup[scene_name] = [callback];
				}
				else {
					EventHandler.#event_mouseleftup[scene_name].push(callback);
				}
				break;
			}
			case "mouserightup": {
				if(!(scene_name in EventHandler.#event_mouserightup)) {
					EventHandler.#event_mouserightup[scene_name] = [callback];
				}
				else {
					EventHandler.#event_mouserightup[scene_name].push(callback);
				}
				break;
			}
			default: {
				console.log("<-- ERROR addEvent: " + event_type + " not found. -->");
				break;
			}
		}
	}
	// For hover events
	static addEventHover(scene_name, event_type, rect, callback) {
		if(event_type == "hover") {
			if(!(scene_name in EventHandler.#event_mousehover)) {
				EventHandler.#event_mousehover[scene_name] = [[rect, callback]];
			}
			else {
				EventHandler.#event_mousehover[scene_name].push([rect, callback]);
			}
		}
		else {
			if(event_type == "nohover") {
				if(!(scene_name in EventHandler.#event_mousenohover)) {
					EventHandler.#event_mousenohover[scene_name] = [[rect, callback]];
				}
				else {
					EventHandler.#event_mousenohover[scene_name].push([rect, callback]);
				}
			}
			else {
				if(event_type == "click") {
					if(!(scene_name in EventHandler.#event_click)) {
						EventHandler.#event_click[scene_name] = [[rect, callback]];
					}
					else {
						EventHandler.#event_click[scene_name].push([rect, callback]);
					}
				}
				else {
					console.log("<-- ERROR addEvent: " + event_type + " not found. -->");
				}
			}
		}
	}
	// Keyboard Events
	static #event_keydown = {};
	static #event_keyup = {};
	static #event_keypress = {};
	// Mouse Events
	static #event_mouseleftdown = {};
	static #event_mouserightdown = {};
	static #event_mouseleftup = {};
	static #event_mouserightup = {};
	static #event_mousehover = {};
	static #event_mousenohover = {};
	// Object Events
	static #event_click = {};
}
$(document).on("keydown", function(event) {
	EventHandler.handleKeyDown(event);
});
$(document).on("keyup", function(event) {
	EventHandler.handleKeyUp(event);
});
$(document).on("keypress", function(event) {
	EventHandler.handleKeyPress(event);
});
$(document).on("mousedown", function(event) {
	switch(event.which) {
		case 1: {
			EventHandler.handleMLeftDown(event);
			var $canvas = $("#screen");
			EventHandler.handleClick(event, (event.pageX - $canvas.offset().left), (event.pageY - $canvas.offset().top));
			break;
		}
		case 3: {
			EventHandler.handleMRightDown(event);
			break;
		}
		default: {
			break;
		}
	}
});
$(document).on("mouseup", function(event) {
	switch(event.which) {
		case 1: {
			EventHandler.handleMLeftUp(event);
			break;
		}
		case 3: {
			EventHandler.handleMRightUp(event);
			break;
		}
		default: {
			break;
		}
	}
});
$(document).on("mousemove", function(event) {
	if(loading_done == true) {
		var $canvas = $("#screen");
		EventHandler.handleMHover(event, (event.pageX - $canvas.offset().left), (event.pageY - $canvas.offset().top));
	}
});
class Rect {
	// Constructor
	constructor(pos_x, pos_y, width, height) {
		this.#width = width; 
		this.#height = height;
		this.#pos_x = pos_x;	
		this.#pos_y = pos_y;
		this.#offset_x = 0;
		this.#offset_y = 0;	
		this.#color = "rgba(0, 0, 0, 0)";
		this.#img = "";	
		this.#has_collisions = false;
		this.#text = "";
		this.#font = "";
		this.#font_color = "";
		this.#text_alignment_x = "";
		this.#text_alignment_y = "";
		this.#id = Rect.#counter;
		Rect.#counter = Rect.#counter + 1;
	}
	// Getters / Setters Functions
	setWidth(new_width) {
		this.#width = new_width;
	}
	setHeight(new_height) {
		this.#height = new_height;
	}
	setXPos(new_pos_x) {
		this.#pos_x = new_pos_x;
	}
	setYPos(new_pos_y) {
		this.#pos_y = new_pos_y;
	}
	setOffsetX(new_offset_x) {
		this.#offset_x = new_offset_x;
	}
	setOffsetY(new_offset_y) {
		this.#offset_y = new_offset_y;
	}
	setColor(new_color) {
		this.#color = new_color;
	}
	setImg(new_img) {
		// Also accepts by number
		var regex = new RegExp("(^[0-9][0-9]*[0-9]$)|(^[0-9]$)|(^[0-9][0-9]$)|(^[0-9][0-9][0-9]$)");
		if(new_img.search(regex) != -1) {
			var num = Number(new_img).toString();
			if(num.length == 1) {
				regex = new RegExp("00" + num + ".*");
			}
			if(num.length == 2) {
				regex = new RegExp("0" + num + ".*");
			}
			if(num.length >= 3) {
				regex = new RegExp(num + ".*");
			}
			for(var i = 0; i < image_load_list.length;i++) {
				if(image_load_list[i].search(regex) != -1) {
					this.#img = image_load_list[i];
					return;
				}
			}
			console.log("<-- ERROR " + this + " setImg " + "ID not found: ID: " + num + " -->");
		}
		else {
			if(image_load_list.includes(new_img)) {
				this.#img = new_img;
			}
			else {
				console.log("<-- ERROR Image: " + new_img + " not found. -->")
			}
		}
	}
	setCollisions(scene_name, new_value) {
		this.#has_collisions = new_value;
		this.#collision_type = "Static";
		if(this.#has_collisions == true) {
			CollisionSolver.addRect(scene_name, this);
		}
		else {
			CollisionSolver.removeRect(scene_name, this);
		}
	}
	setCollisions(scene_name, new_value, type) {
		this.#has_collisions = new_value;
		this.#collision_type = type;
		if(this.#has_collisions == true) {
			
			CollisionSolver.addRect(scene_name, this);
		}
		else {
			CollisionSolver.removeRect(scene_name, this);
		}
	}
	addEventKeyboard(scene_name, state_name, event_type, key, callback) {
		var number = null;
		if(isNaN(key)) {
			key = ("" + key).toUpperCase();
			number = key.charCodeAt(0);
		}
		else {
			number = Number(key);
		}
		EventHandler.addEventKeyboard(scene_name + state_name, event_type, number, function(event) { callback(event, this); }.bind(this));
	}
	addEvent(scene_name, state_name, event_type, callback) {
		if(event_type == "hover" || event_type == "nohover" || event_type == "click") {
			EventHandler.addEventHover(scene_name + state_name, event_type, this, function(event) { callback(event, this); }.bind(this));
		}
		else {
			EventHandler.addEventMouse(scene_name + state_name, event_type, function(event) { callback(event, this); }.bind(this));
		}
	}
	setText(new_text, font_info, font_color, align_x, align_y) {
		this.#text = new_text;
		this.#font = font_info;
		this.#font_color = font_color;
		this.#text_alignment_x = align_x;
		this.#text_alignment_y = align_y;
	}
	width() {
		return Object.freeze(this.#width);
	}
	height() {
		return Object.freeze(this.#height);
	}
	xpos() {
		return Object.freeze(this.#pos_x);
	}
	ypos() {
		return Object.freeze(this.#pos_y);
	}
	offsetx() {
		return Object.freeze(this.#offset_x);
	}
	offsety() {
		return Object.freeze(this.#offset_y);
	}
	color() {
		return Object.freeze(this.#color);
	}
	img() {
		return Object.freeze(this.#img);
	}
	hasCollisions() {
		return Object.freeze(this.#has_collisions);
	}
	text() {
		return Object.freeze(this.#text);
	}
	collisionType() {
		return Object.freeze(this.#collision_type);
	}
	id() {
		return Object.freeze(this.#id);
	}
	// General functions
	// Draws the rectangle to the screen
	draw() {
		var canvas = document.getElementById("screen");
		var draw_context = canvas.getContext("2d");
		if(this.#img != "") {
			draw_context.drawImage(image_list[this.#img], 0, 0, image_list[this.#img].width, image_list[this.#img].height, this.#pos_x + this.#offset_x, this.#pos_y + this.#offset_y, this.#width, this.#height);
			if(this.#text != "") {
				draw_context.fillStyle = this.#font_color;
				draw_context.font = this.#font;
				
				var text_width = 0;
				
				if(this.#width < draw_context.measureText(this.#text).width) {
					text_width = this.#width;
				}
				else {
					text_width = draw_context.measureText(this.#text).width;
				}
				if(this.#text_alignment_y == "bottom") {
					switch(this.#text_alignment_x) {
						case "left": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x, this.#pos_y + this.#height + this.#offset_y, text_width);
							break;
						}
						case "right": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x + (this.#width - text_width), this.#pos_y + this.#height + this.#offset_y, text_width);
							break;
						}
						case "center": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x + ((this.#width - text_width) / 2), this.#pos_y + this.#height + this.#offset_y, text_width);
							break;
						}
						default: {
							console.log("<-- ERROR text_alignment_x: " + this.#text_alignment_x + " not found. -->")
							break;
						}
					}
				}
				else {
					var index = this.#font.indexOf("px");
					var str = this.#font.substr(0, index);
					var size_num = Number(str);
					switch(this.#text_alignment_x) {
						case "left": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x, this.#pos_y + (this.#height / 2.0) + (size_num / 2.75) + this.#offset_y, text_width);
							break;
						}
						case "right": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x + (this.#width - text_width), this.#pos_y + (this.#height / 2.0) + (size_num / 2.75) + this.#offset_y, text_width);
							break;
						}
						case "center": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x + ((this.#width - text_width) / 2), this.#pos_y + (this.#height / 2.0) + (size_num / 2.75) + this.#offset_y, text_width);
							break;
						}
						default: {
							console.log("<-- ERROR text_alignment_x: " + this.#text_alignment_x + " not found. -->")
							break;
						}
					}
				}
			}
		}
		else {
			draw_context.fillStyle = this.#color;
			draw_context.fillRect(this.#pos_x + this.#offset_x, this.#pos_y + this.#offset_y, this.#width, this.#height);
			if(this.#text != "") {
				draw_context.fillStyle = this.#font_color;
				draw_context.font = this.#font;
				
				var text_width = 0;
				
				if(this.#width < draw_context.measureText(this.#text).width) {
					text_width = this.#width;
				}
				else {
					text_width = draw_context.measureText(this.#text).width;
				}
				if(this.#text_alignment_y == "bottom") {
					switch(this.#text_alignment_x) {
						case "left": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x, this.#pos_y + this.#height + this.#offset_y, text_width);
							break;
						}
						case "right": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x + (this.#width - text_width), this.#pos_y + this.#height + this.#offset_y, text_width);
							break;
						}
						case "center": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x + ((this.#width - text_width) / 2), this.#pos_y + this.#height + this.#offset_y, text_width);
							break;
						}
						default: {
							console.log("<-- ERROR text_alignment_x: " + this.#text_alignment_x + " not found. -->")
							break;
						}
					}
				}
				else {
					var index = this.#font.indexOf("px");
					var str = this.#font.substr(0, index);
					var size_num = Number(str);
					switch(this.#text_alignment_x) {
						case "left": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x, this.#pos_y + (this.#height / 2.0) + (size_num / 2.75) + this.#offset_y, text_width);
							break;
						}
						case "right": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x + (this.#width - text_width), this.#pos_y + (this.#height / 2.0) + (size_num / 2.75) + this.#offset_y, text_width);
							break;
						}
						case "center": {
							draw_context.fillText(this.#text, this.#pos_x + this.#offset_x + ((this.#width - text_width) / 2), this.#pos_y + (this.#height / 2.0) + (size_num / 2.75) + this.#offset_y, text_width);
							break;
						}
						default: {
							console.log("<-- ERROR text_alignment_x: " + this.#text_alignment_x + " not found. -->")
							break;
						}
					}
				}
			}
		}
	}
	// Variables
	#width = 0; 					// Width of the rect
	#height = 0;					// Height of the rect
	#pos_x = 0;						// Absolute x position of the rect
	#pos_y = 0;						// Absolute y position of the rect
	#offset_x = 0;					// An offset to the x position of the rect (should be used for effects)
	#offset_y = 0;					// An offset to the y position of the rect (should be used for effects)
	#color = "rgba(0, 0, 0, 0)";	// The color of the rect, note: If there is an image the image will be colored
	#img = "";						// A possible image to be used when rendering
	#text = "";						// Text to be rendered inside the rect
	#font = "";						// Font info for the text
	#font_color = "";				// Color of the text
	#text_alignment_x = "";			// Center or Left or Right
	#text_alignment_y = "";			// Either bottom or center, top is not supported by text standards
	// Events
	
	// Collisions
	#has_collisions = false;
	#collision_type = "";
	// ID
	#id = 0;
	static #counter = 0;
}

function clearScreen() {
	var canvas = document.getElementById("screen");
	var draw_context = canvas.getContext("2d");
	draw_context.clearRect(0, 0, canvas.width, canvas.height);
}
function handleAttack() {
	console.log("Attack selected");
	var num = playerPokemon.hp;
	enemyPokemon.hp -= num;
	console.log(playerPokemon.hp);
	console.log(enemyPokemon.hp);
}

function handleDefend() {
	console.log("Defend selected");
	// Implement your defend logic here
}

function handleRun() {
	current_scene = "OPENWORLD";
	console.log("Run selected");
	
}
function handleItem() {
	console.log("Item selected");
}
// Runs the main game and handles scene switching
function mainLoop() {
	// Handle any collisions from the last frame
	CollisionSolver.resolveCollisions();
	// Clear the last frame
	clearScreen();
	// Render the current scene
	switch(current_scene) {
		case "OPENWORLD": {
			switch(scene_state) {
				case "POKEMON_SELECTION": {
					var canvas = document.getElementById("screen");
					canvas.style.background = "black";
					owps_title.draw();
					owps_background.draw();
					owps_bulbasaur.draw();
					owps_charmander.draw();
					owps_squirtle.draw();
					owps_desc_bulbasaur.draw();
					owps_desc_charmander.draw();
					owps_desc_squirtle.draw();
					owps_select_bulbasaur.draw();
					owps_select_charmander.draw();
					owps_select_squirtle.draw();
					break;
				}
				case "WORLD_EXPLORATION": {
					var canvas = document.getElementById("screen");
					canvas.style.background = "white";
					for(var i = 0; i < owwe_world_objects.length;i++) {
						owwe_world_objects[i].draw();
					}
					for(var i = 0; i < owwe_grass_objects.length;i++) {
						owwe_grass_objects[i].draw();
						
						if(CollisionSolver.testInside(owwe_player, owwe_grass_objects[i]) == true) {
							if(Math.random() > 0.99) {
								current_scene = "BATTLE";
							}
						}
					}
					document.getElementById('fightMenu').style.display = 'none';

					owwe_player.draw();
					break;
				}
			}
			break;
		}
		case "BATTLE": {
			purple.draw();
			player.draw();
			document.getElementById('fightMenu').style.display = 'flex';
			break;
		}
		default: {
			// !TODO implement exit
			exitLoop();
			break;
		}
	}
}
// Exits the applictaion and cleans up used resources
function exitLoop() {
	clearInterval(running_interval);
	// !TODO clean up resources
}