import loderImg from '../image/assets/loader.svg';
import { FADE_IN } from './constans';
import { FADE_OUT } from './constans';
const loader = document.createElement('img');

export const createLoader = () => {
  loader.setAttribute('src' , loderImg );
  console.log(loader);
  loader.classList.add(FADE_IN);
  loader.classList.add('loader');
  const apiWrapper = document.querySelector('.api__wrapper');
  apiWrapper.append(loader);
};

export const removeLoader = () => {
  loader.classList.remove(FADE_IN);
  loader.classList.add(FADE_OUT);
  loader.addEventListener('animationend' , () => loader.remove());
};
