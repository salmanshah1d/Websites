var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var startCoordX = 490;
var startCoordY = 100;
var radius = 40;

// Keeps track of / displays iterations and vertex
var V = 0;
var I = 0;
printVertex = "";

// sets up data for all vertices
var vertexS = "S";
var SX = 225;
var SY = 75;
var sVal = "0";

var vertexA = "A";
var AX = 375;
var AY = 215;
var aVal = "Infinity";

var vertexB = "B";
var BX = 375;
var BY = 385;
var bVal = "Infinity";

var vertexC = "C";
var CX = 225;
var CY = 525;
var cVal = "Infinity";

var vertexD = "D";
var DX = 75;
var DY = 385;
var dVal = "Infinity";

var vertexE = "E";
var EX = 75;
var EY = 215;
var eVal = "Infinity";

var SA = 10;
var SE = 8;
var AB = 1;
var BC = -2;
var AC = 2;
var AD = -4;
var DE = 1;
var DC = -1;

document.addEventListener('mousedown', mouseMoveHandler); //handles left or right mouse-click
document.addEventListener('contextmenu', event => event.preventDefault()); // disable right-click menu

function drawTable(){ // creates table to display shortest paths
    drawLine(startCoordX - 1.6, startCoordY + 1, startCoordX + 750, startCoordY);
    drawLine(startCoordX - 2.5, startCoordY + 75, startCoordX + 750, startCoordY + 75);
    drawLine(startCoordX - 2.5, startCoordY + 150, startCoordX + 750, startCoordY + 150);
    drawLine(startCoordX - 1.6, startCoordY, startCoordX - 1.6, startCoordY + 150);
    drawLine(startCoordX + 122.5, startCoordY, startCoordX + 122.5, startCoordY + 150);
    drawLine(startCoordX + 247.5, startCoordY, startCoordX + 247.5, startCoordY + 150);
    drawLine(startCoordX + 372.5, startCoordY, startCoordX + 372.5, startCoordY + 150);
    drawLine(startCoordX + 497.5, startCoordY, startCoordX + 497.5, startCoordY + 150);
	drawLine(startCoordX + 622.5, startCoordY, startCoordX + 622.5, startCoordY + 150);
	drawLine(startCoordX + 749, startCoordY, startCoordX + 749, startCoordY + 150);

	drawText(startCoordX + 62.5, startCoordY + 37.5, sVal);
	drawText(startCoordX + 187.5, startCoordY + 37.5, aVal);
	drawText(startCoordX + 312.5, startCoordY + 37.5, bVal);
	drawText(startCoordX + 437.5, startCoordY + 37.5, cVal);
	drawText(startCoordX + 562.5, startCoordY + 37.5, dVal);
	drawText(startCoordX + 687.5, startCoordY + 37.5, eVal);

	if (V === 0){
		drawText(startCoordX + 62.5, startCoordY + 112.5, vertexS);
		drawText(startCoordX + 187.5, startCoordY + 112.5, vertexA);
		drawText(startCoordX + 312.5, startCoordY + 112.5, vertexB);
		drawText(startCoordX + 437.5, startCoordY + 112.5, vertexC);
		drawText(startCoordX + 562.5, startCoordY + 112.5, vertexD);
		drawText(startCoordX + 687.5, startCoordY + 112.5, vertexE);

	} else if (V === 1){
		drawSpecialText(startCoordX + 62.5, startCoordY + 112.5, vertexS);
		drawText(startCoordX + 187.5, startCoordY + 112.5, vertexA);
		drawText(startCoordX + 312.5, startCoordY + 112.5, vertexB);
		drawText(startCoordX + 437.5, startCoordY + 112.5, vertexC);
		drawText(startCoordX + 562.5, startCoordY + 112.5, vertexD);
		drawText(startCoordX + 687.5, startCoordY + 112.5, vertexE);

	} else if (V === 2) {
		drawText(startCoordX + 62.5, startCoordY + 112.5, vertexS);
		drawSpecialText(startCoordX + 187.5, startCoordY + 112.5, vertexA);
		drawText(startCoordX + 312.5, startCoordY + 112.5, vertexB);
		drawText(startCoordX + 437.5, startCoordY + 112.5, vertexC);
		drawText(startCoordX + 562.5, startCoordY + 112.5, vertexD);
		drawText(startCoordX + 687.5, startCoordY + 112.5, vertexE);

	} else if (V === 3) {
		drawText(startCoordX + 62.5, startCoordY + 112.5, vertexS);
		drawText(startCoordX + 187.5, startCoordY + 112.5, vertexA);
		drawSpecialText(startCoordX + 312.5, startCoordY + 112.5, vertexB);
		drawText(startCoordX + 437.5, startCoordY + 112.5, vertexC);
		drawText(startCoordX + 562.5, startCoordY + 112.5, vertexD);
		drawText(startCoordX + 687.5, startCoordY + 112.5, vertexE);

	} else if (V === 4) {
		drawText(startCoordX + 62.5, startCoordY + 112.5, vertexS);
		drawText(startCoordX + 187.5, startCoordY + 112.5, vertexA);
		drawText(startCoordX + 312.5, startCoordY + 112.5, vertexB);
		drawSpecialText(startCoordX + 437.5, startCoordY + 112.5, vertexC);
		drawText(startCoordX + 562.5, startCoordY + 112.5, vertexD);
		drawText(startCoordX + 687.5, startCoordY + 112.5, vertexE);

	} else if (V === 5) {
		drawText(startCoordX + 62.5, startCoordY + 112.5, vertexS);
		drawText(startCoordX + 187.5, startCoordY + 112.5, vertexA);
		drawText(startCoordX + 312.5, startCoordY + 112.5, vertexB);
		drawText(startCoordX + 437.5, startCoordY + 112.5, vertexC);
		drawSpecialText(startCoordX + 562.5, startCoordY + 112.5, vertexD);
		drawText(startCoordX + 687.5, startCoordY + 112.5, vertexE);

	} else if (V === 6) {
		drawText(startCoordX + 62.5, startCoordY + 112.5, vertexS);
		drawText(startCoordX + 187.5, startCoordY + 112.5, vertexA);
		drawText(startCoordX + 312.5, startCoordY + 112.5, vertexB);
		drawText(startCoordX + 437.5, startCoordY + 112.5, vertexC);
		drawText(startCoordX + 562.5, startCoordY + 112.5, vertexD);
		drawSpecialText(startCoordX + 687.5, startCoordY + 112.5, vertexE);
	}
}

