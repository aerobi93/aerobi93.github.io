import { round, moving} from './utils.js'

export const button = class {
    add (buttonName: string) {  
      let flexButton = document.querySelector('.flexButton')
      if (flexButton) {
        let button = `<button class="flexButton-button flexButton-button--${buttonName}" value="${buttonName}"> ${buttonName}</button> `;
        flexButton.insertAdjacentHTML("beforeend", button)
      }
    }
  }
export const livesBar = class {
  add (lifeName :string, picture:string) {  
    let flex = document.querySelector(".flexLives");
    if (flex){
      let life =
      `<figure class="flexLives-flexProgress">
        <img src="asset/${picture}" class="flexLives-picture">
        <h3 class="flexLives-livesName">${lifeName}</h3>
        <div class="flexLives-value"> 100% </div>
        <progress max="100" value="100" class="flexLives-lifeBar"></progress>
        <span class= "flexLives-message"></span>
      </figure>`;  
      flex.insertAdjacentHTML("beforeend", life)
    }
  }
}
  
export  const actionBattle = class {
  lifeFlex: any
  life: string | null | number;
  constructor (eventFunction : any) {
    const  elbutton =document.querySelectorAll('.flexButton-button')
    this.lifeFlex= document.querySelector(".flexLives")
    this.life = this.lifeFlex!.children[0].children[3].getAttribute('value')
    if (!this.lifeFlex || !this.life)  {
      return
    }
    for (let el of elbutton) {
      if (!el.classList.contains('flexButton-button--giveUp')) {
        el.removeEventListener('click', eventFunction)
      }
    }
  }
  heal(){
      let intervalSecond:number = 1000 * 1.5 
      let dommage:number = round(5 ,10)
      if (+this.life! + 10 > 100) { 
        alert('vie deja au max')
        this.lifeFlex!.children[0].children[2].textContent = `${100}%`
        this.lifeFlex!.children[0].children[3].setAttribute('value', '100')
        this.lifeFlex!.children[0].children[4].textContent = `vous avez recuperez ${100 - +this.life!} point de vie`
        moving(this.lifeFlex!.children[1].children[0], intervalSecond, dommage)
      }
      else {
        this.lifeFlex!.children[0].children[2].textContent = `${+this.life! + 10}%`
        this.lifeFlex!.children[0].children[3].setAttribute('value', `${+this.life! + 10}`)
        this.lifeFlex!.children[0].children[4].textContent = "vous avez recupere 10p de vie"
        moving( this.lifeFlex!.children[1].children[0], intervalSecond, dommage)
      } 
    }
  attack(value : string) {
    console.log("attack")
    let intervalSecond = 1000 * 1.5 
    let dommage: number
    value == 'attack' ?  dommage = round(3, 10) : dommage  = round(10, 15)
    moving( this.lifeFlex!.children[0].children[0], intervalSecond, dommage)
    setTimeout(() => {
      moving( this.lifeFlex!.children[1].children[0], intervalSecond, round(5, 10))
    },intervalSecond );
  }
}
