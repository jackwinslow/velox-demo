// Import basic packages
const express = require('express')
const path = require('path')

// Set app and port
const app = express()
const port = process.env.PORT || 80

// Route to public folder for static pages
app.use(express.static(__dirname + '/public'))

// Route root URL to main page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/main.html'))
})

// Route /contact to contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/contact.html'))
})

// Listen on port for incoming requests
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})