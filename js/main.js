// Importation de tous les variables
//

export const GAME_WRITE_PAGE = `
<header class="title"></header>

<main>
  <h2>Écris la traduction correcte</h2>
  <h1 class="label"></h1>

  <div class="center">
    <input type="text" class="input">
    <div class="meta">
      <section class="box" id="Ä">Ä</section>
      <section class="box" id="ä">ä</section>
      <section class="box" id="É">É</section>
      <section class="box" id="é">é</section>
      <section class="box" id="Ö">Ö</section>
      <section class="box" id="ö">ö</section>
      <section class="box" id="Ü">Ü</section>
      <section class="box" id="ü">ü</section>
      <section class="box" id="ß">ß</section>
      <section class="spebox">indice 🪄</section>
    </div>
  </div>

  <div class="unknown">
    <button><span class="spone">❓</span>Je ne sais pas</button>
  </div>
</main>
`

export const GAME_SELECT_PAGE = (one, two, tree, four, title) => {
  return (`
  <header class="title">${title}</header>
  
  <main>
    <h2>Sélectionne la bonne réponse</h2>
    <h1 class="label">die Kneipe</h1>
  
    <div class="center">
      <div class="container">
          <div class="option" id="${one}">${one}</div>
          <div class="option" id="${two}">${two}</div>
          <div class="option" id="${tree}">${tree}</div>
          <div class="option" id="${four}">${four}</div>
      </div>
    </div>
  
    <div class="unknown">
      <button><span class="spone">❓</span>Je ne sais pas</button>
    </div>
  </main>
  `)
}

export const GAME_SELECT_CONTAINER = (one, two, tree, four) => {
  return (`
  <div class="container">
    <div class="option" id="${one}">${one}</div>
    <div class="option" id="${two}">${two}</div>
    <div class="option" id="${tree}">${tree}</div>
    <div class="option" id="${four}">${four}</div>
    </div>
  `)
}

export const GAME_2_PAGE = (recto, verso, bad) => {
  return (`
  <header class="title"></header>
  <main>
    <div class="error"><span>Tu as écrit:</span>${bad}</div>
    <div>
      <div class="labelo">ALLEMAND</div>
      <div class="word">${verso}</div>
    </div>
    <div>
      <div class="labelo">FRANÇAIS</div>
      <div class="translation">${recto}</div>
      <hr class="divider">
    </div>
    <div class="button-row">
      <button class="known-btn">Je connais déjà</button>
      <button class="continue-btn">Continuer</button>
    </div>
  </main>
  `)
} 

export const MAIN_HEAD = `
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Eat the V</title>
<link rel="shortcut icon" href="./images/v.jpg" type="image/x-icon">
<link rel="stylesheet" href="css/main.css"/>
`

export const GAME_W_HEAD = `
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Eat the V</title>
<link rel="shortcut icon" href="./images/v.jpg" type="image/x-icon">
<link rel="stylesheet" href="css/game3.css"/>
`

export const GAME_2_HEAD = `
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Eat the V</title>
<link rel="shortcut icon" href="./images/v.jpg" type="image/x-icon">
<link rel="stylesheet" href="css/game2.css"/>
`

export const GAME_S_HEAD = `
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Eat the V</title>
<link rel="shortcut icon" href="./images/v.jpg" type="image/x-icon">
<link rel="stylesheet" href="css/game1.css"/>
`

//
// Fin Importation de tous les variables

let FileName;
let FilePacket;
let PacketPosition = 0
let Packetlenght;
let In_W_PAGE = false
let palabra;

let score = parseInt(localStorage.getItem('score')) || 0;
document.querySelector('.score').innerHTML= score

let BaseName = pocket


