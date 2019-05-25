var startCoordX = 490;
var startCoordY = 100;
var radius = 40;

var xWidth = screen.width;

var totalHorseArray = [["Rick Sanchez", 0], ["Morty Smith", 0], ["Lil Peep (RIP)", 0], ["Noob-Noob", 0], ["Steve Jobs", 0], ["Bartier Cardi", 0], ["Katy Perry", 0], ["Ali Madad", 0], ["Kanye West", 20], ["Lil Uzi Vert", 0], ["A$AP Ferg", 0], ["Bobby Shmurda", 0], ["21 Savage", 0], ["Salman Shahid", 0], ["Kristina Miakisheva", 0], ["DLau", 0], ["Lil Yachty", 0], ["Papa Franku", 20], ["Raaed Qureshi", 20], ["Profit Prophet", 1]];
var numHorses = 8;
var horseArray = assignSpeeds();

var token;
var playerDetails = new Array(1000);

var totalPlayers = 0;
var player = 0;
var text = "";
var j;
var change = 0;
var winner = -1;

var first = "";
var last = "";
var wallet = 0;
var count = 0;
var value = 0;

horsesInRaceUpdate();

function assignSpeeds(){
	var horseArray = new Array(numHorses);
	var repeat = false;

	for (var a = 0; a < numHorses; a++) {
		horseArray[a] = new Array(6);
		var horse = Math.floor((Math.random() * totalHorseArray.length));
		repeat = alreadyInRace(horse, horseArray, a);
		while (repeat) { // prevents repetition of horse
			horse = Math.floor((Math.random() * totalHorseArray.length));
			repeat = alreadyInRace(horse, horseArray, a);
		}
		horseArray[a][0] = totalHorseArray[horse][0]; //horseIndex
		horseArray[a][4] = horse;

		if (totalHorseArray[horse][1] === 0){ // odds
			horseArray[a][1] = randAmount(16) + 1; 

		} else {
			horseArray[a][1] = totalHorseArray[horse][1];
		}
		horseArray[a][2] = "1/" + horseArray[a][1]; // odds in text 
		horseArray[a][3] = calculator(2, horseArray[a][1]); // $2 payoff
		horseArray[a][5] = (randAmount(horseArray[a][1]) + 1)/3;

		if (horseArray[a][5] < 1){
			horseArray[a][5] *= 10;
		} else if (horseArray[a][5] < 3) {
			horseArray[a][5] *= 5;
		}

		horseArray[a][6] = 0;
	}

	return horseArray;
}

function alreadyInRace(horse, horseArray, a){
	for (var b = 0; b < a; b++) {
		if (horseArray[b][4] === horse) {
			return true;
		}
	}
	return false;
}

function distributeHorses(){
	var textID;

	for (var a = 0; a < numHorses; a++){
		textID = "animate" + a;
		var elem = document.getElementById(textID);
		elem.style.top = a * 78 + 'px'; 
	}

	for (a = numHorses; a < numHorses; a++){
		textID = '#animate' + a;
		$(textID).hide();
	}
}

function containerOne(){
	$('#containerThree').hide();
	$('#containerOne').show()
	$('#playerContainer').show();
	$('#betContainer').hide();
	$('#gameContainer').hide();
}

function containerTwo(j){
	$('#playerContainer').hide();
	$('#containerTwo').show();
	$('#containerOne').hide();
	$('#containerThree').hide();
	$('#betContainer').show();
	player = j;
	betTableUpdate();
	change = 0;
	$('#gameContainer').hide();
}

function containerThree(){
	$('#containerOne').hide();
	$('#containerThree').show();
	$(".horse").animateSprite('stop');
	distributeHorses();
	listUpdate();
	$('#playerContainer').hide();
	$('#betContainer').hide();
	$('#gameContainer').show();
}

function calculator(amount, odds){
	return Math.round(amount) + (Math.round(amount * (1/odds * 100)) / 100);
}

function validateFirst(string){
	alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	valid = true;

	for (var a = 0; a < string.length; a++){
		if (alpha.indexOf(string.substring(a, a+1)) < 0) {
			valid = false;
		}
	}

	if (string.length === 0){
		valid = false;
	}

	while (valid === false){
		valid = true;

		string = prompt("Please enter only alphabetical characters and of a length of at least 1.", "E.g. Smith");
		
		while (string === null){
			string = prompt("Please enter only alphabetical characters and of a length of at least 1.", "E.g. Smith");
		}

		string = validateFirst(string);
	}

	return string;
}

