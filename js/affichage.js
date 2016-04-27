//récupération du canvas pour l'affichage 2d
var canvas = document.getElementById("affichage");
var MAX_WIDTH=500;
var MAX_HEIGHT=500;
canvas.width=MAX_WIDTH;
canvas.height=MAX_HEIGHT;
var ctx = canvas.getContext("2d");

//initialisation des variables
var chosen_level = 1;
var lvl_termine = false;
var step = 0; //sert a parcourir le tableau des déplacements.

//définition de l'objet perso qui représente la bille
var perso = {
    // attributs de base (position de départ, rayon etc...)
    x: 25,
    y: 37,
    inc_x:0,
    inc_y:0,
    radius: 5,
    color: "blue",

    // dessine le cercle
    draw : function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();

    }
};

//déplace le personnage d'un pixel vers la doite
//renvoie 1 si le personnage s'est déplacé d'une case entière
function moveRight(){
    drawLevel(chosen_level); //on dessine le niveau sous le perso
    var c = perso;
    c.draw(); // on dessine le perso

    c.x += 1; // déplacement d'1px vers la droite

    c.inc_x+=1;

    //si on s'est déplacé de 25px depuis la dernière case : retourne 1
    if(c.inc_x >= 25)
    {
        c.inc_x = 0; // inc remis à 0 car on est dans une nouvelle case
        return 1;
    }

    return 0;
}

//déplace le personnage d'un pixel vers la gauche
//renvoie 1 si le personnage s'est déplacé d'une case entière
function moveLeft(){
    drawLevel(chosen_level);
    var c = perso;
    c.draw();

    c.x -= 1;

    c.inc_x+=1;

    if(c.inc_x >= 25)
    {
        c.inc_x = 0;
        return 1;
    }

    return 0;
}

//déplace le personnage d'un pixel vers le haut
//renvoie 1 si le personnage s'est déplacé d'une case entière
function moveUp(){
    drawLevel(chosen_level);
    var c = perso;
    c.draw();

    c.y -= 1;
    c.inc_y+=1;

    if(c.inc_y >= 25)
    {
        c.inc_y = 0;
        return 1;
    }

    return 0;
}

//déplace le personnage d'un pixel vers le bas
//renvoie 1 si le personnage s'est déplacé d'une case entière
function moveDown(){
    drawLevel(chosen_level);
    var c = perso;
    c.draw();

    c.y += 1;
    c.inc_y+=1;

    if(c.inc_y >= 25)
    {
        c.inc_y = 0;
        return 1;
    }

    return 0;
}

//fonction qui teste les collisions dans une direction donnée.
function collision2(direction){
    //collision à droite :
    if (direction == "d") {
        //choix du pixel du centre de la case suivante (à droite) pour la comparaison
        var couleur = ctx.getImageData(perso.x + 13, perso.y, 1, 1);
        if (isWhite(couleur) || isBorder(couleur) || isSameColor(couleur)) {
            return false; //renvoie faux si le personnage a le droit de faire ce déplacement (bordure, case blanche ou case de la même couleur)
        }
        if(isRed(couleur)){ //cas particulier de la couleur rouge (bloc de fin)
            logErreur("victoire");
            //on avance d'une case de plus dans la même direction
            deplacements = [];
            count = 0;
            deplacements[0] = new Deplacement("droite", 1);
            return false;
        }
        logErreur("collision");
        return true; //si ce n'est pas une case blanche (ou une bordure) : collision
    };

    //collision à gauche
    if (direction == "g") {
        //pixel du centre de la case précédente (à gauche)
        var couleur = ctx.getImageData(perso.x - 13, perso.y, 1, 1);
        if (isWhite(couleur) || isBorder(couleur) || isSameColor(couleur)) {
            return false;
        }
        if(isRed(couleur)){
            logErreur("victoire");
            deplacements = [];
            count = 0;
            deplacements[0] = new Deplacement("gauche", 1);
            return false;
        }
        logErreur("collision");
        return true; //si ce n'est pas une case blanche (ou une bordure) : collision
    };

    //collision vers le haut
    if (direction == "h") {
        //pixel du centre de la case précédente (à gauche)
        var couleur = ctx.getImageData(perso.x, perso.y - 13, 1, 1);
        if (isWhite(couleur) || isBorder(couleur) || isSameColor(couleur)) {
            return false;
        }
        if(isRed(couleur)){
            logErreur("victoire");
            deplacements = [];
            count = 0;
            deplacements[0] = new Deplacement("haut", 1);
            return false;
        }
        logErreur("collision");
        return true; //si ce n'est pas une case blanche (ou une bordure) : collision
    };

    //collision vers le bas
    if (direction == "b") {
        //pixel du centre de la case précédente (à gauche)
        var couleur = ctx.getImageData(perso.x, perso.y + 13, 1, 1);
        if (isWhite(couleur) || isBorder(couleur) || isSameColor(couleur)) {
            return false;
        }
        if(isRed(couleur)){
            logErreur("victoire");
            deplacements = [];
            count = 0;
            deplacements[0] = new Deplacement("bas", 1);
            return false;
        }
        logErreur("collision");
        return true; //si ce n'est pas une case blanche (ou une bordure) : collision
    };
}


