const express = require('express')

const app = express()

const PORT = 8080

const fruits = require('./models/fruits')

// example of an "index" route
app.get('/fruits', (req, res) => {
    res.send(fruits)
})


// GROUPWORK where we added filter requests based of query parameters in the URL
app.get('/filter', (req, res) => {
    console.log(req.query)
    let filterArray = []
    Boolean('false')
    if (req.query.readyToEat) {

        // how to parse a boolean from a string to a value
        // setting a new variable equal to the evaluation of our queury value compared to the string 'true'
        // 'true' === 'true' returns true 
        // else returns false
        let edible = (req.query.readyToEat.toLowerCase() === 'true')
        // if (req.query.readyToEat === 'false'){
        //     edible = false
        // } else {edible = true}                
       
        let edibleFruits = fruits.filter((fruit) => fruit.readyToEat === edible)
        console.log(edibleFruits)
        filterArray = [...edibleFruits]        
    }

    if (req.query.name) {        
        if (req.query.readyToEat === 'false' || req.query.readyToEat === 'true') {
            filterArray = filterArray.filter((fruit) => fruit.name.includes(req.query.name))
            
        } else {
            filterArray = fruits.filter((fruit) => fruit.name.includes(req.query.name))            
        }
    }

    if (req.query.color) {
        if (req.query.readyToEat === 'false' || req.query.readyToEat === 'true' || req.query.name) {
            filterArray = filterArray.filter((fruit) => fruit.color.includes(req.query.color))
        } else {
            filterArray = fruits.filter((fruit) => fruit.color.includes(req.query.color))    
        }
    }

    
    res.send(filterArray)
   
    

   
})

//example of a "show" route
app.get('/fruits/:indexOfFruit', (req, res) => {
    let fruit = fruits[req.params.indexOfFruit]
    if (fruit) {
        res.send(fruit)
    } else { 
        res.send('<h1>ERROR 404: fruit not found :)</h1>')
    }
    // fancy version with an or || statement instead
    // res.send(fruits[req.params.indexOfFruit] || '<h1>ERROR 404: fruit not found :)</h1>')
})

app.get('/', (req, res) => {
    res.send('plant home page')
})

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})

/*
create a route that uses the request queries from the client to filter the fruit data in someway

HINTS: use .filter(), .includes()

Ex. http://localhost:8080/fruits/filter?color=a&readyToEat=true

if (req.query.name.includes())
*/