function validateLast(string){
	alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	valid = true;

	for (a = 0; a < string.length; a++){
		if (alpha.indexOf(string.substring(a, a+1)) < 0) {
			valid = false;
		}
	}

	if (string.length === 0){
		valid = false;
	}

	while (valid === false){
		valid = true;

		string = prompt("Please enter only alphabetical characters and of a length of at least 1.", "E.g. Smith");
		
		while (string === null){
			string = prompt("Please enter only alphabetical characters and of a length of at least 1.", "E.g. Smith");
		}
		string = validateLast(string);
	}
	return string;
}

function numValidate(number){
	nums = "0123456789.";
	valid = true;
	count = 0;

	for (a = 0; a < number.length; a++){
		if (nums.indexOf(number.substring(a, a+1)) < 0) {
			valid = false;
		}

		if(number.substring(a, a+1) === "."){
	        count++;
	    } 
	}

	if (number.length === 0){
		valid = false;
	}

	if (count > 1){
		valid = false;
	}


	while (valid === false){
		valid = true;
		count = 0;

		number = prompt("Please enter only numerical characters.", "E.g. 5000");
		
		while (number === null){
			number = prompt("Please enter only numerical characters.", "E.g. 5000");
		}
		number = numValidate(number);
	}

	return number;
}

function addUser(){
	first = prompt("Please enter your first name.", "E.g. John");
	if (!(first === null)){
		first = validateFirst(first);
		last = prompt("Please enter your last name.", "E.g. Smith");

		if (last !== null && first !== null){
			last = validateLast(last);
			wallet = prompt("Please enter your wallet size (a number without any commas).", "E.g. 5000");
			
			if (!(wallet === null || last === null || first === null)){
				wallet = numValidate(wallet);

				playerDetails[totalPlayers] = new Array(7);
				playerDetails[totalPlayers][0] = first
				playerDetails[totalPlayers][1] = last
				playerDetails[totalPlayers][2] = wallet;
				playerDetails[totalPlayers][3] = 0; // bet amount
				playerDetails[totalPlayers][4] = -1; // horse index
				playerDetails[totalPlayers][5] = 0; // return on investment (used to calculate winner)
				playerDetails[totalPlayers][6] = wallet; // initial wallet amount (used to calculate ROI)
				totalPlayers++;
				$("#playerTable").show();
				$("#betTable").show();
				$("#horsetable").show();
				tableUpdate();
				betTableUpdate();
				horseTableUpdate();
			}
		}
	}
}

function horsesInRaceUpdate(){
	$("#horsesInRace tbody tr").remove();
	for (var horse = 0; horse < numHorses; horse++){
		var mixed = document.getElementById('horsesInRace');
		var tbody = document.createElement("tbody");
		var tr = document.createElement("tr");
				                  
		var td = document.createElement("td");
		var txt = document.createTextNode(horseArray[horse][0]);
		td.appendChild(txt);
		tr.appendChild(td);

		td = document.createElement("td");
		txt = document.createTextNode(horseArray[horse][2]);
		td.appendChild(txt);
		tr.appendChild(td);

		td = document.createElement("td");
		txt = document.createTextNode(horseArray[horse][3]);
		td.appendChild(txt);
		tr.appendChild(td);

		var td = document.createElement("td");
		var button = document.createElement("BUTTON");
		var txt = document.createTextNode("See Payoff on Certain Amount");
		button.setAttribute("onclick", 'var amount = prompt("Please enter any amount to see how much the payoff would be.", "E.g. 500"); if(amount !== null){alert("The payoff would be " + formatMoney(1*calculator(amount, ' + horseArray[horse][1] + ')) + ".");}');
		button.appendChild(txt);
		td.append(button);
		tr.appendChild(td);

		tbody.appendChild(tr);
		mixed.appendChild(tbody);
	}
}

