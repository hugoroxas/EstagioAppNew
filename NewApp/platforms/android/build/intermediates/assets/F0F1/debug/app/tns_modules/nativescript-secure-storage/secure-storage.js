"use strict";
var utils = require("utils/utils");
var SecureStorage = (function () {
    function SecureStorage() {
        this.hawk = com.orhanobut.hawk.Hawk.init(utils.ad.getApplicationContext()).build();
    }
    SecureStorage.prototype.get = function (arg) {
        var that = this;
        return new Promise(function (resolve, reject) {
            resolve(com.orhanobut.hawk.Hawk.get(arg.key));
        });
    };
    ;
    SecureStorage.prototype.set = function (arg) {
        return new Promise(function (resolve, reject) {
            resolve(com.orhanobut.hawk.Hawk.put(arg.key, arg.value));
        });
    };
    ;
    SecureStorage.prototype.remove = function (arg) {
        return new Promise(function (resolve, reject) {
            resolve(com.orhanobut.hawk.Hawk.delete(arg.key));
        });
    };
    ;
    return SecureStorage;
}());
exports.SecureStorage = SecureStorage;
//# sourceMappingURL=secure-storage.js.map