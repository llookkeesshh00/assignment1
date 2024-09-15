const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
const cors = require('cors');
app.use(cors());



const  connectionTo  = require('./models/connection')
connectionTo();

const studentroutes=require('./routes/studentrouter')
app.use('/student',studentroutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})