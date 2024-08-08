const express = require('express');
const app = express();
const cors= require('cors');
const port = 3000;

app.use(cors());

//API
app.get('/cards/:difficulty/:theme', (request, response) =>{
    console.log('difficulty',request.params.difficulty);
    console.log('theme',request.params.theme);

    response.send (JSON.stringify(cardsData));
});


app.listen(port, () => {
    console.log('Server started on port 3000');
});

const cardsData = {
    "cards": [
        {
            "isDiscovered": false,
            "icon": "🥜",
            "id": 49
        },
        {
            "isDiscovered": false,
            "icon": "🍏",
            "id": 0
        },
        {
            "isDiscovered": false,
            "icon": "🥝",
            "id": 16
        },
        {
            "isDiscovered": false,
            "icon": "🥝",
            "id": 16
        },
        {
            "isDiscovered": false,
            "icon": "🥭",
            "id": 13
        },
        {
            "isDiscovered": false,
            "icon": "🥭",
            "id": 13
        },
        {
            "isDiscovered": false,
            "icon": "🍉",
            "id": 6
        },
        {
            "isDiscovered": false,
            "icon": "🥒",
            "id": 22
        },
        {
            "isDiscovered": false,
            "icon": "🍹",
            "id": 56
        },
        {
            "isDiscovered": false,
            "icon": "🥜",
            "id": 49
        },
        {
            "isDiscovered": false,
            "icon": "🍹",
            "id": 56
        },
        {
            "isDiscovered": false,
            "icon": "🍏",
            "id": 0
        },
        {
            "isDiscovered": false,
            "icon": "🥎",
            "id": 53
        },
        {
            "isDiscovered": false,
            "icon": "🍉",
            "id": 6
        },
        {
            "isDiscovered": false,
            "icon": "🥎",
            "id": 53
        },
        {
            "isDiscovered": false,
            "icon": "🥒",
            "id": 22
        }
    ]
}