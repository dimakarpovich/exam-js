import { FADE_IN } from "./constans";
const createEror = () => {
  const form = document.querySelector('#form');
  const p = document.createElement('p');
  p.classList.add(FADE_IN);
  p.classList.add('error');
  p.innerText = "Word not found!";
  form.append(p);
  setTimeout(()=>{
    p.remove();
  },2000)
}
export default createEror;
