const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const Router = require("./routers/Post")
const RouterCmt = require("./routers/Comments")
const RouterUser = require("./routers/Users")
const RouterLikes = require("./routers/Likes")
const db = require('./models')
app.use(express.json())

app.use(cors())


app.use('/posts', Router)

app.use('/comment', RouterCmt)

app.use('/auth', RouterUser)

app.use('/likes', RouterLikes)



db.sequelize.sync().then(() =>{
 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 })
})
