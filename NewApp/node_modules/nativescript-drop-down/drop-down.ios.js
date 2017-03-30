/*! *****************************************************************************
Copyright (c) 2015 Tangra Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
***************************************************************************** */
"use strict";
var label_1 = require("ui/label");
var list_picker_1 = require("ui/list-picker");
var observable_1 = require("data/observable");
var common = require("./drop-down-common");
var style = require("ui/styling/style");
var utils = require("utils/utils");
var span_1 = require("text/span");
var formatted_string_1 = require("text/formatted-string");
var color_1 = require("color");
var enums = require("ui/enums");
var types = require("utils/types");
global.moduleMerge(common, exports);
var TOOLBAR_HEIGHT = 44;
var HINT_COLOR = new color_1.Color("#3904041E");
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown() {
        _super.call(this);
        var applicationFrame = utils.ios.getter(UIScreen, UIScreen.mainScreen).applicationFrame;
        this._label = new DropDownLabelWrapper(this);
        this._listPicker = new list_picker_1.ListPicker();
        this._listPicker._delegate = DropDownListPickerDelegateImpl.initWithOwner(this);
        this._flexToolbarSpace = UIBarButtonItem.alloc().initWithBarButtonSystemItemTargetAction(5, null, null);
        this._doneTapDelegate = TapHandler.initWithOwner(new WeakRef(this));
        this._doneButton = UIBarButtonItem.alloc().initWithBarButtonSystemItemTargetAction(0, this._doneTapDelegate, "tap");
        this._accessoryViewVisible = true;
        this._toolbar = UIToolbar.alloc().initWithFrame(CGRectMake(0, 0, applicationFrame.size.width, TOOLBAR_HEIGHT));
        this._toolbar.autoresizingMask = 2;
        var nsArray = NSMutableArray.alloc().init();
        nsArray.addObject(this._flexToolbarSpace);
        nsArray.addObject(this._doneButton);
        this._toolbar.setItemsAnimated(nsArray, false);
    }
    Object.defineProperty(DropDown.prototype, "ios", {
        get: function () {
            return this._label.ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "accessoryViewVisible", {
        get: function () {
            return this._accessoryViewVisible;
        },
        set: function (value) {
            this._accessoryViewVisible = value;
            this._showHideAccessoryView();
        },
        enumerable: true,
        configurable: true
    });
    DropDown.prototype._showHideAccessoryView = function () {
        this.ios.inputAccessoryView = (this._accessoryViewVisible ? this._toolbar : null);
    };
    DropDown.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        this._label.onLoaded();
        this._listPicker.onLoaded();
        this._listPicker.on(observable_1.Observable.propertyChangeEvent, function (data) {
            if (data.propertyName === "selectedIndex") {
                _this.selectedIndex = data.value;
            }
        });
        this.ios.inputView = this._listPicker.ios;
        this._showHideAccessoryView();
    };
    DropDown.prototype.onUnloaded = function () {
        this.ios.inputView = null;
        this.ios.inputAccessoryView = null;
        this._listPicker.off(observable_1.Observable.propertyChangeEvent);
        this._label.onUnloaded();
        this._listPicker.onUnloaded();
        _super.prototype.onUnloaded.call(this);
    };
    DropDown.prototype.open = function () {
        this._label.ios.becomeFirstResponder();
    };
    DropDown.prototype._onItemsPropertyChanged = function (data) {
        var isNothingSelected = types.isNullOrUndefined(this.selectedIndex);
        this._listPicker.items = data.newValue;
        if (isNothingSelected) {
            this.selectedIndex = null;
        }
    };
    DropDown.prototype._onHintPropertyChanged = function (data) {
        this._label.hint = data.newValue;
    };
    DropDown.prototype._onSelectedIndexPropertyChanged = function (data) {
        _super.prototype._onSelectedIndexPropertyChanged.call(this, data);
        this._listPicker.selectedIndex = data.newValue;
        this._label.text = (this.items && this.items.getItem ? this.items.getItem(data.newValue) : this.items[data.newValue]);
    };
    return DropDown;
}(common.DropDown));
exports.DropDown = DropDown;
var TapHandler = (function (_super) {
    __extends(TapHandler, _super);
    function TapHandler() {
        _super.apply(this, arguments);
    }
    TapHandler.initWithOwner = function (owner) {
        var tapHandler = TapHandler.new();
        tapHandler._owner = owner;
        return tapHandler;
    };
    TapHandler.prototype.tap = function () {
        this._owner.get().ios.resignFirstResponder();
    };
    TapHandler.ObjCExposedMethods = {
        "tap": { returns: interop.types.void, params: [] }
    };
    return TapHandler;
}(NSObject));
var DropDownListPickerDelegateImpl = (function (_super) {
    __extends(DropDownListPickerDelegateImpl, _super);
    function DropDownListPickerDelegateImpl() {
        _super.apply(this, arguments);
    }
    DropDownListPickerDelegateImpl.initWithOwner = function (owner) {
        var delegate = DropDownListPickerDelegateImpl.new();
        delegate._owner = new WeakRef(owner);
        return delegate;
    };
    DropDownListPickerDelegateImpl.prototype.pickerViewAttributedTitleForRowForComponent = function (pickerView, row, component) {
        var owner = this._owner.get();
        var span = new span_1.Span();
        var formattedString = new formatted_string_1.FormattedString();
        formattedString.spans.push(span);
        if (owner) {
            span.text = owner._listPicker._getItemAsString(row);
            span.foregroundColor = owner.style.color;
            switch (owner.style.textDecoration) {
                case enums.TextDecoration.underline:
                    span.underline = 1;
                    break;
                case enums.TextDecoration.lineThrough:
                    span.strikethrough = 1;
                    break;
            }
        }
        return formattedString._formattedText;
    };
    DropDownListPickerDelegateImpl.prototype.pickerViewDidSelectRowInComponent = function (pickerView, row, component) {
        var owner = this._owner.get();
        if (owner) {
            var oldIndex = owner.selectedIndex;
            owner._listPicker._onPropertyChangedFromNative(list_picker_1.ListPicker.selectedIndexProperty, row);
            if (row !== oldIndex) {
                owner.notify({
                    eventName: common.DropDown.selectedIndexChangedEvent,
                    object: owner,
                    oldIndex: oldIndex,
                    newIndex: row
                });
            }
        }
    };
    DropDownListPickerDelegateImpl.ObjCProtocols = [UIPickerViewDelegate];
    return DropDownListPickerDelegateImpl;
}(NSObject));
var DropDownLabelWrapper = (function (_super) {
    __extends(DropDownLabelWrapper, _super);
    function DropDownLabelWrapper(dropDown) {
        _super.call(this);
        this._hint = "";
        this._hasText = true;
        this._ios = DropDownLabel.initWithOwner(dropDown);
        this._ios.userInteractionEnabled = true;
    }
    DropDownLabelWrapper.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this.internalColor = this.color;
        this.text = null;
    };
    Object.defineProperty(DropDownLabelWrapper.prototype, "text", {
        get: function () {
            return this._ios.text;
        },
        set: function (value) {
            var actualText = value || this._hint || "";
            this._hasText = !types.isNullOrUndefined(value);
            this._ios.text = (actualText === "" ? " " : actualText);
            this._refreshColor();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownLabelWrapper.prototype, "hint", {
        get: function () {
            return this._hint;
        },
        set: function (value) {
            this._hint = value;
            if (!this._hasText) {
                this._ios.text = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownLabelWrapper.prototype, "internalColor", {
        get: function () {
            return this._internalColor;
        },
        set: function (value) {
            this._internalColor = value;
            this._refreshColor();
        },
        enumerable: true,
        configurable: true
    });
    DropDownLabelWrapper.prototype._refreshColor = function () {
        this.color = (this._hasText ? this._internalColor : HINT_COLOR);
    };
    return DropDownLabelWrapper;
}(label_1.Label));
var DropDownLabel = (function (_super) {
    __extends(DropDownLabel, _super);
    function DropDownLabel() {
        _super.apply(this, arguments);
    }
    DropDownLabel.initWithOwner = function (owner) {
        var label = DropDownLabel.new();
        label._owner = new WeakRef(owner);
        label._isInputViewOpened = false;
        return label;
    };
    Object.defineProperty(DropDownLabel.prototype, "inputView", {
        get: function () {
            return this._inputView;
        },
        set: function (value) {
            this._inputView = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownLabel.prototype, "inputAccessoryView", {
        get: function () {
            return this._inputAccessoryView;
        },
        set: function (value) {
            this._inputAccessoryView = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownLabel.prototype, "canBecomeFirstResponder", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownLabel.prototype, "canResignFirstResponder", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DropDownLabel.prototype.becomeFirstResponder = function () {
        var result = _super.prototype.becomeFirstResponder.call(this);
        if (result) {
            if (!this._isInputViewOpened) {
                var owner = this._owner.get();
                owner.notify({
                    eventName: common.DropDown.openedEvent,
                    object: owner
                });
            }
            this._isInputViewOpened = true;
        }
        return result;
    };
    DropDownLabel.prototype.resignFirstResponder = function () {
        var result = _super.prototype.resignFirstResponder.call(this);
        if (result) {
            this._isInputViewOpened = false;
        }
        return result;
    };
    DropDownLabel.prototype.touchesEndedWithEvent = function (touches, event) {
        this.becomeFirstResponder();
    };
    return DropDownLabel;
}(TNSLabel));
var DropDownStyler = (function () {
    function DropDownStyler() {
    }
    DropDownStyler.setFontInternalProperty = function (dropDown, newValue, nativeValue) {
        var ios = dropDown.ios;
        ios.font = newValue.getUIFont(nativeValue);
    };
    DropDownStyler.resetFontInternalProperty = function (dropDown, nativeValue) {
        var ios = dropDown.ios;
        ios.font = nativeValue;
    };
    DropDownStyler.getNativeFontInternalValue = function (dropDown) {
        var ios = dropDown.ios;
        return ios.font;
    };
    DropDownStyler.setTextAlignmentProperty = function (dropDown, newValue) {
        utils.ios.setTextAlignment(dropDown.ios, newValue);
    };
    DropDownStyler.resetTextAlignmentProperty = function (dropDown, nativeValue) {
        var ios = dropDown.ios;
        ios.textAlignment = nativeValue;
    };
    DropDownStyler.getNativeTextAlignmentValue = function (dropDown) {
        var ios = dropDown.ios;
        return ios.textAlignment;
    };
    DropDownStyler.setTextDecorationProperty = function (dropDown, newValue) {
        dropDown._label.style.textDecoration = newValue;
        dropDown._label.style._updateTextDecoration();
    };
    DropDownStyler.resetTextDecorationProperty = function (dropDown, nativeValue) {
        dropDown._label.style.textDecoration = enums.TextDecoration.none;
        dropDown._label.style._updateTextDecoration();
    };
    DropDownStyler.setColorProperty = function (dropDown, newValue) {
        var dropDownLabel = dropDown._label, pickerView = dropDown._listPicker.ios;
        dropDownLabel.internalColor = utils.ios.getColor(newValue);
        pickerView.reloadAllComponents();
    };
    DropDownStyler.resetColorProperty = function (dropDown, nativeValue) {
        var dropDownLabel = dropDown._label, pickerView = dropDown._listPicker.ios;
        dropDownLabel.internalColor = utils.ios.getColor(nativeValue);
        pickerView.reloadAllComponents();
    };
    DropDownStyler.getNativeColorValue = function (dropDown) {
        var dropDownLabel = dropDown._label;
        return dropDownLabel.internalColor ? dropDownLabel.internalColor.ios : dropDownLabel.ios.textColor;
    };
    DropDownStyler.setBackgroundColorProperty = function (dropDown, newValue) {
        var ios = dropDown.ios;
        var pickerView = dropDown._listPicker.ios;
        ios.backgroundColor = newValue;
        pickerView.backgroundColor = newValue;
    };
    DropDownStyler.resetBackgroundColorProperty = function (dropDown, nativeValue) {
        var ios = dropDown.ios;
        var pickerView = dropDown._listPicker.ios;
        ios.backgroundColor = nativeValue;
        pickerView.backgroundColor = nativeValue;
    };
    DropDownStyler.getNativeBackgroundColorValue = function (dropDown) {
        var ios = dropDown.ios;
        return ios.backgroundColor;
    };
    DropDownStyler.setPaddingProperty = function (dropDown, newValue) {
        DropDownStyler.setPadding(dropDown, newValue);
    };
    DropDownStyler.resetPaddingProperty = function (dropDown, nativeValue) {
        DropDownStyler.setPadding(dropDown, nativeValue);
    };
    DropDownStyler.getPaddingProperty = function (dropDown) {
        var styles = dropDown.style;
        if (styles) {
            return UIEdgeInsetsFromString("{" + styles.paddingTop + "," + styles.paddingLeft + "," + styles.paddingBottom + "," + styles.paddingRight + "}");
        }
        return UIEdgeInsetsZero;
    };
    DropDownStyler.setPadding = function (dropDown, newValue) {
        dropDown._label.style.paddingTop = newValue.top;
        dropDown._label.style.paddingRight = newValue.right;
        dropDown._label.style.paddingBottom = newValue.bottom;
        dropDown._label.style.paddingLeft = newValue.left;
    };
    DropDownStyler.registerHandlers = function () {
        style.registerHandler(style.fontInternalProperty, new style.StylePropertyChangedHandler(DropDownStyler.setFontInternalProperty, DropDownStyler.resetFontInternalProperty, DropDownStyler.getNativeFontInternalValue), "DropDown");
        style.registerHandler(style.textAlignmentProperty, new style.StylePropertyChangedHandler(DropDownStyler.setTextAlignmentProperty, DropDownStyler.resetTextAlignmentProperty, DropDownStyler.getNativeTextAlignmentValue), "DropDown");
        style.registerHandler(style.textDecorationProperty, new style.StylePropertyChangedHandler(DropDownStyler.setTextDecorationProperty, DropDownStyler.resetTextDecorationProperty), "DropDown");
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(DropDownStyler.setColorProperty, DropDownStyler.resetColorProperty, DropDownStyler.getNativeColorValue), "DropDown");
        style.registerHandler(style.backgroundColorProperty, new style.StylePropertyChangedHandler(DropDownStyler.setBackgroundColorProperty, DropDownStyler.resetBackgroundColorProperty, DropDownStyler.getNativeBackgroundColorValue), "DropDown");
        style.registerHandler(style.nativePaddingsProperty, new style.StylePropertyChangedHandler(DropDownStyler.setPaddingProperty, DropDownStyler.resetPaddingProperty, DropDownStyler.getPaddingProperty), "DropDown");
    };
    return DropDownStyler;
}());
exports.DropDownStyler = DropDownStyler;
DropDownStyler.registerHandlers();
