window.disableScroll = function () {
  // узнаем ширину окна без полосы скролла
  const widthScroll = window.innerWidth - document.body.offsetWidth;

  document.body.dataset.scrollY = window.scrollY;
  document.body.style.cssText = `
    position: fixed;
    top:${-window.scrollY}px;
    left:0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px; 
  `; // предохраняем изодражение от горизонтального сдвига
}
window.enableScroll = function () {
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.dataset.scrollY
  })
}