function mouseMoveHandler(e) {
   if (e.button === 0) { //left-clicked
   		if (I === 0){
   			I++;
   			V++;
   		} else {
   			forward(); 
   		}
   		configure();
   		draw();

     } else if (e.button === 2) {  //right-clicked
      	if (I === 1 && V === 1){
      		I--;
      		V--;
      	} else {
			backward();
		}
      	configure();
      	draw();
   }
}

function configure(){ // updates shortest path display value based on iteration and vertex
	if (I === 0 && V === 0) {
		sVal = "0";
		aVal = "Infinity";
		bVal = "Infinity";
		cVal = "Infinity";
		dVal = "Infinity";
		eVal = "Infinity";

	} else if (I === 1 && V === 1){
		sVal = "0";
		aVal = "10";
		bVal = "Infinity";
		cVal = "Infinity";
		dVal = "Infinity";
		eVal = "8";

	} else if (I === 1 && V === 2) {
		sVal = "0";
		aVal = "10";
		bVal = "Infinity";
		cVal = "12 (10+2)";
		dVal = "Infinity";
		eVal = "8";
		
	} else if (I === 1 && V === 3) {
		sVal = "0";
		aVal = "10";
		bVal = "Infinity";
		cVal = "12";
		dVal = "Infinity";
		eVal = "8";

	} else if (I === 1 && V === 4) {
		sVal = "0";
		aVal = "10";
		bVal = "10 (12-2)";
		cVal = "12";
		dVal = "Infinity";
		eVal = "8";
		
	} else if (I === 1 && V === 5) {
		sVal = "0";
		aVal = "10";
		bVal = "10";
		cVal = "12";
		dVal = "Infinity";
		eVal = "8";

	} else if (I === 1 && V === 6) {
		sVal = "0";
		aVal = "10";
		bVal = "10";
		cVal = "12";
		dVal = "9 (8+1)";
		eVal = "8";
		
	} else if (I === 2 && V === 1){
		sVal = "0";
		aVal = "10";
		bVal = "10";
		cVal = "12";
		dVal = "9";
		eVal = "8";

	} else if (I === 2 && V === 2) {
		sVal = "0";
		aVal = "10";
		bVal = "10";
		cVal = "12";
		dVal = "9";
		eVal = "8";

	} else if (I === 2 && V === 3) {
		sVal = "0";
		aVal = "10";
		bVal = "10";
		cVal = "12";
		dVal = "9";
		eVal = "8";

	} else if (I === 2 && V === 4) {
		sVal = "0";
		aVal = "10";
		bVal = "10";
		cVal = "12";
		dVal = "9";
		eVal = "8";

	} else if (I === 2 && V === 5) {
		sVal = "0";
		aVal = "5 (9-4)";
		bVal = "10";
		cVal = "8 (9-1)";
		dVal = "9";
		eVal = "8";

	} else if (I === 2 && V === 6) {
		sVal = "0";
		aVal = "5";
		bVal = "10";
		cVal = "8";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 3 && V === 1){
		sVal = "0";
		aVal = "5";
		bVal = "10";
		cVal = "8";
		dVal = "9";
		eVal = "8";

	} else if (I === 3 && V === 2) {
		sVal = "0";
		aVal = "5";
		bVal = "10";
		cVal = "7 (5+2)";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 3 && V === 3) {
		sVal = "0";
		aVal = "5";
		bVal = "10";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 3 && V === 4) {
		sVal = "0";
		aVal = "5";
		bVal = "5 (7-2)";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 3 && V === 5) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 3 && V === 6) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 4 && V === 1){
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";

	} else if (I === 4 && V === 2) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 4 && V === 3) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 4 && V === 4) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 4 && V === 5) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 4 && V === 6) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 5 && V === 1){
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";

	} else if (I === 5 && V === 2) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 5 && V === 3) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 5 && V === 4) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 5 && V === 5) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 5 && V === 6) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 6 && V === 1){
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";

	} else if (I === 6 && V === 2) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 6 && V === 3) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 6 && V === 4) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 6 && V === 5) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";
		
	} else if (I === 6 && V === 6) {
		sVal = "0";
		aVal = "5";
		bVal = "5";
		cVal = "7";
		dVal = "9";
		eVal = "8";	
	}
}

