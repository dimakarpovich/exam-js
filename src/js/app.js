import createEror from "./error";
import createCard from "./createCard";
import { createLoader } from "./loader";
import { removeLoader } from "./loader";
window.addEventListener('DOMContentLoaded', function () {
  // Slider

  const slides = document.querySelectorAll('.slider__item'),
        prev = document.querySelector('.button__prev_bg'),
        next = document.querySelector('.button__next_bg');

  let slideIndex = 1;
  showSlide(slideIndex);
  function showSlide(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }
    slides.forEach((item) => {
      item.style.display = 'none'
    });
    slides[slideIndex - 1].style.display = 'block';

  }
  function plusSlide(n) {
    showSlide(slideIndex += n);
  }
  prev.addEventListener ('click', () =>{
    plusSlide(-1);
  });
  next.addEventListener ('click', () =>{
    plusSlide(1);
  });

  // Carusel

  const carusel = document.querySelector('.list'),
        list = document.querySelector('.list__item'),
        imgs = document.querySelectorAll('.list__img'),
        btnNext = document.querySelector('.button__next_cr'),
        btnPrev = document.querySelector('.button__prev_cr');
  const animate = function () {
    imgs.forEach((img) =>img.animate([
    {transform: 'rotateY(0)'},
    {transform: 'rotateY(25deg)'},
    {transform: 'rotateY(50deg)'},
    {transform: 'rotateY(25deg)'},
    {transform: 'rotateY(0)'}
    ],{
    duration: 2000,
     }));
  }
  listWidth = list.offsetWidth;
  console.log(list.length);
  btnNext.addEventListener('click', ()=>{
    carusel.scrollTo({ left: carusel.scrollLeft + listWidth,
      behavior: "smooth",
    });

  });
  btnPrev.addEventListener('click', ()=>{
    carusel.scrollTo({ left: carusel.scrollLeft - listWidth,
      behavior: "smooth",
    });
    console.log(carusel.scrollLeft);
  });
  btnNext.addEventListener('click', animate);
  btnPrev.addEventListener('click', animate);
  function windowOpen (e) {
    e.preventDefault();
    let src = e.srcElement.attributes[0].nodeValue,
        wind = window.open().document;
        wind.write(`<img src=${src} alt= from old image />`);
        wind.body.firstElementChild.style.width = 100 + '%';
  }

  imgs.forEach((img)=>{
    img.addEventListener('click', windowOpen);
  });


  // Popup
  const div = document.querySelector('.window');

  function openLink(e) {
    e.preventDefault();
    div.style.display = 'block';
    let src1 = e.target.attributes[1].nodeValue,
        img = document.querySelector('.window__img');
    document.body.style.overflow = 'hidden'
    img.setAttribute('src', src1);
  }

  const links = document.querySelectorAll('.wrapper__link'),
        close = document.querySelector('.window__close');

  links.forEach((link)=>link.addEventListener('click', openLink));


  function closeLink () {
    document.querySelector('.window').style.display = 'none';
    document.body.style.overflow = '';
  }

  close.addEventListener('click', closeLink)
  div.addEventListener('click', (e)=>{
    if(e.target === div) {
      closeLink();
    }
  });
  document.addEventListener('keyup', (e)=>{
    if(e.code === "Escape" && div.style.display == 'block') {
      closeLink();
    }
  });
  // Search


  const input = document.getElementById('search');
  // const api = document.querySelector('.api');


  const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => {fn.apply(this, arguments)}
      clearTimeout(timeout)

      timeout = setTimeout(fnCall, ms);
    };
  }
  const handleInput = async (e) => {
    createLoader();
    const value = e.target.value;
    const data = await fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`),
          json = await data.json();
    removeLoader();
    if (data.ok) {
      createCard(json);

    } else {
      createEror();
    }

  }

  const debonceHandle =  debounce(handleInput, 1000);


  input.addEventListener('keydown', debonceHandle);
});

