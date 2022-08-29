
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const csv = require('csvtojson')

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
        if (val[1]['competitor'] === value && (val[1]['day'] >= date[0] && val[1]['day'] <= date[1] )){
          filtered[key] = val[1];
          key++;
        }
      })
    })
  }).then(() => {
    res.send(filtered);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})