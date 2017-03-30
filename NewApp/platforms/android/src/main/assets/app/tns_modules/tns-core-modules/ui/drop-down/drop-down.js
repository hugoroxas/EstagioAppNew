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
var common = require("./drop-down-common");
var label_1 = require("ui/label");
var stack_layout_1 = require("ui/layouts/stack-layout");
var color_1 = require("color");
var types = require("utils/types");
var enums = require("ui/enums");
var style = require("ui/styling/style");
global.moduleMerge(common, exports);
var LABELVIEWID = "spinner-label";
var RealizedViewType;
(function (RealizedViewType) {
    RealizedViewType[RealizedViewType["ItemView"] = 0] = "ItemView";
    RealizedViewType[RealizedViewType["DropDownView"] = 1] = "DropDownView";
})(RealizedViewType || (RealizedViewType = {}));
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown() {
        _super.apply(this, arguments);
        this._realizedItems = [{}, {}];
    }
    DropDown.prototype._createUI = function () {
        this._android = new android.widget.Spinner(this._context);
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
        this.android.setAdapter(new DropDownAdapter(this));
        var that = new WeakRef(this);
        this.android.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
            onItemSelected: function (parent, convertView, index, id) {
                var owner = that.get(), oldIndex = owner.selectedIndex, newIndex = (index === 0 ? undefined : index - 1);
                owner._selectedIndexInternal = index;
                if (newIndex !== oldIndex) {
                    owner.notify({
                        eventName: common.DropDown.selectedIndexChangedEvent,
                        object: owner,
                        oldIndex: oldIndex,
                        newIndex: newIndex
                    });
                }
            },
            onNothingSelected: function () { }
        }));
        this.android.setOnTouchListener(new android.view.View.OnTouchListener({
            onTouch: function (v, event) {
                if (event.getAction() === android.view.MotionEvent.ACTION_DOWN) {
                    var owner = that.get();
                    owner.notify({
                        eventName: common.DropDown.openedEvent,
                        object: owner
                    });
                }
                return false;
            }
        }));
        if (!types.isNullOrUndefined(this.selectedIndex)) {
            this.android.setSelection(this.selectedIndex + 1);
        }
    };
    Object.defineProperty(DropDown.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "_selectedIndexInternal", {
        set: function (value) {
            this.selectedIndex = (value === 0 ? undefined : value - 1);
            if (this.android) {
                this.android.setSelection(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DropDown.prototype.open = function () {
        this._android.performClick();
    };
    DropDown.prototype._onItemsPropertyChanged = function (data) {
        if (!this._android || !this._android.getAdapter()) {
            return;
        }
        this._updateSelectedIndexOnItemsPropertyChanged(data.newValue);
        this.android.getAdapter().notifyDataSetChanged();
    };
    DropDown.prototype._onDetached = function (force) {
        _super.prototype._onDetached.call(this, force);
        this._clearCache(RealizedViewType.DropDownView);
        this._clearCache(RealizedViewType.ItemView);
    };
    DropDown.prototype._getRealizedView = function (convertView, realizedViewType) {
        if (!convertView) {
            var view = new label_1.Label();
            var layout = new stack_layout_1.StackLayout();
            layout.style.horizontalAlignment = enums.HorizontalAlignment.stretch;
            view.id = LABELVIEWID;
            layout.addChild(view);
            return layout;
        }
        return this._realizedItems[realizedViewType][convertView.hashCode()];
    };
    DropDown.prototype._onSelectedIndexPropertyChanged = function (data) {
        _super.prototype._onSelectedIndexPropertyChanged.call(this, data);
        this._clearCache(RealizedViewType.DropDownView);
        this._selectedIndexInternal = (types.isNullOrUndefined(data.newValue) ? 0 : data.newValue + 1);
    };
    DropDown.prototype._onHintPropertyChanged = function (data) {
        if (!this._android || !this._android.getAdapter()) {
            return;
        }
        this.android.getAdapter().notifyDataSetChanged();
    };
    DropDown.prototype._propagatePropertyToRealizedViews = function (property, value, isIncludeHintIn) {
        if (isIncludeHintIn === void 0) { isIncludeHintIn = true; }
        var realizedItems = this._realizedItems;
        for (var _i = 0, realizedItems_1 = realizedItems; _i < realizedItems_1.length; _i++) {
            var item = realizedItems_1[_i];
            for (var key in item) {
                if (isIncludeHintIn || !item[key].isHintViewIn) {
                    item[key][property] = value;
                }
            }
        }
    };
    DropDown.prototype._propagateStylePropertyToRealizedViews = function (property, value, isIncludeHintIn) {
        if (isIncludeHintIn === void 0) { isIncludeHintIn = true; }
        var realizedItems = this._realizedItems;
        for (var _i = 0, realizedItems_2 = realizedItems; _i < realizedItems_2.length; _i++) {
            var item = realizedItems_2[_i];
            for (var key in item) {
                var view = item[key];
                if (isIncludeHintIn || !view.isHintViewIn) {
                    if (property === "textDecoration") {
                        var label = view.getViewById(LABELVIEWID);
                        label.style[property] = value;
                    }
                    else {
                        view.style[property] = value;
                    }
                }
            }
        }
    };
    DropDown.prototype._updateSelectedIndexOnItemsPropertyChanged = function (newItems) {
        var newItemsCount = 0;
        if (newItems && newItems.length) {
            newItemsCount = newItems.length;
        }
        if (newItemsCount === 0 || this.selectedIndex >= newItemsCount) {
            this.selectedIndex = undefined;
        }
    };
    DropDown.prototype._clearCache = function (realizedViewType) {
        var items = this._realizedItems[realizedViewType];
        var keys = Object.keys(items);
        var i;
        var length = keys.length;
        var view;
        var key;
        for (i = 0; i < length; i++) {
            key = keys[i];
            view = items[key];
            view.parent._removeView(view);
            delete items[key];
        }
    };
    return DropDown;
}(common.DropDown));
exports.DropDown = DropDown;
var DropDownAdapter = (function (_super) {
    __extends(DropDownAdapter, _super);
    function DropDownAdapter(dropDown) {
        _super.call(this);
        this._dropDown = dropDown;
        return global.__native(this);
    }
    DropDownAdapter.prototype.isEnabled = function (i) {
        return i !== 0;
    };
    DropDownAdapter.prototype.getCount = function () {
        return (this._dropDown && this._dropDown.items ? this._dropDown.items.length : 0) + 1;
    };
    DropDownAdapter.prototype.getItem = function (i) {
        if (i === 0) {
            return this._dropDown.hint;
        }
        var realIndex = i - 1;
        if (this._dropDown && this._dropDown.items && realIndex < this._dropDown.items.length) {
            return this._dropDown.items.getItem ? this._dropDown.items.getItem(realIndex) : this._dropDown.items[realIndex];
        }
        return null;
    };
    DropDownAdapter.prototype.getItemId = function (i) {
        return long(i);
    };
    DropDownAdapter.prototype.hasStableIds = function () {
        return true;
    };
    DropDownAdapter.prototype.getView = function (index, convertView, parent) {
        return this._generateView(index, convertView, parent, RealizedViewType.ItemView);
    };
    DropDownAdapter.prototype.getDropDownView = function (index, convertView, parent) {
        return this._generateView(index, convertView, parent, RealizedViewType.DropDownView);
    };
    DropDownAdapter.prototype._generateView = function (index, convertView, parent, realizedViewType) {
        if (!this._dropDown) {
            return null;
        }
        var view = this._dropDown._getRealizedView(convertView, realizedViewType);
        if (view) {
            if (!view.parent) {
                this._dropDown._addView(view);
                convertView = view.android;
            }
            var label = view.getViewById(LABELVIEWID);
            label.text = this.getItem(index);
            view.color = this._dropDown.color;
            view.backgroundColor = this._dropDown.backgroundColor;
            label.style.textDecoration = this._dropDown.style.textDecoration;
            view.style.padding = this._dropDown.style.padding;
            view.style.fontSize = this._dropDown.style.fontSize;
            view.height = this._dropDown.height;
            if (realizedViewType === RealizedViewType.DropDownView) {
                view.opacity = this._dropDown.opacity;
            }
            view.isHintViewIn = false;
            if (index === 0) {
                view.color = new color_1.Color(255, 148, 150, 148);
                view.isHintViewIn = true;
                if (realizedViewType === RealizedViewType.DropDownView
                    && (types.isNullOrUndefined(this._dropDown.hint) || this._dropDown.hint === "")) {
                    view.height = 1;
                    view.style.fontSize = 0;
                    view.style.padding = "0";
                }
            }
            this._dropDown._realizedItems[realizedViewType][convertView.hashCode()] = view;
        }
        return convertView;
    };
    return DropDownAdapter;
}(android.widget.BaseAdapter));
var DropDownStyler = (function () {
    function DropDownStyler() {
    }
    DropDownStyler.setTextDecorationProperty = function (dropDown, newValue) {
        dropDown._propagateStylePropertyToRealizedViews("textDecoration", newValue);
    };
    DropDownStyler.resetTextDecorationProperty = function (dropDown, nativeValue) {
        dropDown._propagateStylePropertyToRealizedViews("textDecoration", nativeValue);
    };
    DropDownStyler.setColorProperty = function (dropDown, newValue) {
        dropDown._propagatePropertyToRealizedViews("color", new color_1.Color(newValue), false);
    };
    DropDownStyler.resetColorProperty = function (dropDown, nativeValue) {
        dropDown._propagatePropertyToRealizedViews("color", new color_1.Color(nativeValue), false);
    };
    DropDownStyler.getNativeColorValue = function (dropDown) {
        return dropDown.color.android;
    };
    DropDownStyler.setBackgroundColorProperty = function (dropDown, newValue) {
        dropDown._propagatePropertyToRealizedViews("backgroundColor", new color_1.Color(newValue));
    };
    DropDownStyler.resetBackgroundColorProperty = function (dropDown, nativeValue) {
        dropDown._propagatePropertyToRealizedViews("backgroundColor", new color_1.Color(nativeValue));
    };
    DropDownStyler.getNativeBackgroundColorValue = function (dropDown) {
        return dropDown.backgroundColor.android;
    };
    DropDownStyler.registerHandlers = function () {
        style.registerHandler(style.textDecorationProperty, new style.StylePropertyChangedHandler(DropDownStyler.setTextDecorationProperty, DropDownStyler.resetTextDecorationProperty), common.DROPDOWN);
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(DropDownStyler.setColorProperty, DropDownStyler.resetColorProperty, DropDownStyler.getNativeColorValue), common.DROPDOWN);
        style.registerHandler(style.backgroundColorProperty, new style.StylePropertyChangedHandler(DropDownStyler.setBackgroundColorProperty, DropDownStyler.resetBackgroundColorProperty, DropDownStyler.getNativeBackgroundColorValue), common.DROPDOWN);
    };
    return DropDownStyler;
}());
exports.DropDownStyler = DropDownStyler;
DropDownStyler.registerHandlers();
