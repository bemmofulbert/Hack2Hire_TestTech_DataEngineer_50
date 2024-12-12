const BD = require("../bd")
Utils = require("../utils");

class Data{
    tableName = "";
    columnNames = []; // les noms de colonnes // tableau simple
    data = []; // un tableau associatif des noms de colonnes aux donnees
    idName = "id";

    constructor(tableName="", columnNames=[], data=[], idName="id") {
        this.tableName = tableName;
        this.columnNames = columnNames;
        this.data = data;
        this.idName = idName;
    }
    setData(data=[]) {
        for(let i=0, c=this.columnNames.length; i<c ; i++) {
            if (data[this.columnNames[i]] !== undefined && data[this.columnNames[i]] !== null && assoc[this.columnNames[i]] != '')
                this.data[this.columnNames[i]] = data[this.columnNames[i]];
        }
    }

    assoc_to_tab(assoc=[], keys=[], datas=[]){
        for(let i=0, c=this.columnNames.length; i<c ; i++) {
            if (assoc[this.columnNames[i]] !== undefined && assoc[this.columnNames[i]] !== null && assoc[this.columnNames[i]] != '') {
                keys.push(this.columnNames[i]);
                datas.push(assoc[this.columnNames[i]])
            }
        }
    }

    add(_callback,_catch,assoc=[],returns=[this.idName]) {
        let columns=[],values=[];
        this.assoc_to_tab(assoc, columns, values);
        console.log("putting["+this.tableName+"]: BD insert start...");
        BD.insert(_callback,_catch, this.tableName, columns, values, returns);
    }

    //insecure
    read_all(_callback,_catch,tables=[],conditions="",endquery="") {
        tables.push(this.tableName);
        console.log("select_all["+tables.toString()+"]: BD start...");
        BD.select(_callback,_catch,tables,["*"],conditions,endquery);
    }

    getList(_callback,_catch, start,limit=""){
        console.log("select_list["+this.tableName+"]: BD start...");
        BD.select(_callback,_catch,[this.tableName],['*'],"","LIMIT "+start+" OFFSET "+limit)
    }

    getUnique(_callback,_catch,id) {
        console.log("select_byId["+this.tableName+"]: BD start...");
        BD.select_one(_callback,_catch, [this.tableName],this.columnNames,this.idName+"="+id)
    }
    getOneWith(_callback,_catch,assoc) {
        console.log("select_one["+this.tableName+"]: BD start...");

        let columns=[],values=[];
        this.assoc_to_tab(assoc, columns, values);
        values = Utils.framed(values)
        let conditions="";
        for(let i=0,c=columns.length;i<c;i++) {
            conditions += columns[i]+"="+values[i];
            if(i < columns.length-1)
                conditions+=" and "
        }
        BD.select_one(_callback,_catch, [this.tableName],this.columnNames,conditions)
    }

    update(_callback,_catch,id,assoc=[],conditions="") {
        console.log("updating["+this.tableName+"]: BD start...");
        let columns=[],values=[];
        this.assoc_to_tab(assoc, columns, values);
        BD.update(_callback,_catch, this.tableName,columns,values,this.idName+"="+id)
    }
    
    updateArray(_callback,_catch,id,column,values,conditions="") {
    	values = Utils.framed(values,"\"")
        values = `{${values}}`
       
        BD.update(_callback,_catch, this.tableName,[column],[values],this.idName+"="+id)
    }

    save(_callback=()=>{},_catch) {
        let columns=[],values=[];
        this.assoc_to_tab(this.data, columns, values);
        BD.update(_callback,_catch,this.tableName,columns,values);
    }

    delete(_callback=null,_catch, id) {
        console.log("deleting["+this.tableName+"]: BD delete start...");
        BD.delete(_callback,_catch,this.tableName,this.idName+"="+id);
    }

    count(_callback,_catch,column=this.idName,conditions="") {
        console.log("select_count["+this.tableName+"]: BD start...");
        BD.select_count(_callback,_catch,[this.tableName],column,conditions);
    }


    search(_callback,_catch,tables,columns=["*"],searchColumns=[],keys=[],conditions="",start=-1,limit=-1,endquery="") {
        console.log("searching["+this.tableName+"]: BD start...");

        BD.search(_callback,_catch,tables,columns,searchColumns,keys,conditions,start,limit,endquery);
    }

    async hydrate(_callback,_catch) {
        this.getUnique(async (data) => {
            if(this.data[this.idName] !== undefined && this.data[this.idName] !== null) {
                this.setData(data)
                console.log(" hydrate =========> 100%")
            }
            _callback()
        },
        _catch,this.data[this.idName])
        
    }

    clone(){
        return new Data(this.tableName,this.columnNames,this.data);
    }
}

module.exports = Data