function forward(){ // traverses forward through iterations/vertices
	if (!(I === 6 && V === 6)){
		if (V < 7){
			V++;
		}

		if (V === 7 && I < 7){
			I++;
			V = 1;
		}
	} else {
		alert("You have now completed the animation. Please right-click if you would like to go backward.");
	}
}

function backward(){ // traverses backward through iterations/vertices
	if (!(I === 0 && V === 0)){
		if (V > 0){
			V--;
		}

		if (V === 0 && I > 1){
			I--;
			V = 6;
		}

	} else {
		alert("This is the beginning of the animation. Please left-click if you would like to go forward.");
	}
}

function drawCircle(X, Y){
    ctx.strokeStyle = "#000";
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.arc(X, Y, radius, 0, Math.PI*2);
	ctx.fillStyle = "ffffff";
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
}

function drawArrowHead(x,y,radians){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,0);
    ctx.lineTo(10,30);
    ctx.lineTo(-10,30);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
}

function drawText(X, Y, Vertex) {
    ctx.font = "25px Avenir";
    ctx.fillStyle = "#000000";
    ctx.textAlign="center";
	ctx.fillText(Vertex, X, Y + 7);
	ctx.textAlign="left";
}

function drawSpecialText(X, Y, Vertex) { //red lines
    ctx.font = "25px Avenir";
    ctx.fillStyle = "ff0000";
    ctx.textAlign="center";
	ctx.fillText(Vertex, X, Y + 7);
	ctx.textAlign="left";
	ctx.fillStyle = "000000";
}

function drawVertex(X, Y, Vertex){
	drawCircle(X, Y);
	drawText(X, Y, Vertex);
}

function drawLine(SX, SY, AX, AY){
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(SX, SY);
	ctx.lineTo(AX, AY);
	ctx.stroke();
}

function drawSpecialLine(X1, Y1, X2, Y2){ //red lines
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(X1, Y1);
	ctx.lineTo(X2, Y2);
	ctx.strokeStyle = "#ff0000";
	ctx.stroke();
}

function drawEdge(X1, Y1, X2, Y2, xAdd, yAdd, value) { //prints edge values
    ctx.font = "25px Avenir";
    ctx.fillStyle = "#000";
    ctx.fillText(value, X1 + (X2-X1)/2 + xAdd, Y1 + (Y2-Y1)/2 + yAdd);
}

