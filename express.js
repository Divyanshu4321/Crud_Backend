const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user_data = require('./model/schema');
const categaryS = require('./model/categarySchema');
const Product_data = require('./model/productSchema');
const productSchema = require('./model/productSchema');
const bodyParser=require("body-parser");


// Load environment variables
require('dotenv').config();

// Define MongoDB connection URL and server port
const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT;




const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => console.error(err));
app.post('/api/register',async(req, res) => {
    let newUser = new user_data(req.body)
    let existingEmail = await user_data.findOne({ email: newUser.email});
    let existingUserName = await user_data.findOne({ username: newUser.username});
    
    if (existingEmail){
      if(existingUserName){
        if(existingEmail && existingUserName){
        return res.status(488).send("Username and email already in use");
        }
        return res.status(400).send("Username already exists");
      }
      return res.status(409).send("Email already exists");}
    else{
        try{
            await newUser.save()
            res.status(201).send("your account created successfully");
          } catch(e){
            res.status(500).send(e);
        }}
});


app.post('/api/login',async (req,res) => {
  try{
    let newUser = new user_data(req.body)
    let existing = await user_data.findOne({ email:newUser.email,username: newUser.username})
  
    if (!existing) {
      res.status(302).send("Email or username are not valid");
      return; 
    }
    
  if(newUser.username === existing.username){
    if (newUser.password === existing.password){
    res.send({'msg':'login successful'});
    }

    else{
      res.status(402).send("password not valid")
    }}}

catch (e) {
  res.status(480).send("internal server error");
}})


app.post(`/api/Category`,async(req, res) => {
  try{
  let data = req.body.category.trim();
  let category = new categaryS(req.body) 
  let existing = await categaryS.findOne({ category: category.category});
    if(data.length >= 3){

      if(!existing) {
        category.save();
        res.send({msg:"successfull"})
      }
      else{
        res.status(502).send('this category is already exist');
      }
    }
    else{
      res.status(520).send('Please enter a valid category');
    }
  }
  catch(err){
    res.status(501).send('error in adding a category')
  }
});



app.post('/api/editrecords/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id " + id);
    console.log("req body " + req.body);
    let response = await categaryS.findByIdAndUpdate(id, { category: req.body.category });
    if (response) {
      console.log("Updated record:", response);
      res.send("Record updated successfully");
    } else {
      console.log("No record found with ID:", id);
      res.status(404).send("No record found with that ID");
    }
  } catch (error) {
    console.error("Error in updating record:", error);
    res.status(500).send('Error in updation');
  }
});

app.post('/api/deleterecords/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id: " + id);

    // Use findByIdAndDelete instead of findByIdAndRemove
    let response = await categaryS.findByIdAndDelete(id);

    // Check if response is null or not
    if (response) {
      console.log("Deleted record:", response);
      res.send("Record deleted successfully");
    } else {
      console.log("No record found with ID:", id);
      res.status(404).send("No record found with that ID");
    }
  } catch (error) {
    console.error("Error in deleting record:", error);
    res.status(500).send('Error in deletion');
  }
});


app.post(`/api/records`,async(req, res) => {
    let category =await categaryS.find({}); 
    res.send({status:"ok",data:category})
});


app.post(`/api/product`,async(req, res) => {
  try{
  let data = req.body;
  let Product = new Product_data(req.body) //
    Product.save();
        res.send({msg:"successfull"})
      
    }  catch(err){
    res.status(501).send('error in adding a Product')
  }
});


app.post(`/api/product_record`,async(req, res) => {
    let Products =await Product_data.find({}); 
    res.send({status:"ok",data:Products})
});



app.post('/api/deleteProductRecord/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id: " + id);

    // Use findByIdAndDelete instead of findByIdAndRemove
    let response = await Product_data.findByIdAndDelete(id);

    // Check if response is null or not
    if (response) {
      console.log("Product are removed:", response);
      res.send("Product Removed successfully");
    } else {
      console.log("No Product found with ID:", id);
      res.status(404).send("No Product found with that ID");
    }
  } catch (error) {
    res.status(500).send('Error in removeing');
  }
});


app.post('/api/editProductRecord/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id " + id);
    console.log("req body " + req.body);
    let response = await Product_data.findByIdAndUpdate(id, {});
    if (response) {
      console.log("Updated record:", response);
      res.send("Record updated successfully");
    } else {
      console.log("No record found with ID:", id);
      res.status(404).send("No record found with that ID");
    }
  } catch (error) {
    console.error("Error in updating record:", error);
    res.status(500).send('Error in updation');
  }
});



app.listen(PORT, () => {
  console.log('Server started on port 5000');
});
