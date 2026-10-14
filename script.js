// ==================
// ÉCRAN DE DÉMARRAGE
// ==================

const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
});


// ==========
// PERSONNAGE
// ==========

const player = document.getElementById("player");
const playerImage = player.querySelector("img");


// ============
// INTERACTIONS
// ============

const interactionMessage =
    document.getElementById("interaction-message");

const dialogueBox =
    document.getElementById("dialogue-box");

const dialogueText =
    document.getElementById("dialogue-text");

let dialogueOpen = false;

// Page du dialogue du centre de loisirs
let centreLoisirsPage = 0;


// =======
// SPRITES
// =======

const downSprites = [
    "images/player-down.png",
    "images/player-down-2.png",
    "images/player-down-3.png"
];

const upSprites = [
    "images/player-up.png",
    "images/player-up-2.png",
    "images/player-up-3.png"
];

const leftSprites = [
    "images/player-left.png",
    "images/player-left-2.png",
    "images/player-left-3.png"
];

const rightSprites = [
    "images/player-right.png",
    "images/player-right-2.png",
    "images/player-right-3.png"
];


// =========
// ANIMATION
// =========

let currentFrame = 0;
let lastAnimationTime = 0;

const animationSpeed = 150;


// ========
// POSITION
// ========

let playerX = 423;
let playerY = 470;

const speed = 3;

const playerWidth = 55;
const playerHeight = 95;

const keys = {};


// ===============
// COLLISION LYCÉE
// ===============

const lyceeCollisions = [
    {
        left: 306,
        right: 556,
        top: 18,
        bottom: 171
    }
];


// ===============
// COLLISION CERGY
// ===============

const cergyCollisions = [
    {
        left: 14,
        right: 305,
        top: 198,
        bottom: 364
    }
];


// ===========================
// COLLISION CENTRE DE LOISIRS
// ===========================

const centreLoisirsCollisions = [
    {
        left: 16,
        right: 197,
        top: 391,
        bottom: 577
    }
];


// ==============
// COLLISION GOLF
// ==============

const golfCollisions = [
    {
        left: 560,
        right: 893,
        top: 27,
        bottom: 215
    }
];


// =====================
// COLLISION MONTPELLIER
// =====================

const montpellierCollisions = [
    {
        left: 716,
        right: 879,
        top: 407,
        bottom: 556
    }
];


// ==================
// COLLISION XPERTECH
// ==================

const xpertechCollisions = [
    {
        left: 591,
        right: 888,
        top: 249,
        bottom: 368
    }
];


// ===============================
// COLLISIONS DU DÉCOR DE fond.png
// ===============================

const decorCollisions = [

    // Haut gauche
    {
        left: 0,
        right: 300,
        top: 0,
        bottom: 185
    },

    // Haut droite
    {
        left: 600,
        right: 900,
        top: 0,
        bottom: 105
    },

    // Bas gauche
    {
        left: 0,
        right: 300,
        top: 520,
        bottom: 600
    },

    // Végétation bas centre-gauche
    {
        left: 260,
        right: 370,
        top: 490,
        bottom: 600
    },

    // Végétation bas centre-droit
    {
        left: 520,
        right: 650,
        top: 500,
        bottom: 600
    },

    // Bas droite
    {
        left: 650,
        right: 900,
        top: 560,
        bottom: 600
    }
];


// ===================
// ZONES D'INTERACTION
// ===================

// Lycée

const lyceeInteraction = {
    left: 410,
    right: 490,
    top: 150,
    bottom: 200
};


// Cergy

const cergyInteraction = {
    left: 155,
    right: 215,
    top: 330,
    bottom: 370
};


// Centre de loisirs

const centreLoisirsInteraction = {
    left: 98,
    right: 200,
    top: 490,
    bottom: 560
};


// Golf

const golfInteraction = {
    left: 650,
    right: 850,
    top: 210,
    bottom: 260
};


// Montpellier

