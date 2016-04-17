function generer_select(nb){
	var ids = ["droite", "gauche", "haut", "bas"];

	for (var i = 0; i < ids.length; i++) {
		var box = document.getElementById(ids[i]);

		var select = document.createElement('SELECT');
		for (var j = 1; j <= nb; j++) {
			var option = document.createElement('OPTION');
			option.value = "" + j;
			option.innerHTML = "" + j;
			select.appendChild(option);
		};
		box.appendChild(select);
	};
}

function generer_select_color(nb) {
	var myArray = ['Bleu', 'Jaune', 'Orange', 'Violet', 'Blanc'];
	var quelquechose = document.createElement('SELECT');
	for (var i = 0; i < myArray.length; i++) {
		var caseVoulut = document.createElement('OPTION');
		caseVoulut.value = myArray[i];
		caseVoulut.innerHTML = myArray[i];
		quelquechose.appendChild(caseVoulut);
	};
	var test = document.getElementById("couleur");
	test.appendChild(quelquechose);
}

function generer_select_tantque(options)
{
	var select = "<select>";
	for (var i = 0; i < options.length; i++) {
		select = select + "<option value=\""+options[i]+"\">"+options[i]+"</option>";
	};
	select += "</select>";
	$(select).insertBefore(".inner");
}

generer_select(20);
generer_select_color(5);
generer_select_tantque(["1", "5", "10", "20", "30"]);