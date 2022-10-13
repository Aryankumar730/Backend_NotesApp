const connectDB = require('./db');
var cors = require('cors');

connectDB();
const express = require('express')
const app = express()
const port = 8000
app.use(cors())

app.use(express.json())


//available routers
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
