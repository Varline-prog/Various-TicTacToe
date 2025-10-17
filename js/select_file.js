let html = ``
let modSupprimer = false

let actualFileIndex = 0
let boxValues = 0;
let boxValuesList = [];

listAllFiles()




// alert('Le bug est que tu ne peut pas Supprimer des fichiers en CONSéCUTIF')

function deletePacket(index) {
  pocket.splice(index, 1)
  saveData()
  modSupprimer = true
  listAllFiles()
  elBouton.classList.add('dossier__div__button--selected')
  elBouton.innerHTML = 'Annuler'
  document.querySelectorAll('.user-file2').forEach(btn => {
    btn.classList.add('dossier__div__button--selected')
  })
}



function nextCartForSELECT() {
  pocket.forEach((value) => {
    if (value.name === boxValuesList[actualFileIndex]) {
      let max2 = value.packet.length * 2

      if (tour >= max2) {
        console.log('boxValuesList.length: ' + boxValuesList.length)
        console.log('actualFileIndex: ' + actualFileIndex)

        // ✅ Corriger ici :
        if (actualFileIndex + 1 < boxValuesList.length) {
          actualFileIndex += 1
          indent = 0        // reset carte index
          tour = 0          // reset compteur de tours
          step = 0          // recommencer par recto
          return            // sortir du forEach, pour éviter exécutions multiples
        } else {
          // ✅ Fin : Retour au menu
          alert('oui')
          end = true
          const func = (num) => {
            document.querySelector('.js-recto-txt').innerHTML = `Retour au menu dans: ${num}`
          }
          let i = 3
          setInterval(() => {
            func(i)
            i--
            if (i === 0) {
              setTimeout(() => {
                window.location.href = "index2.html"
              }, 1400)
            }
          }, 1000)
        }
      }

      if (!end) {
        if (step === 0) {
          setTimeout(() => {
            document.querySelector('.js-recto-txt').innerHTML = value.packet[indent].recto
            step = 1
          }, 340)

        } else if (step === 1) {
          setTimeout(() => {
            document.querySelector('.js-recto-txt').innerHTML = value.packet[indent].verso
            step = 2
          }, 340)

        } else if (step === 2) {
          setTimeout(() => {
            indent += 1
            if (indent < value.packet.length) {
              document.querySelector('.js-recto-txt').innerHTML = value.packet[indent].recto
              step = 1
            }
          }, 340)
        }

        tour += 1
      }
    }
  })
}

function activateMultipleMode() {

  multipleModeBtn = document.querySelector('.js-multipleMode')
  btnAnuler = document.querySelector('.dossier__div--delete')
  hardCard = document.querySelector('.js-carte-hard')

  hardCard.addEventListener('click', () => {
    activateHardCard()
  })

  multipleModeBtn.addEventListener('click', () => {
    eventForClick()
  })

  
  function activateHardCard() {
    pocket.forEach((value) => {
      if (value.name === 'V-25/HARD/52-V') {
        alert('Find !')
      }
    })
  }

  function eventForClick() {
    if (multipleModeBtn.innerHTML === 'Valider') {
      btnAnuler.innerHTML = 'Supprimer'
      
      document.querySelector('.toDelBtn').innerHTML = `
        <button class="dossier__div--delete">Supprimer</button>
      `
      activateDellButton()
      listAllFiles()
  
    } else {
      document.querySelector('.toDelBtn').innerHTML = `
        <button class="dossier__div--delete--moded">Annuler</button>
      `
      document.querySelector('.dossier__div--delete--moded').addEventListener('click', () => {
          document.querySelector('.toDelBtn').innerHTML = `
          <button class="dossier__div--delete">Supprimer</button>
        `
        activateDellButton()
        listAllFiles()
      })
  
      html = ``
      // slice().reverse().
      pocket.forEach((value, i) => {
        if (value.name !== 'V-25/HARD/52-V') {
          html += `
            <label class="user-file20">
              <input type="checkbox" class='js-checkdiv' value="${value.name}"/>
              ${value.name}
            </label>
          `
        }
      });
      html += `
        <button class="user-file20 user-file20--modded user-file20-btn js-multipleMode">Valider</button>
      `
      document.querySelector('.oopsTedyDie').innerHTML = html
      
      multipleModeBtn = document.querySelector('.js-multipleMode')
      multipleModeBtn.addEventListener('click', () => {
        document.querySelectorAll('.js-checkdiv:checked').forEach((box) => {
          // ELLIOT 
          boxValues += 1
          boxValuesList.push(box.value)
        })

        boxValuesList.forEach(nom => {
          pocket.forEach(packetName => {
            if (packetName.name === nom) {
              totalCard += packetName.packet.length * 2
            }
          })
        })
        
  
        console.log(boxValues)
        console.log(boxValuesList)
        
  
        document.querySelector('.main').innerHTML =  `
          <p class="title">Flash the V  <span class="js-total">()</span></p>
  
          <div class="div1-remodel">
            <p class="js-recto-txt">Clique sur Tourner 👇</p>
          </div>
  
          <div class="div2-btn">
            <button class="play">Tourner</button>
          </div>
          `
        totalCard +=1
        modifierJsTotal()
  
          let temps;
  
          document.querySelector('.play').addEventListener('click', () => {
            modifierJsTotal()
            document.querySelector('.div1-remodel').classList.add('animation')
            document.querySelector('.js-recto-txt').classList.add('animation')
            nextCartForSELECT()
            clearTimeout(temps)
            temps = setTimeout(() => {
              document.querySelector('.div1-remodel').classList.remove('animation')
              document.querySelector('.js-recto-txt').classList.remove('animation')
            }, 730)
          })
      })
    }
  } 
}