function draw(){ // main function to draw vertices based on iteration / vertex number, arrowheads, edge values, table, and some explanation text
	ctx.clearRect(0, 0, 1325, 600);

	if (V === 0){
		printVertex = "";
		drawLine(SX,SY,AX,AY);
		drawLine(EX,EY,SX,SY);
		drawLine(AX,AY,BX,BY);
		drawLine(BX,BY,CX,CY);
		drawLine(CX,CY,AX,AY);
		drawLine(CX,CY,DX,DY);
		drawLine(AX,AY,DX,DY);
		drawLine(EX,EY,DX,DY);

	} else if (V === 1){
		printVertex = ", Vertex: S";
		drawSpecialLine(SX,SY,AX,AY);
		drawSpecialLine(EX,EY,SX,SY);
		drawLine(AX,AY,BX,BY);
		drawLine(BX,BY,CX,CY);
		drawLine(CX,CY,AX,AY);
		drawLine(CX,CY,DX,DY);
		drawLine(AX,AY,DX,DY);
		drawLine(EX,EY,DX,DY);

	} else if (V === 2) {
		printVertex = ", Vertex: A";
		drawLine(SX,SY,AX,AY);
		drawLine(EX,EY,SX,SY);
		drawLine(AX,AY,BX,BY);
		drawLine(BX,BY,CX,CY);
		drawSpecialLine(CX,CY,AX,AY);
		drawLine(CX,CY,DX,DY);
		drawLine(AX,AY,DX,DY);
		drawLine(EX,EY,DX,DY);

	} else if (V === 3) {
		printVertex = ", Vertex: B";
		drawLine(SX,SY,AX,AY);
		drawLine(EX,EY,SX,SY);
		drawSpecialLine(AX,AY,BX,BY);
		drawLine(BX,BY,CX,CY);
		drawLine(CX,CY,AX,AY);
		drawLine(CX,CY,DX,DY);
		drawLine(AX,AY,DX,DY);
		drawLine(EX,EY,DX,DY);

	} else if (V === 4) {
		printVertex = ", Vertex: C";
		drawLine(SX,SY,AX,AY);
		drawLine(EX,EY,SX,SY);
		drawLine(AX,AY,BX,BY);
		drawSpecialLine(BX,BY,CX,CY);
		drawLine(CX,CY,AX,AY);
		drawLine(CX,CY,DX,DY);
		drawLine(AX,AY,DX,DY);
		drawLine(EX,EY,DX,DY);

	} else if (V === 5) {
		printVertex = ", Vertex: D";
		drawLine(SX,SY,AX,AY);
		drawLine(EX,EY,SX,SY);
		drawLine(AX,AY,BX,BY);
		drawLine(BX,BY,CX,CY);
		drawLine(CX,CY,AX,AY);
		drawSpecialLine(CX,CY,DX,DY);
		drawSpecialLine(AX,AY,DX,DY);
		drawLine(EX,EY,DX,DY);

	} else if (V === 6) {
		printVertex = ", Vertex: E";
		drawLine(SX,SY,AX,AY);
		drawLine(EX,EY,SX,SY);
		drawLine(AX,AY,BX,BY);
		drawLine(BX,BY,CX,CY);
		drawLine(CX,CY,AX,AY);
		drawLine(CX,CY,DX,DY);
		drawLine(AX,AY,DX,DY);
		drawSpecialLine(EX,EY,DX,DY);
	}

	drawArrowHead(SX + Math.abs(SX - AX) / 2 + 16, SY + Math.abs(SY - AY) / 2 + 16, 2.4);
	drawArrowHead(EX + Math.abs(SX - EX) / 2 - 16, SY + Math.abs(SY - EY) / 2 + 16, -2.4);
	drawArrowHead(AX, (BY + AY)/ 2 - 16, 0);
	drawArrowHead(CX + Math.abs(BX - CX) / 2 + 16, BY + Math.abs(BY - CY) / 2 - 16, 0.84);
	drawArrowHead(DX + Math.abs(DX - CX) / 2 + 16, DY + Math.abs(DY - CY) / 2 + 16, 2.4);
	drawArrowHead(CX + Math.abs(AX - CX) / 2, AY + Math.abs(AY - CY) / 2, 3.6);
	drawArrowHead(DX + Math.abs(AX - DX) / 2 + 16, AY + Math.abs(AY - DY) / 2 - 10, 1);
	drawArrowHead(DX, EY + Math.abs(DY - EY) / 2 + 16, 3.14);

	drawEdge(SX, SY, AX, AY, 20, -10, SA);
	drawEdge(SX, SY, EX, EY, -30, -10, SE);
	drawEdge(AX, AY, BX, BY, 30, 10, AB);
	drawEdge(BX, BY, CX, CY, 30, 30, BC);
	drawEdge(AX, AY, CX, CY, -20, -20, AC);
	drawEdge(DX, DY, EX, EY, -40, 5, DE);
	drawEdge(DX, DY, CX, CY, -30, 30, DC);
	drawEdge(AX, AY, DX, DY, -20, -20, AD);

	drawVertex(SX, SY, vertexS);
	drawVertex(AX, AY, vertexA);
	drawVertex(BX, BY, vertexB);
	drawVertex(CX, CY, vertexC);
	drawVertex(DX, DY, vertexD);
	drawVertex(EX, EY, vertexE);

	drawTable();
	drawText(865, 60, "Iteration " + I + printVertex);

	drawText(790, 570, "Code taken partially from geeksforgeeks.org/detect-negative-cycle-graph-bellman-ford/");


	if (I === 0 && V === 0) { // prints specific explanation text depending on which iteration/vertex
		drawText(865, 300, "Presently, all the distances are set at infinity. From the source");
		drawText(865, 335, "to itself is 0.");
	}else if (I === 1 && V === 1){
		drawText(865, 300, "S reaches A and E with edge weights of 10 and 8, respectively.");
	} else if (I === 1 && V === 2) {
		drawText(865, 300, "S reaches C through A (weight: 10) + next weight: 2.");
	} else if (I === 1 && V === 3) {
		drawText(865, 300, "B is still infinity because there is currently no path to get to it.");
	} else if (I === 1 && V === 4) {
		drawText(865, 300, "S reaches B through C (weight: 12) + next weight: -2.");
	} else if (I === 1 && V === 5){
		drawText(865, 300, "D is still infinity because there is currently no path to get to it.");
	} else if (I === 1 && V === 6){
		drawText(865, 300, "S reaches D through E (weight: 8) + next weight: 1.");
	} else if ((I === 2 && (V === 1 || V === 2 || V === 3 || V === 4 || V === 6)) || (I === 3 && (V === 1 || V === 3 || V === 5 || V === 6)) || I === 4 || I === 5){
		drawText(865, 300, "Nothing has changed because no shorter path was found.");
	} else if (I === 3 && V === 2) {
		drawText(865, 300, "S reaches C through A (weight: 5) + next weight: 2.");
	} else if (I === 3 && V === 4) {
		drawText(865, 300, "S reaches B through C (weight: 7) + next weight: -2.");
		drawText(865, 335, "Notice that before the path from S to C would've been S to A to C.");
		drawText(865, 370, "Now it is S to E to D to A to C, and it's decreased from 10 to 5.");
		drawText(865, 405, "Sometimes, the shortest path in terms of numbers of edges doesn't");
		drawText(865, 440, "represent the path taken with the least weight, and this is an example.");
	} else if (I === 2 && V === 5) {
		drawText(865, 300, "S reaches A through D (weight: 9) + next weight: -4.");
		drawText(865, 335, "S reaches C through D (weight: 9) + next weight: -1.");
		drawText(865, 370, "This didn't work in the previous iteration because there was no path");
		drawText(865, 405, "to D, but now, S connects to D through A, so it works.");
	} else if (I === 6 && V === 6) {
		drawText(865, 300, "Now that we've checked that the array is unchanged from the end of the");
		drawText(865, 335, "fifth (V - 1) iteration, we know that there are no negative-weight cycles.");
		drawText(865, 370, "The fact that it is actually unchanged since the end of the third iteration,");
		drawText(865, 405, "though, is just a coincidence for this particular case. Theoretically, the");
		drawText(865, 440, "set of shortest distances from the source vertex can change right up until");
		drawText(865, 475, "the end of (V - 1) cases. However, if it changes between iteration (V - 1)");
		drawText(865, 510, "and iteration (V), there is a negative-weight cycle. Refer to definitions if needed.");
	} else if (I === 6 && V !== 6) {
		drawText(865, 300, "We should now have the shortest path. The result at the end of the fifth");
		drawText(865, 335, "(V - 1) should be the same as the result at the end of the sixth (V).");
	}
}

draw();