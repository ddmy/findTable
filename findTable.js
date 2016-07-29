/***

表格操作插件 V1.001
表格操作插件 V1.002
	1.修复传参传入null的错误
	2.修复给每个td绑定传入错误，应该循环数组
	3.给f()返回的数组绑定方法，可以直接调用
	4.修复部分BUG
Mr.chen

***/
var f = function(tab,flag){

	var findTable = {},
		f = findTable,
		tabArr = [];

	if(tab == true || tab == 'true'){

		tab = 'table';

		flag = true;

	}else{

		tab = tab;

	}

	//判断是获取单个还是获取所有，最后都要装进数组
	if(flag){

		f.table = document.querySelectorAll(tab);

		for(var o = 0; o < f.table.length; o += 1){

			tabArr.push(f.table[o]);

		}

	}else{

		tab = tab || 'table';

		f.table = document.querySelector(tab);

		f.table.length = 1;

		tabArr.push(f.table);

	}

	for(var p = 0; p < tabArr.length; p += 1){

		actionTable(tabArr[p]);

	}

	//给数组直接绑定方法
	f.table.getTableXY = function(x,y,type){

		var tableAllArr = [],
			temp = parameter(x,y,type);

		x = temp.x;

		y = temp.y;
		
		type = temp.type;


		if(tabArr.length == 1){

			return actionTable(tabArr[0]).getTableXY(x,y,type);

		}else{

			for(var p = 0; p < tabArr.length; p += 1){

				tableAllArr.push(actionTable(tabArr[p]).getTableXY(x,y,type));

			}		

			return tableAllArr;
	
		}

	}

	function actionTable(obj){

		var f = obj;

		//获取当前table所有tr，td，th
		f.refreshTable = function(){

			f.tableTr = obj.querySelectorAll('tr');

			f.tableTd = obj.querySelectorAll('td');

			f.tableTrLength = f.tableTr.length;

			f.tableTdLength = f.tableTd.length;

		};

		f.refreshTable();

		//给所有td绑定唯一标识
		f.tableCard = function(){

			var i = 0,k = 0,
				everyTrChild,
				everyTrChildLength;

			//可能对table做出增删操作，重新获取,
			f.refreshTable();

			for(i; i < f.tableTrLength; i += 1){

				//为每一个td绑定独立ID
				f.bindXY(f.tableTr[i],i);

			}

		};

		//为每一个td绑定独立ID
		f.tableTdArr= [];

		f.bindXY = function(tr,i){

			var td = tr.querySelectorAll('td'),
				tdLen = td.length;

			for(var n = 0; n < tdLen; n += 1){

				td[n].tableX = i;

				td[n].tableY = n;

				td[n].tableXY = [i,n];

				f.tableTdArr.push(td[n]);

			}

		};

		f.tableCard();


		//获取元素方法
		f.getTableXY = function(x,y,type){

			var temp = parameter(x,y,type);

			x = temp.x;

			y = temp.y;

			type = temp.type;

			//取出精确坐标
			if(type && type == 'all' || (x && y && y != 'all' && !type)){

				type = 'all';

				return f.eachTable(x,y,type);

			}else{

				return f.eachTable(x,y);

			}

		};

		//循环比较找出符合条件的元素
		f.eachTable = function(x,y,type){

			if(type && type == 'all'){

				for(var i = 0; i < f.tableTdArr.length; i += 1){


					if(x == f.tableTdArr[i].tableXY[0] && y == f.tableTdArr[i].tableXY[1]){

						f.success = f.tableTdArr[i];

						break;

					}

				}

			}

			if(y == 'tr'){

				for(var n = 0; n < f.tableTdArr.length; n += 1){

					if(x == f.tableTdArr[n].tableX){

						f.success = f.tableTdArr[n].parentNode;

						break;

					}

				}

			}

			if(y == 'td'){

				f.success = [];

				for(var m = 0; m < f.tableTrLength; m += 1){

					var tbtr = f.tableTr[m].querySelectorAll('td');

					//console.log(tbtr);

					for(k = 0; k < tbtr.length; k += 1){

						if(x == tbtr[k].tableY){

							f.success.push(tbtr[k]);

							continue;
						}

					}

				}

			}

			return f.success;

		};

		return f;

	}


	//参数处理
	function parameter(x,y,type){

		//避免出现 0 == false
		if(x == 0){

			x = '0';

		}

		if(y == 0){

			y = '0';
		}


		if(type == 'tr'){

			y = type;

			type = undefined;

		}

		if(type == 'td'){

			x = y;

			y = type;

			type = undefined;

		}

		// if(y == null && type == 'tr'){

		// 	y = type;

		// }

		// if(x == null && type == 'td'){

		// 	x = y;

		// 	y = type;

		// }

		// if(type == 'tr' && x >= 0 && y >= 0){

		// 	x = y;

		// 	y = type;

		// }

		// if(type == 'td' && x >= 0 && y >= 0){

		// 	y = type;

		// }

		return {
			x : x,
			y : y,
			type : type
		}

	}

	return f.table;

};

