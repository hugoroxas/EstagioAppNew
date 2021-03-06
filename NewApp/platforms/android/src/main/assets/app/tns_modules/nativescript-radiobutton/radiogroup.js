"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var color_1 = require("color");
var platform_1 = require("platform");
var dependency_observable_1 = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var app = require("application");
var stack_layout_1 = require("ui/layouts/stack-layout");
var label_1 = require("ui/label");
var RadioGroup = (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RadioGroup.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioGroup.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioGroup.prototype, "checkedButton", {
        get: function () {
            return this._getValue(RadioGroup.checkedButtonProperty);
        },
        set: function (value) {
            this._setValue(RadioGroup.checkedButtonProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioGroup.prototype, "fillColor", {
        get: function () {
            return this._fillColor;
        },
        set: function (color) {
            this._fillColor = color;
            if (this._android && platform_1.device.sdkVersion >= "21")
                this._android.setButtonTintList(android.content.res.ColorStateList.valueOf(new color_1.Color(this._fillColor).android));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioGroup.prototype, "tintColor", {
        get: function () {
            return this.fillColor;
        },
        set: function (color) {
            this.fillColor = color;
        },
        enumerable: true,
        configurable: true
    });
    RadioGroup.prototype._createUI = function () {
        this._android = new android.widget.RadioGroup(this._context, null);
        var that = new WeakRef(this);
        this._android.setOnCheckedChangeListener(new android.widget.RadioGroup.OnCheckedChangeListener({
            get owner() {
                return that.get();
            },
            onCheckedChanged: function (sender, checkedId) {
                if (this.owner) {
                    this.owner._onPropertyChangedFromNative(RadioGroup.checkedButtonProperty, checkedId);
                }
            }
        }));
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
    };
    return RadioGroup;
}(stack_layout_1.StackLayout));
RadioGroup.checkedButtonProperty = new dependency_observable_1.Property("checkedButton", "RadioGroup", new proxy_1.PropertyMetadata(false));
exports.RadioGroup = RadioGroup;
var RadioButton = (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RadioButton.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checkStyle", {
        get: function () {
            return this._checkStyle;
        },
        set: function (style) {
            this._checkStyle = style;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checkPadding", {
        get: function () {
            return this._checkPadding;
        },
        set: function (padding) {
            this._checkPadding = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checkPaddingLeft", {
        get: function () {
            return this._checkPaddingLeft;
        },
        set: function (padding) {
            this._checkPaddingLeft = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checkPaddingTop", {
        get: function () {
            return this._checkPaddingTop;
        },
        set: function (padding) {
            this._checkPaddingTop = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checkPaddingRight", {
        get: function () {
            return this._checkPaddingRight;
        },
        set: function (padding) {
            this._checkPaddingRight = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checkPaddingBottom", {
        get: function () {
            return this._checkPaddingBottom;
        },
        set: function (padding) {
            this._checkPaddingBottom = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checked", {
        get: function () {
            return this._getValue(RadioButton.checkedProperty);
        },
        set: function (value) {
            this._setValue(RadioButton.checkedProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "enabled", {
        get: function () {
            return this._getValue(RadioButton.enabledProperty);
        },
        set: function (value) {
            this._setValue(RadioButton.enabledProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "text", {
        get: function () {
            return this._getValue(RadioButton.textProperty);
        },
        set: function (value) {
            this._setValue(RadioButton.textProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "fillColor", {
        get: function () {
            return this._fillColor;
        },
        set: function (color) {
            this._fillColor = color;
            if (this._android && platform_1.device.sdkVersion >= "21")
                this._android.setButtonTintList(android.content.res.ColorStateList.valueOf(new color_1.Color(this._fillColor).android));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "tintColor", {
        get: function () {
            return this.fillColor;
        },
        set: function (color) {
            this.fillColor = color;
        },
        enumerable: true,
        configurable: true
    });
    RadioButton.prototype._createUI = function () {
        this._android = new android.widget.RadioButton(this._context, null);
        if (this.checkPaddingLeft) {
            this._android.setPadding(parseInt(this.checkPaddingLeft), this._android.getPaddingTop(), this._android.getPaddingRight(), this._android.getPaddingBottom());
        }
        if (this.checkPaddingTop) {
            this._android.setPadding(this._android.getPaddingLeft(), parseInt(this.checkPaddingTop), this._android.getPaddingRight(), this._android.getPaddingBottom());
        }
        if (this.checkPaddingRight) {
            this._android.setPadding(this._android.getPaddingLeft(), this._android.getPaddingTop(), parseInt(this.checkPaddingRight), this._android.getPaddingBottom());
        }
        if (this.checkPaddingBottom) {
            this._android.setPadding(this._android.getPaddingLeft(), this._android.getPaddingTop(), this._android.getPaddingRight(), parseInt(this.checkPaddingBottom));
        }
        if (this.checkPadding) {
            var pads = this.checkPadding.toString().split(',');
            switch (pads.length) {
                case 1:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[0]), parseInt(pads[0]), parseInt(pads[0]));
                    break;
                case 2:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[0]), parseInt(pads[1]));
                    break;
                case 3:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[2]), parseInt(pads[1]));
                    break;
                case 4:
                    this._android.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[2]), parseInt(pads[3]));
                    break;
            }
        }
        if (this.text) {
            this._android.setText(this.text);
        }
        if (this.enabled) {
            this._android.setEnabled(this.enabled);
        }
        if (!this.fontSize) {
            this.fontSize = 15;
        }
        if (this._checkStyle) {
            var drawable = app.android.context.getResources().getIdentifier(this._checkStyle, "drawable", app.android.context.getPackageName());
            this._android.setButtonDrawable(drawable);
        }
        if (this._android) {
            if (this.fillColor) {
                android.support.v4.widget.CompoundButtonCompat.setButtonTintList(this._android, android.content.res.ColorStateList.valueOf(new color_1.Color(this._fillColor).android));
            }
        }
        var that = new WeakRef(this);
        this._android.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            get owner() {
                return that.get();
            },
            onCheckedChanged: function (sender, isChecked) {
                if (this.owner) {
                    this.owner._onPropertyChangedFromNative(RadioButton.checkedProperty, isChecked);
                }
            }
        }));
    };
    RadioButton.prototype.toggle = function () {
        this._android.toggle();
    };
    return RadioButton;
}(label_1.Label));
RadioButton.checkedProperty = new dependency_observable_1.Property("checked", "RadioButton", new proxy_1.PropertyMetadata(false));
RadioButton.enabledProperty = new dependency_observable_1.Property("enabled", "RadioButton", new proxy_1.PropertyMetadata(false));
RadioButton.textProperty = new dependency_observable_1.Property("text", "RadioButton", new proxy_1.PropertyMetadata(false));
exports.RadioButton = RadioButton;
function onCheckedPropertyChanged(data) {
    var cBox = data.object;
    if (!cBox.android) {
        return;
    }
    cBox.android.setChecked(data.newValue);
}
RadioButton.checkedProperty.metadata.onSetNativeValue = onCheckedPropertyChanged;
function onEnabledPropertyChanged(data) {
    var cBox = data.object;
    if (!cBox.android) {
        return;
    }
    cBox.android.setEnabled(data.newValue);
}
RadioButton.enabledProperty.metadata.onSetNativeValue = onEnabledPropertyChanged;
function onTextPropertyChanged(data) {
    var cBox = data.object;
    if (!cBox.android) {
        return;
    }
    cBox.android.setText(data.newValue);
}
RadioButton.textProperty.metadata.onSetNativeValue = onTextPropertyChanged;
//# sourceMappingURL=radiogroup.js.map