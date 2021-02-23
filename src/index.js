import app from './app'

const PORT = process.env.PORT || 3000
//./node_modules/.bin/eslint src/app.js
app.listen(PORT, () => {
  console.log('-'.repeat(80))
  console.log(`ES6 Sequelize Deploy App is currently running on ${PORT}`)
  console.log('-'.repeat(80))
})