let temphtml = ``
BaseName.slice().reverse().forEach(packet => {
  if (packet.name.length >= 20) {
    temphtml += `
      <section class="card">
          <p class="psmall">${packet.name}</p>
          <button class='easy-anticipation' id='${packet.name}'>Continuer</button>
      </section>
    `

  } else {
    temphtml += `
      <section class="card">
          <p class="pbig">${packet.name}</p>
          <button class='easy-anticipation' id='${packet.name}'>Continuer</button>
      </section>
    `
  }
});

document.querySelector('.courses').innerHTML = temphtml


document.querySelectorAll('.easy-anticipation').forEach(btn => {
  btn.addEventListener('click', () => {
    FileName = btn.id
    const GameMode = prompt("Enter the Game Mode: (S/W)").toUpperCase()

    if (GameMode === 'S') {
      swiches_S()
    } else if (GameMode === 'W') {
      lend_W()
      swiches_W()
    }
  })
})

function lend_W() {
  document.body.innerHTML = GAME_WRITE_PAGE
  document.head.innerHTML = GAME_W_HEAD
  document.body.addEventListener('keyup', (e) => {
    if (In_W_PAGE) {
      if (document.querySelector('.input').value === FilePacket[PacketPosition-1]["verso"]) {
        changeInputColor(true)
        setTimeout(() => {
          ThinkToNext()
        }, 1500);
      }
    }
  })
  document.body.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      if (In_W_PAGE) {
        check()
      }
    }
  })
  document.querySelector('.input').addEventListener('blur', () => {
    if (In_W_PAGE) {
      document.querySelector('.input').focus();
    }
  });
  activateSmallBtn()
  setTitle()
  In_W_PAGE = true
}

function localisePacketFile(FileName, base) {
  base.forEach((file) => {
    if (file.name === FileName) {
      FilePacket = file['packet']
    }
  });
}

