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
    '🏳️', '🏴', '🏁', '🚩', '🏳️', '🏴‍☠️','🤧', '😷','🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '🤖',
];
const pacmanImages = [
    'f-1.png', 'f-2.png', 'f-3.png', 'f-4.png', 'f-5.png', 'f-6.png', 'f-7.png', 'f-8.png', 'f-9.png', 'f-10.png', 'f-11.png','f-12.png', 'f-13.png', 'f-14.png', 'f-15.png', 'f-16.png','p-5.png', 'pacmanlogo.png'
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
  


app.listen(port, () => {
    console.log('MemoryGameBe running');
});