const montpellierInteraction = {
    left: 650,
    right: 850,
    top: 480,
    bottom: 560
};


// XperTech

const xpertechInteraction = {
    left: 600,
    right: 765,
    top: 350,
    bottom: 350
};


// =======================
// VARIABLES D'INTERACTION
// =======================

let nearXpertech = false;
let nearMontpellier = false;
let nearLycee = false;
let nearCergy = false;
let nearCentreLoisirs = false;
let nearGolf = false;


// =====================
// FONCTION DE COLLISION
// =====================

// On utilise uniquement les pieds du personnage
// pour rendre les collisions plus naturelles.

function touchesCollision(nextX, nextY, collision) {

    const playerHitbox = {
        left: nextX + 12,
        right: nextX + 43,
        top: nextY + 72,
        bottom: nextY + 95
    };

    return (
        playerHitbox.left < collision.right &&
        playerHitbox.right > collision.left &&
        playerHitbox.top < collision.bottom &&
        playerHitbox.bottom > collision.top
    );
}


// ==================
// TOUCHES DU CLAVIER
// ==================

document.addEventListener("keydown", function (event) {

    // Empêche les flèches de déplacer la page

    if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    ) {
        event.preventDefault();
    }


    // ========
    // TOUCHE E
    // ========

    if (event.key.toLowerCase() === "e") {

        if (event.repeat) {
            return;
        }


        // ------------------------------
        // SI UN DIALOGUE EST DÉJÀ OUVERT
        // ------------------------------
        if (dialogueOpen) {

            // Deuxième page centre de loisirs

            if (centreLoisirsPage === 1) {

                centreLoisirsPage = 2;

                dialogueText.innerHTML =
                    "<strong>ÉVOLUTION DU POSTE !!!</strong><br><br>" +
                    "<strong>Responsable d'équipe</strong><br>" +
                    "Août 2023 → Septembre 2025<br><br>" +
                    "• Gestion d'une équipe de 12 personnes<br>" +
                    "• Organisation et coordination de projets<br><br>" +
                    "<em>E — Fermer</em>";

                return;
            }


            // Ferme les autres dialogues

            dialogueBox.style.display = "none";

            dialogueOpen = false;

            centreLoisirsPage = 0;

            return;
        }


        // ==============
        // DIALOGUE LYCÉE
        // ==============

        if (nearLycee) {

            dialogueText.innerHTML =
                "<strong>LYCÉE — 2019</strong><br><br>" +
                "Obtention du Baccalauréat général.<br>" +
                "🌎 Échange linguistique à Boston.";

            dialogueBox.style.display = "block";

            interactionMessage.style.display = "none";

            dialogueOpen = true;

            return;
        }


        // ==============
        // DIALOGUE CERGY
        // ==============

        if (nearCergy) {

            dialogueText.innerHTML =
                "<strong>CY CERGY PARIS UNIVERSITÉ — 2021–2024</strong><br><br>" +
                "Licence Langues Étrangères Appliquées.<br>" +
                "• 🇬🇧 Anglais   • 🇪🇸 Espagnol";

            dialogueBox.style.display = "block";

            interactionMessage.style.display = "none";

            dialogueOpen = true;

            return;
        }


        // ==========================
        // DIALOGUE CENTRE DE LOISIRS
        // ==========================

        if (nearCentreLoisirs) {

            centreLoisirsPage = 1;

            dialogueText.innerHTML =
                "<strong>CENTRE DE LOISIRS — LE MESNIL-LE-ROI</strong><br><br>" +
                "<strong>Animatrice</strong><br>" +
                "Octobre 2021 → Avril 2023<br><br>" +
                "• Encadrement des enfants<br>" +
                "• Animation d'activités et de projets<br><br>" +
                "<em>E — Suivant</em>";

            dialogueBox.style.display = "block";

            interactionMessage.style.display = "none";

            dialogueOpen = true;

            return;
        }


        // =============
        // DIALOGUE GOLF
        // =============

        if (nearGolf) {

            dialogueText.innerHTML =
                "<strong>GOLF BLUEGREEN Villennes-sur-Seine — 2023</strong><br><br>" +
                "<strong>Stage — Mai → Juillet 2023</strong><br><br>" +
                "• Accueil et relation client<br>" +
                "• Communication en français, anglais et espagnol<br>" +
                "• Outils numériques et suivi des réservations";

            dialogueBox.style.display = "block";

            interactionMessage.style.display = "none";

            dialogueOpen = true;

            return;
        }


        // ====================
        // DIALOGUE MONTPELLIER
        // ====================

        if (nearMontpellier) {

            dialogueText.innerHTML =
                "<strong>UNIVERSITÉ MONTPELLIER 3 — 2024–2026</strong><br><br>" +
                "<strong>Master à distance 💻</strong><br>" +
                "Septembre 2024 → Juin 2026<br><br>" +
                "Sociolinguistique et Gestion Éducative et Politique des Plurilinguismes";

            dialogueBox.style.display = "block";

            interactionMessage.style.display = "none";

            dialogueOpen = true;

            return;
        }


        // =================
        // DIALOGUE XPERTECH
        // =================

        if (nearXpertech) {

            dialogueText.innerHTML =
                "<strong>XPERTECH — 2025–2026</strong><br><br>" +
                "<strong>Account Executive / Assistante technico-commerciale</strong><br>" +
                "Octobre 2025 → Juillet 2026<br><br>" +
                "• Démonstrations de solutions IT<br>" +
                "• Réseaux, postes de travail et sécurité<br>" +
                "• Analyse des besoins clients en cybersécurité<br>" +
                "• Gestion d'un portefeuille B2B";

            dialogueBox.style.display = "block";

            interactionMessage.style.display = "none";

            dialogueOpen = true;

            return;
        }

    }


    // =====================================
    // FERMETURE DU DIALOGUE AVEC UNE FLÈCHE
    // =====================================

    if (
        dialogueOpen &&
        (
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight"
        )
    ) {

        dialogueBox.style.display = "none";

        dialogueOpen = false;

        centreLoisirsPage = 0;
    }


    // Enregistre la touche appuyée

    keys[event.key] = true;

});


