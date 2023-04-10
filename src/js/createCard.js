import { FADE_IN } from "./constans";




const createCard = (json) => {

   const {word, meanings,phonetics,} = json[0],

          arrSpeach = meanings.filter((item)=> item.partOfSpeech),
          speach = arrSpeach.map((item)=>item.partOfSpeech),
          partOfSpeech = speach.join(", "),


          arrAudio = phonetics.filter((item)=> item.audio),
          {audio} = arrAudio[0];

          arrText = phonetics.filter((item)=> item.text),
          {text} = arrText[0],

          {definitions} = meanings[0];
          random = Math.floor(Math.random()*definitions.length);
          definit = definitions[random].definition;



  const  apiName = document.querySelector('.api__name'),
         apiPartOfSpeech = document.querySelector('.api__partOfSpeech'),
         apiText = document.querySelector('.api__text'),
         apiDefinition = document.querySelector('.api__definition'),
         apiAudio = document.querySelector('.api__audio');
    apiAudio.setAttribute('src', audio)
    apiName.innerText =`Name: ${word}`;
    apiPartOfSpeech.innerText = `Speech: ${partOfSpeech}`;
    apiText.innerText = `Text: ${text}`;
    apiDefinition.innerText = `Defination: ${definit}`;



}

export default createCard;