function listAllFiles() {
  html = ``
  // slice().reverse().
  pocket.forEach((value, i) => {
    if (value.name !== 'V-25/HARD/52-V') {
      html += `
        <button class="user-file2">
          n°${i+1} - ${value.name}
        </button>
        `
    }
  
  });
      

  html += `
      <div class='bottom-function'>
        <button class="user-file20 user-file20-btn js-multipleMode functionality-btn">Mode multiple</button>

        <button class="functionality-btn js-carte-hard">EAT THE V</button>
      </div>
    `

  document.querySelector('.oopsTedyDie').innerHTML = html
  document.querySelector('.js-carte-hard').addEventListener('click', () => {
    window.location.href = "./main.html"
  })

  activateMultipleMode() // Et aussi pour 'js-carte-hard'
  document.querySelectorAll('.user-file2').forEach((value, index) => {
    value.addEventListener('click', () => {
      if (!modSupprimer) {
        file_indent_name = pocket[index].name      
    
        document.querySelector('.main').innerHTML = `
          <p class="title">Flash the V</p>
        
          <div class="centerBox">
            <div class="left">
              <div class="div1">
                <h2>Recto</h2>
                <input type="text" placeholder="ex: Bonjour !" class="js-recto input">
              </div>
        
              <div class="div1">
                <h2>Verso</h2>
                <input type="text" placeholder="ex: Good morning !" class="js-verso input">
              </div>
              <div class="div2">
                <button class="js-ajouter">Ajouter</button>
                <button class="js-supprimer">Supprimer</button>
              </div>
            </div>
            <div class="right">
              <div class="right__flex">
                <div class="div1-remodel">
                  <p class="js-recto-txt">Recto</p>
                </div>
                <div class="div1-remodel">
                  <p class="js-verso-txt">Verso</p>
                </div>
              </div>
              <div class="div2">
                <!-- <form action="./play.html"> -->
                <button class="js-play">Lancer</button>
                <!-- </form> -->
              </div>
            </div>
          </div>
        `
        queryQuerey()
      } else {
        deletePacket(index)
      }
    })
  })

}


document.querySelectorAll('.user-file2').forEach((value, index) => {
  value.addEventListener('click', () => {
    if (!modSupprimer) {
      file_indent_name = pocket[index].name      
  
      document.querySelector('.main').innerHTML = `
        <p class="title">Flash the V</p>
      
        <div class="centerBox">
          <div class="left">
            <div class="div1">
              <h2>Recto</h2>
              <input type="text" placeholder="ex: Bonjour !" class="js-recto input">
            </div>
      
            <div class="div1">
              <h2>Verso</h2>
              <input type="text" placeholder="ex: Good morning !" class="js-verso input">
            </div>
            <div class="div2">
              <button class="js-ajouter">Ajouter</button>
              <button class="js-supprimer">Supprimer</button>
            </div>
          </div>
          <div class="right">
            <div class="right__flex">
              <div class="div1-remodel">
                <p class="js-recto-txt">Recto</p>
              </div>
              <div class="div1-remodel">
                <p class="js-verso-txt">Verso</p>
              </div>
            </div>
            <div class="div2">
              <!-- <form action="./play.html"> -->
              <button class="js-play">Lancer</button>
              <!-- </form> -->
            </div>
          </div>
        </div>
      `
      queryQuerey()
    } else {
      deletePacket(index)
    }
  })
})

activateDellButton()

function activateDellButton() {
  const elBouton = document.querySelector('.dossier__div--delete')
  elBouton.addEventListener('click', () => {
    checkIt()
  })
  
  function checkIt() {
    if (elBouton.classList.contains('dossier__div__button--selected')) {
      elBouton.classList.remove('dossier__div__button--selected')
      document.querySelectorAll('.user-file2').forEach(btn => {
        btn.classList.remove('dossier__div__button--selected')
      })
      elBouton.innerHTML = 'Supprimer'
      modSupprimer = false
    } else {
      elBouton.classList.add('dossier__div__button--selected')
      elBouton.innerHTML = 'Annuler'
      document.querySelectorAll('.user-file2').forEach(btn => {
        btn.classList.add('dossier__div__button--selected')
      })
      modSupprimer = true
    }
  }
}