// ===============
// TOUCHE RELÂCHÉE
// ===============

document.addEventListener("keyup", function (event) {

    keys[event.key] = false;

});


// =============
// BOUCLE DU JEU
// =============

function movePlayer() {

    let nextX = playerX;
    let nextY = playerY;


    // ============
    // DÉPLACEMENTS
    // ============

    if (!dialogueOpen) {

        if (keys["ArrowUp"]) {
            nextY -= speed;
        }

        if (keys["ArrowDown"]) {
            nextY += speed;
        }

        if (keys["ArrowLeft"]) {
            nextX -= speed;
        }

        if (keys["ArrowRight"]) {
            nextX += speed;
        }

    }


    // ===============
    // COLLISION LYCÉE
    // ===============

    let touchesLycee = false;

    for (const collision of lyceeCollisions) {

        if (touchesCollision(nextX, nextY, collision)) {

            touchesLycee = true;
            break;
        }
    }


    // ================
    // COLLISION CERGY
    // ===================

    let touchesCergy = false;

    for (const collision of cergyCollisions) {

        if (touchesCollision(nextX, nextY, collision)) {

            touchesCergy = true;
            break;
        }
    }


    // ==========================
    // COLLISION CENTRE DE LOISIRS
    // =========================

    let touchesCentreLoisirs = false;

    for (const collision of centreLoisirsCollisions) {

        if (touchesCollision(nextX, nextY, collision)) {

            touchesCentreLoisirs = true;
            break;
        }
    }


    // ==================
    // COLLISION GOLF
    // ==============

    let touchesGolf = false;

    for (const collision of golfCollisions) {

        if (touchesCollision(nextX, nextY, collision)) {

            touchesGolf = true;
            break;
        }
    }


    // ====================
    // COLLISION MONTPELLIER
    // ====================

    let touchesMontpellier = false;

    for (const collision of montpellierCollisions) {

        if (touchesCollision(nextX, nextY, collision)) {

            touchesMontpellier = true;
            break;
        }
    }


    // ==================
    // COLLISION XPERTECH
    // ====================

    let touchesXpertech = false;

    for (const collision of xpertechCollisions) {

        if (touchesCollision(nextX, nextY, collision)) {

            touchesXpertech = true;
            break;
        }
    }


    // ================
    // COLLISIONS DU DÉCOR
    // =======================

    let touchesDecor = false;

    for (const collision of decorCollisions) {

        if (touchesCollision(nextX, nextY, collision)) {

            touchesDecor = true;
            break;
        }
    }


    // =======================
    // AUTORISATION DU DÉPLACEMENT
    // ===========================

    if (
        !touchesLycee &&
        !touchesCergy &&
        !touchesCentreLoisirs &&
        !touchesGolf &&
        !touchesMontpellier &&
        !touchesXpertech &&
        !touchesDecor
    ) {

        playerX = nextX;
        playerY = nextY;
    }


    // ===========
    // LIMITES DE LA MAP
    // =======================

    playerX = Math.max(
        0,
        Math.min(playerX, 845)
    );

    playerY = Math.max(
        0,
        Math.min(playerY, 505)
    );


    // Applique la position

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";


    // ============
    // DÉTECTION LYCÉE
    // =======================

    nearLycee =
        playerX < lyceeInteraction.right &&
        playerX + playerWidth > lyceeInteraction.left &&
        playerY < lyceeInteraction.bottom &&
        playerY + playerHeight > lyceeInteraction.top;


    // ===============
    // DÉTECTION CERGY
    // ===================

    nearCergy =
        playerX < cergyInteraction.right &&
        playerX + playerWidth > cergyInteraction.left &&
        playerY < cergyInteraction.bottom &&
        playerY + playerHeight > cergyInteraction.top;


    // ===================
    // DÉTECTION CENTRE DE LOISIRS
    // ==========================

    nearCentreLoisirs =
        playerX < centreLoisirsInteraction.right &&
        playerX + playerWidth > centreLoisirsInteraction.left &&
        playerY < centreLoisirsInteraction.bottom &&
        playerY + playerHeight > centreLoisirsInteraction.top;


    // ==================
    // DÉTECTION GOLF
    // ===============

    nearGolf =
        playerX < golfInteraction.right &&
        playerX + playerWidth > golfInteraction.left &&
        playerY < golfInteraction.bottom &&
        playerY + playerHeight > golfInteraction.top;


    // ==========================
    // DÉTECTION MONTPELLIER
    // =====================

    nearMontpellier =
        playerX < montpellierInteraction.right &&
        playerX + playerWidth > montpellierInteraction.left &&
        playerY < montpellierInteraction.bottom &&
        playerY + playerHeight > montpellierInteraction.top;


    // ===============
    // DÉTECTION XPERTECH
    // ====================

    nearXpertech =
        playerX < xpertechInteraction.right &&
        playerX + playerWidth > xpertechInteraction.left &&
        playerY < xpertechInteraction.bottom &&
        playerY + playerHeight > xpertechInteraction.top;


    // ======================
    // MESSAGE E — INTERAGIR
    // ====================

    if (
        (
            nearLycee ||
            nearCergy ||
            nearCentreLoisirs ||
            nearGolf ||
            nearMontpellier ||
            nearXpertech
        ) &&
        !dialogueOpen
    ) {

        interactionMessage.style.display = "block";

    } else {

        interactionMessage.style.display = "none";
    }


    // ========================
    // ANIMATION DE MARCHE
    // =======================

    if (
        !dialogueOpen &&
        (
            keys["ArrowDown"] ||
            keys["ArrowUp"] ||
            keys["ArrowLeft"] ||
            keys["ArrowRight"]
        )
    ) {

        const now = Date.now();

        if (now - lastAnimationTime > animationSpeed) {

            currentFrame++;

            if (currentFrame >= 3) {
                currentFrame = 0;
            }


            // Bas

            if (keys["ArrowDown"]) {
                playerImage.src =
                    downSprites[currentFrame];
            }


            // Haut

            if (keys["ArrowUp"]) {
                playerImage.src =
                    upSprites[currentFrame];
            }


            // Gauche

            if (keys["ArrowLeft"]) {
                playerImage.src =
                    leftSprites[currentFrame];
            }


            // Droite

            if (keys["ArrowRight"]) {
                playerImage.src =
                    rightSprites[currentFrame];
            }


            lastAnimationTime = now;
        }
    }


    requestAnimationFrame(movePlayer);
}



