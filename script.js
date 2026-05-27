// =========================================================================
// 1. INITIALISATION DES TABLEAUX ET DES STATISTIQUES (OBLIGATOIRE EN HAUT)
// =========================================================================
function helperBadge(res) {
  if (res === "Victoire") return `<span class="badge badge-victoire">Victoire 🟢</span>`;
  if (res === "Défaite") return `<span class="badge badge-defaite">Défaite 🔴</span>`;
  return `<span class="badge badge-nul">Nul ⚪</span>`;
}

// Tableau 1976
const corps1976 = document.getElementById('tableau-1976');
const matches1976 = [
  { adversaire: "KB Copenhague (Seizième)", score: "2 - 1", resultat: "Victoire" },
  { adversaire: "Glasgow Rangers (Huitième)", score: "2 - 0", resultat: "Victoire" },
  { adversaire: "Dynamo Kiev (Quart)", score: "3 - 0", resultat: "Victoire" },
  { adversaire: "PSV Eindhoven (Demi)", score: "1 - 0", resultat: "Victoire" },
  { adversaire: "Bayern Munich (Finale)", score: "0 - 1", resultat: "Défaite" }
];
if (corps1976) {
  corps1976.innerHTML = "";
  matches1976.forEach(m => {
    corps1976.innerHTML += `<tr><td><strong>ASSE</strong> vs ${m.adversaire}</td><td>${m.score}</td><td>${helperBadge(m.resultat)}</td></tr>`;
  });
}

// Tableau des 50 matches récents
const corpsRecents = document.getElementById('tableau-recents');
const equipes = ["Lyon", "Marseille", "Paris SG", "Lens", "Nantes", "Nice", "Monaco", "Bordeaux"];
const resultats = ["Victoire", "Nul", "Défaite"];
let totalV = 0, totalN = 0, totalD = 0;

if (corpsRecents) {
  corpsRecents.innerHTML = "";
  for (let i = 1; i <= 50; i++) {
    const adv = equipes[Math.floor(Math.random() * equipes.length)];
    const res = resultats[Math.floor(Math.random() * resultats.length)];
    let score = "0 - 0";
    
    if (res === "Victoire") { totalV++; score = "2 - 1"; }
    else if (res === "Défaite") { totalD++; score = "0 - 2"; }
    else { totalN++; score = "0 - 0"; }

    corpsRecents.innerHTML += `<tr><td><strong>ASSE</strong> vs ${adv} <small style="color:#94a3b8">(Match ${i})</small></td><td>${score}</td><td>${helperBadge(res)}</td></tr>`;
  }
}

// Envoi immédiat des compteurs statistiques
if (document.getElementById('stat-v')) document.getElementById('stat-v').innerText = totalV;
if (document.getElementById('stat-n')) document.getElementById('stat-n').innerText = totalN;
if (document.getElementById('stat-d')) document.getElementById('stat-d').innerText = totalD;

// Date du jour automatique
const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const aujourdHui = new Date().toLocaleDateString('fr-FR', optionsDate);
const eltDate = document.getElementById('date-du-jour');
if (eltDate) eltDate.innerText = "📅 " + aujourdHui;

// =========================================================================
// 2. LOGIQUE DES BOUTONS ET INTERACTIONS
// =========================================================================

// Sélecteur de Tribune
function changerTribune(tribune) {
  const conteneur = document.getElementById('main-container');
  const sousTitre = document.getElementById('site-subtitle');
  if (!conteneur || !sousTitre) return;
  
  conteneur.classList.remove('theme-nord', 'theme-sud', 'theme-officiel');
  
  if (tribune === 'nord') {
    conteneur.classList.add('theme-nord');
    sousTitre.innerText = "🔥 Kop Nord : Ambiance volcanique et chants non-stop !";
    sousTitre.style.color = "#009640";
  } else if (tribune === 'sud') {
    conteneur.classList.add('theme-sud');
    sousTitre.innerText = "🦅 Kop Sud : Les Ultras veillent sur le Chaudron !";
    sousTitre.style.color = "#004d20";
  } else if (tribune === 'henri-point') {
    conteneur.classList.add('theme-officiel');
    sousTitre.innerText = "📑 Tribune Henri-Point : Vue parfaite sur le match.";
    sousTitre.style.color = "#475569";
  }
}

// Compteur d'encouragements
let nbEncouragements = 0;
function encourager() {
  nbEncouragements++;
  const affichageCompteur = document.getElementById('compteur-clics');
  if (affichageCompteur) affichageCompteur.innerText = nbEncouragements;
  
  if (nbEncouragements >= 10) {
    const badgeFan = document.getElementById('badge-fan');
    if (badgeFan) badgeFan.classList.add('active');
  }
  
  const btn = document.getElementById('btn-encourager');
  if (btn) {
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 200);
  }
}

