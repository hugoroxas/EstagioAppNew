var http = require("http");
var labelModule = require("ui/label");
var buttonModule = require("ui/button");
var textFieldModule = require("ui/text-field");
var imageModule = require("ui/image");
var layout = require("ui/layouts/grid-layout");
var layout2 = require("ui/layouts/stack-layout");
var localStorage = require("nativescript-localstorage");
var application = require("application");
    application.cssFile = "login.css";
var labelNumber = 0;
var buttonNumber = 0;
var textFieldNumber = 0;
var imageNumber = 0;
var page;
var labelArray = Array();
var buttonArray = Array();
var textFieldArray = Array();
var imageArray = Array();

exports.load = function(args) {

    var k = "indeed";
    localStorage.setItem( "appVersion" , k );

    console.log(localStorage.key(0));

    if( k == localStorage.getItem( "appVersion" ) ){

    http.getString("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_login")
    .then(function (r) {

        page = args.object;
        
        var newGridLayout = new layout.GridLayout();

        var myJSON = JSON.parse(r);
        var fieldsSize = myJSON.length;

        var arrayColumn = Array(fieldsSize);
        var arrayRow = Array(fieldsSize);

        for ( i = 0 ; i < 3 ; i++ )
        {
            if(i == 1){
            arrayColumn[i] = new layout.ItemSpec(175, layout.GridUnitType.pixel);
        } else {
                arrayColumn[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
            }
            newGridLayout.addColumn(arrayColumn[i]);

        }

         for ( i = 0 ; i < 3 ; i++ )
        {

            arrayRow[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
            newGridLayout.addRow(arrayRow[i]);

        }

        for ( i = 0 ; i < fieldsSize ; i++ )
        {
            console.log(myJSON[i].Fields.type);
            switch(myJSON[i].Fields.type)
            {
                
                case "label": labelArray[labelNumber] = new labelModule.Label();
                              labelArray[labelNumber].id = myJSON[i].Fields.id;
                              labelArray[labelNumber].text = myJSON[i].Fields.text;
                              layout.GridLayout.setColumn(labelArray[labelNumber], parseInt(myJSON[i].Fields.column_grid));
                              layout.GridLayout.setRow(labelArray[labelNumber], parseInt(myJSON[i].Fields.row_grid));
                              newGridLayout.addChild(labelArray[labelNumber]);
                              labelNumber++;
                              
                break;

                case "button": buttonArray[buttonNumber] = new buttonModule.Button();
                               buttonArray[buttonNumber].id = myJSON[i].Fields.id;
                               buttonArray[buttonNumber].text = myJSON[i].Fields.text;
                               buttonArray[buttonNumber].class = "btn";
                               layout.GridLayout.setColumn(buttonArray[buttonNumber], parseInt(myJSON[i].Fields.column_grid));
                               layout.GridLayout.setRow(buttonArray[buttonNumber], parseInt(myJSON[i].Fields.row_grid));
                               newGridLayout.addChild(buttonArray[buttonNumber]);
                               buttonNumber++;
                break;

                case "textbox": textFieldArray[textFieldNumber] = new textFieldModule.TextField();
                                textFieldArray[textFieldNumber].id = myJSON[i].Fields.id;
                                textFieldArray[textFieldNumber].text = myJSON[i].Fields.text;
                                layout.GridLayout.setColumn(textFieldArray[textFieldNumber], parseInt(myJSON[i].Fields.column_grid));
                                layout.GridLayout.setRow(textFieldArray[textFieldNumber], parseInt(myJSON[i].Fields.row_grid));
                                newGridLayout.addChild(textFieldArray[textFieldNumber]);
                                textFieldNumber++;
                              
                break;

                case "image":  imageArray[imageNumber] = new imageModule.Image();
                               imageArray[imageNumber].id = myJSON[i].Fields.id;
                               imageArray[imageNumber].text = myJSON[i].Fields.text;
                               imageArray[imageNumber].src = "~/views/login-view/Imagens/estagio.png";
                               layout.GridLayout.setColumn(imageArray[imageNumber], parseInt(myJSON[i].Fields.column_grid));
                               layout.GridLayout.setRow(imageArray[imageNumber], parseInt(myJSON[i].Fields.row_grid));
                               newGridLayout.addChild(imageArray[imageNumber]);
                               imageNumber++;
                              
                break;

                default:
                break;

            }

        }
      
        newGridLayout.backgroundImage = "~/views/login-view/Imagens/bg2.jpg";
        newGridLayout.style.backgroundSize = "cover";
        newGridLayout.style.backgroundRepeat= "no-repeat";
        page.content = newGridLayout;
        localStorage.setItem( "layout" , newGridLayout );
        var k = "WTF" ;
        localStorage.setItem( "appVersion" , k );

}, function (e) {
    alert(e);

});

    }

    else {

        fetch(localStorage.getItem("layout"))
        .then( function(r){

            page = args.object;

            page.content = JSON.parse(r) ;

        });

    }



}