// ========================
// LANCEMENT DU JEU
// ===================

movePlayer();

// =================
// MODE DEBUG COLLISIONS
// ====================

const DEBUG_COLLISIONS = false;

function afficherZoneDebug(zone, couleur, nom) {

    const rectangle = document.createElement("div");

    rectangle.style.position = "absolute";

    rectangle.style.left = zone.left + "px";
    rectangle.style.top = zone.top + "px";

    rectangle.style.width =
        (zone.right - zone.left) + "px";

    rectangle.style.height =
        (zone.bottom - zone.top) + "px";

    rectangle.style.backgroundColor = couleur;
    rectangle.style.border = "2px solid white";

    rectangle.style.zIndex = "50";

    rectangle.style.pointerEvents = "none";

    rectangle.style.fontSize = "11px";
    rectangle.style.fontFamily = "monospace";
    rectangle.style.fontWeight = "bold";
    rectangle.style.color = "white";

    rectangle.style.display = "flex";
    rectangle.style.alignItems = "center";
    rectangle.style.justifyContent = "center";

    rectangle.textContent = nom;

    document.getElementById("map").appendChild(rectangle);
}


function afficherCollisionsDebug() {

    if (!DEBUG_COLLISIONS) {
        return;
    }


    // LYCÉE
    lyceeCollisions.forEach(function(zone) {

        afficherZoneDebug(
            zone,
            "rgba(255, 0, 0, 0.35)",
            "LYCÉE"
        );

    });


    // CERGY
    cergyCollisions.forEach(function(zone) {

        afficherZoneDebug(
            zone,
            "rgba(255, 0, 0, 0.35)",
            "CERGY"
        );

    });


    // CENTRE DE LOISIRS
    centreLoisirsCollisions.forEach(function(zone) {

        afficherZoneDebug(
            zone,
            "rgba(255, 0, 0, 0.35)",
            "CENTRE"
        );

    });


    // GOLF
    golfCollisions.forEach(function(zone) {

        afficherZoneDebug(
            zone,
            "rgba(255, 0, 0, 0.35)",
            "GOLF"
        );

    });


    // MONTPELLIER
    montpellierCollisions.forEach(function(zone) {

        afficherZoneDebug(
            zone,
            "rgba(255, 0, 0, 0.35)",
            "MONTPELLIER"
        );

    });


    // XPERTECH
    xpertechCollisions.forEach(function(zone) {

        afficherZoneDebug(
            zone,
            "rgba(255, 0, 0, 0.35)",
            "XPERTECH"
        );

    });


    // DÉCOR
    decorCollisions.forEach(function(zone) {

        afficherZoneDebug(
            zone,
            "rgba(255, 0, 0, 0.20)",
            "DÉCOR"
        );

    });


    // =======================
    // INTERACTIONS EN VERT
    // ========================

    afficherZoneDebug(
        lyceeInteraction,
        "rgba(0, 255, 0, 0.35)",
        "E LYCÉE"
    );

    afficherZoneDebug(
        cergyInteraction,
        "rgba(0, 255, 0, 0.35)",
        "E CERGY"
    );

    afficherZoneDebug(
        centreLoisirsInteraction,
        "rgba(0, 255, 0, 0.35)",
        "E CENTRE"
    );

    afficherZoneDebug(
        golfInteraction,
        "rgba(0, 255, 0, 0.35)",
        "E GOLF"
    );

    afficherZoneDebug(
        montpellierInteraction,
        "rgba(0, 255, 0, 0.35)",
        "E MONTPELLIER"
    );

    afficherZoneDebug(
        xpertechInteraction,
        "rgba(0, 255, 0, 0.35)",
        "E XPERTECH"
    );
}


