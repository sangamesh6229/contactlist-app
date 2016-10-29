var express = require("express");
var app= express();// inbulid function
var PORT = process.env.PORT || 3000

var mongoose= require("mongoose");
var contact= require("./model/contact")
var bodyParser = require("body-parser")

mongoose.connect("mongodb://localhost/contactlist", function(){
	console.log("sucessfuly connectd with mongoo db")
});
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.json());


app.get("/contatcList",function(req,res){

		contact.getContacts(function(err,data){
			if(err){
				throw err;
			}
			res.json(data);
		})//res

});

app.post("/contatcList", function(req,res){
	var body= req.body;// will fectch body details
	
	contact.AddContact(body,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})


});
app.get("/contatcList/:id", function(req,res){
	var id= req.params.id;
	contact.getContactById(id,function(err,data){
		if(err){
			throw err;
		}
			res.json(data);
})
});
app.put("/contatcList/:id", function(req,res){
	var id=req.params.id;
	var body= req.body;

		contact.UpdateConatct(id,body,function(err,data){
			if(err){
				throw err;
			}
			res.json(data)
		})

})

app.delete("/contatcList/:id",function(req,res){
	var id=req.params.id;
	contact.removeContact(id,function(err,data){
		if(err){
			throw err;
		}
		res.json(data)
	})
})

app.listen(PORT, function(){

	console.log("server is listing at port 3000"+PORT)
})