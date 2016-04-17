var NB_LIGNES = 20;
var NB_COL = 20;
var MAX_WIDTH = 500;
var MAX_HEIGHT = 500;
var custom_level = [];
var current_color = "white";

function generer_tab(){
	custom_level = [];
	for (var i = 0; i < NB_COL; i++) {
		for (var j = 0; j < NB_LIGNES; j++) {
			custom_level.push(new Case(i,j, "gray"));
		}
	}
}

function pencil(couleur){
	current_color = couleur;
}

function colorier(offsetX, offsetY, taille){
    x = offsetX/taille * NB_LIGNES;
    y = offsetY/taille * NB_COL;
    x = Math.floor(x);
    y = Math.floor(y);
    console.log(x, y);
	custom_level[x*NB_LIGNES + y].color = current_color;
	pikachu(custom_level);
}

function Case(x, y, couleur){
	this.moveTo = [x * MAX_WIDTH / NB_COL, y * MAX_HEIGHT / NB_LIGNES];
	this.lineTo1 = [(x+1) * MAX_WIDTH / NB_COL, y * MAX_HEIGHT / NB_LIGNES];
	this.lineTo2 = [(x+1) * MAX_WIDTH / NB_COL, (y+1) * MAX_HEIGHT / NB_LIGNES];
	this.lineTo3 = [x * MAX_WIDTH / NB_COL, (y+1) * MAX_HEIGHT / NB_LIGNES]
	this.color = couleur;
}

function pikachu(pokeball){
	for (var i=0; i < pokeball.length; i++) {
        ctx.beginPath();
        var item = pokeball[i];
        ctx.moveTo(item.moveTo[0],item.moveTo[1]);
        ctx.lineTo(item.lineTo1[0],item.lineTo1[1]);
        ctx.lineTo(item.lineTo2[0],item.lineTo2[1]);
        ctx.lineTo(item.lineTo3[0],item.lineTo3[1]);
        ctx.fillStyle = item.color;
        ctx.fill();
    };

    //quadrillage
	var i=25;
	while(i<MAX_WIDTH){
		ctx.beginPath();
		ctx.moveTo(i,0);
		ctx.lineTo(i,MAX_HEIGHT);
		ctx.lineWidth=0.75;
		ctx.strokeStyle="black";
		ctx.stroke();
		i=i+25;
	}
	var g = 25;
	while(g<MAX_HEIGHT){
		ctx.beginPath();
		ctx.moveTo(0,g);
		ctx.lineTo(MAX_WIDTH,g);
		ctx.lineWidth=0.75;
		ctx.strokeStyle="black";
		ctx.stroke();
		g=g+25;
	}

	perso.draw();
}

generer_tab();
$("#affichage").click(function(ev){
    console.log(ev);
	colorier(ev.clientX, ev.clientY, ev.currentTarget.clientHeight); 
});