function shuffle(array) {
  for (let i = array.length; i--;) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function setTitle() {
  document.querySelector(".title").innerHTML = `Spanish - ${FileName}`
}

function swiches_W() {
  localisePacketFile(FileName, BaseName) // Get the Packet (recto/verso)
  setTitle()
  FilePacket = shuffle(FilePacket)
  Packetlenght = FilePacket.length
  activateSmallBtn()
  ThinkToNext()
}

function ThinkToNext(jump=false) {
  if (PacketPosition >= Packetlenght) {
    score += 1;
    localStorage.setItem('score', score);
    window.location.reload()
  } else {
    if (!jump) {
      lend_Info_Label('w')
    } else {
      lend_Info_Label('s')
    }
    PacketPosition += 1 // So that we can go to the next Card
  }
}

function lend_Info_Label(mode='s') {
  if (mode === 'w') {
    document.querySelector('.label').innerHTML = FilePacket[PacketPosition]["recto"]
  } else if (mode === 's') {
    document.querySelector('.label').innerHTML = FilePacket[PacketPosition]["verso"]
    final_lend(tirerTrois(FilePacket, FilePacket[PacketPosition]["recto"]), 'small')

  } else if (mode === 'sBig') {
    final_lend(tirerTrois(FilePacket, FilePacket[PacketPosition]["recto"]), 'big')
    document.querySelector('.label').innerHTML = FilePacket[PacketPosition]["verso"]
  }
}

function check() { // BRAVO !!
  const repuesta = document.querySelector('.input').value
  console.log(FilePacket)


  if (repuesta.toLowerCase() === FilePacket[PacketPosition-1]["verso"].toLowerCase()) {
    changeInputColor(true)
    setTimeout(() => {
      ThinkToNext()
    }, 1500);
  } else {
    changeInputColor(false)
    setTimeout(() => {
      // prompt('Correct: ' + FilePacket[PacketPosition-1]["verso"])
      In_W_PAGE = false
      document.body.innerHTML = GAME_2_PAGE(FilePacket[PacketPosition-1]["recto"], FilePacket[PacketPosition-1]["verso"], repuesta)
      document.head.innerHTML = GAME_2_HEAD
      setTitle()
      document.querySelector(".continue-btn").addEventListener('click', () => {
        lend_W()
        ThinkToNext()
      })
    }, 1500);
  }
}

function changeInputColor(rep) {
  if (rep === true) {
    document.querySelector('.input').classList.add("Correct_input")
    removeColorW(false)
  } else if (rep === false) {
    document.querySelector('.input').classList.add("False_input")
    removeColorW(true)
  } 
  document.querySelector('.input').readOnly = true
}

function removeColorW(voie) {
  if (voie === false) {
    setTimeout(() => {
      document.querySelector('.input').classList.remove("Correct_input")
      document.querySelector('.input').value = ""
      document.querySelector('.input').readOnly = false
    }, 1500);
    
  } else if (voie === true) {
    setTimeout(() => {
      document.querySelector('.input').classList.remove("False_input")
      document.querySelector('.input').value = ""
      document.querySelector('.input').readOnly = false
    }, 1480);
  }

}

function activateSmallBtn() {
  document.querySelectorAll('.box').forEach(btn => {
    btn.addEventListener('click', () => {
      let i = document.querySelector('.input');
      let p = i.selectionStart;
      i.value = i.value.slice(0, p) + btn.id + i.value.slice(i.selectionEnd);
      i.setSelectionRange(p + 1, p + 1);
      if ((document.querySelector('.input').value).toLowerCase() === FilePacket[PacketPosition-1]["verso"].toLowerCase()) {
        check()
      }
    })
  })

  document.querySelector('.input').addEventListener('blur', () => {
    if (In_W_PAGE) {
      document.querySelector('.input').focus();
    }
  });
}

// ===================================== //
function changeColor(rep, btn) {
  if (rep) {
    document.getElementById(btn).classList.add('correct_option')
    setTimeout(() => {
      ThinkToNext(true)
    }, 1500);
  } else {
    document.getElementById(btn).classList.add('bad_option')
    setTimeout(() => {
      // prompt('Correct: ' + FilePacket[PacketPosition-1]["verso"])
      document.body.innerHTML = GAME_2_PAGE(FilePacket[PacketPosition-1]["recto"], FilePacket[PacketPosition-1]["verso"], btn)
      document.head.innerHTML = GAME_2_HEAD
      setTitle()
      document.querySelector(".continue-btn").addEventListener('click', () => {
        lend_Info_Label('sBig')
      })
    }, 1500);
  }
}

function check_S(btn_rep) {
  if (btn_rep === palabra) {
    changeColor(true, btn_rep)
  } else {
    changeColor(false, btn_rep)
  }
}

function final_lend(list, mode='big') {
  if (mode === 'big') {
    document.head.innerHTML = GAME_S_HEAD
    document.body.innerHTML = GAME_SELECT_PAGE(list[0], list[1], list[2], list[3], FileName)
    setTitle()
    activateBigBtn()
  } else if (mode === 'small')
    document.querySelector('.container').innerHTML = GAME_SELECT_CONTAINER(list[0], list[1], list[2], list[3])
    setTitle()
    activateBigBtn()
}


function swiches_S() {
  localisePacketFile(FileName, BaseName) // Get the Packet (recto/verso)
  FilePacket = shuffle(FilePacket)
  Packetlenght = FilePacket.length
  final_lend(tirerTrois(FilePacket, FilePacket[PacketPosition]["recto"]))
  activateBigBtn()
  ThinkToNext(true)
}

function activateBigBtn() {
  document.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', () => {
      check_S(btn.id)
    })
  })
}

function tirerTrois(FilePacket, motAExclure) {
  palabra = motAExclure
  let rectos = FilePacket.map(obj => obj['recto']);
  rectos = rectos.filter(r => r !== motAExclure);

  if (rectos.length < 3) {
    alert("Pas assez de mots après exclusion !");
    location.reload()
  }

  rectos = shuffle(rectos)
  rectos = rectos.slice(0, 3);
  rectos.push(motAExclure)
  rectos = shuffle(rectos)
  return rectos
}