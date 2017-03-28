var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017');

// Get todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        }
        else{
            res.json(todos);
        }
    });
});

// Get todo
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.Object.Id(req.params.id)    
    },function(err, todo){
        if(err){
            res.send(err);
        }
        else{
            res.json(todos);
        }
    });
});

// Save Todo
router.post('/todo', function (req, res, next){
    var todo = req.body;
    if(!todo.text || (todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else{
                res.json(result);
            }
        });
    }
});

// Update Todo
router.put('/todo/:id', function (req, res, next){
    var todo = req.body;
    var updObj = {};

    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }
    if(todo.text){
        updObj.text = todo.text;
    }
    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todo.update({
            _id: mongojs.OjectId(req.params.id)
        },
        updObj, {}, function(err, result){
            if(err){
                res.send(err);
            } else{
                res.json(result);
            }
        });
    }
});

// Delete Todo
router.delete('/todo/:id', function (req, res, next){

    db.todo.remove({
        _id: mongojs.OjectId(req.params.id)
    }, '', function(err, result){
        if(err){
            res.send(err);
        } else{
            res.json(result);
        }
    });
});



module.exports = router;