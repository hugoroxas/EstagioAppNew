var http = require("http");
var labelModule = require("ui/label");
var layout = require("ui/layouts/stack-layout");
var localStorage = require("nativescript-localstorage");
var labelNumber = 0;
var page;
var labelArray = Array();

exports.load = function(args) {

    page = args.object;

    http.getString("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_login")
    .then(function (r) {
        
        var newStackLayout = new layout.StackLayout();
        console.log(localStorage.getItem("isItLoaded"));
        var letsSee = localStorage.getItem("isItLoaded");

        if( letsSee === false){

        var myJSON = JSON.parse(r);
        var fieldsSize = myJSON.length;
        console.log(fieldsSize);

        for ( i = 0 ; i < fieldsSize ; i++ )
        {
            console.log(myJSON[i].Fields.type);
            switch(myJSON[i].Fields.type)
            {
                
                case "label": labelArray[labelNumber] = new labelModule.Label();
                              labelArray[labelNumber].id = myJSON[i].Fields.id;
                              labelArray[labelNumber].text = myJSON[i].Fields.text;
                              newStackLayout.addChild(labelArray[labelNumber]);
                              labelNumber++;
                break;

                default:
                break;

            }

        }
    
        newStackLayout.backgroundImage = "~/views/login-view/Imagens/souka.jpg";
        newStackLayout.style.backgroundSize = "cover";
        newStackLayout.style.backgroundRepeat= "no-repeat";
        localStorage.setItem("isItLoaded" , true);
        localStorage.setItem("loadedLayout" , newStackLayout);
        console("ADDED!!!");
        page.content = newStackLayout;

    } else {

        console.log("ITS LOADED!!");
        newStackLayout = localStorage.getItem("loadedLayout")
        page.content = newStackLayout;

    }

}, function (e) {
    alert(e);
});

}