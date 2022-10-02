const express=require('express');
const jwt=require('jsonwebtoken');
var jwtSecretKey='transFlower_secret'
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/api/orders',(req,res)=>{
  //let authKey="Authorization";
  let token=req.header('Authorization');
  let extractData=jwt.verify(token,jwtSecretKey);
  if(extractData.client == 'katiyaravesh333@gmail.com'){
    let myOrders=[
        {"orderId":90,"date":"23/3/2022",status:"processed",total:9000},
        {"orderId":91,"date":"12/3/2022",status:"delivered",total:8000},
        {"orderId":92,"date":"21/3/2022",status:"processed",total:2000},
        {"orderId":93,"date":"31/3/2022",status:"inprocessed",total:6000}
    ];
    res.status(200).send(myOrders);
  }
  else{
    res.status(403).send('unauthorization person');
  }

});
app.post('/api/login',(req,res)=>{
  let user=req.body;
  if(user.email=='katiyaravesh333@gmail.com' && user.password=='seeds'){
    //define claim
    let data={
      time:Date(),
      client:user.email
    }
    console.log(data);
    let token=jwt.sign(data,jwtSecretKey)
    console.log(token);
    res.status(200).send(token);
  }
  else{
    res.status(403).send('invalid user');
  }
});

let PORT =process.env.PORT|8888;
app.listen(PORT,()=>{
    console.log(`secure server is listenning on port ${PORT}.......... `);
})