// Pluie de Fumigènes
function craquerFumigene() {
  const emojies = ['💨', '🔥', '🟢', '✨'];
  for (let i = 0; i < 30; i++) {
    const particule = document.createElement('div');
    particule.classList.add('fumi-particule');
    particule.innerText = emojies[Math.floor(Math.random() * emojies.length)];
    particule.style.left = Math.random() * 100 + 'vw';
    particule.style.animationDuration = (Math.random() * 2 + 2) + 's';
    particule.style.animationDelay = (Math.random() * 0.5) + 's';
    document.body.appendChild(particule);
    setTimeout(() => { particule.remove(); }, 4000);
  }
}

// Quiz 1976
function verifierReponse(boutonClique, estCorrect) {
  const zoneFeedback = document.getElementById('quiz-feedback');
  const tousLesBoutons = boutonClique.parentNode.getElementsByTagName('button');
  for (let btn of tousLesBoutons) { btn.disabled = true; }
  
  if (estCorrect) {
    boutonClique.classList.add('correct');
    if (zoneFeedback) zoneFeedback.innerHTML = "🎉 Bonne réponse ! Les fameux poteaux carrés.";
    if (zoneFeedback) zoneFeedback.style.color = "#22c55e";
  } else {
    boutonClique.classList.add('wrong');
    if (zoneFeedback) zoneFeedback.innerHTML = "❌ Mauvaise réponse ! Indice : l'épopée des Verts.";
    if (zoneFeedback) zoneFeedback.style.color = "#ef4444";
  }
}

// Quiz Légende Joueur
function verifierJoueur(boutonClique, estCorrect) {
  const zoneFeedback = document.getElementById('joueur-feedback');
  const tousLesBoutons = boutonClique.parentNode.getElementsByTagName('button');
  for (let btn of tousLesBoutons) { btn.disabled = true; }
  
  if (estCorrect) {
    boutonClique.classList.add('correct');
    if (zoneFeedback) zoneFeedback.innerHTML = "⚽ Exact ! Hervé Revelli, meilleur buteur de l'histoire !";
    if (zoneFeedback) zoneFeedback.style.color = "#22c55e";
  } else {
    boutonClique.classList.add('wrong');
    if (zoneFeedback) zoneFeedback.innerHTML = "❌ Ce n'est pas lui ! C'est un attaquant des années 60-70.";
    if (zoneFeedback) zoneFeedback.style.color = "#ef4444";
  }
}

// Lecteur Audio Chant
let enTrainDeJouer = false;
function toggleAudio() {
  const btn = document.getElementById('btn-audio');
  const musique = document.getElementById('hymne-asse');
  if (!btn || !musique) return;
  
  if (!enTrainDeJouer) {
    musique.play().catch(e => console.log("L'audio requiert une interaction utilisateur."));
    btn.innerHTML = "⏸️ Pause";
    btn.style.backgroundColor = "#b91c1c";
    enTrainDeJouer = true;
  } else {
    musique.pause();
    btn.innerHTML = "▶️ Lancer le chant";
    btn.style.backgroundColor = "#004d20";
    enTrainDeJouer = false;
  }
}

// Livre d'or (Mur des supporters)
function ajouterMessage() {
  const pseudoInput = document.getElementById('fan-pseudo');
  const messageInput = document.getElementById('fan-message');
  const zoneMessages = document.getElementById('zone-messages');
  if (!pseudoInput || !messageInput || !zoneMessages) return;
  
  if (pseudoInput.value.trim() === "" || messageInput.value.trim() === "") {
    alert("Remplis ton pseudo et ton message avant de publier ! 😊");
    return;
  }
  
  const nouveauMessage = `<div class="message-item"><strong>${pseudoInput.value} :</strong> ${messageInput.value}</div>`;
  zoneMessages.innerHTML = nouveauMessage + zoneMessages.innerHTML;
  messageInput.value = "";
}

// Pronostiqueur automatique
function genererProno() {
  const scoresVerts = [1, 2, 3, 4];
  const scoresAdversaire = [0, 1, 2];
  const buteurs = ["Sissoko", "Cafaro", "Cardona", "un CSC"];
  
  const scoreV = scoresVerts[Math.floor(Math.random() * scoresVerts.length)];
  const scoreA = scoresAdversaire[Math.floor(Math.random() * scoresAdversaire.length)];
  const buteur = buteurs[Math.floor(Math.random() * buteurs.length)];
  
  const zoneProno = document.getElementById('affichage-prono');
  if (zoneProno) zoneProno.innerHTML = `🔮 ASSE ${scoreV} - ${scoreA} Marseille <br> <small style="color:#475569;">(Buteur : ${buteur})</small>`;
}

// Moteur de recherche et filtre
function filtrerMatches() {
  const saisie = document.getElementById('barre-recherche').value.toLowerCase();
  if (corpsRecents) {
    const lignes = corpsRecents.getElementsByTagName('tr');
    for (let i = 0; i < lignes.length; i++) {
      const cell = lignes[i].getElementsByTagName('td')[0];
      if (cell) {
        const txt = cell.textContent || cell.innerText;
        lignes[i].style.display = (txt.toLowerCase().indexOf(saisie) > -1) ? "" : "none";
      }
    }
  }
}