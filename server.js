const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.port ||3000;


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine' , 'hbs');

app.use((req , res , next) => {
      var now = new Date().toString();

      var log =`${now} ${req.method} ${req.url}`;
      console.log(log);
      fs.appendFile('serever.log' , log + '\n' , (err) => {
          if(err) {
              console.log('Unable to append to server .log'); 
          }
      });
      next();
});

// app.use((req , res , next) => {
//     res.render('maintaince.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear' , ()=> {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
})

app.get('/' , (req , res) => {
    //res.send('<h1>Hello Express!</h1> ');
    res.render('home.hbs', {
        pageTitle : 'Home page',
        currentYear : new Date().getFullYear(),
        welcomeMessage : 'Welcome to my website'
    })
});

app.get('/about', (req , res) => {
    res.render('about.hbs', {
        pageTitle : 'About page',
       
    });
});

app.get('/bad' , (req , res) => {

    res.send({
        errorMessage : 'Unable to handle request'
    });
    
});


app.listen(port , ()=> {
    console.log(`Server is up on port ${port}`)
}); 