//initialisation du tableau qui gère les ids des blocs dupliqués
var elem = {"droite" : 1,
            "gauche" : 20,
            "tantque" : 100,
            "haut" : 40,
            "couleur": 60,
            "bas" : 80};

//permet d'autoriser le lacher d'éléments
function allowDrop(ev) {
    ev.preventDefault();
}

//fonction appelée lorsqu'on déplace un objet de la zone des blocs de base
function drag_clone(ev) {
    ev.dataTransfer.setData("id_drag", elem[ev.target.id]); //enregistrement de l'id du clone
    
    var item = document.getElementById(ev.target.id);
    clone = item.cloneNode(true);
    clone.id=elem[ev.target.id];
    
    clone.ondragstart = drag; //ajout du listener pour rendre l'objet déplaçable
    clone.actionPerso = ev.target.id; //propriété contenant l'action, pouvant être lue + tard

    elem[ev.target.id]+=1;

    document.getElementById("invisible").appendChild(clone);
}

//gère le transfert de l'id de l'élément dupliqué lorsqu'un élément est déplaçé
function drag(ev){
    ev.dataTransfer.setData("id_drag", ev.target.id);
}

//place l'élément dupliqué dans la zone de saisie au moment ou l'utilisateur lache son objet au dessus.
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("id_drag");
    data = String(data);

    if (ev.target.id == "saisie") { //autoriser le lacher d'un élément uniquement sur la zone de saisie
        ev.target.appendChild(document.getElementById(data));
    };
}

//gestion de la suppression des objets déposés sur la corbeille
function drop_delete(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("id_drag");
    var parent = document.getElementById("saisie");
    var child = document.getElementById(data);
    saisie.removeChild(child);
}

//permet de vider l'élément repéré par l'id trash
function vider_corbeille(){
    $("#trash").empty();
}   