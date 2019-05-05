const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const checkMiddleware = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  next()
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/major', checkMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', checkMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
