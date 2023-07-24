const express = require('express');
const { AUTH } = require('./routes/api')
const { TRANSFER } = require('./routes/api')

var app = express();


const cors = require('cors');

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
AUTH(app);
TRANSFER(app);




app.listen(8080, () => {
  console.log(`App listening to http://localhost:8080`);
});

