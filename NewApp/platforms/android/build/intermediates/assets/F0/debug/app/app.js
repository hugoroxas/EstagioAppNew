var applicationModule = require("application");
var btnModule = require("ui/button");
var layoutModule = require("ui/stack-layout");
applicationModule.start({ moduleName: "views/menu" });

var page;

exports.onload = function(){
    page = arg.Objects;
    var stackLayout = new layoutModule.StackLayout();
    var btn1 = new btnModule.Button();
    btn1.on(btnModule.Button.tapEvent, function(){
        alert("BUTTON 1");
    })

    stackLayout.addChild(btn1);
    page.content = stackLayout;

}