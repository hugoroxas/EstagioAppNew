"use strict";
var view_1 = require("ui/core/view");
var color_1 = require("color");
var platform_1 = require("platform");
var dependency_observable_1 = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var style = require("ui/styling/style");
var app = require("application");
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CheckBox.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkStyle", {
        get: function () {
            return this._checkStyle;
        },
        set: function (style) {
            this._checkStyle = style;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPadding", {
        get: function () {
            return this._checkPadding;
        },
        set: function (padding) {
            this._checkPadding = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingLeft", {
        get: function () {
            return this._checkPaddingLeft;
        },
        set: function (padding) {
            this._checkPaddingLeft = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingTop", {
        get: function () {
            return this._checkPaddingTop;
        },
        set: function (padding) {
            this._checkPaddingTop = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingRight", {
        get: function () {
            return this._checkPaddingRight;
        },
        set: function (padding) {
            this._checkPaddingRight = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checkPaddingBottom", {
        get: function () {
            return this._checkPaddingBottom;
        },
        set: function (padding) {
            this._checkPaddingBottom = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "checked", {
        get: function () {
            return this._getValue(CheckBox.checkedProperty);
        },
        set: function (value) {
            this._setValue(CheckBox.checkedProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "text", {
        get: function () {
            return this._getValue(CheckBox.textProperty);
        },
        set: function (value) {
            this._setValue(CheckBox.textProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBox.prototype, "fillColor", {
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
    Object.defineProperty(CheckBox.prototype, "tintColor", {
        get: function () {
            return this.fillColor;
        },
        set: function (color) {
            this.fillColor = color;
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype._createUI = function () {
        this._android = new android.support.v7.widget.AppCompatCheckBox(this._context, null);
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
                    this.owner._onPropertyChangedFromNative(CheckBox.checkedProperty, isChecked);
                }
            }
        }));
    };
    CheckBox.prototype.toggle = function () {
        this._android.toggle();
    };
    return CheckBox;
}(view_1.View));
CheckBox.checkedProperty = new dependency_observable_1.Property("checked", "CheckBox", new proxy_1.PropertyMetadata(false));
CheckBox.textProperty = new dependency_observable_1.Property("text", "CheckBox", new proxy_1.PropertyMetadata(false));
exports.CheckBox = CheckBox;
function onCheckedPropertyChanged(data) {
    var cBox = data.object;
    if (!cBox.android) {
        return;
    }
    cBox.android.setChecked(data.newValue);
}
CheckBox.checkedProperty.metadata.onSetNativeValue = onCheckedPropertyChanged;
function onTextPropertyChanged(data) {
    var cBox = data.object;
    if (!cBox.android) {
        return;
    }
    cBox.android.setText(data.newValue);
}
CheckBox.textProperty.metadata.onSetNativeValue = onTextPropertyChanged;
var CheckBoxStyler = (function () {
    function CheckBoxStyler() {
    }
    CheckBoxStyler.setColorLabelProperty = function (view, newValue) {
        var cb = view._nativeView;
        if (cb) {
            cb.setTextColor(new color_1.Color(newValue).android);
        }
    };
    CheckBoxStyler.setFontInternalProperty = function (view, newValue, nativeValue) {
        var tv = view._nativeView;
        var fontValue = newValue;
        var typeface = fontValue.getAndroidTypeface();
        if (typeface) {
            tv.setTypeface(typeface);
        }
        else {
            tv.setTypeface(nativeValue.typeface);
        }
        if (fontValue.fontSize) {
            tv.setTextSize(fontValue.fontSize);
        }
        else {
            tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, nativeValue.size);
        }
    };
    CheckBoxStyler.resetFontInternalProperty = function (view, nativeValue) {
        var tv = view._nativeView;
        if (tv && nativeValue) {
            tv.setTypeface(nativeValue.typeface);
            tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, nativeValue.size);
        }
    };
    CheckBoxStyler.getNativeFontInternalValue = function (view) {
        var tv = view._nativeView;
        return {
            typeface: tv.getTypeface(),
            size: tv.getTextSize()
        };
    };
    CheckBoxStyler.resetColorProperty = function (view, nativeValue) {
    };
    CheckBoxStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(CheckBoxStyler.setColorLabelProperty, CheckBoxStyler.resetColorProperty), "CheckBox");
        style.registerHandler(style.fontInternalProperty, new style.StylePropertyChangedHandler(CheckBoxStyler.setFontInternalProperty, CheckBoxStyler.resetFontInternalProperty, CheckBoxStyler.getNativeFontInternalValue), "CheckBox");
        style.registerHandler(style.backgroundColorProperty, new style.StylePropertyChangedHandler(CheckBoxStyler.setColorLabelProperty, CheckBoxStyler.resetColorProperty), "CheckBox");
    };
    return CheckBoxStyler;
}());
exports.CheckBoxStyler = CheckBoxStyler;
CheckBoxStyler.registerHandlers();
