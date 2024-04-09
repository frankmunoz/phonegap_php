/* global angular */
/*
https://static.raymondcamden.com/demos/2014/feb/7/index.html#/home
http://nolanlawson.github.io/database-comparison/
https://github.com/tutsplus/indexeddb-part-3
http://jsfiddle.net/agershun/00nfeq12/
*/

var uri = "https://www.pmapae.com/api";
//var uri = "http://localhost/api";

//var uri = "http://10.48.78.50/api";

var pmaEmergenciaControllers = angular.module('pmaEmergenciaControllers', []);
	findValue = function(needle, haystack) {
		return haystack.filter(function(item) {
			return item.id === needle;
		})[0];
	};


pmaEmergenciaControllers.controller('HomeCtrl', ['$scope', '$rootScope', '$location',  'persistanceService', function($scope, $rootScope, $location, persistanceService) {
	function getMaxFromObjectByAttribute(arr, prop) {
		var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
	}

	$scope.setAsistencia = function(asistenciaCheck,beneficiario){
		var el = document.getElementById("beneficiario["+beneficiario.id+"]");
		if(el.checked){
			persistanceService.getAsistenciasBeneficiario(beneficiario.id).then(function(asistencias){
					beneficiario.asistencias = asistencias;
					beneficiario.asistencias.push({ "beneficiario_id":beneficiario.id, "complemento_id":1, "creado":1, "institucion_id":beneficiario.institucion });
					beneficiario.asistencia = 1;
					persistanceService.saveAsistencia(beneficiario).then(function() {
						persistanceService.save(beneficiario).then(function() {
						});
					});
			});
		}else{
			persistanceService.getAsistenciasBeneficiario(beneficiario.id).then(function(asistencias){
				var maxAsistencia = getMaxFromObjectByAttribute(asistencias,"id");
				console.log("maxAsistenciaId=>",maxAsistencia);
				beneficiario.asistencias.pop();
				persistanceService.deleteAsistencia(maxAsistencia.id).then(function() {
					beneficiario.asistencia = 0;
					persistanceService.save(beneficiario).then(function() {});
				});
			});
		}
	}

	function getAll() {
		persistanceService.getAll().then(function(res) {
			$scope.beneficiarios = res;
		});
	}
/*
CUANDO SE HABILITE MODAL SE HABILITA ESTA SECCION
	$scope.getBeneficiario = function(key) {
		persistanceService.get(key).then(function(beneficiario) {
//			$scope.beneficiario = getInstituciones(beneficiario);
			$scope.beneficiario = getAsistenciasBeneficiario(beneficiario);
//			$scope.beneficiario = getComplementos(beneficiario);
			$scope.beneficiario = beneficiario;
		});
	};

	getAsistenciasBeneficiario= function(beneficiario){
		if(beneficiario.id) {
			persistanceService.getAsistenciasBeneficiario(Number(beneficiario.id)).then(function(rs) {
				$scope.beneficiario.asistenciasBeneficiario = rs;
				getComplementos(beneficiario);
			});
		}
	}

	getComplementos= function(beneficiario){
		persistanceService.getDataFromTable('complemento').then(function(rs) {
			$scope.beneficiario.complementos = rs;
		});
	}
*/
	$scope.delete = function(key) {
		persistanceService.delete(key).then(function() {
			getAll();
		});
	};

	$scope.save = function() {
		$scope.beneficiario.complemento = $scope.beneficiario.complemento.id;
		persistanceService.saveAsistencia($scope.beneficiario).then(function() {
			getAsistenciasBeneficiario($scope.beneficiario);
		});
	};

	if(persistanceService.supportsIDB()) {
		getAll();
	} else {
		$location.path('/unsupported');
	}
}]);