function formatMoney(n){
	return "$" + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function horseTableUpdate(){
	$("#horseTable tbody tr").remove();

	for (j = 0; j < totalPlayers; j++){
		var mixed = document.getElementById('horseTable');
		var tbody = document.createElement("tbody");
		var tr = document.createElement("tr");

		var td = document.createElement("td");
		var txt = document.createTextNode(playerDetails[j][0] + " " + playerDetails[j][1]);
		td.appendChild(txt);
		tr.appendChild(td);

		var td = document.createElement("td");
		var txt = document.createTextNode(formatMoney((playerDetails[j][2])*1));
		td.appendChild(txt);
		tr.appendChild(td);

		if (playerDetails[j][4] > -1){
			var td = document.createElement("td");
			var txt = document.createTextNode(formatMoney((playerDetails[j][3])*1) + " on " + horseArray[playerDetails[j][4]][0]);
			td.appendChild(txt);
			tr.appendChild(td);

		} else {
			var td = document.createElement("td");
			var button = document.createElement("BUTTON");
			var txt = document.createTextNode("CLICK HERE TO PLACE A BET");
			button.setAttribute("style", "font-weight: bold;")
			button.setAttribute("id", "horseAmountButton");
			button.setAttribute("onclick", 'containerTwo(' + j + ');');
			button.appendChild(txt);
			td.append(button);
			tr.appendChild(td);
		}

	  	var td = document.createElement("td");
		var txt = document.createTextNode(playerDetails[j][5] + "%");
		td.appendChild(txt);
		tr.appendChild(td);

		tbody.appendChild(tr);	
		mixed.appendChild(tbody);
	}
}

function listUpdate(){
	$('#character').find('option').remove().end();
	$('#character').selectmenu('destroy').selectmenu({ style: 'dropdown' });
	$('#character').append($('<option>', {
		value: -1,
	    text: "SELECT A HORSE"
	}));
	$('#character').val('-1');
	$("#character").selectmenu("refresh");
	for (j = 0; j < numHorses; j++){
	$('#character').append($('<option>', {
			value: j,
		    text: horseArray[j][0]
		}));
	}
	$("#character").selectmenu("refresh");
}

function tableUpdate(){
	$("#targettable tbody tr").remove();

	for (j = 0; j < totalPlayers; j++){
		var mixed = document.getElementById('targettable');
		var tbody = document.createElement("tbody");
		var tr = document.createElement("tr");
				                  
		var td = document.createElement("td");
		var txt = document.createTextNode(playerDetails[j][0]);
		td.appendChild(txt);
		tr.appendChild(td);

		td = document.createElement("td");
		txt = document.createTextNode(playerDetails[j][1]);
		td.appendChild(txt);
		tr.appendChild(td);

		td = document.createElement("td");
		txt = document.createTextNode(formatMoney((playerDetails[j][2])*1));
		td.appendChild(txt);
		tr.appendChild(td);

		tbody.appendChild(tr);
		mixed.appendChild(tbody);
	}
}

function betTableUpdate(){
	$("#bettable tbody tr").remove();

	for (j = 0; j < totalPlayers; j++){
		var table = document.getElementById('bettable');
		var tableBody = document.createElement("tbody");
		var tableRow = document.createElement("tr");
				                  
		var td = document.createElement("td");
		if (j === player){
			td.setAttribute("style", "font-weight: bold;")
		}
		var text = document.createTextNode(playerDetails[j][0] + " " + playerDetails[j][1]);
		td.appendChild(text);
		tableRow.appendChild(td);

		td = document.createElement("td");
		if (j === player){
			td.setAttribute("style", "font-weight: bold;")
		}
		text = document.createTextNode(formatMoney((playerDetails[j][2])*1));
		td.appendChild(text);
		tableRow.appendChild(td);

		td = document.createElement("td");
		if (j === player){
			td.setAttribute("style", "font-weight: bold;")
		}
		text = document.createTextNode(formatMoney((playerDetails[j][3])*1));
		td.appendChild(text);
		tableRow.appendChild(td);

		tableBody.appendChild(tableRow);
		table.appendChild(tableBody);
	}
}


function getTextWidth(txt) {
  var $elm = $('<span class="tempforSize">'+txt+'</span>').prependTo("body");
  var elmWidth = $elm.width();
  $elm.remove();
  return elmWidth;
}

function centerSelect($elm) {
    var optionWidth = getTextWidth($elm.children(":selected").html());
    var emptySpace = $elm.width() - optionWidth;
    $elm.css("text-indent", (emptySpace/2) - 10);
}

$( function() {
	$("#containerThree").hide();
	$("#playerTable").hide();
	$("#betTable").hide();
	$("#horsetable").hide();
	$("#betContainer").hide();
    $("#gameContainer").hide();

    $( "#draggable1" ).draggable({ revert: "valid" });
    $( "#draggable10" ).draggable({ revert: "valid" });
    $( "#draggable50" ).draggable({ revert: "valid" });
    $( "#draggable100" ).draggable({ revert: "valid" });
    $( "#draggablex" ).draggable({ revert: "valid" });

    $(".horse").animateSprite({
    fps: 12,
    animations: {
        walkRight: [0, 1, 2, 3],
        walkLeft: [4, 5, 6, 7]
    },
    loop: true,
    complete: function(){
        // use complete only when you set animations with 'loop: false'
        alert("animation End");
    }
	});

    $( "#character" ).selectmenu();
    $( "#character" ).on( "selectmenuchange", function( event, ui ) {
    	if (change < 1 ){
    		playerDetails[player][4] = $('#character').find(":selected").val();
    		if (playerDetails[player][4] !== -1) {
    			change++;
    		} else {
    			alert("Please select a horse.")
    		}
    	} else {
    		if (playerDetails[player][3] !== 0) {
    			alert("You can only bet on one horse at a time.");
    			$('#character').val(playerDetails[player][4]);
				$("#character").selectmenu("refresh");
			}
    	}
    });

    $( "#droppable" ).droppable({
	    classes: {
	        "ui-droppable-active": "ui-state-active",
	        "ui-droppable-hover": "ui-state-hover"
	      },
	      drop: function( event, ui ) {
	      	token = $(ui.draggable).attr('id');

	      	if (playerDetails[player][4] < 0){
				alert("Please select a horse first.");
			} else {
	      	if (token === "draggable1"){
	      		countMoney(player, 1);

	          } else if (token === "draggable10") {
	          	countMoney(player, 10);
	          	
	          } else if (token === "draggable50") {
	          	countMoney(player, 50);
	          	
	          } else if (token === "draggable100") {
	          	countMoney(player, 100);

	          } else if (token === "draggablex") {
	          	countMoney(player, 0);
	          }
	      }
    	}
	})
});

function countMoney(player, val) {
	if(val === 0){
		val = numValidate(prompt("Please enter a bet number (no commas).", "E.g. 500"));
	}

	if (playerDetails[player][2] - val >= 0){
		playerDetails[player][2] -= val;
		playerDetails[player][3] -= (val * -1);
		betTableUpdate();
		tableUpdate();
		horseTableUpdate();

	} else {
		alert("You do not have that much money!");
	}
}

function regenerateHorses(){
	for (var a = 0; a < totalPlayers; a++){
		playerDetails[a][3] = 0;
		playerDetails[a][4] = -1;
	}
	horseArray = assignSpeeds();
	horsesInRaceUpdate();
	horseTableUpdate();
	listUpdate();
	horsesInRaceUpdate();
	for (var a = 0; a < numHorses; a++){
	  		textID = "animate" + a;
	  		var elem = document.getElementById(textID);
			horseArray[a][6] = 0;
			elem.style.left = 0 + 'px';
		}
}

function resetRace(){
	for (var a = 0; a < totalPlayers; a++){
		playerDetails[a][3] = 0;
		playerDetails[a][4] = -1;
	}
	horsesInRaceUpdate();
	horseTableUpdate();
	listUpdate();
	horsesInRaceUpdate();
	for (var a = 0; a < numHorses; a++){
	  		textID = "animate" + a;
	  		var elem = document.getElementById(textID);
			horseArray[a][6] = 0;
			elem.style.left = 0 + 'px';
		}
}

function doRace(){
	draw();
	for (var a = 0; a < numHorses; a++){
		horseArray[a][6] = 0;
		horseArray[a][5] = (randAmount(horseArray[a][1]) + 1)/3;

		if (horseArray[a][5] < 1){
			horseArray[a][5] *= 10;
		} else if (horseArray[a][5] < 3) {
			horseArray[a][5] *= 5;
		}
	}
}

function draw(){
	$(".horse").animateSprite('play', 'walkRight');
  	var id = setInterval(frame, 50);

  	function frame() {
  		for (var a = 0; a < numHorses; a++){
  			var speed = horseArray[a][5];
	  		textID = "animate" + a;
	  		var elem = document.getElementById(textID);

		    if (horseArray[a][6] > 1189 - horseArray[a][5]) {
		    	$(".horse").animateSprite('stop')
		    	alert(horseArray[a][0] + " has won!");
		    	winner = a;
		      	clearInterval(id);
		      	calculate();
		      	break;

		    } else {
		      	horseArray[a][6] += speed;
		      	elem.style.left = horseArray[a][6] + 'px';
		    }
		}
	}
}

function calculate(){
		for (a = 0; a < totalPlayers; a++){
			if (playerDetails[a][4]*1 === winner){
				var winnings = calculator(playerDetails[a][3], horseArray[winner][1]);
				alert(playerDetails[a][0] + " has won " + formatMoney(winnings) + "!");
				playerDetails[a][2] += winnings;
			}
			playerDetails[a][5] = (((playerDetails[a][2] - playerDetails[a][6])/(playerDetails[a][6])) * 100).toFixed(2);
		}
		horseTableUpdate();
}

function checkWinner(){
	var tie = true;
	var highest = 0;
	if (playerDetails[0] != null){
	for (var a = 0; a < totalPlayers; a++){
		if (1*playerDetails[a][5] > 1*playerDetails[highest][5]){
			highest = a;
			tie = false;
		}
	}

	if (tie && totalPlayers > 1){
		alert("Everyone tied!");
	} else {
		for (var a = 0; a < totalPlayers; a++){
				if (1*playerDetails[a][5] === 1*playerDetails[highest][5]){
					alert("With a return on initial capital of " + playerDetails[a][5] + "%, " + playerDetails[a][0] + " " + playerDetails[a][1] + " is the winner!");
				}
			}
		}
	}
}

function randAmount (value){
	return Math.floor(Math.random() * value);
}