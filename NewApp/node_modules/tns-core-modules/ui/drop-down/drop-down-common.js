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
var proxy_1 = require("ui/core/proxy");
var dependency_observable_1 = require("ui/core/dependency-observable");
var view_1 = require("ui/core/view");
var types = require("utils/types");
exports.DROPDOWN = "DropDown";
function onSelectedIndexPropertyChanged(data) {
    var picker = data.object;
    picker._onSelectedIndexPropertyChanged(data);
}
function onItemsPropertyChanged(data) {
    var picker = data.object;
    picker._onItemsPropertyChanged(data);
}
function onHintPropertyChanged(data) {
    var picker = data.object;
    picker._onHintPropertyChanged(data);
}
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown() {
        _super.call(this);
    }
    Object.defineProperty(DropDown.prototype, "items", {
        get: function () {
            return this._getValue(DropDown.itemsProperty);
        },
        set: function (value) {
            this._setValue(DropDown.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "selectedIndex", {
        get: function () {
            return this._getValue(DropDown.selectedIndexProperty);
        },
        set: function (value) {
            this._setValue(DropDown.selectedIndexProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "hint", {
        get: function () {
            return this._getValue(DropDown.hintProperty);
        },
        set: function (value) {
            this._setValue(DropDown.hintProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DropDown.prototype._onSelectedIndexPropertyChanged = function (data) {
        var index = this.selectedIndex;
        if (types.isUndefined(index)) {
            return;
        }
        if (index < 0 || index >= this.items.length) {
            this.selectedIndex = undefined;
            throw new Error("selectedIndex should be between [0, items.length - 1]");
        }
    };
    DropDown.openedEvent = "opened";
    DropDown.selectedIndexChangedEvent = "selectedIndexChanged";
    DropDown.itemsProperty = new dependency_observable_1.Property("items", exports.DROPDOWN, new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.AffectsLayout, onItemsPropertyChanged));
    DropDown.selectedIndexProperty = new dependency_observable_1.Property("selectedIndex", exports.DROPDOWN, new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.AffectsLayout, onSelectedIndexPropertyChanged));
    DropDown.hintProperty = new dependency_observable_1.Property("hint", exports.DROPDOWN, new proxy_1.PropertyMetadata("", dependency_observable_1.PropertyMetadataSettings.AffectsLayout, onHintPropertyChanged));
    return DropDown;
}(view_1.View));
exports.DropDown = DropDown;