//détecte si la couleur passée en paramètre est la même que celle du personnage
function isSameColor(imgData) {
    //récupération de la couleur du personnage
    var cperso = perso.color;
    var r = imgData.data[0];
    var g = imgData.data[1];
    var b = imgData.data[2];
    if(cperso == "purple"){
        //2 tests : un pour la couleur et un pour la bordure car les bordures sur les cases colorées n'ont pas la même couleur que celles sur les cases blanches
        if(r==80 && g==0 && b==80){
            return true;
        }
        if (r == 128 && g == 0&& b == 128) {
            return true;
        }
    }
    if(cperso == "orange"){
        if(r==255 && g==165 && b==0){
            return true;
        }
        if(r==159 && g==103 && b==0){
            return true;
        }
    }
    if(cperso == "blue"){
        if(r==0 && g==0 && b==159){
            return true;
        }
        if(r==0 && g==0 && b==255){
            return true;
        }
    }
    return false;
}

//renvoir true si imgData est la couleur d'une bordure
function isBorder (imgData) {
    return imgData.data[0] == 157 && imgData.data[1] == 157 && imgData.data[2] == 157;
}

//renvoie true si imgData représente une case verte
function isGreen (imgData) {
    return imgData.data[0] == 0 && imgData.data[1] == 128 && imgData.data[2] == 0;
}

//renvoie true si imgData représente une case blanche
function isWhite(imgData){
    return imgData.data[0] == 255 && imgData.data[1] == 255 && imgData.data[2] == 255;
}

//renvoie true si imgData représente une case rouge
function isRed(imgData){
    return imgData.data[1] == 0 && imgData.data[2] == 0 && imgData.data[3] == 255;
}


//affiche du texte dans la zone de notification en fonction de ce qui est demandé en paramètre (collision, victoire etc...)
function logErreur(err){
    var html = $("#erreurs").html();
    if (err == "collision") {
        html = html + "<br><strong>[collision]</strong> collision du perso avec un mur !";
        $("#erreurs").html(html);
    };
    if (err == "victoire" && !lvl_termine) {
        html = html + "<br><br><strong>[victoire]</strong> le niveau est terminé !";
        enregistrement_score(chosen_level, 10);
        lvl_termine = true;
    };
    if(err == "tantque"){

        html = html + "<br><strong>[boucle]</strong> Tu n'a pas besoin de mettre une boucle dans une autre pour résoudre cet exercice.";
    }
    $("#erreurs").html(html);
}

//charge les indications en fonction du niveau passé en paramètre
function indication(lvl){
    if (lvl==0) {var html = indication0;};
    if (lvl==1) {var html = indication1;};
    if (lvl==2) {var html = indication2;};
    if (lvl==3) {var html = indication3;};
    if (lvl==4) {var html = indication4;};
    if (lvl==5) {var html = indication5;};

    $("#indication").html(html);
}

