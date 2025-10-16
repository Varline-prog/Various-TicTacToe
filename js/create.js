let pocket = [
  {
    "name": "Table de 3",
    "packet": [
      { "recto": "3×1", "verso": "3" },
      { "recto": "3×2", "verso": "6" },
      { "recto": "3×3", "verso": "9" },
      { "recto": "3×4", "verso": "12" },
      { "recto": "3×5", "verso": "15" },
      { "recto": "3×6", "verso": "18" },
      { "recto": "3×7", "verso": "21" },
      { "recto": "3×8", "verso": "24" },
      { "recto": "3×9", "verso": "27" },
      { "recto": "3×10", "verso": "30" }
    ]
  },
  {
    "name": "Table de 4",
    "packet": [
      { "recto": "4×1", "verso": "4" },
      { "recto": "4×2", "verso": "8" },
      { "recto": "4×3", "verso": "12" },
      { "recto": "4×4", "verso": "16" },
      { "recto": "4×5", "verso": "20" },
      { "recto": "4×6", "verso": "24" },
      { "recto": "4×7", "verso": "28" },
      { "recto": "4×8", "verso": "32" },
      { "recto": "4×9", "verso": "36" },
      { "recto": "4×10", "verso": "40" }
    ]
  },
  {
    "name": "Table de 5",
    "packet": [
      { "recto": "5×1", "verso": "5" },
      { "recto": "5×2", "verso": "10" },
      { "recto": "5×3", "verso": "15" },
      { "recto": "5×4", "verso": "20" },
      { "recto": "5×5", "verso": "25" },
      { "recto": "5×6", "verso": "30" },
      { "recto": "5×7", "verso": "35" },
      { "recto": "5×8", "verso": "40" },
      { "recto": "5×9", "verso": "45" },
      { "recto": "5×10", "verso": "50" }
    ]
  },
  {
    "name": "Table de 6",
    "packet": [
      { "recto": "6×1", "verso": "6" },
      { "recto": "6×2", "verso": "12" },
      { "recto": "6×3", "verso": "18" },
      { "recto": "6×4", "verso": "24" },
      { "recto": "6×5", "verso": "30" },
      { "recto": "6×6", "verso": "36" },
      { "recto": "6×7", "verso": "42" },
      { "recto": "6×8", "verso": "48" },
      { "recto": "6×9", "verso": "54" },
      { "recto": "6×10", "verso": "60" }
    ]
  },
  {
    "name": "Table de 7",
    "packet": [
      { "recto": "7×1", "verso": "7" },
      { "recto": "7×2", "verso": "14" },
      { "recto": "7×3", "verso": "21" },
      { "recto": "7×4", "verso": "28" },
      { "recto": "7×5", "verso": "35" },
      { "recto": "7×6", "verso": "42" },
      { "recto": "7×7", "verso": "49" },
      { "recto": "7×8", "verso": "56" },
      { "recto": "7×9", "verso": "63" },
      { "recto": "7×10", "verso": "70" }
    ]
  },
  {
    "name": "Table de 8",
    "packet": [
      { "recto": "8×1", "verso": "8" },
      { "recto": "8×2", "verso": "16" },
      { "recto": "8×3", "verso": "24" },
      { "recto": "8×4", "verso": "32" },
      { "recto": "8×5", "verso": "40" },
      { "recto": "8×6", "verso": "48" },
      { "recto": "8×7", "verso": "56" },
      { "recto": "8×8", "verso": "64" },
      { "recto": "8×9", "verso": "72" },
      { "recto": "8×10", "verso": "80" }
    ]
  },
  {
    "name": "Table de 9",
    "packet": [
      { "recto": "9×1", "verso": "9" },
      { "recto": "9×2", "verso": "18" },
      { "recto": "9×3", "verso": "27" },
      { "recto": "9×4", "verso": "36" },
      { "recto": "9×5", "verso": "45" },
      { "recto": "9×6", "verso": "54" },
      { "recto": "9×7", "verso": "63" },
      { "recto": "9×8", "verso": "72" },
      { "recto": "9×9", "verso": "81" },
      { "recto": "9×10", "verso": "90" }
    ]
  }
]

let file_indent_name;
let step = 0
let indent = 0
let tour = 0
let end = false
let changeBack = true
let nimero = 0 
let totalCard = 0

function modifieTheDataPacket(fileName, data) { // Pour Modifier les paquet de carte dans la DataBase 
  pocket.forEach(file => {
    console.log(file["name"])
    if (file["name"] === fileName) {
      file["packet"] = data
      console.log(file["packet"])
    }
  })
  saveData()
}

