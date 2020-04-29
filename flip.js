console.log("yew!")

const div = document.querySelector('.card')
div.addEventListener('click', toggle)


// if card match cards will stay face up
// else displayed for one second before flipping over again

function addClass(e) { // this works
  // console.dir(e.target.parentNode)
  const parent = e.target.parentNode
  parent.classList.add('is-flipped')
  // remove class after x seconds per the specs
}

function toggle(e) { // this works 
  const parent = e.target.parentNode
  parent.classList.toggle('is-flipped');
}