//boucle principale d'animation
var animloop = function(){
    //tant que le dépacement n'est pas terminé : on cache le bouton démarrer
    if (count < deplacements.length)
    {
        $("#reset_button").css("display", "none");
    }
    else{
        $("#reset_button").css("display", "inline-block");
    }

    if (count < deplacements.length) {
        //cas d'un changement de couleur
        if (deplacements[count].couleur != undefined) {
            changeColor(deplacements[count].couleur); //changement de la couleur du personnage
            count++; //passage au déplacement suivant
        };
        // cas d'un déplacement vers la droite
        if (deplacements[count].droite != undefined) {
            //si collision : arrêter les déplacements dans cette direction
            if(collision2("d")){
                deplacements[count].droite = -1; //si il y a une collision, aucun autre déplacement vers la droite possible
            }
            else{
                step = moveRight(); //avancer d'un pixel
                if(step != 0){ //si on a avancé d'une ou plusieurs cases.
                    deplacements[count].droite-=step; //réduire le nombre de déplacements restants
                    step = 0;
                }
            }
            if (deplacements[count].droite<=0) { // si les déplacements a droite sont finis, passer au suivant
                count+=1;
            }
        }

        //idem pour la gauche et les autres directions.
        if (deplacements[count] != undefined && deplacements[count].gauche != undefined) {
            //si collision : arrêter les déplacements dans cette direction
            if(collision2("g")){
                deplacements[count].gauche = -1;
            }
            else{
                step = moveLeft();
                if(step != 0){
                    deplacements[count].gauche-=step;
                    step = 0;
                }
            }
            if (deplacements[count].gauche<=0) {
                count+=1;
            }
        }

        if (deplacements[count] != undefined && deplacements[count].haut != undefined) {
            //si collision : arrêter les déplacements dans cette direction
            if(collision2("h")){
                deplacements[count].haut = -1;
            }
            else{
                step = moveUp();
                if(step != 0){
                    deplacements[count].haut-=step;
                    step = 0;
                }
            }
            if (deplacements[count].haut<=0) {
                count+=1;
            }
        }

        if (deplacements[count] != undefined && deplacements[count].bas != undefined) {
			//si collision : arrêter les déplacements dans cette direction
            if(collision2("b")){
                deplacements[count].bas = -1;
            }
            else{
                step = moveDown();
                if(step != 0){
                    deplacements[count].bas-=step;
                    step = 0;
                }
            }
            if (deplacements[count].bas<=0) {
                count+=1;
            }
        }
    }

    else{
        stop_anim();
    }
    //rappelle une image générée par cette fonction
    requestAnimationFrame(animloop);
}

//stoppe l'animation
var stop_anim = function(){
    drawLevel(chosen_level);
    var c = perso;
    c.draw();
    clearInterval();
}

//dessine le niveau dont le numéro est passé en paramètre
function drawLevel(lvl){
    //choix du niveau ici
    //if (lvl==0) {var level = level0;};
    if (lvl==0) {
        pikachu(custom_level);
        return;};
    if (lvl==1) {var level = level1;};
    if (lvl==2) {var level = level2;};
    if (lvl==3) {var level = level3;};
    if (lvl==4) {var level = level4;};
    if (lvl==5) {var level = level5;};
    if (lvl==6) {var level = level6;};

	//fond
    ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,MAX_WIDTH);
    ctx.lineTo(MAX_HEIGHT,MAX_WIDTH);
    ctx.lineTo(MAX_HEIGHT,0);
    ctx.lineWidth = 1;
    ctx.fillStyle = "gray";
    ctx.fill();

    //chemin, début et fin
    for (var i=0; i < level.length; i++) {
        ctx.beginPath();
        var item = level[i];
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
}

