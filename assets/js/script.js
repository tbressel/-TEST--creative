const milli = document.getElementById("milli");
const secondes = document.getElementById("secondes");
const minutes = document.getElementById("minutes");
const heures = document.getElementById("heures");
const tic = document.getElementById("tic");
const bell = document.getElementById("bell");

console.log(milli, secondes, minutes, heures);



setInterval(function() {

// Gestion des millisecondes
let varMilli =  parseInt(milli.innerText)
                varMilli ++;
                milli.innerText = varMilli;
                if(varMilli >= 300) {
                varMilli = 0;
                milli.innerText = varMilli;
// Gestion des secondes
let varSec =  parseInt(secondes.innerText)
              varSec ++;
              secondes.innerText = varSec;
            tic.play();
              if(varSec > 60 ) {
              varSec = 0;
              secondes.innerText = varSec;
// Gestion des minutes
let varMin =  parseInt(minutes.innerText)
              varMin ++;
              minutes.innerText = varMin;
              bell.play();
              if(varMin > 60) {
              varMin = 0;
              minutes.innerText = varMin;
// Gestion des heures
let varH =  parseInt(heures.innerText)
            varH ++;
            heures.innerText = varH;
            if(varH >  24) {
            varH = 0;
            heures.innerText = varH;
    }}}}
},0);



// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------- Initialisation du jeu ------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

// Ciblage de l'écran dans le canvas
let ecran = document.getElementById("canvas").getContext("2d");


let imageArrierePlan = new Image();
imageArrierePlan.src = "./assets/img/background.jpg";




// création d'une classe "modèle" pour un personnage
class Perso {
    // il me faut le chemin de l'image, coordonnées X,Y et en bonus la hauteur et largeur du sprite, 20px par défaut au pire
    constructor(p_source, p_posx, p_posy, p_height = 20, p_width = 20) {
        this.perso = new Image();
        this.posx = p_posx;
        this.posy = p_posy;
        this.height = p_height;
        this.width = p_width;

        // onload attention que la méthode dessiner renvoie l'image chargé
        this.perso.onload = () => {
            // Une fois l'image chargée, dessiner le perso
            this.dessiner();
        };
        this.perso.src = p_source;
    }

    // Méthode à appeler pour dessiner le perso sur le canvas
    dessiner() {
        ecran.drawImage(this.perso, this.posx, this.posy, this.height, this.width);
    }

    // Méthode à appeler pour mettre à jour l'image du perso
    changerImage(p_source) {
        // le chemin de l'image comme toujours
        this.perso.src = p_source;
        // et encore une fois d'attendre que l'image soit chargé par le retour de la méthode dessiner 
        this.perso.onload = () => {
            this.dessiner();
        }
    }
}


let ELEMENT__cibleX = document.getElementById("coordX");
console.log(ELEMENT__cibleX);

let ELEMENT__cibleY = document.getElementById("coordY");
console.log(ELEMENT__cibleY);

ecran.drawImage(imageArrierePlan, 0, 0);
let Tom = new Perso("./assets/img/creative.png", 10, 10);
let directionH = "gauche";
let directionV = "bas"

// fonction  qui définit les conditions du mouvement gauche
// La fonction gauche continu de retourner gauche tant qu'on dépasse pas la valeur superieur
// si on dépasse on définir la direction à droite et on met à jour l'image 
function gauche() {
    Tom.posx++;
    ELEMENT__cibleX.innerHTML = Tom.posx;
    if(Tom.posx >= 280) {
        directionH = "droite"
        Tom.changerImage("./assets/img/creative-g.png")

        let baliseaudio = document.getElementById("sound");
    
        baliseaudio.play();
    }
    return directionH
}
// fonction  qui définit les conditions du mouvement droite
// La fonction droite continu de retourner droite tant qu'on dépasse pas la valeur superieur
// si on dépasse on définir la direction à gauche et on met à jour l'image 
function droite() {
    Tom.posx--;
    ELEMENT__cibleX.innerHTML = Tom.posx;
    if(Tom.posx <= 0) {
        directionH = "gauche"
 
        Tom.changerImage("./assets/img/creative.png")
        let baliseaudio = document.getElementById("sound");
       
        baliseaudio.play();
    }
    return directionH
}


function bas() {
    Tom.posy++;
    ELEMENT__cibleY.innerHTML = Tom.poxy;
    if(Tom.posy >= 130) {
        directionV = "haut"
        let baliseaudio = document.getElementById("sound");
     
        baliseaudio.play();
    }
    return directionV
}

function haut() {
    Tom.posy--;
    ELEMENT__cibleY.innerHTML = Tom.poxy;
 
    if(Tom.posy <= 0) {
  
        directionV = "bas"
        let baliseaudio = document.getElementById("sound");
        
        baliseaudio.play();
      
    }
    return directionH
}



// vitesse de la boucle
setInterval(boucle, 1000 / 80);



// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// ------------------------------    BOUCLE PRINCIPALE    -------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
function boucle(){


    
    

    
    // console.log(directionH)
    // console.log(directionV)

     if(directionH === "gauche") {
         gauche()
     } else {
         droite()
     }
    if(directionV === "bas") {
        bas()
    } else {
        haut()
    }

    // Effacer le canvas 
    ecran.clearRect(0, 0, canvas.width, canvas.height);


    // Dessiner le perso avec les nouvelles coordonnées
    Tom.dessiner();

}