pmaEmergenciaControllers.controller('EditCtrl', ['$scope', '$http', '$timeout', '$interval', '$rootScope', '$routeParams', '$location', 'persistanceService', function($scope, $http, $timeout, $interval, $rootScope, $routeParams, $location, persistanceService) {

	getSocios = function(beneficiario) {
		persistanceService.getDataFromTable('socio').then(function(res) {
			beneficiario.socio = findValue(beneficiario.socio,$scope.socios = res);
		});
	}
	getNacionalidades = function(beneficiario) {
		persistanceService.getDataFromTable('nacionalidad').then(function(res) {
			beneficiario.nacionalidad = findValue(beneficiario.nacionalidad,$scope.nacionalidades = res);
		});
	}
	getEstadosMigratorio = function(beneficiario) {
		persistanceService.getDataFromTable('estado_migratorio').then(function(res) {
			beneficiario.estado_migratorio = findValue(beneficiario.estado_migratorio,$scope.estadosMigratorio = res);
		});
	}
	getTiposDocumento = function(beneficiario) {
		persistanceService.getDataFromTable('tipo_documento').then(function(res) {
			beneficiario.tipo_documento = findValue(beneficiario.tipo_documento,$scope.tiposDocumento = res);
		});
	}
	getGeneros = function(beneficiario) {
		persistanceService.getDataFromTable('genero').then(function(res) {
			beneficiario.genero = findValue(beneficiario.genero,$scope.generos = res);
		});
	}

	getGestantesLactante= function(beneficiario){
		persistanceService.getDataFromTable('gestante_lactante').then(function(res) {
			beneficiario.gestante_lactante = findValue(beneficiario.gestante_lactante,$scope.gestantesLactante = res);
		});
	}

	getMunicipios= function(beneficiario){
		persistanceService.getDataFromTable('municipio','departamento').then(function(res) {
			beneficiario.municipio = findValue(beneficiario.municipio,$scope.municipios = res);
		});
	}

	getInstituciones= function(beneficiario){
		persistanceService.getDataFromTable('institucion').then(function(res) {
			beneficiario.institucion = findValue(beneficiario.institucion,$scope.instituciones = res);
		});
	}


	loadSelect = function(beneficiario){
		getMunicipios(beneficiario);
		getSocios(beneficiario);
		getNacionalidades(beneficiario);
		getEstadosMigratorio(beneficiario);
		getTiposDocumento(beneficiario);
		getGeneros(beneficiario);
		getGestantesLactante(beneficiario);
		getInstituciones(beneficiario);
		return beneficiario;
	}

	if($routeParams.key) {
		persistanceService.get($routeParams.key).then(function(beneficiario) {
//		persistanceService.get(Number($routeParams.key)).then(function(beneficiario) {
			console.log("beneficiario=>",beneficiario);
			$scope.beneficiario = loadSelect(beneficiario);
		});
	}else {
		alertify.confirm("<div class='pre-scrollable'><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae lacinia lorem. Aliquam ut feugiat tortor. Maecenas lectus mi, cursus eget orci quis, lobortis imperdiet magna. Quisque sit amet leo in enim tempus rhoncus in ornare dolor. Curabitur lorem urna, luctus ornare orci at, auctor posuere eros. Nunc mollis mi in metus placerat, non consequat magna convallis. Donec feugiat auctor massa, quis dignissim quam placerat at. Vivamus felis augue, dapibus non sapien eget, rutrum auctor metus. Nunc ullamcorper ut nunc suscipit rhoncus. Mauris id dignissim libero, nec scelerisque nunc.</p><p>Cras quis fringilla turpis. Ut laoreet diam in augue pellentesque sagittis. Aliquam erat volutpat. Nam quis pellentesque velit, quis tempor purus. Vivamus non auctor dolor, at tincidunt nunc. Phasellus efficitur porta tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris et blandit nulla, ac laoreet ipsum. Fusce et consequat nulla. Aenean volutpat leo eget malesuada semper. Nunc consectetur, dui quis elementum dictum, urna odio finibus est, ac accumsan dui lorem non lorem. Duis tincidunt tellus ante, sit amet ullamcorper turpis facilisis ac. Donec sit amet laoreet ipsum, fringilla fermentum turpis. Phasellus ultricies elit nec lectus tempus efficitur.</p><p>Quisque id aliquam nibh. Mauris dignissim massa eu felis varius pretium. Morbi congue nisi felis, sit amet porttitor justo elementum sed. Phasellus vitae risus sed turpis varius hendrerit ac eget est. Curabitur vestibulum lorem ac sagittis lacinia. Vestibulum at lacus blandit, hendrerit nisi et, semper massa. Integer at nisl nulla. Morbi lacinia quis risus non posuere. Ut sit amet nibh mi.</p><p>Suspendisse potenti. Quisque dignissim, diam quis fermentum porta, sapien lacus tempus leo, id hendrerit neque turpis ut sem. Sed et venenatis risus, nec laoreet lectus. Nam id dignissim diam, faucibus vehicula nulla. Etiam sit amet est a urna vestibulum dignissim. Maecenas ac quam auctor mi sollicitudin eleifend sed malesuada odio. Ut pharetra est non rutrum volutpat. Maecenas gravida, turpis vitae vehicula aliquet, orci orci consequat diam, in lobortis dui tellus at ex. Nunc dignissim sagittis pulvinar.</p><p>Pellentesque eu dolor nec purus accumsan sagittis nec id orci. Vivamus sagittis arcu lectus, blandit gravida risus blandit eget. Duis semper eget nunc ut sagittis. Pellentesque at est ipsum. Morbi congue, lectus ut pulvinar eleifend, turpis magna lacinia est, in tristique risus odio eu eros. Nam nec rutrum enim. Sed eu sem turpis. Nunc nec nisl non sapien vehicula sagittis. Integer cursus, quam ac congue tincidunt, ex nisl tempor metus, vitae aliquet lorem dui quis odio. Integer iaculis, mi id laoreet malesuada, purus velit semper ipsum, id ultricies sem odio et metus. Fusce tincidunt et leo eu tincidunt. Donec venenatis turpis aliquam nisl rutrum bibendum. Praesent dapibus mi lacus, eget scelerisque diam ornare quis. Integer suscipit mattis metus sit amet cursus. Curabitur euismod, mauris nec vulputate commodo, lectus risus egestas eros, vel consectetur tortor sapien a tortor.</p></div><br><br>Acepta los términos de tratamiento de datos?<br>",function(){
			var beneficiario = {};
			loadSelect(beneficiario);
		},function(){
			alertify.error('El beneficiario no acepta los términos');
			$location.path('/home').replace();
			$scope.$apply()
		});

	}

	$scope.save = function() {
			try {

				$scope.beneficiario.socio = "1";//$scope.beneficiario.socio;//.id;
				$scope.beneficiario.municipio = "1";//$scope.beneficiario.municipio;//.id;
				$scope.beneficiario.tipo_documento = $scope.beneficiario.tipo_documento.id;
				$scope.beneficiario.nacionalidad = $scope.beneficiario.nacionalidad.id;
				$scope.beneficiario.estado_migratorio = $scope.beneficiario.estado_migratorio.id;
				$scope.beneficiario.genero = $scope.beneficiario.genero.id;
				$scope.beneficiario.gestante_lactante = "3";//$scope.beneficiario.gestante_lactante;//.id;
				$scope.beneficiario.institucion = "1";//$scope.beneficiario.institucion;//.id;

				persistanceService.save($scope.beneficiario).then(function(res) {
				// persistanceService.getAsistenciasBeneficiario(beneficiario.id).then(function(asistencias){
				// 		beneficiario.asistencias = asistencias;
				// 		beneficiario.asistencias.push({ "beneficiario_id":beneficiario.id, "complemento_id":1, "creado":1, "institucion_id":beneficiario.institucion });
				// 		beneficiario.asistencia = 1;
				// 		persistanceService.saveAsistencia(beneficiario).then(function() {
				// 			persistanceService.save(beneficiario).then(function() {
				// 			});
				// 		});
				// });
					$location.path('/home');
				});

		} catch (e) {
			alertify.warning('Complete los campos vacíos');

		}

	};

}]);