afficherCollisionsDebug();

// ==================================
// OUTIL POUR DESSINER LES COLLISIONS À LA SOURIS
// =====================

const map = document.getElementById("map");

let dessinCollision = false;

let debutX = 0;
let debutY = 0;

let rectangleTemporaire = null;


// Quand on appuie avec la souris
map.addEventListener("mousedown", function(event) {

    // Coordonnées de la map
    const mapRect = map.getBoundingClientRect();

    debutX = event.clientX - mapRect.left;
    debutY = event.clientY - mapRect.top;

    dessinCollision = true;


    // Création du rectangle visible
    rectangleTemporaire = document.createElement("div");

    rectangleTemporaire.style.position = "absolute";

    rectangleTemporaire.style.left = debutX + "px";
    rectangleTemporaire.style.top = debutY + "px";

    rectangleTemporaire.style.backgroundColor =
        "rgba(0, 100, 255, 0.35)";

    rectangleTemporaire.style.border =
        "2px solid blue";

    rectangleTemporaire.style.zIndex = "100";

    rectangleTemporaire.style.pointerEvents = "none";

    map.appendChild(rectangleTemporaire);
});


// Quand on déplace la souris
map.addEventListener("mousemove", function(event) {

    if (!dessinCollision) {
        return;
    }

    const mapRect = map.getBoundingClientRect();

    const sourisX = event.clientX - mapRect.left;
    const sourisY = event.clientY - mapRect.top;


    const left = Math.min(debutX, sourisX);
    const top = Math.min(debutY, sourisY);

    const width = Math.abs(sourisX - debutX);
    const height = Math.abs(sourisY - debutY);


    rectangleTemporaire.style.left = left + "px";
    rectangleTemporaire.style.top = top + "px";

    rectangleTemporaire.style.width = width + "px";
    rectangleTemporaire.style.height = height + "px";
});