//remts l'affichage à zéro et redessine le niveau.
function reset_affichage(){
    count=0;
    step=0;

    generer_deplacements();
    drawLevel(chosen_level);

    perso.x=12;
    perso.y=37;
    //effacement de la fenêtre des erreurs
    $("#erreurs").html("Ici vous trouverez vos erreurs :");
    lvl_termine = false;
    //remise à zéro de la couleur du perso
    changeColor("Bleu");
    indication(chosen_level);
}

//objet Deplacement
function Deplacement(direction, nombre){
    if (direction=="droite") {
        this.droite = nombre;
    };
    if (direction=="gauche") {
        this.gauche = nombre;
    };
    if (direction=="haut") {
        this.haut = nombre;
    };
    if (direction=="bas") {
        this.bas = nombre;
    };
    if (direction=="couleur") {
        this.couleur = nombre;
    };
}

//génère un tableau qui contient des objets de type Deplacement grâce aux actions déposées dans la zone principale
function generer_deplacements()
{
    deplacements = [];
    var liste = document.getElementById("saisie").childNodes;

    var nom_action;
    var num_action;

    //parcours des items de la zone "saisie"
    for (var i = 0; i < liste.length; i++) {
        if (liste[i].nodeName=="LI") {
            nom_action = liste[i].actionPerso;
            //récupération des options (liste déroulante)
            if (nom_action=="tantque")
            {
                var opt = liste[i].childNodes[1];
            }
            else
            {
                var opt = liste[i].childNodes[1];
            }

            //récupération du nom de l'action
            if (nom_action != "tantque") {
                for (var j = 0; j < opt.length; j++) {
                    if (opt[j].selected) {
                        //récupération de la valeur sélectionnée
                        if (nom_action != "couleur") {
                            num_action = parseInt(opt[j].value);
                        }
                        else{
                            num_action = opt[j].value;
                        }
                    };
                };
                //ajout du déplacement au tableau
                var d = new Deplacement(nom_action, num_action);
                deplacements.push(d);
            }
            else{ // cas d'une action de type "faire X fois"
                //récupération du nombre d'itérations
                for (var j = 0; j < opt.length; j++) {
                    if(opt[j].selected)
                    {
                        var nombre_tq = parseInt(opt[j].value);
                    }
                };
                var deplacements_tq = [];
                //récupération des déplacements inclus dans le tant que (boucle faire x fois)
                var actions = liste[i].childNodes[2].childNodes;
                for (var k = 0; k < actions.length; k++) {
                    nom_action = actions[k].actionPerso;
                    opt = actions[k].childNodes[1];
                    //récupération de la valeur du sélect :
                    for (var j = 0; j < opt.length; j++) {
                        if (opt[j].selected) {
                            //récupération de la valeur sélectionnée
                            if (nom_action != "couleur") {
                                num_action = parseInt(opt[j].value);
                            }
                            else{
                                num_action = opt[j].value;
                            }
                        };
                    };
                    //ajout du déplacement au tableau temporaire :
                    //uniquement les valeurs sion crée ici des objets déplacements on les copie par référenc ensuite et ils ne sont pas dupliqués
                    deplacements_tq.push([nom_action, num_action]);
                };

                //ajout des déplacements X fois dans le tableau de déplacements
                for (var l = 0; l < nombre_tq; l++) {
                    //ajout des déplacements (parcours du tab temporaire)
                    for (var m = 0; m < deplacements_tq.length; m++) {
                        //création d'un nouvel objet déplacement
                        var dt = new Deplacement(deplacements_tq[m][0], deplacements_tq[m][1]);
                        deplacements.push(dt);
                    };
                };
            }

        };
    };
}

//fonction permettant de changer la couleur du personnage
function changeColor(color){
    var tab = [];
    tab["Bleu"] = "blue";
    tab["Jaune"] = "yellow";
    tab["Orange"] = "orange";
    tab["Violet"] = "purple";
    tab["Blanc"] = "white";

    var c = perso;
    c.color = tab[color];
}

//initialisation de l'affichage.
reset_affichage();

for (var i = 0; i < 6; i++) {
    animloop();
};
