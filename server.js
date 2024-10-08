const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const axios = require('axios');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());



const food = 'FOOD';
const faces = 'FACES';
const flags = 'FLAGS';
const pacman = 'PACMAN';
const mario = 'MARIO';
const sonic = 'SONIC';




const THEME_TYPE = {
    FOOD: food,
    FACES: faces,
    FLAGS: flags,
    PACMAN: pacman,
    MARIO: mario,
    SONIC: sonic

};
const foodIcons = [
    '🍏', '🍎', '🍐', '🍊', '🍋', '🍋‍🟩', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥','🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🌽', '🥕','🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕','🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕️', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', 
    '🍾', '🧊', '🥄', '🍴', '🥣', '🥡', '🥢', '🧂'];

const facesIcons = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '🙂‍', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', 
    '😢', '😭', '😮', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓',  '🤗', '🤔','🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲','🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷','🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩','👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', 
    '😻', '😼', '😽', '🙀', '😿', '😾'];
const flagsIcons = [
    '🏳️', '🏴', '🏁', '🚩', '🏳️', '🏴‍☠️','🤧', '😷','🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '🤖',
];
const pacmanImages = [
    'f-1.png', 'f-2.png', 'f-3.png', 'f-4.png', 'f-5.png', 'f-6.png', 'f-7.png', 'f-8.png', 'f-9.png', 'f-10.png', 'f-11.png','f-12.png', 'f-13.png', 'f-14.png', 'f-15.png', 'f-16.png','p-5.png', 'pacmanlogo.png'
];

const marioImages = [
    'm-1.png', 'm-2.png', 'm-3.png', 'm-4.png', 'm-5.png', 'm-6.png', 'm-7.png', 'm-8.png', 'm-9.png', 'm-10.png', 'm-11.png','m-12.png', 'm-13.png', 'm-14.png', 'm-15.png', 'm-16.png','m-17.png'
];

const sonicImages = [
    's-1.png', 's-2.png', 's-3.png', 's-4.png', 's-5.png', 's-6.png', 's-7.png', 's-8.png', 's-9.png', 's-10.png', 's-11.png','s-12.png', 's-13.png', 's-14.png','s-16.png','s-17.png'
];
const databaseURL ='https://amaradiagamemorygame-default-rtdb.firebaseio.com/scores.json';



app.post('/scores', (request, response) => {
	let body = [];
	request.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		const jsonData = Buffer.concat(body).toString();
		if (jsonData !== undefined) {
			const score = JSON.parse(jsonData);
			if (score !== undefined &&
				score.clicks !== undefined &&
				score.time !== undefined &&
				score.score !== undefined &&
				score.username !== undefined &&
				score.difficulty !== undefined) {

				axios.post(databaseURL, score).then(function (result) {
					response.send('Score saved!');
				}).catch(function (error) {
					response.send(error);
				});

			} else {
				response.send('Some data in score undefined or null!');
			}
		} else {
			response.send('request.body undefined or null!');
		}
	});
});


app.get('/scores', (request, response) => {
	axios.get(databaseURL)
		.then(function (res) {
			response.send(res.data);
		})
		.catch(function (error) {
			response.send(JSON.stringify({ error: 'Error requestion scores' }));
		})
		.finally(function () {
			// always executed
		});
});

//app.get('/scores', (request, response) => {
//	axios.get(databaseURL)
	//	.then(function (res) {
	//		response.send(res.data);
	//	})
	//	.catch(function (error) {
//			response.send(JSON.stringify({ error: 'Error requestion scores' }));
	//	})
	//	.finally(function () {
	//		// always executed
	//	});
//});


//API
app.get('/cards/:difficulty/:theme', (request, response) =>{
    console.log('difficulty',request.params.difficulty);
    console.log('theme',request.params.theme);
   
    let cards = [];

    if (request?.params?.theme && request?.params?.difficulty){

    const difficulty =  request.params.difficulty;

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

        case THEME_TYPE.MARIO:
            cards = getCardsFromIconList(marioImages, difficulty);
        
             break;
        case THEME_TYPE.SONIC:
            cards = getCardsFromIconList(sonicImages, difficulty);
            
             break;
    
        default:
            break;
    }
    console.log(cards);
 } 
    response.send (JSON.stringify({'cards': cards}));
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

	let cardsDuplicate = cards.slice();
	cards = cards.concat(cardsDuplicate);
	shuffle(cards);

	return cards;
}

    function getUniqueIndex(min, max, iconIndexes) {
        const newIndex = generateRandomIndex (min, max);

        for (let i = 0; i < iconIndexes.length; i++) {
            if (newIndex === iconIndexes[i]){
                return getUniqueIndex(min, max, iconIndexes)
            }
            
        }

    return newIndex;
}

function generateRandomIndex(min, max) {
    return Math.floor(min + Math.random()*(max - min))
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
  


app.listen(port, () => {
    console.log('MemoryGameBe running');
});