pmaEmergenciaControllers.controller('SyncCtrl', ['$scope', '$rootScope', '$location', '$http',  'persistanceService', function($scope, $rootScope, $location, $http, persistanceService) {

	$scope.tab = 1;


    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };


	$scope.upload = function() {
		var data ={};
		persistanceService.getAll().then(function(benericiarios) {
			data.beneficiarios = benericiarios;

	//		persistanceService.getAllAsistencias().then(function(asistencias) {
	//			data.asistencias = asistencias;

console.log("transmit=>",data);

var config = {
		headers : {
				'Content-Type': 'application/json'
		}
}


$scope.beneficiario =data;

$http.post(uri + '/v1/device/upload', $scope.beneficiario, config)
	.success(function (data, status, headers, config) {
		console.log("data=>",data.success);
			if(data.success == true){
				console.log("success 1=>",data);
				alertify.success('<b>Sincronización exitosa</b>. <br>Los datos recolectados han sido subidos a la nube exitosamente!');
				//alertify.alert('Sincronización exitosa', 'Los datos recolectados han sido subidos a la nube exitosamente!');
			}else{
				console.log("success 2=>",data);
				 alertify.error('<b>Sincronización fallida</b>. <br>Hubo un problema sincronizando los datos, por favor intente más tarde. Si el problema persiste conmuníquese con el administrador del sistema');
				//alertify.alert('Sincronización fallida', 'Hubo un problema sincronizando los datos, por favor intente más tarde. Si el problema persiste conmuníquese con el administrador del sistema');
			}
	})
	.error(function (data, status, header, config) {
		 alertify.error('<b>Sincronización fallida</b>. <br>El servidor no responde, por favor intente más tarde. Si el problema persiste conmuníquese con el administrador del sistema');
	});


/*
				$http({
				  method: 'POST',
				  url: uri + '/v1/device/upload',
				  data: data,
				  headers: {
						'Content-Type': 'application/json;charset=UTF-8',
				    'key': '123'
				  }
				}).then(function successCallback(response) {
			    console.log(response);
			     var logininfo = (response);
			     localStorage.setItem("user_info", JSON.stringify(logininfo));
			     $state.go('home');
				}, function errorCallback(response) {
			    console.log(response)
			    if(response.status = 401){ //
			       $scope.showpopup1("Message","invaild Username && Password");
			    }
				});
*/

/*
				var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }


				$scope.beneficiario =sendData;

        $http.post(uri + '/v1/device/upload', $scope.beneficiario, config)
	        .success(function (data, status, headers, config) {
	            if(data.success){
					alertify.success('<b>Sincronización exitosa</b>. <br>Los datos recolectados han sido subidos a la nube exitosamente!');
	        	    //alertify.alert('Sincronización exitosa', 'Los datos recolectados han sido subidos a la nube exitosamente!');
		        }else{
	            	 alertify.error('<b>Sincronización fallida</b>. <br>Hubo un problema sincronizando los datos, por favor intente más tarde. Si el problema persiste conmuníquese con el administrador del sistema');
	        	    //alertify.alert('Sincronización fallida', 'Hubo un problema sincronizando los datos, por favor intente más tarde. Si el problema persiste conmuníquese con el administrador del sistema');
	    	    }
	        })
	        .error(function (data, status, header, config) {
	        	 alertify.error('<b>Sincronización fallida</b>. <br>El servidor no responde, por favor intente más tarde. Si el problema persiste conmuníquese con el administrador del sistema');
	        });
*/






//			});

		});


	};
	var cidb = new SimpleIDB()

	$scope.download = function() {
		alertify.confirm("Está seguro, esta acción eliminará los datos almacenados para ser reemplazados.",
		  function() {
				if(navigator.onLine) {
					downloadData();
				} else {
					alert("Para realizar esta operación el dispositivo debe estar conectado a internet");
				}
		  },
		  function() {
		    alertify.error('Cancel');
		  }
		);
	};


	deleteDatabase = function(){
		var openRequest = window.indexedDB.open("pma_emergencia",1);

		openRequest.onsuccess = function(event) {

			// store the result of opening the database in the db variable.
			// This is used a lot below
			db = openRequest.result;
			var tablas = ["nacionalidad","institucion","complemento","asistencia","municipio","gestante_lactante","genero","socio","tipo_documento","beneficiario","estado_migratorio"];
			// open a read/write db transaction, ready for clearing the data
			var transaction = db.transaction(tablas, "readwrite");

			// report on the success of the transaction completing, when everything is done
			transaction.oncomplete = function(event) {
				console.log("Transaction completed");
			};

			transaction.onerror = function(event) {
				console.log('Transaction not opened due to error: ' , transaction.error);
			};

			tablas.forEach( function(valor, indice, array) {
				// create an object store on the transaction
				var objectStore = transaction.objectStore(valor);

				// Make a request to clear all the data out of the object store
				var objectStoreRequest = objectStore.clear();
				objectStoreRequest.onsuccess = function(event) {
					// report the success of our request
					console.log("Request successful");
				};
			    console.log("En el índice " + indice + " hay este valor: " + valor);
			});
/*
			// create an object store on the transaction
			var objectStore = transaction.objectStore("socio");

			// Make a request to clear all the data out of the object store
			var objectStoreRequest = objectStore.clear();

			// create an object store on the transaction
			var objectStore = transaction.objectStore("nacionalidad");

			// Make a request to clear all the data out of the object store
			var objectStoreRequest = objectStore.clear();

			// create an object store on the transaction
			var objectStore = transaction.objectStore("asistencia");

			// Make a request to clear all the data out of the object store
			var objectStoreRequest = objectStore.clear();
			objectStoreRequest.onsuccess = function(event) {
				// report the success of our request
				console.log("Request successful");
			};
			// Clear all the data form the object store
			*/
		};


	}

	async function downloadData() {

/*
$.ajax({
  type: 'GET',
  url: "http://www.pmapae.com/emergencia/api/",
  contentType: 'application/json',
  dataType:'jsonp',
  responseType:'application/json',
  xhrFields: {
    withCredentials: false
  },
  headers: {
    'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET',
    'Access-Control-Allow-Headers':'application/json',
  },
  success: function(data) {
    console.log(data);
  },
  error: function(error) {
    console.log("FAIL....=================",error);
  }
});
*/

		$http.get(uri + "/v1/device/download")
			.then(function(response){
				var data = response.data;
				var db = "pma_emergencia";
				alertify.success('Datos sincronizados satisfactoriamente');
				deleteDatabase();

				data["beneficiarios"].forEach(function(currentValue,index,arr) {
					currentValue.id = Number(currentValue.id);
				});

				//	await cidb.kill(db);
				setData(db,"socio",data["socios"]);
				setData(db,"nacionalidad",data["nacionalidades"]);
				setData(db,"estado_migratorio",data["estadosMigratorio"]);
				setData(db,"tipo_documento",data["tiposDocumento"]);
				setData(db,"genero",data["generos"]);
				setData(db,"gestante_lactante",data["gestantesLactante"]);
				setData(db,"municipio",data["municipios"]);
				setData(db,"beneficiario",data["beneficiarios"]);
				setData(db,"institucion",data["instituciones"]);
				setData(db,"complemento",data["complementos"]);
				setDataAsistencia(db,"asistencia",data["asistencias"]);
				$scope.resultado = response;
			}).catch(function(response){
				alertify.error('El servidor no responde código:'+response.status+ ' estado:' +response.statusText);
				$scope.resultado = response;
			});

		}

	async function setDataAsistencia(db,table,data) {
		return new Promise(async function(resolve, reject) {
			var idb = await cidb.open(db, table,  {
				schema: { keyPath: "id", autoIncrement:false },
				index: [
					["beneficiario_id", "beneficiario_id", { "unique": false }],
					["complemento_id", "complemento_id", { "unique": false }],
					["institucion_id", "institucion_id", { "unique": false }],
					["creado", "creado", { "unique": false }]
				]
			});
			await cidb.fill(idb, table, data);
			idb.onsuccess = () => resolve(idb.result);
			idb.onerror = () => reject(idb.error);
		});
	}

	async function setData(db,table,data) {
		return new Promise(async function(resolve, reject) {
			var idb = await cidb.open(db, table,  {
				schema: { keyPath: "id", autoIncrement:false },
				index: [
					["id", "id", { "unique": false }],
					["nombre", "nombre", { "unique": false }]
				]
			});
			await cidb.fill(idb, table, data);
			idb.onsuccess = () => resolve(idb.result);
			idb.onerror = () => reject(idb.error);
		});
	}

	/*
	async function displayAll(cidb, storage) {
	var idb = await cidb.open("fruits", "fstore", {keyPath: "name", autoIncrement:false})
	var cont = await cidb.dump(idb, "fstore")
	var storage = document.getElementById(storage)
	storage.innerHTML=""
	for(var x of cont) {
	storage.innerHTML += "Name " + x["name"] + " : " + x["origin"] + " " + x["color"] + "<br>"
}
}

async function start(fname) {
var response = await fetch(fname)
var str = await response.text();
var data = JSON.parse(str)
var idb = await cidb.open("fruits", "fstore",  {
schema: { keyPath: "name", autoIncrement:false },
index:
[
["icolor", "color", { unique: false }],
["iorigin", "origin", { unique: false }]
]

})
await cidb.fill(idb, "fstore", data["fruits"])
displayAll(cidb, "storage")
}
window.onload= start("fruits.js")

async function search() {
var key = document.getElementById("searchval").value
var infos = await cidb.read("fstore", key)
document.getElementById("storageR").innerHTML = JSON.stringify(infos, null, ' ')
}

async function add() {
let name = document.getElementById("addname").value
let color = document.getElementById("addcolor").value
let obj = { "name": name, "origin": "", "color": color }
await cidb.write("fstore", obj)
displayAll(cidb, "storageA")
}

async function remove() {
let name = document.getElementById("delname").value
await cidb.remove("fstore", name)
displayAll(cidb, "storageD")
}

*/










}]);
