export const round = function (min:number , max:number) {
    return Math.round(Math.random() * (max - min) + min)
  }
export const  moving = function  (target: HTMLElement, intervalSecond: number, dommage: number) {
  let start = Date.now(); 
  let life:  string | number | null = target.parentElement!.children[3].getAttribute('value') 
  if (+life! - dommage <= 0) {
    movesAfterAttack (target, dommage)
    return
  }
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
  function draw(timePassed:number, target:HTMLElement) {
    let mylife = document.querySelector(".flexLives")?.children[0]
    if (mylife) {
      target == mylife.children[0] ? target.style.left = timePassed / 5 + 'px' : target.style.right = timePassed / 5 + 'px'
    }
  }
  
  const movesAfterAttack = (player:HTMLElement, dommage: number) => {

    let enemyDiv:  any = player.parentElement == document.querySelector(".flexLives")!.children[0] ?  
      document.querySelector(".flexLives")!.children[1] : 
      document.querySelector(".flexLives")!.children[0]
    enemyDiv!.children[0].style.backgroundColor = 'red'
    let lifeValue  = enemyDiv!.children[3].getAttribute("value")
    if (+lifeValue! - dommage <= 0) {
      enemyDiv!.children[0].style.backgroundColor = 'inherit'
      enemyDiv.children[2].textContent = `0%`
      enemyDiv.children[3].setAttribute('value', '0')
      enemyDiv.children[4].textContent="a recu " + dommage + " degat"
    }
      setTimeout(() => {
      enemyDiv!.children[0].style.backgroundColor = 'inherit'
      enemyDiv.children[2].textContent = `${+lifeValue! - dommage}%`
      enemyDiv.children[3].setAttribute('value', `${+lifeValue! -dommage}`)
      enemyDiv.children[4].textContent="a recu " + dommage + " degat"
      
    }, 100);
  }
  