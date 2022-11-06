const express = require('express');
const cors = require('cors');
const { application } = require('express');
const app = express();
const port = 3001;

const sqlite3 = require('sqlite3').verbose()



app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(`received request from ${req.ip}`);
    console.log(`detail: ${req}`)
    //res.send('Hello World!')
    console.log(`opening DB!`)
    const db = new sqlite3.Database('/home/dustin/learning/python/reddit-bots/jesterJS/joker-bot/jokes.db', sqlite3.OPEN_READONLY)

    db.all('SELECT * FROM jokes', (err, rows) => {
        if (err) {
            console.error(err.message)
            throw err
        }
        //console.log(rows)
        //jokes.push(row)
        //console.log(jokes)
        console.log(`sending jokes!`);
        res.send(rows)
    })

    db.close();
});

app.get('/10jokes', (req, res) => {
    console.log(`received a request on /10jokes endpoint`);

    console.log(`opening DB!`)
    const db = new sqlite3.Database('/home/dustin/learning/python/reddit-bots/jesterJS/joker-bot/jokes.db', sqlite3.OPEN_READONLY)

    //  write sql statement to select 100 jokes
    let start = 100;
    let end = 200;
    let sql = `SELECT * FROM jokes WHERE id BETWEEN ${start} AND ${end}`;

    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message)
            throw err
        }
        console.log(`sending jokes!`);
        console.log(rows);
        res.send(rows);
    })

    db.close();
})
/*
app.get('/jokes/:start/:qty', (req, res) => {
    console.log(`got parameterized route request...`);
    console.log(`req params: ${JSON.stringify(req.params)}`)

    const start = req.params.start;
    const qty = req.params.qty;
    const end = Number(start) + Number(qty);

    console.log(`opening DB!`)
    const db = new sqlite3.Database('/home/dustin/learning/python/reddit-bots/jesterJS/joker-bot/jokes.db', sqlite3.OPEN_READONLY)

    //  write sql statement to select 100 jokes
    let sql = `SELECT * FROM jokes WHERE id BETWEEN ${start} AND ${end}`;

    console.log(sql);

    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message)
            throw err
        }
        console.log(`sending jokes!`);
        //console.log(rows);
        res.send(rows);
        //res.send('ok')
    })

    db.close();

})
*/
app.get('/jokes/:page/:qty', (req, res) => {
    console.log(`got parameterized route request...`);
    console.log(`req params: ${JSON.stringify(req.params)}`)

    const page = parseInt(req.params.page);
    const qty = parseInt(req.params.qty);
    const start = page * qty;
    const end = ((page + 1) * qty) - 1;

    console.log(`opening DB!`)
    const db = new sqlite3.Database('/home/dustin/learning/python/reddit-bots/jesterJS/joker-bot/jokes.db', sqlite3.OPEN_READONLY)

    //  write sql statement to select 100 jokes
    let sql = `SELECT * FROM jokes WHERE id BETWEEN ${start} AND ${end}`;

    console.log(sql);

    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message)
            throw err
        }
        console.log(`sending jokes!`);
        //console.log(rows);
        res.send(rows);
        //res.send('ok')
    })

    db.close();

})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
