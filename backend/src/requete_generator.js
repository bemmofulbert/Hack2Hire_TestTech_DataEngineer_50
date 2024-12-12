class QueryGenerator {
    static className = "QueryGenerator"
    static framed = (tabo) => {
                let tab = [...tabo];
                for(let i=0,c=tab.length;i<c;i++) {
                    tab[i] = String('\'').concat(tab[i],'\'');
                }
                return tab;
	}
	static valCountGen = (n) => {
				var tab = [];
                for(let i=1;i<=n;i++) {
                    tab[i-1] = (String('$'+i));
                }
                return tab;
	}
    static to_error = (text) => {
		return ("<span style='color:red'>"+text+"</span>");
	}
    static select = (tables,columns,conditions="",endquery="") =>{
		console.log("selecting["+tables.toString()+"]: Query factory")
		let query= "SELECT ";
		query = query+columns.toString()+" ";
		query = query+"FROM ";
		query = query+tables.toString()+" ";
		
		if (conditions !== "") {
			query = query+"WHERE ";
			query = query+conditions;
		}
		query = query+" "+endquery;
		
		//console.log(query);
		return query;
	}

    static insert = (table,columns,returns=["id"]) => {
		console.log("putting["+table+"]: Query factory")
		let query= "INSERT INTO "+table+"(";
		query= query + columns.toString() +")";
		query= query+" VALUES(";
		//values = QueryGenerator.framed(values);
		let values = QueryGenerator.valCountGen(columns.length);
		query= query + values.toString() + ") ";
		
		query = query + "RETURNING ";
		query = query + QueryGenerator.framed(returns)
		console.log(query);
		return query;
	}

    static delete = (table, conditions="") => {
		console.log("deleting["+table+"]: Query factory")
		let query= "DELETE FROM "+table;
		if (conditions !== "") {
			query = query+" WHERE ";
			query = query+conditions;
		}
		console.log(query);
		return query;
	}

    static update = (table,columns,conditions="") => {
		console.log("updating["+table+"]: Query factory");

		let query = "UPDATE "+table+" SET ";
        let upd;
		
        let nc = columns.length;
		
		let updates = [];
		for(let i=0; i<nc ;i++){
			upd = columns[i]+"=$"+(i+1);
			updates.push(upd);
		}
		query = query+updates.toString();
		if (conditions !== "") {
			query = query+" WHERE ";
			query = query+conditions;
		}

		console.log(query);
		return query;
	}

    static select_count = (tables,column="*",conditions="") => {
		console.log("selecting_count["+tables.toString()+"]: Query factory");
		let query = QueryGenerator.select(tables,['count('+column+')'],conditions);

		return query;
	}
	static getCondition_search_str(columnName, key) {
		let condition = "LOWER("+columnName+")"+" LIKE LOWER("+key+")";
		return condition;
	}
	static getCondition(columnName, key) {
		return columnName+" = "+key;
	}
	static search = (_callback,_catch,tables,columns=["*"],searchColumns=[],keys=[],conditions="",start=-1,limit=-1,endquery="") => {
		var conditions2 = '';
		var number_of_key = 0;
		for (var c=searchColumns.length; number_of_key<c; number_of_key++){
			keys[number_of_key] = "%"+keys[number_of_key]+"%";
			conditions2 += QueryGenerator.getCondition_search_str(searchColumns[number_of_key], "$"+(number_of_key+1));
			(number_of_key >= c-1) ? conditions2 += '' : conditions2 += ' and ';
		}    
		
		if(conditions !== "") {
			conditions2 = conditions2+" and "+conditions;
		}
		console.log(searchColumns.length)
	
		if(start !== "") endquery += "LIMIT $"+ (++number_of_key) ;
		if(limit !== "") endquery += " OFFSET $"+(++number_of_key) ;
		console.log(number_of_key)
		let query = QueryGenerator.select(tables,columns,conditions2,endquery);
		console.log("\n------------------\n here \n------------------------\n");
		console.log(query);
		return query;
	}
}


module.exports = QueryGenerator
