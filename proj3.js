// Project 3 CMSC 433: Created By: Darrian Corkadel, <List names here>
//menu handling
$(document).ready(function() {
	var MenuMusic = document.getElementById('MenuMusic');
	var SoundSettings = $('#SoundSettings');
    var volumeControl = $('#volumeControl');
	var MenuOptionButton = $('#MenuOptionButton');
	

    $('#PlayButton').click(function() {
        $('#menu').remove(); 
        $('#screen').show();
		MenuOptionButton.show();
        startGame();         
    });

	$('#SoundSettingsButton').click(function() {
        SoundSettings.show();
    });

    $('#CloseSound').click(function() {
        SoundSettings.hide();
    });

	$('#QuitButton').click(function() {
        $('#menu').remove(); 
		$('#screen').show();//just having it do this for now until i figure where to send quit to
        startGame(); //just having it do this for now until i figure where to send quit to
        alert('Quitting the game.'); 
		MenuMusic.pause();
        //window.location.href = //idk where to send it >:|
    });
	
    volumeControl.on('input', function() {
        MenuMusic.volume = this.value / 100;
    });

});	
// Image variables
var image_load_list=["004Charmander.png","005Charmeleon.png","006Charizard.png","007Squirtle.png","008Wartortle.png","009Blastoise.png","010Caterpie.png","011Metapod.png","012Butterfree.png","013Weedle.png","014Kakuna.png","015Beedrill.png","016Pidgey.png","017Pidgeotto.png","018Pidgeot.png","019Rattata.png","021Spearow.png","022Fearow.png","023Ekans.png","024Arbok.png","025Pikachu.png","026Raichu.png","027Sandshrew.png","028Sandslash.png","029Nidoran.png","030Nidorina.png","031Nidoqueen.png","032Nidoran.png","033Nidorino.png","034Nidoking.png","035Clefairy.png","036Clefable.png","037Vulpix.png","038Ninetales.png","039Jigglypuff.png","040Wigglytuff.png","041Zubat.png","042Golbat.png","043Oddish.png","044Gloom.png","045Vileplume.png","046Paras.png","047Parasect.png","048Venonat.png","049Venomoth.png","050Diglett.png","051Dugtrio.png","052Meowth.png","053Persian.png","054Psyduck.png","055Golduck.png","056Mankey.png","057Primeape.png","058Growlithe.png","059Arcanine.png","060Poliwag.png","061Poliwhirl.png","062Poliwrath.png","063Abra.png","064Kadabra.png","065Alakazam.png","066Machop.png","067Machoke.png","068Machamp.png","069Bellsprout.png","070Weepinbell.png","071Victreebel.png","072Tentacool.png","073Tentacruel.png","074Geodude.png","075Graveler.png","076Golem.png","077Ponyta.png","078Rapidash.png","079Slowpoke.png","080Slowbro.png","081Magnemite.png","082Magneton.png","083Farfetch'd.png","084Doduo.png","085Dodrio.png","086Seel.png","087Dewgong.png","088Grimer.png","089Muk.png","090Shellder.png","091Cloyster.png","092Gastly.png","093Haunter.png","094Gengar.png","095Onix.png","096Drowzee.png","097Hypno.png","098Krabby.png","099Kingler.png","100Voltorb.png","101Electrode.png","102Exeggcute.png","103Exeggutor.png","104Cubone.png","105Marowak.png","106Hitmonlee.png","107Hitmonchan.png","108Lickitung.png","109Koffing.png","110Weezing.png","111Rhyhorn.png","112Rhydon.png","113Chansey.png","114Tangela.png","115Kangaskhan.png","116Horsea.png","117Seadra.png","118Goldeen.png","119Seaking.png","120Staryu.png","121Starmie.png","122Mr._Mime.png","123Scyther.png","124Jynx.png","125Electabuzz.png","126Magmar.png","127Pinsir.png","128Tauros.png","129Magikarp.png","130Gyarados.png","131Lapras.png","132Ditto.png","133Eevee.png","134Vaporeon.png","135Jolteon.png","136Flareon.png","137Porygon.png","138Omanyte.png","139Omastar.png","140Kabuto.png","141Kabutops.png","142Aerodactyl.png","143Snorlax.png","144Articuno.png","145Zapdos.png","146Moltres.png","147Dratini.png","148Dragonair.png","149Dragonite.png","150Mewtwo-Mega_X.png","150Mewtwo-Mega_Y.png","150Mewtwo.png","151Mew.png"];
var image_list={};
// Main engine variables
var current_scene="TEST"; // Mainly used for switching the entire content of the screen
var scene_state=null; // Used for updating sub-menus or overlays when a scene is running
var running_interval=null; // The interval running the mainLoop function
// Loading checks / database loading checks
function waitForLoad() {
	// Load all of the images
	var complete_images = 0;
	for(var i = 0; i < image_load_list.length;i++) {
		image_list[image_load_list[i]] = new Image();
		image_list[image_load_list[i]].src = "1st Generation\\" + image_load_list[i];
		image_list[image_load_list[i]].onload = (function() {
			complete_images = complete_images + 1;
			if(complete_images == image_load_list.length) {
				// Run the main loop function
				running_interval = setInterval(mainLoop, 7); // Note: 7ms ~= 144fps
			}
		});
	}
	// Check if the database has been loaded and load
	// values into the correct structures
	// !TODO Database stuff
}
// First load the resources
waitForLoad();
// Drawing functions / Classes
class CollisionSolver {
	static addRect(rect) {
		if(rect.collisionType() == "Static") {
			CollisionSolver.#static_objects[rect.id().toString()] = rect;
			CollisionSolver.#static_count = CollisionSolver.#static_count + 1;
		}
		else {
			if(rect.collisionType() == "Dynamic") {
				CollisionSolver.#dynamic_objects[rect.id().toString()] = rect;
				CollisionSolver.#dynamic_count = CollisionSolver.#dynamic_count + 1;
			}
			else {
				console.log("<-- ERROR addRect: " + rect.collisionType() + " not found. -->");
			}
		}
	}
	static removeRect(rect) {
		if(rect.collisionType() == "Static") {
			CollisionSolver.#static_objects.delete(rect.id().toString());
			CollisionSolver.#static_count = CollisionSolver.#static_count - 1;
		}
		else {
			if(rect.collisionType() == "Dynamic") {
				CollisionSolver.#dynamic_objects.delete(rect.id().toString());
				CollisionSolver.#dynamic_count = CollisionSolver.#dynamic_count - 1;
			}
			else {
				console.log("<-- ERROR removeRect: " + rect.collisionType() + " not found. -->");
			}
		}
	}
	static resolveCollisions() {
		if(CollisionSolver.#dynamic_count > 0 && CollisionSolver.#static_count > 0) {
			for(let [key_dyn, value_dyn] of Object.entries(CollisionSolver.#dynamic_objects)) {
				for(let [key_stat, value_stat] of Object.entries(CollisionSolver.#static_objects)) {
					var width_dyn = value_dyn.width();
					var height_dyn = value_dyn.height();
					var posx_dyn = value_dyn.xpos();
					var posy_dyn = value_dyn.ypos();
					
					var width_stat = value_stat.width();
					var height_stat = value_stat.height();
					var posx_stat = value_stat.xpos();
					var posy_stat = value_stat.ypos();
					// Note: we are breaking after b/c the next conflict will
					// be solved in the next frame
					// Left
					var left = posx_dyn + width_dyn > posx_stat && posx_dyn < posx_stat;
					var right = posx_dyn < posx_stat + width_stat && posx_dyn > posx_stat;
					var height1 = posy_dyn + height_dyn > posy_stat && posy_dyn < posy_stat + height_stat;
					if(left && height1) {
						value_dyn.setXPos(posx_stat - width_dyn);
						break;
					}
					// Right
					if(right && height1) {
						value_dyn.setXPos(posx_stat + width_stat);
						break;
					}
					// Top
					if(posy_dyn + height_dyn > posy_stat && posy_dyn < posy_stat && (left || right)) {
						value_dyn.setYPos(posy_stat - height_dyn);
						console.log("runs1");
						break;
					}
					// Bottom
					if(posy_dyn > posy_stat + height_stat && posy_dyn > posy_stat  && (left || right)) {
						value_dyn.setYPos(posy_stat + height_stat);
						console.log("runs4");
						break;
					}
				}
			}
		}
	}
	static #dynamic_objects = {};
	static #dynamic_count = 0;
	static #static_objects = {};
	static #static_count = 0;
}
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
		this.#id = Rect.#counter;
		Rect.#counter = Rect.#counter + 1;
	}
	// Getters / Setters Functions
	setWidth(new_width) {
		this.#width = new_width;
	}
	setheight(new_height) {
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
	setCollisions(new_value) {
		this.#has_collisions = new_value;
		this.#collision_type = "Static";
		if(this.#has_collisions == true) {
			CollisionSolver.addRect(this);
		}
		else {
			CollisionSolver.removeRect(this);
		}
	}
	setCollisions(new_value, type) {
		this.#has_collisions = new_value;
		this.#collision_type = type;
		if(this.#has_collisions == true) {
			
			CollisionSolver.addRect(this);
		}
		else {
			CollisionSolver.removeRect(this);
		}
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
		}
		else {
			draw_context.fillStyle = this.#color;
			draw_context.fillRect(this.#pos_x + this.#offset_x, this.#pos_y + this.#offset_y, this.#width, this.#height);
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
var square1 = new Rect(0, 0, 50, 50);
square1.setImg("4");
var square2 = new Rect(500, 500, 50, 50);
square2.setColor("green");
// Runs the main game and handles scene switching
function mainLoop() {
	// Handle any collisions from the last frame
	CollisionSolver.resolveCollisions();
	// Clear the last frame
	clearScreen();
	// Render the current scene
	switch(current_scene) {
		case "TEST": {
			square2.draw();
			square1.draw();
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
$(document).on("keydown", function(event) {
	// W or ArrowUp
	if (event.keyCode == 87 || event.keyCode == 38) {
		square1.setYPos(square1.ypos() - 10); 
	}
	// A or ArrowLeft
	if (event.keyCode == 65 || event.keyCode == 37) {
		square1.setXPos(square1.xpos() - 10); 
	}
	// S or ArrowDown
	if (event.keyCode == 83 || event.keyCode == 40) {
		square1.setYPos(square1.ypos() + 10); 
	}
	// D or ArrowRight
	if (event.keyCode == 68 || event.keyCode == 39) {
		square1.setXPos(square1.xpos() + 10); 
	}
});