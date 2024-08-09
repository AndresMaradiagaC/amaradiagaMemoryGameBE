const express = require('express');
const app = express();
const cors= require('cors');
const port = 3000;

app.use(cors());


const food = 'FOOD';
const faces = 'FACES';
const flags = 'FLAGS';
const pacman = 'PACMAN';


const THEME_TYPE = {
    FOOD: food,
    FACES: faces,
    FLAGS: flags,
    PACMAN: pacman

};
const foodIcons = [
    '🍏', '🍎', '🍐', '🍊', '🍋', '🍋‍🟩', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥','🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🌽', '🥕','🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕','🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕️', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', 
    '🍾', '🧊', '🥄', '🍴', '🥣', '🥡', '🥢', '🧂'];

const facesIcons = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '🙂‍', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', 
    '😢', '😭', '😮', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓',  '🤗', '🤔','🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲','🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷','🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩','👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', 
    '😻', '😼', '😽', '🙀', '😿', '😾'];
const flagsIcons = [
    '🏳️', '🏴', '🏁', '🚩', '🏳️', '🏴‍☠️'
];
const pacmanImages = [
    'fantasma1.png', 'fantasmas2.png', 'fantasmas3.png', 'fantasmas4.png', 'pacman.png'
];







//API
app.get('/cards/:difficulty/:theme', (request, response) =>{
    console.log('difficulty',request.params.difficulty);
    console.log('theme',request.params.theme);
    let cards = [];

    if (request?.params?.theme && request?.params?.difficulty){

    const difficulty =  request.params.difficulty

    switch (request.params.theme) {
        case THEME_TYPE.FOOD:
            cards = getCardsFromIconList(foodIcons, difficulty);
            
            break;
        case THEME_TYPE.FACES:
            cards = getCardsFromIconList(facesIcons, difficulty);

            break;
        case THEME_TYPE.FLAGS:
            cards = getCardsFromIconList(flagsIcons, difficulty);

            break;

        case THEME_TYPE.PACMAN:
            cards = getCardsFromIconList(pacmanImages, difficulty);
    
            break;
    
        default:
            break;
    }
    console.log(cards);
 } 
    response.send (JSON.stringify({'cards':cards}));
});

function getCardsFromIconList(list, quantity) {
    let iconIndexes = [];
    
    for (let index = 0; index < quantity; index++) {
        let iconIndex = getUniqueIndex(0, list.length, iconIndexes);
        iconIndexes.push(iconIndex);
    }

    let cards = [];

    for (let index = 0; index < iconIndexes.length; index++) {
        let icon = list[iconIndexes[index]];
        
        let card = {
            "isDiscovered": false,
            "icon": icon,
            "id": index
        };

        cards.push(card);
    }

    let cardDuplicate = cards.slice();

    cards = cards.concat(cardDuplicate);
    shuffle(cards);

    return cards;
}

    function getUniqueIndex(min, max, iconIndexes) {
        const NewIndex = generateRandomIndex (min, max);

        for (let index = 0; iconIndexes.length; index++) {
        if (NewIndex === iconIndexes[index]){
            return getUniqueIndex(min, max, iconIndexes);
        }
    }

    return NewIndex;
}

function generateRandomIndex(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }

  function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  
  // Used like so
  let arr = [2, 11, 37, 42];
  shuffle(arr);
  console.log(arr);

app.listen(port, () => {
    console.log('MemoryGameBe running');
});

