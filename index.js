const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PUBLISHABLE_KEY = "pk_test_51MXLY9B0Nn2HlXTpMaaKEvFS4sHcOhTHvJMXFePQa2ue6k6jdb0iAHfWVEfjoXiJ0qEbGIvYrYHXmyTc9vyTEW3V00oPmZRecm"
const SECRET_KEY = "sk_test_51MXLY9B0Nn2HlXTp2U881pLUQtklIwofCSijKLG2AtZdhNLuXgVodhsuM9V8iJE3YIdThsqxQEmNto5LndUStxTY00vRwOE7KK"

const stripe = require('stripe')(SECRET_KEY);
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000

app.get('/', (req, res) =>{
    res.render('Home',{
        key: PUBLISHABLE_KEY
    })

});

app.post('/payment',(req, res)=>{
    stripe.customers.create({
        email: req.body.stripeEmail,
        source:req.body.stripeToken,
        name: 'Ruwan Ranaweera',
        address:{
            line1 : '180 mile post kithulkote , Thanamalwila',
            postal_code: '91300',
            city: 'Thanamalwila',
            country: 'Sri Lanka'
        }
    })
    .then((customer)=>{
        return stripe.charges.create({
            amount:7000,
            description: 'Web development Product',
            currency: 'USD',
            customer:customer.id
        })
    })
    .then((charge)=>{
        console.log(charge)
        res.send("Success");
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.listen(PORT,()=>{
    console.log(`App listening on ${PORT}`); 
})