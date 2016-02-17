var secretKey = 'ilovescotchyscotch';
var mongo = require('mongodb');
var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {
    var token = jsonwebtoken.sign({
        id: user._id,
        name: user.FirstName,
        username: user.UserName,
        last:user.LastName,
        email:user.EmailAddress
    }, secretKey, {
        expirtesIn: 1440
    });

    return token;
}

module.exports = function(app, express) {
    var api = express.Router();
    var db = require('./db');
	api.post('/login',function(req, res){
        var collection = db.get().collection('colUsers');
        collection.find({UserName: req.body.UserName}).toArray(function(err, results){
        if(err) 
        {
            res.send(err);  
            return;
        }
        if(!results) 
        {
            res.send({ message: "User doenst exist"});
        }
        else if(results)
        {
            
            //console.log(results[0]);
            if(results[0].Password != req.body.Password)
            {
                res.send({ message: "Invalid Password " });
            }
            else
            {
                var token = createToken(results);

                res.json({
                    success: true,
                    message: "Successfuly login!" + req.body.username,
                    token: token
                });
            }
        }
        });
	});

    api.use(function(req, res, next) {
        var token = req.headers['x-access-token'];
        // check if token exist
        if(token) {
            jsonwebtoken.verify(token, secretKey, function(err, decoded) {
                if(err) {
                    res.status(403).send({ success: false, message: "Failed to authenticate user"});
                } else {
                    //
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({ success: false, message: "No Token Provided"});
        }
    });

    api.route('/user')

        .post(function(req, res) {
           var collection = db.get().collection('colUsers');
            collection.insertOne({FirstName:req.body.FirstName,UserName: req.body.UserName, Password:req.body.Password, EmailAddress:req.body.EmailAddress, LastName:req.body.LastName, Gender:  req.body.Gender,MobileNo: req.body.MobileNo,Address1: req.body.Address1,Address2: req.body.Address2,Address3: req.body.Address3,Pincode: req.body.Pincode,Landmark: req.body.Landmark,StateID: req.body.StateID,CityID: req.body.CityID,CountryID:req.body.CountryID, AreaID: req.body.AreaID},function(err, result){
                if(err)
                {
                    res.send(err);
                    return;
                }
                
                res.json({message: "User Has been Added"});
            });

            /*user.save(function(err, newUser) {
                if(err) {
                    res.send(err);
                    return
                }
                //io.emit('user', newUser)
                res.json({message: "New User Created!"});
            });*/
        })
        .get(function(req, res) {
            var collection = db.get().collection('colUsers');
            collection.find().toArray(function(err, result){
                if(err) {
                res.send(err);
                return;
            }
                res.json(result);
            });
        });
        api.route('/user/delete')
        .post(function(req, res){
            colUsers.remove({name:req.body.FirstName},function(err, data){
                if(err){
                    res.send(err);
                    return;
                }

                res.json({message:"User Has been deleted!"});
            })
        });

        api.route('/user/update')
        .post(function(req, res){
                var ObjectID = require('mongodb').ObjectID;
                req.body._id = new ObjectID(req.body._id);
                //console.log(res.b);
                 var collection = db.get().collection('colUsers');
                 collection.updateOne({_id: req.body._id},{'$set':{FirstName:req.body.FirstName, Password:req.body.Password, EmailAddress:req.body.EmailAddress, LastName:req.body.LastName, Gender: req.body.Gender,MobileNo: req.body.MobileNo,Address1: req.body.Address1,Address2: req.body.Address2,Address3: req.body.Address3, Pincode: req.body.Pincode,Landmark: req.body.Landmark,StateID: req.body.StateID,CityID: req.body.CityID,CountryID: req.body.CountryID, AreaID: req.body.AreaID}},function(err, result){
                if(err)
                {
                    res.send(err);
                    return;
                }

                 res.json({message:"User Has been updated!"});  
            });
        });

        api.route('/getuser')
        .post(function(req, res){
            var collection = db.get().collection('colUsers');
            collection.find({UserName: req.body.UserName}).toArray(function(err, results){
                if(err)
            {
                res.send(err);
                return;
            }

            res.send(results[0]);
            });
        });
        
        api.route('/getCountryList')
        .post(function(req, res){
            var collection = db.get().collection('colCountry');
            //var Country_id = new mongo.ObjectID(req.body._id);
            //console.log(_id);
            var collectionCountry = [];
            collection.find().toArray(function(err,results){
               if(err) {
                   res.send(err);
                   return;
               }
                //console.log(results);
                for (i=0; i<results.length; i++) 
                {
                    collectionCountry[i] = results[i];
                }
                
                res.send({collectionCountry: collectionCountry});
            });
        });
    
        api.route('/getProductList')
        .post(function(req, res){
            var collection = db.get().collection('colProducts');
            //var Country_id = new mongo.ObjectID(req.body._id);
            //console.log(_id);
            var collectionProducts = [];
            collection.find().toArray(function(err,results){
               if(err) {
                   res.send(err);
                   return;
               }
                //console.log(results);
                for (i=0; i<results.length; i++) 
                {
                    collectionProducts[i] = results[i];
                }
                
                res.send({collectionProducts: collectionProducts});
            });
        });
    
        api.route('/getFrontProductList')
        .post(function(req, res){
            var collection = db.get().collection('colFStyleProduct');
            //var Country_id = new mongo.ObjectID(req.body._id);
            //console.log(_id);
            var collectionFrontProducts = [];
            collection.find().toArray(function(err,results){
               if(err) {
                   res.send(err);
                   return;
               }
                //console.log(results);
                for (i=0; i<results.length; i++) 
                {
                    collectionFrontProducts[i] = results[i];
                }
                
                res.send({collectionFrontProducts: collectionFrontProducts});
            });
        });
        
        api.route('/getStateList')
        .post(function(req, res){
            var collection = db.get().collection('colStates');
            var Country_id = new mongo.ObjectID(req.body._id);
            //console.log(_id);
            var collectionState = [];
            collection.find({'CountryID._id': Country_id}).toArray(function(err,results){
               if(err) {
                   res.send(err);
                   return;
               }
                //console.log(results);
                for (i=0; i<results.length; i++) 
                {
                    collectionState[i] = results[i];
                }
                
                res.send({collectionState: collectionState});
            });
        });
    
        api.route('/getCityList')
        .post(function(req, res){
            var collection = db.get().collection('colCity');
            var state_id = new mongo.ObjectID(req.body._id);
            //console.log(_id);
            var collectionCity = [];
            collection.find({'StateID._id': state_id}).toArray(function(err,results){
               if(err) {
                   res.send(err);
                   return;
               }
                //console.log(results);
                for (i=0; i<results.length; i++) 
                {
                    collectionCity[i] = results[i];
                }
                
                res.send({collectionCity: collectionCity});
            });
        });
    
    api.route('/getAreaByid')
        .post(function(req, res){
            var collection = db.get().collection('colArea');
            var city_id = new mongo.ObjectID(req.body._id);
            //console.log(_id);
            var collectionArea = [];
            collection.find({'CityID._id': city_id}).toArray(function(err,results){
               if(err) {
                   res.send(err);
                   return;
               }
                //console.log(results);
                for (i=0; i<results.length; i++) 
                {
                    collectionArea[i] = results[i];
                }
                
                res.send({collectionArea: collectionArea});
            });
        });
        
        api.route('/getuserbyid')
        .post(function(req, res){
           // MongoClient.connect(db.url, function(err, db1) {
                var collection = db.get().collection('colUsers');
                var CountryCollection = db.get().collection('colCountry');
                var StateCollection = db.get().collection('colStates');
                var CityCollection = db.get().collection('colCity');
                var AreaCollection = db.get().collection('colArea');
                var o_id = new mongo.ObjectID(req.body._id);
                var obj = new Array();
                var collectionUser = [];
                var collectionCountry = [];
                var collectionState = [];
                var collectionCity = [];
                var collectionArea = [];    
            
                collection.find({_id: o_id}).toArray(function(err, results){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    for (i=0; i<results.length; i++) 
                    {
                        //console.log(i);
                        collectionUser[i] = results[i];
                    }
                    
                    var Country_id = new mongo.ObjectID(collectionUser[0].CountryID._id);
                    CountryCollection.find({_id: Country_id },{fields:{'_id':1,'CountryName':1}}).toArray(function(err, result1){
                        if(err){
                            return;
                        }
                        
                        for (i=0; i<result1.length; i++) 
                        {
                            collectionCountry[i] = result1[i];
                        }
                        
                        StateCollection.find({},{fields:{'_id':1,'State':1}}).toArray(function(err, result1){
                            if(err){
                                return;
                            }

                             for (i=0; i<result1.length; i++) {
                                    collectionState[i] = result1[i];
                                }
                            var State_id = new mongo.ObjectID(collectionUser[0].StateID._id);
                            CityCollection.find({'StateID._id': State_id},{fields:{'_id':1,'City':1}}).toArray(function(err, result1){
                                if(err){
                                    return;
                                }

                                 for (i=0; i<result1.length; i++) {
                                        collectionCity[i] = result1[i];
                                    }
                                //var Area_id = new mongo.ObjectID(collectionUser[0].AreaID._id);
                                AreaCollection.find({}).toArray(function(err, result1){
                                    if(err){
                                        return;
                                    }

                                    for (i=0; i<result1.length; i++) 
                                    {
                                        collectionArea[i] = result1[i];
                                    }

                                res.send({collectionUser: collectionUser,
                                        collectionCountry: collectionCountry,
                                         collectionState: collectionState,
                                         collectionCity: collectionCity,
                                         collectionArea: collectionArea});
                                });
                            });
                        });
                    });
                });
            //});
        });    
    
        api.get('/me', function(req, res) {
            res.send(req.decoded);
        });
    
        api.route('/Products/List')
        .get(function(req, res){
            var collection = db.get().collection('colProducts');
            collection.find().toArray(function(err, results){
                if(err){
                    return;
                }
                
                res.send(results);
            });
        });
    
        api.route('/ProductsFront/List')
        .get(function(req, res){
            var collection = db.get().collection('colFStyleProduct');
            var frontStyle = collection.find({});
            console.log(frontStyle.length);
            collection.find().toArray(function(err, results){
                if(err){
                    return;
                }
                //console.log(results);
                
                res.send(results);
                });
            });
        
        api.route('/FrontProductStyle/Add')
        .post(function(req, res){
            var productCol = db.get().collection('colProducts');
            var o_id = new mongo.ObjectID(req.body.ProductID._id);
            productCol.find({_id:o_id}).toArray(function(err, results){
                var collection = db.get().collection('colFStyleProduct');
                console.log(req.body);
            //var o_id = new mongo.ObjectID(req.body._id);
            
                collection.insertOne({FrontStyleType: req.body.FrontStyleType,ProductID:results[0], ImagePath:  req.body.ImagePath},function(err, result1){
                    if(err){
                        return;
                    }

                    res.json({message:'Front Style Product Added Successfully!'});
                });    
            });
            
        });
    
        api.route('/ProductsBack/List')
        .get(function(req, res){
            var collection = db.get().collection('colBStyleProduct');
            //var frontStyle = collection.find({});
            //console.log(frontStyle.length);
            collection.find().toArray(function(err, results){
                if(err){
                    return;
                }
                //console.log(results);
                
                res.send(results);
                });
            });    
    
         api.route('/ProductsSleeve/List')
        .get(function(req, res){
            var collection = db.get().collection('colSStyleProduct');
            //var SleeveStyle = collection.find({});
            //console.log(SleeveStyle.length);
            collection.find().toArray(function(err, results){
                if(err){
                    return;
                }
                //console.log(results);
                
                res.send(results);
                });
            });
    
    api.route('/SleeveProductStyle/Add')
        .post(function(req, res){
            var productBCol = db.get().collection('colBStyleProduct');
            var o_id = new mongo.ObjectID(req.body.BackProductID._id);
            productBCol.find({_id:o_id}).toArray(function(err, results){
                var collection = db.get().collection('colSStyleProduct');
                console.log(req.body);
            //var o_id = new mongo.ObjectID(req.body._id);
            
                collection.insertOne({SleeveTypeStyle: req.body.SleeveStyleType,BackStyleID:results[0], ImagePath:  req.body.ImagePath},function(err, result1){
                    if(err){
                        return;
                    }

                    res.json({message:'Sleeve Style Product Added Successfully!'});
                });    
            });
            
        });
    
        api.route('/BackProductStyle/Add')
        .post(function(req, res){
            var productBCol = db.get().collection('colFStyleProduct');
            var o_id = new mongo.ObjectID(req.body.FrontProductID._id);
            productBCol.find({_id:o_id}).toArray(function(err, results){
                var collection = db.get().collection('colBStyleProduct');
                console.log(req.body);
            //var o_id = new mongo.ObjectID(req.body._id);
            
                collection.insertOne({BackTypeStyle: req.body.BackStyleType,FrontStyleID:results[0], ImagePath:  req.body.ImagePath},function(err, result1){
                    if(err){
                        return;
                    }

                    res.json({message:'Back Style Product Added Successfully!'});
                });    
            });
            
        });
        
        api.route('/Products/Add')
        .post(function(req, res){
            var collection = db.get().collection('colProducts');
            var o_id = new mongo.ObjectID(req.body._id);
            collection.insertOne({ProductName:req.body.ProductName, ForGender: req.body.ForGender, Price: req.body.Price},function(err, results){
                if(err){
                    return;
                }
                
                res.json({message:'Product has been added!'});
            });
        });
    
        return api;
}