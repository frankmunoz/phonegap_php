/* global angular,window */
var pmaEmergenciaServices = angular.module('pmaEmergenciaServices', []);

pmaEmergenciaServices.factory('persistanceService', ['$q', function($q) {

	var setUp=false;
	var db;

	function init() {
		var deferred = $q.defer();

		if(setUp) {
			deferred.resolve(true);
			return deferred.promise;
		}

		var openRequest = window.indexedDB.open("pma_emergencia", 1);

		openRequest.onerror = function(e) {
			console.log("Error opening db");
			console.dir(e);
			deferred.reject(e.toString());
		};

		openRequest.onupgradeneeded = function(e) {

			var thisDb = e.target.result;
			var objectStore;

			//Crear tabla beneficiario
			if(!thisDb.objectStoreNames.contains("beneficiario")) {
				objectStore = thisDb.createObjectStore("beneficiario", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("socio","socio", { unique: false });
				objectStore.createIndex("institucion","institucion", { unique: false });
				objectStore.createIndex("municipio","municipio", { unique: false });
				objectStore.createIndex("tipo_documento","tipo_documento", { unique: false });
				objectStore.createIndex("numero_documento","numero_documento", { unique: true });
				objectStore.createIndex("nacionalidad","nacionalidad", { unique: false });
				objectStore.createIndex("estado_migratorio","estado_migratorio", { unique: false });
				objectStore.createIndex("primer_nombre","primer_nombre", { unique: false });
				objectStore.createIndex("segundo_nombre","segundo_nombre", { unique: false });
				objectStore.createIndex("primer_apellido","primer_apellido", { unique: false });
				objectStore.createIndex("segundo_apellido","segundo_apellido", { unique: false });
				objectStore.createIndex("genero","genero", { unique: false });
				objectStore.createIndex("fecha_nacimiento","fecha_nacimiento", { unique: false });
				objectStore.createIndex("numero_telefono","numero_telefono", { unique: false });
				objectStore.createIndex("gestante_lactante","gestante_lactante", { unique: false });
				objectStore.createIndex("asistencia","asistencia", { unique: false });
				objectStore.createIndex("asistencias","asistencias", { unique: false });

				objectStore.createIndex("creado","creado", { unique: false });
				objectStore.createIndex("editado","editado", { unique: false });
			}

			//Crear tabla socio
			if(!thisDb.objectStoreNames.contains("socio")) {
				objectStore = thisDb.createObjectStore("socio", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
			}

			//Crear tabla nacionalidad
			if(!thisDb.objectStoreNames.contains("nacionalidad")) {
				objectStore = thisDb.createObjectStore("nacionalidad", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
			}

			//Crear tabla estado_migratorio
			if(!thisDb.objectStoreNames.contains("estado_migratorio")) {
				objectStore = thisDb.createObjectStore("estado_migratorio", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
			}

			//Crear tabla tipo_documento
			if(!thisDb.objectStoreNames.contains("tipo_documento")) {
				objectStore = thisDb.createObjectStore("tipo_documento", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
			}

			//Crear tabla genero
			if(!thisDb.objectStoreNames.contains("genero")) {
				objectStore = thisDb.createObjectStore("genero", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
			}

			//Crear tabla gestante_lactante
			if(!thisDb.objectStoreNames.contains("gestante_lactante")) {
				objectStore = thisDb.createObjectStore("gestante_lactante", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
			}

			//Crear tabla municipio
			if(!thisDb.objectStoreNames.contains("municipio")) {
				objectStore = thisDb.createObjectStore("municipio", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
				objectStore.createIndex("departamento","departamento", { unique: false });
			}

			//Crear tabla asistencia
			if(!thisDb.objectStoreNames.contains("asistencia")) {
				objectStore = thisDb.createObjectStore("asistencia", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("beneficiario_id","beneficiario_id", { unique: false });
				objectStore.createIndex("institucion_id","institucion_id", { unique: false });
				objectStore.createIndex("complemento_id","complemento_id", { unique: false });
				objectStore.createIndex("creado","creado", { unique: false });
			}

			//Crear tabla institucion
			if(!thisDb.objectStoreNames.contains("institucion")) {
				objectStore = thisDb.createObjectStore("institucion", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
			}

			//Crear tabla complemento
			if(!thisDb.objectStoreNames.contains("complemento")) {
				objectStore = thisDb.createObjectStore("complemento", { keyPath: "id", autoIncrement:true });
				objectStore.createIndex("nombre","nombre", { unique: false });
			}

		};

		openRequest.onsuccess = function(e) {
			db = e.target.result;

			db.onerror = function(event) {
				// Generic error handler for all errors targeted at this database's
				// requests!
				deferred.reject("Database error: " + event.target.errorCode);
			};

			setUp=true;
			deferred.resolve(true);

		};

		return deferred.promise;
	}

	function isSupported() {
		return ("indexedDB" in window);
	}

	function del(key) {
		var deferred = $q.defer();
		var t = db.transaction(["beneficiario"], "readwrite");
		var request = t.objectStore("beneficiario").delete(key);
		t.oncomplete = function(event) {
			deferred.resolve();
		};
		return deferred.promise;
	}

	function get(key) {
		var deferred = $q.defer();
		var transaction = db.transaction(["beneficiario"]);
		var objectStore = transaction.objectStore("beneficiario");
		var request = objectStore.get(key);

		request.onsuccess = function(event) {
			var beneficiario = request.result;
			console.log("event=>",event);
			deferred.resolve(beneficiario);
		};

		request.onerror = function(event) {
			console.log("ERRORRRRRRR");
		};

		return deferred.promise;
	}

	function getAsistenciasBeneficiario(key) {
		var deferred = $q.defer();

		var transaction = db.transaction(["asistencia"]);
		var objectStore = transaction.objectStore("asistencia");
		var index = objectStore.index("beneficiario_id");
		var request = index.get(key);
/*
		request.onsuccess = function(event) {
			var asistencia = request.result;
			console.log("asistencia=>",asistencia);
			deferred.resolve(asistencia);
		};

		return deferred.promise;
*/

		var s=[];
		var rangeTest = IDBKeyRange.only(key);
		index.openCursor(rangeTest).onsuccess = function(e) {
			var cursor = e.target.result;
			if (cursor) {
				s.push(cursor.value);
				cursor.continue();
			}
			deferred.resolve(s);
		}

		//return s;//
		return deferred.promise;

	}


	function getAllAsistencias() {
		var deferred = $q.defer();

		init().then(function() {

			var result = [];

			var handleResult = function(event) {
				var cursor = event.target.result;
				if (cursor) {

					getAsistenciasBeneficiario(cursor.value.beneficiario_id).then(function(asistencias) {
						result.push({
							key:cursor.key
							, beneficiario_id:cursor.value.beneficiario_id
							, complemento_id:cursor.value.complemento_id
							, institucion_id:cursor.value.institucion_id
							, asistencias:asistencias
							, creado:cursor.value.creado
						});
					});
					cursor.continue();
				}
			};

			var transaction = db.transaction(["asistencia"], "readonly");
			var objectStore = transaction.objectStore("asistencia");
			objectStore.openCursor().onsuccess = handleResult;

			transaction.oncomplete = function(event) {
				deferred.resolve(result);
			};

		});
		return deferred.promise;
	}



	function getAll() {
		var deferred = $q.defer();

		init().then(function() {

			var result = [];

			var handleResult = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					vm = this;
					//getAsistenciasBeneficiario(cursor.value.id).then(function(asistencias) {
							vm.b = {
								key:cursor.key
								, id:cursor.value.id
								, socio:cursor.value.socio
								, institucion:cursor.value.institucion
								, municipio:cursor.value.municipio
								, tipo_documento:cursor.value.tipo_documento
								, numero_documento:cursor.value.numero_documento
								, nacionalidad:cursor.value.nacionalidad
								, estado_migratorio:cursor.value.estado_migratorio
								, primer_nombre:cursor.value.primer_nombre
								, segundo_nombre:cursor.value.segundo_nombre
								, primer_apellido:cursor.value.primer_apellido
								, segundo_apellido:cursor.value.segundo_apellido
								, genero:cursor.value.genero
								, fecha_nacimiento:cursor.value.fecha_nacimiento
								, numero_telefono:cursor.value.numero_telefono
								, gestante_lactante:cursor.value.gestante_lactante
								, complemento:1 //Valor quemado
								, asistencia:cursor.value.asistencia
								, asistencias:cursor.value.asistencias
								, maximo_dias_asistencia:cursor.value.maximo_dias_asistencia
								, creado:cursor.value.creado
								, editado:cursor.value.editado
							}
						//});
						result.push(vm.b);
						cursor.continue();
				}
			};

			var transaction = db.transaction(["beneficiario"], "readonly");
			var objectStore = transaction.objectStore("beneficiario");
			objectStore.openCursor().onsuccess = handleResult;

			transaction.oncomplete = function(event) {
				deferred.resolve(result);
			};

		});
		return deferred.promise;
	}

	function getAsistenciasByBeneficiarioId(id){
		return getAsistenciasBeneficiario(id).then(function(asistencias){
			return asistencias;
		});

	}

	function getDataFromTable(table, extraField = "") {
		var deferred = $q.defer();

		init().then(function() {

			var result = [];

			var handleResult = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					var structure = {
						key:cursor.key
						, id:cursor.value.id
						, nombre:cursor.value.nombre
					};
					if(extraField){
						eval("structure." + extraField + " = cursor.value." + extraField );
					}
					result.push(structure);
					cursor.continue();
				}
			};

			var transaction = db.transaction([table], "readonly");
			var objectStore = transaction.objectStore(table);
			objectStore.openCursor().onsuccess = handleResult;

			transaction.oncomplete = function(event) {
				deferred.resolve(result);
			};

		});
		return deferred.promise;
	}

	function ready() {
		return setUp;
	}

	function save(beneficiario) {
		//Should this call init() too? maybe
		var deferred = $q.defer();

		if(!beneficiario.id) beneficiario.id = "";
		var primer_nombre = beneficiario.primer_nombre.toLowerCase();
		var segundo_nombre = beneficiario.segundo_nombre.toLowerCase();

		//handle tags
		var tags = [];
		if(beneficiario.tags && beneficiario.tags.length) tags = beneficiario.tags.split(",");

		var t = db.transaction(["beneficiario"], "readwrite");

		if(beneficiario.id === "") {
			t.objectStore("beneficiario")
			.add({
				socio:beneficiario.socio
				, institucion:beneficiario.institucion
				, municipio:beneficiario.municipio
				, tipo_documento:beneficiario.tipo_documento
				, numero_documento:beneficiario.numero_documento
				, nacionalidad:beneficiario.nacionalidad
				, estado_migratorio:beneficiario.estado_migratorio
				, primer_nombre:beneficiario.primer_nombre
				, segundo_nombre:beneficiario.segundo_nombre
				, primer_apellido:beneficiario.primer_apellido
				, segundo_apellido:beneficiario.segundo_apellido
				, genero:beneficiario.genero
				, fecha_nacimiento:beneficiario.fecha_nacimiento
				, numero_telefono:beneficiario.numero_telefono
				, gestante_lactante:beneficiario.gestante_lactante
				, asistencia:1
				, asistencias:[{"persona_id": null, "complemento_id": "1", "institucion_id": "1", "creado": new Date()}]
				, maximo_dias_asistencia:beneficiario.maximo_dias_asistencia
				, creado: new Date()
				, editado: new Date()
			});
		} else {
			t.objectStore("beneficiario")
			.put({
//				id:Number(beneficiario.id)
				id:beneficiario.id
				, socio:beneficiario.socio
				, institucion:beneficiario.institucion
				, municipio:beneficiario.municipio
				, tipo_documento:beneficiario.tipo_documento
				, numero_documento:beneficiario.numero_documento
				, nacionalidad:beneficiario.nacionalidad
				, estado_migratorio:beneficiario.estado_migratorio
				, primer_nombre:beneficiario.primer_nombre
				, segundo_nombre:beneficiario.segundo_nombre
				, primer_apellido:beneficiario.primer_apellido
				, segundo_apellido:beneficiario.segundo_apellido
				, genero:beneficiario.genero
				, fecha_nacimiento:beneficiario.fecha_nacimiento
				, numero_telefono:beneficiario.numero_telefono
				, gestante_lactante:beneficiario.gestante_lactante
				, asistencia:beneficiario.asistencia
				, asistencias:beneficiario.asistencias
				, maximo_dias_asistencia:beneficiario.maximo_dias_asistencia
				, editado: new Date()
				, creado: beneficiario.creado
			});
		}

		t.oncomplete = function(event) {
			deferred.resolve();
		};

		return deferred.promise;
	}

	function saveAsistencia(beneficiario) {
		//Should this call init() too? maybe
		console.log("saveASis=>",beneficiario);
		var deferred = $q.defer();
		if(!beneficiario.id) beneficiario.id = "";

		var t = db.transaction(["asistencia"], "readwrite");
		t.objectStore("asistencia")
		.add({
			beneficiario_id:beneficiario.id
			, complemento_id:beneficiario.complemento
			, institucion_id:beneficiario.institucion
			, creado:new Date()
		});

		t.oncomplete = function(event) {
			deferred.resolve();
		};

		return deferred.promise;
	}
/*
	function del(key) {
		var deferred = $q.defer();
		var t = db.transaction(["beneficiario"], "readwrite");
		var request = t.objectStore("beneficiario").delete(key);
		t.oncomplete = function(event) {
			deferred.resolve();
		};
		return deferred.promise;
	}

*/

	function deleteAsistencia(id) {
		//Should this call init() too? maybe
		var deferred = $q.defer();

		var t = db.transaction(["asistencia"], "readwrite");
		var request = t.objectStore("asistencia").delete(id);
		t.oncomplete = function(event) {
			deferred.resolve();
		};
		return deferred.promise;

	}

	function supportsIDB() {
		return "indexedDB" in window;
	}

	return {
		isSupported:isSupported,
		delete:del,
		get:get,
		getAll:getAll,
		getDataFromTable:getDataFromTable,
		ready:ready,
		save:save,
		saveAsistencia:saveAsistencia,
		supportsIDB:supportsIDB,
		getAsistenciasBeneficiario:getAsistenciasBeneficiario,
		getAllAsistencias:getAllAsistencias,
		deleteAsistencia:deleteAsistencia
	};

}]);
