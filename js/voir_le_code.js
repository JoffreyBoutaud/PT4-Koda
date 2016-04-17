function show_code()
{
    var tab_code = [];
    var liste = document.getElementById("saisie").childNodes;

    var nom_action;
    var num_action;

    //récupération des actions (similaire à generer_deplacements)
    for (var i = 0; i < liste.length; i++) 
    {
        if (liste[i].nodeName=="LI") 
        {
            nom_action = liste[i].actionPerso;

            var opt = liste[i].childNodes[1];

            if (nom_action != "tantque") 
            {
                for (var j = 0; j < opt.length; j++) 
                {
                    if (opt[j].selected) 
                    {
                        //récupération de la valeur sélectionnée
                        if (nom_action != "couleur") 
                        {
                            num_action = parseInt(opt[j].value);
                        }
                        else
                        {
                            num_action = opt[j].value;
                        }
                    };
                };
                tab_code.push([nom_action, num_action]);
            }
            else{
                //cas du tant que :
                var select = liste[i].childNodes[1];
                //récupération de la valeur du tq :
                for(var j = 0; j < select.childElementCount; j++){
                    if(select[j].selected){
                        num_action = select[j].value;
                        tab_code.push([nom_action, num_action])
                    }
                }

                //récupération de l'intérieur du tq
                actions = liste[i].childNodes[2];
                for (var k = 0; k<actions.childNodes.length; k++){
                    nom_action = actions.childNodes[k].actionPerso;
                    var opt = actions.childNodes[k].childNodes[1];
                    for (var j = 0; j < opt.length; j++) 
                {
                    if (opt[j].selected) 
                    {
                        //récupération de la valeur sélectionnée
                        if (nom_action != "couleur") 
                        {
                            num_action = parseInt(opt[j].value);
                        }
                        else
                        {
                            num_action = opt[j].value;
                        }
                    };
                };
                tab_code.push([nom_action, num_action]);
                }
                tab_code.push(['ftq', '/']); //ajout d'un élément pour spécifier la fin de la boucle (pour afficher les crochets au bon endroit)
            }
            
        }

    }
    if(typeof(Storage) !== undefined) 
            {
                //enregistrement des éléments dans localStorage pour pouvoir les échanger entre les 2 fichiers.
                localStorage['tab_code']= JSON.stringify(tab_code);
            } 
            else 
            {
                alert("localStorage n'est pas supporté");
            }
}

//génère le code à partir du tableau des différentes actions.
function gen_code(){
    var codes = JSON.parse(localStorage['tab_code']);
    //correspondance entre les actions et les fonctions javascript
    var func = {
        "droite":"deplacerDroite",
        "gauche":"deplacerGauche",
        "haut":"deplacerHaut",
        "bas":"deplacerBas",
        "couleur":"changerCouleur"
    }
    var indent = false;
    var code_affichage = $("#code_js").html();
    //ajout des codes à la zone prévue à cet effet
    for(var j = 0; j < codes.length; j++){

        if(codes[j][0] != "tantque" && codes[j][0] != "ftq"){
            if(indent){code_affichage+="    "}; //4 espaces d'indentation si on est dans une boucle.
            
            if(codes[j][0] == "couleur") {code_affichage += func[codes[j][0]] + "(\"" + codes[j][1] + "\");\n"; }
            else {code_affichage += func[codes[j][0]] + "(" + codes[j][1] + ");\n";}
        }
        if(codes[j][0] == "ftq"){
            indent = false;
            code_affichage += "}\n\n"; //fin de tant que : écriture d'un "{" suppression de l'indentation
        }
        if(codes[j][0] == "tantque"){
            indent = true;
            code_affichage += "\nfor(var i = 0; i < " + codes[j][1] + "; i ++){\n";
        }
        
    }
    $("#code_js").html(code_affichage);
}