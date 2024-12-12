const db = require("../bd_con")
const QueryGenerator = require("./requete_generator")

class BD {
    static className = "BD"
    static execAny(query,_callback,_catch) {
      db.any(query)
      .then(data => _callback(data))
      .catch((error) => {
        console.log("ERROR: ", error)
        _catch()
      })
    }
    static execAny_withParams(query,values,_callback,_catch) {
      db.any(query, values)
      .then(data => _callback(data))
      .catch((error) => {
        console.log("ERROR: ", error)
        _catch()
      })
    }
    static execOne_withParams(query,values, _callback, _catch) {
      db.one(query,values)
        .then(data => _callback(data))
        .catch((error) => {
          console.log("ERROR: ", error)
          _catch(error)
        })
    }
    static execNone_withParams(query,values, _callback, _catch) {
      db.none(query,values)
        .then(data => _callback(data))
        .catch((error) => {
          console.log("ERROR: ", error)
          _catch(error)
        })
    }
    static execOne(query, _callback, _catch) {
      db.one(query)
        .then(data => _callback(data))
        .catch((error) => {
          console.log("ERROR: ", error)
          _catch(error)
        })
    }
    static select = (_callback,_catch,tables,columns,conditions="",endquery="") =>{
      
		  let query = QueryGenerator.select(tables,columns,conditions,endquery);
      console.log("selecting["+tables.toString()+"]: BD select exec...");
      this.execAny(query,_callback,_catch);
    }

    static select_one = (_callback,_catch,table,columns,conditions="",endquery="") =>{
      
		  let query = QueryGenerator.select(table,columns,conditions,endquery)
      console.log("selecting_one["+table+"]: BD select exec...");
      this.execOne(query,_callback,_catch)
    }

    static insert = (_callback,_catch,table,columns,values,returns=["id"]) => {
      
      let query = QueryGenerator.insert(table,columns,returns)
      console.log("putting["+table+"]: BD insert exec...");
      this.execOne_withParams(query,values,_callback,_catch)
    }

    static delete = (_callback,_catch,table, conditions="") => {
      let query= QueryGenerator.delete(table, conditions)
      console.log("deleting["+table+"]: BD delete exec...");
      this.execAny(query,_callback,_catch)
    }

    static update = (_callback,_catch,table,columns,values,conditions="") => {
      let query = QueryGenerator.update(table,columns,conditions);
      console.log("updating["+table+"]: BD update exec...");
      this.execNone_withParams(query, values, _callback,_catch)
    }

    static select_count = (_callback,_catch,tables,column="*",conditions="") => {
      let query = QueryGenerator.select_count(tables,column,conditions);
      console.log("selecting_count["+tables.toString()+"]: BD select exec...");
      this.execOne(query,_callback,_catch)
    }
    
    static search = (_callback,_catch,tables,columns=["*"],searchColumns=[],keys=[],conditions="",start=-1,limit=-1,endquery="") => {
      let query = QueryGenerator.search(_callback, _catch, tables, columns, searchColumns,
        keys, conditions, start, limit, endquery);
      console.log("searching["+tables.toString()+"]: BD search exec...");
      var keys_complete = [...keys];
      var len = keys_complete.length;
      keys_complete[len] = start;
      keys_complete[len+1] = limit;
      console.log("limit: "+limit + " - " + keys_complete);
      this.execAny_withParams(query,keys_complete,_callback,_catch);
    }
}
module.exports = BD
