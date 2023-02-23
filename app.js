const express=require("express");
const request=require("request");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=>{
    const firstname=req.body.fname;
    const lastname=req.body.fname;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
    const jsondata=JSON.stringify(data);
   const url="https://us11.api.mailchimp.com/3.0/lists/4250d01e84"
   const options ={
    method:"POST",
    auth:"Satyam1718:09b3edd489c47c737e49fb50d3398329-us11"
   }

   const request=https.request(url,options,(response)=>{
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",(data)=>{
        console.log(JSON.parse(data));
    });
   });

    request.write(jsondata);
    request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});


// 09b3edd489c47c737e49fb50d3398329-us11 api key
// 4250d01e84 list id