function addData() {
  let recto = document.querySelector('.js-recto').value
  let verso = document.querySelector('.js-verso').value

  if (recto !== "" && verso !== "") {
    pocket.forEach((value) => {
      if (value.name === file_indent_name) {
        value.packet.push(
          {recto: recto, verso: verso}
        )
      }
    })
  
    saveData()

    showChanges(recto, verso)
    recto = document.querySelector('.js-recto').value = ""
    verso = document.querySelector('.js-verso').value = ""
  }
}

function saveData() {
  localStorage.setItem("pocket", JSON.stringify(pocket))
}

function queryQuerey() {
  document.querySelector('.body').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addData()
    }
  })
  document.querySelector('.js-ajouter').addEventListener('click', addData)
  document.querySelector('.js-supprimer').addEventListener('click', supprimer)

  document.querySelector('.js-play').addEventListener("click", () => {
    pocket.forEach(packetName => {
      if (packetName.name === file_indent_name) {
          totalCard = packetName.packet.length * 2
          return
      }
    })
    totalCard +=1

    document.querySelector('.main').innerHTML =  `
      <p class="title">${file_indent_name} <span class="js-total"></span></p>

      <div class="div1-remodel">
        <p class="js-recto-txt">Clique sur Tourner 👇</p>
      </div>

      <div class="div2-btn">
        <button class="play">Tourner</button>
      </div>
      `
      modifierJsTotal()

      let temps;

      document.querySelector('.play').addEventListener('click', () => {
        modifierJsTotal()
        document.querySelector('.div1-remodel').classList.add('animation')
        document.querySelector('.js-recto-txt').classList.add('animation')
        nextCart()
        clearTimeout(temps)
        temps = setTimeout(() => {
          document.querySelector('.div1-remodel').classList.remove('animation')
          document.querySelector('.js-recto-txt').classList.remove('animation')
        }, 730)
      })

  })
}

function nextCart() {
  pocket.forEach((value) => {
    if (value.name === file_indent_name) {
      const max = value.packet.length * 2
      if (tour >= max) {
        end = true
        const func = (num) => {
          document.querySelector('.js-recto-txt').innerHTML = `Retour au menu dans: ${num}`
        }

        let i=3
        setTimeout(() => {
          func(i)
        }, 400)

        setInterval(() => {
          func(i)
          i--
          if (i === 1) {
            setTimeout(() => {
              window.location.href = "index2.html"
            }, 1400)
          }
        }, 1000);
      }
      if (!end) {
        if (step === 0) {

          setTimeout(() => {
            document.querySelector('.js-recto-txt').innerHTML = value.packet[indent].recto
            step += 1
          }, 340)
  
        } else if (step === 1) {
          setTimeout(() => {
            document.querySelector('.js-recto-txt').innerHTML = value.packet[indent].verso
            step += 1
          }, 340)
  
        } else if (step === 2) {
          setTimeout(() => {
            step = 1
            indent += 1
            document.querySelector('.js-recto-txt').innerHTML = value.packet[indent].recto
          }, 340)
  
        }
        tour += 1
      }
    }
  })
}

function showChanges(recto, verso) {
  document.querySelector('.js-recto-txt').innerHTML = recto
  document.querySelector('.js-verso-txt').innerHTML = verso
}

