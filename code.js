let joueurActuel = 'x';
let joueurX = [];
let x = 0;
let joueurO = [];
let o = 0;

const pour_gagner = [
  ['A1', 'A2', 'A3'],
  ['B1', 'B2', 'B3'],
  ['C1', 'C2', 'C3'],

  ['A1', 'B1', 'C1'],
  ['A2', 'B2', 'C2'],
  ['A3', 'B3', 'C3'],

  ['A1', 'B2', 'C3'],
  ['A3', 'B2', 'C1'],

]


function distribute(button) {
  ajouterCaseDansListe(button)
  remplacerLeBtnParIcon(button, joueurActuel)
  changerDeSigne()
  qui_a_gagner(joueurX)
  qui_a_gagner(joueurO)
  setTimeout(si_egaliter, 1000)
}


function remplacerLeBtnParIcon(button, joueurActuel) {
  document.querySelector(`.div-${button}`).innerHTML = `<img src="icone/${joueurActuel}-icon.png" class="signe-icon">`
}


function ajouterCaseDansListe(button) {
  if (joueurActuel === 'x') {
    joueurX.push(button)

  } else if (joueurActuel === 'o') {
    joueurO.push(button)
  }
}

function qui_a_gagner(joueur) {

  if (joueur.includes('A1') && joueur.includes('A2') && joueur.includes('A3')) {
    desinerLigneGagnant(0)
  } else if (joueur.includes('B1') && joueur.includes('B2') && joueur.includes('B3')){
    desinerLigneGagnant(1)
  } else if (joueur.includes('C1') && joueur.includes('C2') && joueur.includes('C3')){
    desinerLigneGagnant(2)

  } else if (joueur.includes('A1') && joueur.includes('B1') && joueur.includes('C1')){
    desinerLigneGagnant(3)
  } else if (joueur.includes('A2') && joueur.includes('B2') && joueur.includes('C2')){
    desinerLigneGagnant(4)
  } else if (joueur.includes('A3') && joueur.includes('B3') && joueur.includes('C3')){
    desinerLigneGagnant(5)

  } else if (joueur.includes('A1') && joueur.includes('B2') && joueur.includes('C3')){
    desinerLigneGagnant(6)
  } else if (joueur.includes('A3') && joueur.includes('B2') && joueur.includes('C1')){
    desinerLigneGagnant(7)
  }
}


function changerDeSigne() {
  if (joueurActuel === 'x') {
    joueurActuel = 'o';
    document.querySelector('.po').classList.add('po-player')
    document.querySelector('.px').classList.remove('px-player')

  } else if (joueurActuel === 'o') {
    joueurActuel = 'x';
    document.querySelector('.px').classList.add('px-player')
    document.querySelector('.po').classList.remove('po-player')
  }
}



function desinerLigneGagnant(index) {
  const trait = document.querySelector(`.win${index}`)

  trait.classList.add('win-animation')
  stopGame()
}

function si_egaliter() {
  if (joueurX.length === 5) {
    if (joueurO.length === 4) {
      changerDeSigne()
      animationToGo()
      setTimeout(clearAll, 950)
    }
  } else if (joueurO.length === 5) {
    if (joueurX.length === 4) {
      changerDeSigne()
      animationToGo()
      setTimeout(clearAll, 950)
      
    }
  }
}

function stopGame() {
  document.querySelectorAll('.button').forEach((button) => {
    button.remove()
  })
  generer_le_gagnant()
}

function generer_le_gagnant() {
  changerDeSigne()
  if (joueurActuel === 'x') {
    x += 1
  } else if (joueurActuel === 'o') {
    o+= 1
  }

  setTimeout(() => {
    document.querySelector('.box').classList.add('hide-box')
    
    document.body.innerHTML += `

      <div class="winner-box">
        <img src="icone/${joueurActuel}-icon.png" class="winner-icon">
    
        <p class="winner-txt">GAGNANT !</p>

        <button class="rejouer-btn js-rejouer-btn" onclick="clearAll()">Rejouer</button>
      </div>
    `
  }, 1000)

  remover()
}

