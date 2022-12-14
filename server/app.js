
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const csv = require('csvtojson')
const moment = require('moment')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/chart', async (req, res) => {
  const { competitors, date } = req.body;
  let filtered = {};

  await csv().fromFile("./data.csv").then((obj) => {
    let key = 0;

    Object.keys(competitors).forEach(value => {
      Object.entries(obj).forEach((val) => {
        let momentFormat = val[1]['day'].split('/');
        momentFormat = (moment(momentFormat[2] + '-' + momentFormat[1] + '-' + momentFormat[0]).format('YYYY-M-D'));
        if (val[1]['competitor'] === value && (moment(momentFormat).isBetween(date[0], date[1], undefined, []))){
          filtered[key] = val[1];
          key++;
        }
      })
    })
  }).then(() => {
    res.send({
      labels: competitors,
      dataSet: filtered,
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})