function supprimer() {
  // console.log(changeBack)
  if (document.querySelector('.right').classList.contains('center')) {
      if (changeBack === true) {
        document.querySelector('.js-supprimer').innerHTML = 'Supprimer'
        document.querySelector('.right').classList.remove('center');
        document.querySelector('.right').innerHTML = `
          <div class="right__flex">
            <div class="div1-remodel">
              <p class="js-recto-txt">Recto</p>
            </div>
            <div class="div1-remodel">
              <p class="js-verso-txt">Verso</p>
            </div>
          </div>
          <div class="div2">
            <button class="js-play">Lancer</button>
          </div>
        `
        document.querySelector('.js-play').addEventListener("click", () => {
          document.querySelector('.main').innerHTML =  `
            <p class="title">${file_indent_name}</p>

            <div class="div1-remodel">
              <p class="js-recto-txt">Clique sur Tourner 👇</p>
            </div>

            <div class="div2-btn">
              <button class="play">Tourner</button>
            </div>
            `

            let temps;

            document.querySelector('.play').addEventListener('click', () => {
              document.querySelector('.div1-remodel').classList.add('animation')
              document.querySelector('.js-recto-txt').classList.add('animation')
              nextCart()
              clearTimeout(temps)
              temps = setTimeout(() => {
                document.querySelector('.div1-remodel').classList.remove('animation')
                document.querySelector('.js-recto-txt').classList.remove('animation')
              }, 730)
            })
  })
      }
  } else {
    let html = '';
    
    document.querySelector('.js-supprimer').innerHTML = 'Annuler'
    document.querySelector('.right').classList.add('center')
    document.querySelector('.right').innerHTML = `
    <div action="#">
      <div class="file-div">
        <h2>Supprimer une carte</h2>
        
      </div>
    </div>
    `

    pocket.forEach((value, i) => {
      if (value.name === file_indent_name) {
        pocket[i].packet.forEach((card) => {
          html += `
            <button class="user-file deleteBtn">
              <p>n°${i+=1}</p>
              <p>${card.recto}</p>
              <p>${card.verso}</p>
            </button>
          `
        })
        return
      }
    })

    document.querySelector('.file-div').innerHTML += html
    document.querySelectorAll('.deleteBtn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        // console.log('DELETE THAT THING: ' + i)
        vraimentSuprimer(i)
      })
    })
  }
}


function vraimentSuprimer(i) {
  let html = '';
  pocket.forEach((value) => {
    if (value.name === file_indent_name) {
      value.packet.splice(i, 1)
      // console.log(pocket)
      saveData()
    }
  })

  document.querySelector('.right').innerHTML = `
    <div action="#">
      <div class="file-div">
        <h2>Supprimer une carte</h2>
        
      </div>
    </div>
    `

  pocket.forEach((value, i) => {
    if (value.name === file_indent_name) {
      pocket[i].packet.forEach((card) => {
        html += `
          <button class="user-file deleteBtn">
            <p>n°${i+=1}</p>
            <p>${card.recto}</p>
            <p>${card.verso}</p>
          </button>
        `
      })
      return
    }
  })
  document.querySelector('.file-div').innerHTML += html
    document.querySelectorAll('.deleteBtn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      // console.log('DELETE THAT THING: ' + i)
      vraimentSuprimer(i)
    })
  })
  changeBack = false;
  supprimer()
  changeBack = true
}


document.querySelector('.js-valider').addEventListener('click', () => {
  charabiaDeLaSuite()
})

document.querySelector('.body').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && nimero === 0) {
    nimero++
    charabiaDeLaSuite()
  }
})

function charabiaDeLaSuite() {
   if (saveName() === true) {
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
   
     document.querySelector('.js-play').addEventListener("click", () => {
      pocket.forEach(packetName => {
        if (packetName.name === file_indent_name) {
          totalCard = packetName.packet.length * 2
          return
        }
      })

      document.querySelector('.main').innerHTML = `
         <p class="title">${file_indent_name}</p>
         <div class="div1-remodel">
           <p class="js-recto-txt">Recto</p>
         </div>
   
         <div class="div2-btn">
           <button class="play">Tourner</button>
         </div>
         `
   
       let temps;
   
       document.querySelector('.play').addEventListener('click', () => {
         document.querySelector('.div1-remodel').classList.add('animation')
         document.querySelector('.js-recto-txt').classList.add('animation')
         nextCart()
         clearTimeout(temps)
         temps = setTimeout(() => {
           document.querySelector('.div1-remodel').classList.remove('animation')
           document.querySelector('.js-recto-txt').classList.remove('animation')
         }, 730)
       })
   
     })
   }
}

function saveName() {
  file_indent_name = document.querySelector('.name-input').value
  if (file_indent_name !== '') {
    let boool = false
  
    pocket.forEach((value) => {
      if (value.name === file_indent_name) {
        // console.log(value.name)
        boool = true
      }
    })
  
    if (boool === false) {
      pocket.push({
        name: file_indent_name,
        packet: []
      })
      return true
  
    } else {
      nimero = 0
      document.querySelector('.name-input').placeholder = 'CE NOM A ÉTÉ DÉJA PRIS ⚠️'
      setTimeout(() => {
        document.querySelector('.name-input').placeholder = 'ex: Fichier2'
      }, 2000)
      file_indent_name = document.querySelector('.name-input').value = ''
      return false
    }
  } else {
    nimero = 0
  }
}

function modifierJsTotal() {
  if (totalCard != 0) {
    totalCard -= 1
    document.querySelector('.js-total').innerHTML = `(${totalCard})`
  }
}