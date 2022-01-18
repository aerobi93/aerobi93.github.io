import { button, livesBar, actionBattle } from './class.js'
const container: HTMLElement | null = document.querySelector(".container");

let  title: string = '<h1 class="header-title">monster slayer </h1>'
let  flexLives: string = '<div class="flexLives"></div>'
let  flexButton: string = '<div class="flexButton"></div>'
container ? container.insertAdjacentHTML('afterbegin', title) : null
container ? container.insertAdjacentHTML('beforeend',flexLives) : null
const AllFlexLives: HTMLElement | null  = document.querySelector(".flexLives")
const playerDiv: ChildNode| null = document.querySelector(".flexLives")!.firstChild
const flexButtonDiv = container!.insertAdjacentHTML('beforeend',flexButton)

const beginGame = function () {
  const actionButton = new button
  const lifeBar = new livesBar
  actionButton.add('attack')
  actionButton.add("specialAttack")
  actionButton.add("heal")
  let giveUp = actionButton.add("giveUp")
  lifeBar.add("you", "warrior.png")
  lifeBar.add("monster", "troll.png")
  document.querySelector('.flexButton-button--giveUp')!.addEventListener("click",endGame)
  document.querySelector('.flexButton-button--begin')!.remove()
  document.querySelector('.flexButton-button--giveUp')!.addEventListener("click",endGame)
  let elbutton =document.querySelectorAll('.flexButton-button')
  for (let el of elbutton) {
    if (!el.classList.contains('flexButton-button--giveUp')) {
      el.addEventListener('click', battle)
    }
  }
}
const endGame = function () {
  let elbutton:NodeListOf<Element> =document.querySelectorAll('.flexButton-button')
  let ellives: NodeListOf<Element> =document.querySelectorAll('.flexLives-flexProgress')
  for (let elToRemove of elbutton) {
    elToRemove.remove()
  }
  for (let elToRemove of ellives) {
    elToRemove.remove()
  }
  begin.add("begin")
  document.querySelector('.flexButton-button--begin')!.addEventListener("click", beginGame)
}
const battle = function (evt: any) {
  console.log('battle')
  let battleClass = new actionBattle(battle)
  evt.target.value == 'heal' ? battleClass.heal() : battleClass.attack(evt.target.value)
}

const begin = new button()
begin.add('begin')
if (begin) {
  document.querySelector('.flexButton-button--begin')!.addEventListener("click", beginGame)
}
 
let observe = new MutationObserver ((MutationRecords) => {
  let lives = document.querySelector('.flexLives')
  let ObserveMyLife = AllFlexLives!.children[0].children[3].getAttribute('value')
  let ObserveMonsterLife = AllFlexLives!.children[1].children[3].getAttribute('value')
  if ( lives) {
    if (lives.children[0]) {
      if ( +ObserveMonsterLife! == 0  || +ObserveMyLife! == 0) {
        endGame()
        beginGame()
      }
      if (MutationRecords[0].target == lives.children[0].children[2]) {
        let elbutton =document.querySelectorAll('.flexButton-button')
        for (let el of elbutton) {
          if (!el.classList.contains('flexButton-button--giveUp')) {
            el.addEventListener('click', battle)
          }

        }
      }
    }
  }
})
observe.observe(document.querySelector('.flexLives')!, { childList: true, subtree: true})