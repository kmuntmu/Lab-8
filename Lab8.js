const express = require ('express')
const app = express()


const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://kmun:CCPS530@cluster0.ujd5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(client => {

  console.log('Connected to Database')
  const db = client.db('Lab8')
  const booksCollection = db.collection('books')
  app.set('view engine', 'ejs')
  app.use(express.urlencoded({ extended: true }))
  app.listen(3000, function() {
   console.log('listening on 3000')
  })

  app.get('/', function(req,res){
    const cursor = db.collection('books').find()
    console.log(cursor)
    db.collection('books')
      .find()
      .toArray()
      .then(results => {
        console.log(results)
        res.render('index.ejs',{ books: results })
      })
      .catch(error => console.error(error))      
  })

  app.post('/books', (req, res) => {
    booksCollection
    .insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))   
})

})
.catch(error => console.error(error))


