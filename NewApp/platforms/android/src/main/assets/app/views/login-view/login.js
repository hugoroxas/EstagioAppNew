var http = require("http");
var labelModule = require("ui/label");
var buttonModule = require("ui/button");
var layout = require("ui/layouts/grid-layout");
var localStorage = require("nativescript-localstorage");
var labelNumber = 0;
var buttonNumber = 0;
var page;
var labelArray = Array();
var buttonArray = Array();

exports.load = function(args) {

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

            arrayColumn[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
            newGridLayout.addColumn(arrayColumn[i]);

        }

         for ( i = 0 ; i < 4 ; i++ )
        {

            arrayRow[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
            newGridLayout.addRow(arrayRow[i]);

        }

        console.log(arrayColumn.length);

        for ( i = 0 ; i < fieldsSize ; i++ )
        {
            console.log(myJSON[i].Fields.type);
            switch(myJSON[i].Fields.type)
            {
                
                case "label": labelArray[labelNumber] = new labelModule.Label();
                              labelArray[labelNumber].id = myJSON[i].Fields.id;
                              labelArray[labelNumber].text = myJSON[i].Fields.text;
                              layout.GridLayout.setColumn(labelArray[labelNumber], parseInt(myJSON[i].Fields.width));
                              layout.GridLayout.setRow(labelArray[labelNumber], parseInt(myJSON[i].Fields.height));
                              newGridLayout.addChild(labelArray[labelNumber]);
                              labelNumber++;
                              
                break;

                case "button": buttonArray[buttonNumber] = new buttonModule.Button();
                               buttonArray[buttonNumber].id = myJSON[i].Fields.id;
                               buttonArray[buttonNumber].text = myJSON[i].Fields.text;
                               layout.GridLayout.setColumn(buttonArray[buttonNumber], parseInt(myJSON[i].Fields.width));
                               layout.GridLayout.setRow(buttonArray[buttonNumber], parseInt(myJSON[i].Fields.height));
                               newGridLayout.addChild(buttonArray[buttonNumber]);
                               buttonNumber++;
                break;

                default:
                break;

            }

        }
      
        newGridLayout.backgroundImage = "~/views/login-view/Imagens/bg2.jpg";
        newGridLayout.style.backgroundSize = "cover";
        newGridLayout.style.backgroundRepeat= "no-repeat";
        page.content = newGridLayout;

}, function (e) {
    alert(e);
});

}