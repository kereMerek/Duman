function init(){
  const isMobile       = window.innerWidth <= 768;
  const cssStarCount   = isMobile ? 250 : 500;
  const particleCount  = isMobile ?  80 : 150;

  // 1) El yapımı CSS yıldız/meteor animasyonları
  const style = ["style1","style2","style3","style4"];
  const tam   = ["tam1","tam1","tam1","tam2","tam3"];
  const opac  = ["opacity1","opacity1","opacity1","opacity2","opacity2","opacity3"];
  function rand(min,max){ return Math.floor(Math.random()*(max-min))+min; }

  // Yıldızları oluştur
  let htmlStars = "";
  for(let i=0;i<cssStarCount;i++){
    htmlStars += `<span class="estrela ${style[rand(0,4)]} ${opac[rand(0,6)]} ${tam[rand(0,5)]}"
      style="animation-delay:.${rand(0,9)}s; left:${rand(0,window.innerWidth)}px; top:${rand(0,window.innerHeight)}px;"></span>`;
  }
  document.querySelector(".constelacao").innerHTML = htmlStars;

  // Meteor yağmuru (sabit bırakabilirsiniz)
  let timeout = rand(5000,10000);
  (function spawnMeteoro(){
    setTimeout(spawnMeteoro, timeout);
    timeout = rand(5000,10000);
    const m = `<div class="meteoro ${style[rand(0,4)]}"></div>`;
    const chute = document.querySelector('.chuvaMeteoro');
    chute.innerHTML = m;
    setTimeout(()=> chute.innerHTML = "", 1000);
  })();

  // 2) Particles.js yıldızlar (çizgisiz, responsive sayıda)
  particlesJS("particles-js", {
    particles: {
      number:       { value: particleCount, density: { enable: true, value_area: 800 } },
      color:        { value: "#ffffff" },
      shape:        { type: ["star"], stroke: { width: 0, color: "#ffffff" } },
      opacity:      { value: 0.7, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.2, sync: false } },
      size:         { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
      line_linked:  { enable: false },
      links:        { enable: false },
      move:         { enable: true, speed: 0.2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      events: {
        onhover: { enable: false },
        onclick: { enable: false }
      }
    },
    retina_detect: true
  });
}

// 1. Bir mesaj havuzu oluştur
const messages = [
  "Seni hala çok seviyorum 😔"
  
  
];

// // 2. Tıklama olayını dinle ve mesaj ekle
// document.addEventListener("click", function(e){
//   // Mesaj seç
//   const msg = messages[Math.floor(Math.random()*messages.length)];

//   // Yeni bir span oluştur
//   const span = document.createElement("span");
//   span.className = "message-star";
//   span.textContent = msg;

//   // Tıklama noktasına yerleştir
//   span.style.left = e.clientX + "px";
//   span.style.top  = e.clientY + "px";

//   // Container'a ekle
//   const container = document.getElementById("message-container");
//   container.appendChild(span);

//   // 3s sonra bırak ve DOM'dan sil
//   setTimeout(()=> {
//     container.removeChild(span);
//   }, 3000);
// });


// Sayfa yüklendiğinde ve yeniden boyutlandırıldığında init() çağrılıyor
window.addEventListener('load', init);
window.addEventListener('resize', () => {
  // Yeniden çizim için önce mevcut CSS yıldızlarını temizle
  document.querySelector(".constelacao").innerHTML = '';
  init();
});