// Quand on relâche la souris
map.addEventListener("mouseup", function(event) {

    if (!dessinCollision) {
        return;
    }

    dessinCollision = false;


    const mapRect = map.getBoundingClientRect();

    const finX = event.clientX - mapRect.left;
    const finY = event.clientY - mapRect.top;


    const left = Math.round(
        Math.min(debutX, finX)
    );

    const right = Math.round(
        Math.max(debutX, finX)
    );

    const top = Math.round(
        Math.min(debutY, finY)
    );

    const bottom = Math.round(
        Math.max(debutY, finY)
    );


    // Affiche les coordonnées
    console.log(`
COLLISION :

{
    left: ${left},
    right: ${right},
    top: ${top},
    bottom: ${bottom}
},
    `);
});

// ======================
// RESPONSIVE AUTOMATIQUE
// ========================

function resizeGame() {

    const map = document.getElementById("map");

    const largeurDisponible = window.innerWidth - 20;
    const hauteurDisponible = window.innerHeight - 20;

    const scaleX = largeurDisponible / 900;
    const scaleY = hauteurDisponible / 600;

    // On prend la plus petite valeur pour que
    // toute la map reste visible
    const scale = Math.min(scaleX, scaleY, 1);

    map.style.transform = `scale(${scale})`;
}


// Au chargement
resizeGame();


// À chaque changement de taille de fenêtre
window.addEventListener("resize", resizeGame);
