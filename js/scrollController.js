document.addEventListener('DOMContentLoaded',() => {
  const main = document.getElementsByTagName('main')[0];

  console.log(main)

  main.addEventListener('scroll', (e) => {
    console.log(e.target.scrollTop);
    e.target.style.marginLeft = (e.target.scrollTop * -Math.sqrt(3)) + 'px'
  })
})
