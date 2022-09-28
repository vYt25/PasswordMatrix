
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const Pusher = require('pusher');
const pusher = new Pusher({
    appId: '1246615',
    key: 'b0186d34468dd4116a18',
    secret: 'b6d759cfba6366c3916d',
    cluster: 'ap4'
});


app.post('/review', (req, res) => {
    pusher.trigger('reviews', 'review_added', { review: 'test' });
    res.status(200).send();
});

/*
 * Run app
 */
const port = 5001;
app.listen(port, () => { console.log(`App listening on port ${port}!`) });