function remover() {
  document.querySelector('.winner-box')
  .remove()

  document.querySelector('.box').classList.remove('hide-box')

  clearAll()
}

function animationToGo() {
  document.querySelector('.div-A1').classList.add('disparetre')
  document.querySelector('.div-A2').classList.add('disparetre')
  document.querySelector('.div-A3').classList.add('disparetre')

  document.querySelector('.div-B1').classList.add('disparetre')
  document.querySelector('.div-B2').classList.add('disparetre')
  document.querySelector('.div-B3').classList.add('disparetre')

  document.querySelector('.div-C1').classList.add('disparetre')
  document.querySelector('.div-C2').classList.add('disparetre')
  document.querySelector('.div-C3').classList.add('disparetre')

  setTimeout(() => {
    document.querySelector('.div-A1').classList.remove('disparetre')
  document.querySelector('.div-A2').classList.remove('disparetre')
  document.querySelector('.div-A3').classList.remove('disparetre')

  document.querySelector('.div-B1').classList.remove('disparetre')
  document.querySelector('.div-B2').classList.remove('disparetre')
  document.querySelector('.div-B3').classList.remove('disparetre')

  document.querySelector('.div-C1').classList.remove('disparetre')
  document.querySelector('.div-C2').classList.remove('disparetre')
  document.querySelector('.div-C3').classList.remove('disparetre')
  }, 3000)
}

function clearAll() {
  let xLocal;
  let oLocal;

  if (joueurActuel === 'x') {
    xLocal = ''
    oLocal = 'po-player'
    joueurActuel = 'o'

  } else if (joueurActuel === 'o') {
    xLocal = 'px-player'
    oLocal = ''
    joueurActuel = 'x'

  }

  joueurX = [];
  joueurO = [];

  animationToGo()

  setTimeout(() => {
    document.body.innerHTML = `
  
      <div class="top-score">
        <div class="div1 px ${xLocal}">
          <div class="div2"><img src="icone/x-icon.png">:</div>
          <div class="score-txt">${x}</div>
        </div>
  
        <div class="div1 po ${oLocal}">
          <div class="div2"><img src="icone/o-icon.png">:</div>
          <div class="score-txt">${o}</div>
        </div>
      </div>
  
      <div class="box">
        <span class="trait-vertical trait-position2"></span>
        <span class="trait-vertical trait-position1"></span>
        <span class="trait-horizontal trait-position3"></span>
        <span class="trait-horizontal trait-position4"></span>
  
        <span class="trait-horizontal win win0"></span>
        <span class="trait-horizontal win win1"></span>
        <span class="trait-horizontal win win2"></span>
        <span class="trait-vertical win win3"></span>
        <span class="trait-vertical win win4"></span>
        <span class="trait-vertical win win5"></span>
  
        <span class="trait-diagonale win win6"></span>
        <span class="trait-diagonale2 win win7"></span>
  
        <div class="grid-box">
          <div class="div-A1"><button class="A1 button" onclick="distribute('A1')"></button></div>
          <div class="div-A2"><button class="A2 button" onclick="distribute('A2')"></button></div>
          <div class="div-A3"><button class="A3 button" onclick="distribute('A3')"></button></div>
  
          <div class="div-B1"><button class="B1 button" onclick="distribute('B1')"></button></div>
          <div class="div-B2"><button class="B2 button" onclick="distribute('B2')"></button></div>
          <div class="div-B3"><button class="B3 button" onclick="distribute('B3')"></button></div>
  
          <div class="div-C1"><button class="C1 button" onclick="distribute('C1')"></button></div>
          <div class="div-C2"><button class="C2 button" onclick="distribute('C2')"></button></div>
          <div class="div-C3"><button class="C3 button" onclick="distribute('C3')"></button></div>
        </div>
      </div>
    `

  }, 0)

}