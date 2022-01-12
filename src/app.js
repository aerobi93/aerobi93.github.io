const container = document.querySelector(".container");
const round = function (min , max) {
  return Math.round(Math.random() * (max - min) + min)
}
const  moving = async function  (target, intervalSecond, dommage) {
  let start = Date.now(); 
  let timer = setInterval(function() {
  let timePassed = Date.now() - start;
  if (timePassed >= intervalSecond) {
    clearInterval(timer);
    setTimeout(() => {
      target.style.left ='inherit'
      target.style.right ='inherit'
      movesAfterAttack (target, dommage)
    }, 50);
    return;
  }
  draw(timePassed, target);
  }, 20);
}
function draw(timePassed, target) {
  let mylife = document.querySelector(".flexLives").firstChild
  target == mylife.children[0] ? target.style.left = timePassed / 5 + 'px' : target.style.right = timePassed / 5 + 'px'
}

const movesAfterAttack =  async (player, dommage) => {
  let enemyDiv= player.parentElement ==  document.querySelector(".flexLives").firstChild  ?  document.querySelector(".flexLives").lastChild : document.querySelector(".flexLives").firstChild
  let lifeValue  = enemyDiv.children[3].getAttribute("value")
  enemyDiv.children[0].style.backgroundColor='red'
  if (lifeValue - dommage <= 0) {
    enemyDiv.children[2].textContent = `0%`
    enemyDiv.children[3].setAttribute('value', 0)
    enemyDiv.children[4].textContent="a recu " + dommage + " degat"
    setTimeout(() => {
      endGame()
      beginGame()
    }, 500)
    return
  }

  setTimeout(() => {
    enemyDiv.children[0].style.backgroundColor='blue'
    enemyDiv.children[2].textContent = `${lifeValue - dommage}%`
    enemyDiv.children[3].setAttribute('value', lifeValue -dommage)
    enemyDiv.children[4].textContent="a recu " + dommage + " degat"
  }, 50);

}

class Button {
  constructor (buttonName) {
    this.buttonName = buttonName
  }
  add () {  
    let flexButton = document.querySelector('.flexButton')
    let button = `<button class="flexButton-button flexButton-button--${this.buttonName}" value="${this.buttonName}"> ${this.buttonName}</button> `;
    flexButton.insertAdjacentHTML("beforeend", button)
  }
}
class livesBar {
  constructor (lifeName, picture) {
    this.lifeName = lifeName;
    this.picture= picture
  }
  add () {  
    let flex = document.querySelector(".flexLives");
    let life =
     `<figure class="flexLives-flexProgress">
        <img src="asset/${this.picture}" class="flexLives-picture">
        <h3 class="flexLives-livesName">${this.lifeName}</h3>
        <div class="flexLives-value"> 100% </div>
        <progress max="100" value="10" class="flexLives-lifeBar"></progress>
        <span class= "flexLives-message"></span>
      </figure>`;
      
    flex.insertAdjacentHTML("beforeend", life)
  }
}
class actionBattle  {
  constructor (value) {
    this.value = value
    this.lives = document.querySelector(".flexLives")
    let elbutton =document.querySelectorAll('.flexButton-button')
    for (let el of elbutton) {
      if (!el.classList.contains('flexButton-button--giveUp')) {
        el.removeEventListener('click', battle)
      }
    }
  }
 
  heal(){
    let life  = this.lives.firstChild.children[3].getAttribute("value")
    if (+life + 10 > 100) { 
     alert('vie deja au max')
     this.lives.firstChild.children[2].textContent = `${100}%`
     this.lives.firstChild.children[3].setAttribute('value', 100)
     this.lives.firstChild.children[4].textContent = `vous avez recuperez ${100 - +life} point de vie`
    }
    else {
      this.lives.firstChild.children[2].textContent = `${+life + 10}%`
      this.lives.firstChild.children[3].setAttribute('value', +life + 10)
      this.lives.firstChild.children[4].textContent = "vous avez recupere 10p de vie"
    } 
  }
  attack() {
    let life  = this.lives.firstChild.children[3].getAttribute("value")
    let monsterlife  = this.lives.firstChild.children[3].getAttribute("value")
    let intervalSecond = 1000 * 1.5 
    let dommage =""
    this.value == 'attack' ?  dommage = round(0, 3) : dommage  = round(10, 15)
    moving(this.lives.firstChild.children[0], intervalSecond, dommage)
    if ( life - 5  > 0 && monsterlife - dommage >0 ) {
       setTimeout(() => {
        moving(this.lives.lastChild.children[0], intervalSecond, 5)
      },intervalSecond );
    }
   
  }
}

const beginGame = function (evt) {
  new Button("attack").add()
  new Button("specialAttack").add()
  new Button("heal").add()
  new Button("giveUp").add()
  new livesBar("you", "warrior.png").add()
  new livesBar("monster", "troll.png").add()
  document.querySelector('.flexButton-button--begin').remove()
  document.querySelector('.flexButton-button--giveUp').addEventListener("click",endGame)
  let elbutton =document.querySelectorAll('.flexButton-button')
  for (let el of elbutton) {
    if (!el.classList.contains('flexButton-button--giveUp')) {
      el.addEventListener('click', battle)
    }
  }
}
const endGame = function (evt) {
  let elbutton =document.querySelectorAll('.flexButton-button')
  let ellives =document.querySelectorAll('.flexLives-flexProgress')
  for (let el of elbutton) {
    el.remove()
  }
  for (let el of ellives) {
    el.remove()
  }
  new Button("begin").add()
  document.querySelector('.flexButton-button--begin').addEventListener("click", beginGame)
}
const battle = function (evt) {
  evt.target.value == 'heal' ? new actionBattle().heal() : new actionBattle(evt.target.value).attack()
}

let  title = '<h1 class="header-title">monster slayer </h1>'
let  flexLives = '<div class="flexLives"></div>'
let  flexButton = '<div class="flexButton"></div>'
container.insertAdjacentHTML('afterbegin', title)
container.insertAdjacentHTML('beforeend',flexLives)
container.insertAdjacentHTML('beforeend',flexButton)
const PlayerDiv = document.querySelector(".flexLives").firstChild
new Button("begin").add()
document.querySelector('.flexButton-button--begin').addEventListener("click", beginGame)


let observe = new MutationObserver ((MutationRecords) => {
  let lives = document.querySelector('.flexLives')
  if (MutationRecords[0].target == lives.firstChild.children[2]) {
    let elbutton =document.querySelectorAll('.flexButton-button')
    for (let el of elbutton) {
      if (!el.classList.contains('flexButton-button--giveUp')) {
        el.addEventListener('click', battle)
      }
    }
  }
})
observe.observe(document.querySelector('.flexLives'), { childList: true, subtree: true})