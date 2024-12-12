const express = require('express')
const router = express.Router()
const path = require('path')

const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const Data = require('../bd/Data')
const { json } = require('express')

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(upload.array())

class Api {
    static router = router;
    model = new Data();
    static logDash = () => { console.log("-----------------------------------"); }
    getAll = (req,res) => {
        Api.logDash();
        console.log("getting_all: start...");

        this.model.read_all((data)=>{
            res.status(200).jsonp(data)
            res.end()
            console.log("getting_all: terminated success");
        },
        ()=>{
            res.status(404).end()
            console.log("getting_all: terminated failed");
        })
    }

    getOne = (req,res) => {
        Api.logDash();
        console.log("getting_one: start...");

        this.model.getUnique(((data)=>{
            res.status(200).jsonp(data)
            res.end()
            console.log("getting_one: terminated success");
        }),
        ()=>{
            res.status(404).end();
            console.log("getting_one: terminated failed");
        }
        ,req.params.id)
    }
    putOne = (req,res) => {
        Api.logDash();
        console.log("putting: start...");

        this.model.add((data)=>{
            res.jsonp(data)
            res.status(200).end()

            console.log("putting: terminated success");
            },
            ()=>{
                res.status(404).end();
                console.log("putting: terminated failed");
            },
            req.body
        )
    }
    getCount = (req,res) => {
        Api.logDash();
        console.log("getting_count: start...");

        this.model.
            count((data)=>{
                res.jsonp(data)
                res.status(200).end()
                console.log("getting_count: terminated success");
            },
                ()=>{
                    res.status(500).end();
                    console.log("getting_count: terminated failed");
                }
            )
    }
    updateOne = (req,res) => {
        Api.logDash();
        console.log("updating: start...");

        this.model.update(()=>{
            res.status(200).end();
            console.log("updating: terminated success");
        },
            ()=>{
                res.status(404).end();
                console.log("updating: terminated failed");
            },
            req.params.id,
            req.body)
    }
    deleteOne = (req,res) => {
        Api.logDash();
        console.log("deleting: start...");

        this.model.delete(()=>{
            res.status(200).end();
            console.log("deleting: terminated success");
        },
            ()=>{
                res.status(404).end();
                console.log("deleting: terminated failed");
            },
            req.params.id)
    }
    search = (req,res) => {
        Api.logDash();
        console.log("searching: start...");

        let start = -1, limit = -1;

        if(req.body["start"]) start = req.body["start"];
        if(req.body["limit"] ) limit = req.body["limit"];
            //(_callback,_catch,tables,columns=["*"],searchColumns=[],keys=[],conditions="",start="",limit="",endquery="") => {
        console.log(req.body);

        this.model.search(
            (data)=>{
                res.status(200).jsonp(data)
                res.end()
                console.log("searching: terminated success");
            },
            ()=>{
                res.status(404).end();
                console.log("searching: terminated failed");
            },
            [this.model.tableName],
            this.model.columnNames,
            req.body["columns"],
            req.body["keys"],
            '',
            start,
            limit
        )
    }

    getOnewith = (req, res) => {
        Api.logDash();
        console.log("getting_oneWith: start...");

        let assoc = req.body
        this.model.getOneWith(
            (data)=>{
                res.status(200).jsonp(data)
                console.log("getting_oneWith: terminated success");
            },
            ()=>{
                res.status(404).end();
                console.log("getting_oneWith: terminated failed");
            },
            assoc)
    }

    constructor(model=this.model){
        this.model = model
        //GET ALL
        router.get("/"+model.tableName, (req,res)=>this.getAll(req,res))
        //GET ONE
        router.get("/"+model.tableName+"/:id", (req,res)=>this.getOne(req,res))
        //insert ONE
        router.put("/"+model.tableName, (req,res)=>this.putOne(req,res))

        //update
        router.put("/"+model.tableName+"/:id", (req,res)=>this.updateOne(req,res))

        //delete
        router.delete("/"+model.tableName+"/:id",(req,res)=>this.deleteOne(req,res))

        //search
        router.post("/"+model.tableName+"/search",(req,res)=>this.search(req,res))
    
        //getOneWith
        router.post("/"+model.tableName+"_with", (req,res)=>this.getOnewith(req,res))

        //count
        router.get("/count/"+model.tableName, (req,res)=>this.getCount(req,res))
    }
}

module.exports = Api
