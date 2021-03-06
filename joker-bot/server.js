const express = require('express');
const cors = require('cors');
const { application } = require('express');
const app = express();
const port = 3001;

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('/home/dustin/learning/python/reddit-bots/jesterJS/joker-bot/jokes.db', sqlite3.OPEN_READONLY)

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(`received request from ${req.ip}`);
    console.log(`detail: ${req}`)
    //res.send('Hello World!')
    db.all('SELECT * FROM master_jokes', (err, rows) => {
        if (err) {
            console.error(err.message)
            throw err
        }
        //console.log(rows)
        //jokes.push(row)
        //console.log(jokes)
        res.send(rows)
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
