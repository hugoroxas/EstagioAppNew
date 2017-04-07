"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var RadioGroupComponent = (function () {
    function RadioGroupComponent(_element, _applicationRef) {
        this._element = _element;
        this._applicationRef = _applicationRef;
        this.valueChange = new core_1.EventEmitter();
        this.radioButtons = [];
    }
    RadioGroupComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var i = 0;
        var max = this._element.nativeElement.getChildrenCount();
        while (i < max) {
            if (typeof this._element.nativeElement.getChildAt(i).checked !== 'undefined') {
                this.radioButtons.push(this._element.nativeElement.getChildAt(i));
            }
            i++;
        }
        this._element.nativeElement.on('propertyChange', function (res) {
            if (res.propertyName === 'checkedButton') {
                _this.getNewSelectedBox();
            }
        });
    };
    RadioGroupComponent.prototype.getNewSelectedBox = function () {
        var i = 0;
        var max = this.radioButtons.length;
        while (i < max) {
            if (this.radioButtons[i].checked === true) {
                this.valueChange.emit(i);
                this._applicationRef.tick();
            }
            i++;
        }
    };
    RadioGroupComponent.prototype.setBoxToSelected = function (index) {
        this.radioButtons[index].checked = true;
    };
    RadioGroupComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('value')) {
            if (typeof changes['value'].currentValue !== 'undefined') {
                this.setBoxToSelected(changes['value'].currentValue);
            }
        }
    };
    return RadioGroupComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RadioGroupComponent.prototype, "value", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RadioGroupComponent.prototype, "valueChange", void 0);
RadioGroupComponent = __decorate([
    core_1.Component({
        selector: "RadioGroup",
        template: "<ng-content></ng-content>",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styles: []
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.ApplicationRef])
], RadioGroupComponent);
exports.RadioGroupComponent = RadioGroupComponent;
//# sourceMappingURL=radiogroup.component.js.map