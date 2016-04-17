var level2=[
    {   
        "color" : "green",
        "moveTo":[0,0],
        "lineTo1":[25,0],
        "lineTo2":[25,75],
        "lineTo3":[0,75]
    },

    {
        "color" : "white",
        "moveTo":[25,25],
        "lineTo1":[50,25],
        "lineTo2":[50,50],
        "lineTo3":[25,50]
    },

];

p1 = 50;
p2 = 25;
p3 = 75;
p4 = 50;

for (var i = 0; i < 16; i++) {
	level2.push(
		{
			"color" : "white",
    	    "moveTo":[p1,p2],
    	    "lineTo1":[p3,p2],
    	    "lineTo2":[p3,p3],
    	    "lineTo3":[p4,p3]
    
    	}
	);
	p1 = p1 + 25;
	p2 = p2 + 25;
	p3 = p3 + 25;
	p4 = p4 + 25;
};

level2.push(
	{
        "color" : "white",
        "moveTo":[450,425],
        "lineTo1":[475,425],
        "lineTo2":[475,450],
        "lineTo3":[450,450]
    }
);

level2.push(
	{
        "color" : "red",
        "moveTo":[450,450],
        "lineTo1":[475,450],
        "lineTo2":[475,475],
        "lineTo3":[450,475]
    }
);

var indication2 = "Il faudra lors de ce niveau utiliser la boucle 'Faire (x) fois' pour le terminer de la manière la plus optimale.<br>Il faudra aussi faire attention aux murs pour éviter au maximum les collisions !<br>Pour cela tu devras compter le nombre de cases pour déplacer le personnage, ce nombre sera à introduire à droite de l'action voulue.<br><br>Par exemple si tu veux te déplacer de 5 cases sur la droite :<br>il faudra faire [droite____________[5].";