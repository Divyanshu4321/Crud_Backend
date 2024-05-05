// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const categaryS = require('./model/categarySchema')
// const user_data = require('./model/schema');

// const app = express();
// app.use(express.json());
// app.use(cors());
// let db;
// mongoose
//   .connect('mongodb://localhost:27017/crud-application')
//   .then((x) => {
//     db = x.Connection.name;
//     console.log('Database connected successfully',db);
//   })
//   .catch((err) => console.error(err));

// app.post(`/api/Category`,async(req, res) => {
//   console.log(req.body);
//     let category = new categaryS(req.body) 
//     category.save();
//     res.send({msg:"successfull"})
//     console.log(category);
// });

// app.post(`/api/records`,async(req, res) => {
//   console.log(req.body);
//     let category =await categaryS.find({}); 
//     res.send({status:"ok",data:category})
//     console.log(category);
// });


// app.listen(9000, () => {
//   console.log('Server started on port 9000');
// });
