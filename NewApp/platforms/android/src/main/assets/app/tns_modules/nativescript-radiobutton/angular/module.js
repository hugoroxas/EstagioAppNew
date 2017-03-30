"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var element_registry_1 = require("nativescript-angular/element-registry");
var core_1 = require("@angular/core");
var directives_1 = require("./directives");
element_registry_1.registerElement("RadioGroup", function () { return require("nativescript-radiobutton").RadioGroup; });
element_registry_1.registerElement("RadioButton", function () { return require("nativescript-radiobutton").RadioButton; });
var RadioButtonModule = (function () {
    function RadioButtonModule() {
    }
    return RadioButtonModule;
}());
RadioButtonModule = __decorate([
    core_1.NgModule({
        declarations: [
            directives_1.RADIOBUTTON_DIRECTIVES
        ],
        exports: [
            directives_1.RADIOBUTTON_DIRECTIVES
        ]
    })
], RadioButtonModule);
exports.RadioButtonModule = RadioButtonModule;
//# sourceMappingURL=module.js.map