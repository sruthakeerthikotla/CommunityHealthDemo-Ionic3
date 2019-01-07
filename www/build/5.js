webpackJsonp([5],{

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(395);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
        ],
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParentPage; });
var ParentPage = (function () {
    function ParentPage(pageName) {
        this.toPage = pageName;
    }
    ParentPage.prototype.ionViewWillLeave = function () {
        ParentPage.fromPage = this.toPage;
    };
    ParentPage.prototype.onPageDidEnter = function () {
        WL.Logger.debug("[did enter] from = " + ParentPage.fromPage + ", to = " + this.toPage);
        WL.Analytics.log({ "fromPage": ParentPage.fromPage, "toPage": this.toPage });
        WL.Analytics.send();
    };
    return ParentPage;
}());

//# sourceMappingURL=parent.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parent_parent__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_service_storage_service__ = __webpack_require__(49);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage(nav, platform, modalCtrl, _viewController, _storageService) {
        var _this = _super.call(this, "Login") || this;
        _this.nav = nav;
        _this.platform = platform;
        _this.modalCtrl = modalCtrl;
        _this._viewController = _viewController;
        _this._storageService = _storageService;
        _this.isChallenged = false;
        _this.username = "";
        _this.password = "";
        _this.loginError = "";
        _this.loginInProgress = false;
        _this.stepUpLoginError = "";
        _this.logger = WL.Logger.create({ pkg: 'LoginPage' });
        // HACK: During debugging, the jsonstore.js is being loaded after initialization is completed, causing
        // a null pointer exception during JSONStore initialization.  
        setTimeout(function () {
            _this._storageService.initializeOfflineStorage().then(function (success) {
                _this.logger.log("LoginPage(): Offline storage initialized successfully.");
            }, function (error) {
                _this.logger.log("LoginPage(): Offline storage initialization failed.");
            });
        }, 1000);
        _this.challengeHandler = WL.Client.createSecurityCheckChallengeHandler("UserLoginSecurityCheck");
        _this.challengeHandler.handleChallenge = function (challenge) {
            _this.logger.log("Handling challenge: " + challenge);
            _this.isChallenged = true;
            if (!_this.nav.isActive(_this._viewController)) {
                _this.logger.log("Authentication required when not on login page");
                _this.nav.popToRoot();
            }
            if (challenge.errorMsg) {
                _this.loginError = challenge.errorMsg + " (Remaining attemps: " + challenge.remainingAttempts + ")";
                _this.loginInProgress = false;
            }
        };
        _this.challengeHandler.handleSuccess = function (successData) {
            _this.logger.log("Challenge Handler completed successfully: successData = " + JSON.stringify(successData));
            if (_this.loginInProgress) {
                _this.nav.push('AppointmentsPage');
                _this.isChallenged = false;
                _this.loginInProgress = false;
            }
        };
        _this.challengeHandler.handleFailure = function (error) {
            _this.loginError = error.failure;
            _this.isChallenged = false;
            _this.loginInProgress = false;
        };
        _this.stepUpChallengeHandler = WL.Client.createSecurityCheckChallengeHandler("StepUpSecurityCheck");
        var _stepUpChallengeHandler = _this.stepUpChallengeHandler;
        _this.stepUpChallengeHandler.handleChallenge = function (challenge) {
            if (challenge.question) {
                _this.logger.debug("Handling step up challenge: %o" + challenge);
                var modal = _this.modalCtrl.create('StepUpAuthenticationModalPage', { challenge: challenge });
                modal.onDidDismiss(function (answer) {
                    if (answer) {
                        challenge.answer = answer;
                        _stepUpChallengeHandler.submitChallengeAnswer(challenge);
                    }
                    else {
                        _stepUpChallengeHandler.cancel();
                    }
                });
                modal.present();
            }
        };
        _this.stepUpChallengeHandler.handleFailure = function (error) {
            this.stepUpLoginError = error.errorMsg;
        };
        _this.stepUpChallengeHandler.handleSuccess = function (successData) {
        };
        return _this;
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loginInProgress = true;
        this.loginError = "";
        WL.Logger.updateConfigFromServer();
        this.logger.debug("Sign in clicked!");
        if (WL.Client.getEnvironment() === "preview") {
            this._storageService.initializeOfflineStorage().then(function (success) {
                _this.nav.push('AppointmentsPage');
                _this.loginInProgress = false;
            }, function (error) {
                _this.nav.push('AppointmentsPage');
                _this.loginInProgress = false;
            });
        }
        else {
            if (this.isChallenged) {
                this.challengeHandler.submitChallengeAnswer({ username: this.username, password: this.password });
            }
            else {
                WLAuthorizationManager.login("UserLoginSecurityCheck", { username: this.username, password: this.password })
                    .then(function (userData) {
                    _this.logger.log("LoginPage.login(): Login success. User data = " + userData);
                }, function (error) {
                    _this.logger.log("LoginPage.login(): Login failed.");
                });
            }
        }
    };
    LoginPage.prototype.blurActiveInput = function () {
        if (!this.platform.is("iOS"))
            return;
        var activeElement = document.activeElement;
        if (activeElement.tagName == "INPUT" || activeElement.tagName == "TEXTAREA") {
            activeElement.blur();
        }
    };
    return LoginPage;
}(__WEBPACK_IMPORTED_MODULE_2__parent_parent__["a" /* ParentPage */]));
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/kavithavaradarajan/MFP8/CommunityHealthDemo-Ionic3/src/pages/login/login.html"*/'<ion-content class="loginPage" (click)="blurActiveInput()">\n    <div class="pageContent">\n        <div class="logo">\n        </div>\n        <div class="loginBox">\n            <div class="inputContainer">\n                <ion-input type="text" autocorrect="off" autocapitalize="off" placeholder="username" [(ngModel)]="username"></ion-input>\n            </div>\n            <div class="inputContainer">\n                <ion-input type="password" autocorrect="off" autocapitalize="off" placeholder="password" [(ngModel)]="password"></ion-input>\n            </div>\n            <div class="buttonContainer">\n                <button ion-button color="secondary" block (click)="login()">\n                    <span [hidden]="loginInProgress">Sign in</span>\n                    <ion-spinner name="circles" [hidden]="!loginInProgress"></ion-spinner> \n                <!-- div class="loginSpinnerContainer" [ngClass]="{hidden: !loginInProgress}"><ion-spinner light></ion-spinner></div -->\n                </button>\n            </div>\n        </div>\n        <div class="errorBox" [hidden]="!loginError">{{loginError}}</div>\n        <!--<div class="bottomLogoContainer">\n      <img class="bottomLogo" src="images/icon.png">\n      <div class="bottomText">Powered by <br/>IBM MobileFirst Foundation</div>\n    </div>-->\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/kavithavaradarajan/MFP8/CommunityHealthDemo-Ionic3/src/pages/login/login.html"*/,
        selector: 'page-login'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_storage_service_storage_service__["a" /* StorageServiceProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=5.js.map