webpackJsonp([6],{

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-note-modal/add-note-modal.module": [
		267,
		4
	],
	"../pages/appointment-detail/appointment-detail.module": [
		268,
		2
	],
	"../pages/appointments/appointments.module": [
		269,
		1
	],
	"../pages/login/login.module": [
		270,
		5
	],
	"../pages/patient-detail/patient-detail.module": [
		271,
		0
	],
	"../pages/step-up-authentication-modal/step-up-authentication-modal.module": [
		272,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__adapter_service_adapter_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__storage_service_storage_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the AppointmentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AppointmentServiceProvider = (function () {
    function AppointmentServiceProvider(_adapterService, _storageService, network) {
        this._adapterService = _adapterService;
        this._storageService = _storageService;
        this.network = network;
        this.appointments = [];
    }
    AppointmentServiceProvider.prototype.load = function (refreshFromServer) {
        var _this = this;
        if (refreshFromServer === void 0) { refreshFromServer = false; }
        if (this.appointments && this.appointments.length > 0 && !refreshFromServer) {
            // already loaded data
            return Promise.resolve(this.appointments);
        }
        // We don't have the data yet, or a forced refresh is requested    
        return new Promise(function (resolve, reject) {
            if (_this.network.type == 'none' || _this.network.type == 'unknown') {
                // No network connection, so loading from local storage is the best we can do!
                _this._storageService.loadFromOfflineStorage().then(function (offlineAppointments) {
                    _this.appointments = offlineAppointments;
                    resolve(_this.appointments);
                }, function (error) {
                    reject(error);
                });
            }
            else {
                _this._adapterService.callAdapter("Appointments", "appointments", "GET", null).then(function (response) {
                    _this.appointments = response;
                    _this._saveOffline(_this.appointments, false).then(function () { return resolve(_this.appointments); }, function (error) { return reject(error); });
                }, function (error) {
                    reject(error);
                });
            }
        });
    };
    // Save the appointments
    AppointmentServiceProvider.prototype.saveAll = function (appointments, localOnly) {
        var _this = this;
        if (localOnly === void 0) { localOnly = false; }
        return new Promise(function (resolve, reject) {
            _this.appointments = appointments;
            if (localOnly || _this.network.type == 'none' || _this.network.type == 'unknown') {
                _this._saveOffline(appointments, true).then(function () { return resolve(); }, function (error) { return reject(error); });
            }
            else {
                // Try to save to the server first
                _this._adapterService.callAdapter("Appointments", "appointments", "POST", appointments).then(function (response) {
                    _this._saveOffline(appointments, false).then(function () { return resolve(); }, function (error) { return reject(error); });
                }, function (adapterError) {
                    // Don't throw an error... but mark dirty since we were only able to save locally
                    return _this._saveOffline(_this.appointments, true);
                });
            }
        });
    };
    AppointmentServiceProvider.prototype.save = function (appointment, localOnly) {
        var _this = this;
        if (localOnly === void 0) { localOnly = false; }
        return new Promise(function (resolve, reject) {
            _this.appointments.replaceById(appointment, appointment.id);
            if (localOnly || _this.network.type == 'none' || _this.network.type == 'unknown') {
                _this._saveOffline(appointment, true).then(function () { return resolve(); }, function (error) { return reject(error); });
            }
            else {
                // Try to save to the server first
                _this._adapterService.callAdapter("Appointments", "appointment/" + appointment.id, "PUT", appointment).then(function (response) {
                    _this._saveOffline(appointment, false).then(function () { return resolve(); }, function (error) { return reject(error); });
                }, function (adapterError) {
                    // Don't throw an error... but mark dirty since we were only able to save locally
                    return _this._saveOffline(appointment, true);
                });
            }
        });
    };
    AppointmentServiceProvider.prototype._saveOffline = function (itemOrItems, markDirty) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._storageService.storeInOfflineStorage(itemOrItems, markDirty).then(function () {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    return AppointmentServiceProvider;
}());
AppointmentServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__adapter_service_adapter_service__["a" /* AdapterServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__storage_service_storage_service__["a" /* StorageServiceProvider */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
], AppointmentServiceProvider);

//# sourceMappingURL=appointment-service.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(216);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_dialogs__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_adapter_service_adapter_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_appointment_service_appointment_service__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_storage_service_storage_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* CommunityHealthApp */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* CommunityHealthApp */], {}, {
                links: [
                    { loadChildren: '../pages/add-note-modal/add-note-modal.module#AddNoteModalPageModule', name: 'AddNoteModalPage', segment: 'add-note-modal', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/appointment-detail/appointment-detail.module#AppointmentDetailPageModule', name: 'AppointmentDetailPage', segment: 'appointment-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/appointments/appointments.module#AppointmentsPageModule', name: 'AppointmentsPage', segment: 'appointments', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/patient-detail/patient-detail.module#PatientDetailPageModule', name: 'PatientDetailPage', segment: 'patient-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/step-up-authentication-modal/step-up-authentication-modal.module#StepUpAuthenticationModalPageModule', name: 'StepUpAuthenticationModalPage', segment: 'step-up-authentication-modal', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* CommunityHealthApp */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_dialogs__["a" /* Dialogs */],
            __WEBPACK_IMPORTED_MODULE_8__providers_adapter_service_adapter_service__["a" /* AdapterServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_appointment_service_appointment_service__["a" /* AppointmentServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_storage_service_storage_service__["a" /* StorageServiceProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunityHealthApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_dialogs__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_storage_service_storage_service__ = __webpack_require__(49);
///<reference path="../../plugins/cordova-plugin-mfp/typings/worklight.d.ts"/>
///<reference path="../../plugins/cordova-plugin-mfp-jsonstore/typings/jsonstore.d.ts"/>
///<reference path="../../plugins/cordova-plugin-mfp-push/typings/mfppush.d.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CommunityHealthApp = (function () {
    function CommunityHealthApp(platform, renderer, app, statusBar, network, storageService, dialogs) {
        var _this = this;
        this.app = app;
        this.network = network;
        this.storageService = storageService;
        this.dialogs = dialogs;
        renderer.listenGlobal("document", "mfpjsloaded", function () { return _this.mfpInitializationComplete(); });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            // watch network for a disconnect
            var disconnectSubscription = _this.network.onDisconnect().subscribe(function () {
                console.log('network was disconnected :-( ');
            });
            // watch network for a connection
            var connectSubscription = _this.network.onConnect().subscribe(function () {
                console.log('network connected!');
                _this.storageService.syncRequired().then(function (syncRequired) {
                    console.debug( true ? "SYNC REQUIRED" : "SYNC NOT REQUIRED");
                    if (syncRequired) {
                        _this.storageService.synchronize().then(function () {
                            console.debug("Offline storage synchronzied successfully");
                            _this.dialogs.alert("Synchronization from offline storage completed successfully.", "Synchronization Complete", "Ok");
                        }, function (error) {
                            console.error("An error occurred while syncronizing offline storage");
                        });
                    }
                });
                // We just got a connection but we need to wait briefly
                // before we determine the connection type.  Might need to wait
                // prior to doing any api requests as well.
                setTimeout(function () {
                    console.log('network connnection is type: ' + _this.network.type);
                });
            });
        });
    }
    CommunityHealthApp.prototype.ngAfterViewInit = function () {
        this.nav = this.app.getActiveNav();
    };
    CommunityHealthApp.prototype.mfpInitializationComplete = function () {
        console.log("MobileFirst Foundation initialized successfully.");
        this.rootPage = 'LoginPage';
        this.nav.push('LoginPage'); // hack
        WL.Logger.config({ capture: true });
        WL.Logger.config({ level: 'TRACE' });
        WL.Logger.config({ autoSendLogs: true });
        if (this.network.type != 'none' && this.network.type != 'unknown') {
            setInterval(function () {
                WL.Logger.send();
            }, 5000);
        }
        WL.Logger.updateConfigFromServer();
        WL.Client.pinTrustedCertificatePublicKey('*au-sydmybluemixnet.cer').then(onSuccess, onFailure);
        function onSuccess() {
            //   alert("Certificate Pinned Successfully ");
        }
        function onFailure() {
            alert("Certificate pinning failed, Connect to Mobilefirst will not work");
        }
        // Connect to the server immediately to enable app management
        WLAuthorizationManager.obtainAccessToken().then(function () {
            MFPPush.initialize(function (successResponse) {
                console.log("MFP Push successfully intialized: " + JSON.stringify(successResponse));
                this.nav.push('AppointmentsPage');
                MFPPush.registerNotificationsCallback(function (content) {
                    console.log("Push notification received: %o", content);
                });
                WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(function () {
                    MFPPush.registerDevice({ "phoneNumber": "" }, function (successResponse) {
                        console.log("MFP Push - Device successfully registered");
                    }, function (failureResponse) {
                        console.log("MFP Push - Device failed to register: " + JSON.stringify(failureResponse));
                    });
                });
            }, function (failureResponse) {
                console.log("MFP Basic Auth failed with error: " + JSON.stringify(failureResponse));
                //  alert("Your Application is Probable fake , Close and Uninstall immediately");
            });
        });
    };
    return CommunityHealthApp;
}());
CommunityHealthApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/kavithavaradarajan/MFP8/CommunityHealthDemo-Ionic3/src/app/app.html"*/'<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/kavithavaradarajan/MFP8/CommunityHealthDemo-Ionic3/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_5__providers_storage_service_storage_service__["a" /* StorageServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_dialogs__["a" /* Dialogs */]])
], CommunityHealthApp);

Array.prototype["findByProperty"] = function (property, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][property] === value) {
            return this[i];
        }
    }
    return null;
};
Array.prototype["findById"] = function (id) {
    return this.findByProperty("id", id);
};
Array.prototype["replaceById"] = function (item, id) {
    return this.replaceByProperty(item, "id", id);
};
Array.prototype["replaceByProperty"] = function (item, property, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][property] === value) {
            this.splice(i, 1, item);
        }
    }
};
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__adapter_service_adapter_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var StorageServiceProvider = (function () {
    function StorageServiceProvider(_adapterService) {
        var _this = this;
        this._adapterService = _adapterService;
        this.observable = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.observer = observer;
        });
    }
    StorageServiceProvider.prototype.initializeOfflineStorage = function () {
        // Initialize the offline storage
        var collections = { appointments: { searchFields: { id: 'integer' } } };
        var __this = this;
        return WL.JSONStore.init(collections).then(function (collections) {
            console.log("Offline storage initialized successfully");
            __this.syncRequired().then(function (syncRequired) {
                console.debug(syncRequired ? "SYNC REQUIRED" : "SYNC NOT REQUIRED");
            });
        }, function (error) {
            console.error("Failed to initalize offline storage");
        });
    };
    StorageServiceProvider.prototype.loadFromOfflineStorage = function () {
        return WL.JSONStore.get("appointments").findAll({}).then(function (results) {
            console.log("Successfully retrieved appointments from offline storage: %o", results);
            var appointments = [];
            for (var i = 0; i < results.length; i++) {
                appointments.push(results[i].json);
            }
            return appointments;
        }, function (error) {
            console.error("Failed to retrieve appointments from offline storage");
        });
    };
    StorageServiceProvider.prototype.storeInOfflineStorage = function (appointments, markDirty) {
        var _this = this;
        var query = appointments.id ? { id: appointments.id } : {};
        return WL.JSONStore.get("appointments").remove(query, { markDirty: markDirty }).then(function (numDocsRemoved) {
            console.log("Successfully removed " + numDocsRemoved + " documents from offline storage");
            return WL.JSONStore.get("appointments").add(appointments, { markDirty: markDirty }).then(function () {
                console.log("Successfully replaced appointments in offline storage.");
                if (markDirty) {
                    _this.observer.next(true);
                }
            }, function (error) { return console.error("Error replacing appointments in offline storage: " + JSON.stringify(error)); });
        }, function (error) { return console.error("Error removing appointments from offline storage: " + JSON.stringify(error)); });
    };
    StorageServiceProvider.prototype.syncRequired = function () {
        return WL.JSONStore.get("appointments").getAllDirty({}).then(function (dirtyDocuments) {
            console.debug("Dirty documents: " + dirtyDocuments.length);
            return (!!dirtyDocuments && dirtyDocuments.length > 0);
        }, function (error) {
            console.error("An error occurred retrieving the dirty documents from offline storage");
            return false;
        });
    };
    StorageServiceProvider.prototype.watchSyncState = function () {
        return this.observable;
    };
    StorageServiceProvider.prototype.synchronize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadFromOfflineStorage().then(function (appointments) {
                _this._adapterService.callAdapter("Appointments", "appointments", "PUT", JSON.stringify(appointments))
                    .then(function (response) {
                    WL.JSONStore.get("appointments").getAllDirty({}).then(function (dirtyDocuments) {
                        WL.JSONStore.get("appointments").markClean(dirtyDocuments, {}).then(function () {
                            console.debug("Synchronization complete.");
                            _this.observer.next(false);
                            resolve();
                        }, function (error) {
                            console.error("An error occurred while marking the dirty documents clean");
                            reject(error);
                        });
                    }, function (error) {
                        console.error("An error occurred while getting the dirty documents to mark clean");
                        reject();
                        return false;
                    });
                });
            }, function (error) {
                console.error("An error occurred while synchronizing the appointments to the server");
                reject();
            });
        });
    };
    return StorageServiceProvider;
}());
StorageServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__adapter_service_adapter_service__["a" /* AdapterServiceProvider */]])
], StorageServiceProvider);

//# sourceMappingURL=storage-service.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdapterServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/*
  Generated class for the AdapterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AdapterServiceProvider = (function () {
    function AdapterServiceProvider() {
    }
    AdapterServiceProvider.prototype.callAdapter = function (adapterName, path, verb, content) {
        verb = verb.toUpperCase();
        var rrVerb = verb === "GET" ? WLResourceRequest.GET : (verb === "POST" ? WLResourceRequest.POST : (verb === "PUT" ? WLResourceRequest.PUT : (verb === "DELETE" ? WLResourceRequest.DELETE : "")));
        var resourceRequest = new WLResourceRequest("/adapters/" + adapterName + "/" + path, rrVerb);
        resourceRequest.addHeader("Content-type", "application/json");
        return new Promise(function (resolve, reject) {
            resourceRequest.send(content).then(function (response) {
                resolve(response.responseJSON);
            }, function (error) {
                console.error("ERROR calling adapter: %o", error);
                reject(error);
            });
        });
    };
    return AdapterServiceProvider;
}());
AdapterServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], AdapterServiceProvider);

//# sourceMappingURL=adapter-service.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map