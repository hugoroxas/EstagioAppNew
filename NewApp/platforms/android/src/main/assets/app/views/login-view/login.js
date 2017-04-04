var http = require("http");
var toast = require("nativescript-toast");
var labelModule = require("ui/label");
var buttonModule = require("ui/button");
var textFieldModule = require("ui/text-field");
var imageModule = require("ui/image");
var layout = require("ui/layouts/grid-layout");
var localStorage = require("nativescript-localstorage");
var application = require("application");
    application.cssFile = "login.css";
var page;

// Caso querem so por o navigate para o menu é só fazer CTLR + F
// e procurarem navigate para ir mais rapido

// --------------------------------------------- //

exports.load = function(args) {

    // Vai confirmar a versao
    page = args.object;

    http.getString("https://luisfranciscocode.000webhostapp.com/verVersao.php?form=form_login")
    .then(function (r) {

        if( localStorage.getItem( "form_login_appVersion" ) == r ){

            console.log("foi buscar no localstorage");

            // Same version

            var fieldsSize = localStorage.getItem("form_login_typeObject").length;
            var fieldsArray = new Array();
            var newGridLayout = new layout.GridLayout();

            var arrayColumn = Array(fieldsSize);
            var arrayRow = Array(fieldsSize);

            // Create Columns ( a primeira e a ultima sao autosize ,
            // a do meio ( "1" ) é a que tem um tamanho especifico "pixel" )

            for ( i = 0 ; i < 3 ; i++ )
            {
                if(i == 1){
                arrayColumn[i] = new layout.ItemSpec(300, layout.GridUnitType.pixel);
            } else {
                    arrayColumn[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
                }
                newGridLayout.addColumn(arrayColumn[i]);

            }

            // Create rows
            for ( i = 0 ; i < 3 ; i++ )
            {

                arrayRow[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
                newGridLayout.addRow(arrayRow[i]);

            }

            for( i = 0 ; i < fieldsSize ; i++ ){

                switch(localStorage.getItem("form_login_typeObject")[i])
                {
                
                    case "label": fieldsArray[i] = new labelModule.Label();
                    break;

                    case "button": fieldsArray[i] = new buttonModule.Button();
                                fieldsArray[i].on(buttonModule.Button.tapEvent , function(){
                                    http.getString("https://luisfranciscocode.000webhostapp.com/fazerLogin.php?pin=" + page.getViewById(localStorage.getItem("form_login_idObject")[1]).text).then(function (r) {
                                        if(r == "rekt"){
                                        toast.makeText("Wasted").show();
                                        } else {
                                            toast.makeText("Seja bem-vindo " + r ).show();
                                            // Naviga to frame blablabla ---
                                        }
                                    }, function (e) {
                                        alert(e);
                                    });
                                });
                    break;

                    case "textbox": fieldsArray[i] = new textFieldModule.TextField();
                                    fieldsArray[i].secure = true;
                                    fieldsArray[i].length = "4";
                    break;

                    case "image":  fieldsArray[i] = new imageModule.Image();
                                fieldsArray[i].src = "~/views/login-view/Imagens/estagio.png";
                    break;

                    default:
                    break;

                }

                // Add all properties to the fields , propriedades em comum

                fieldsArray[i].text = localStorage.getItem("form_login_textObject")[i];
                fieldsArray[i].id = localStorage.getItem("form_login_idObject")[i];
                fieldsArray[i].value = localStorage.getItem("form_login_valueObject")[i]
                fieldsArray[i].list = localStorage.getItem("form_login_listObject")[i];
                // fieldsArray[i].height = myJSON[i].Fields.height;
                // fieldsArray[i].width = myJSON[i].Fields.width;


                // GridLayout stuff ( add , define location )
                layout.GridLayout.setColumn(fieldsArray[i], parseInt(localStorage.getItem("form_login_colunaObject")[i]) );
                layout.GridLayout.setRow(fieldsArray[i], parseInt(localStorage.getItem("form_login_linhaObject")[i]) );
                newGridLayout.addChild(fieldsArray[i]);
            }

            i++;
            
            // Propriedades da layout
            newGridLayout.backgroundImage = localStorage.getItem("form_login_backgroundImage");
            newGridLayout.style.backgroundSize = localStorage.getItem("form_login_backgroundSize");
            newGridLayout.style.backgroundRepeat = localStorage.getItem("form_login_backgroundRepeat");
            page.content = newGridLayout;

        }

    else {

        console.log("Foi buscar a newest versione");

    // Get JSON
    http.getString("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_login")
    .then(function (r) {

        var fieldsArray = Array();
        var form_login_typeObject = Array();
        var form_login_idObject = Array();
        var form_login_textObject = Array();
        var form_login_valueObject = Array();
        var form_login_listObject = Array();
        var form_login_colunaObject = Array();
        var form_login_linhaObject = Array();
        
        var newGridLayout = new layout.GridLayout();

        var myJSON = JSON.parse(r);
        var fieldsSize = myJSON.length;

        var arrayColumn = Array(fieldsSize);
        var arrayRow = Array(fieldsSize);

        // Create Columns ( a primeira e a ultima sao autosize ,
        // a do meio ( "1" ) é a que tem um tamanho especifico "pixel" )

        for ( i = 0 ; i < 3 ; i++ )
        {
            if(i == 1){
            arrayColumn[i] = new layout.ItemSpec(300, layout.GridUnitType.pixel);
        } else {
                arrayColumn[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
            }
            newGridLayout.addColumn(arrayColumn[i]);

        }

        // Create rows
         for ( i = 0 ; i < 3 ; i++ )
        {

            arrayRow[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
            newGridLayout.addRow(arrayRow[i]);

        }

        // Leitura dos Fields do JSON
        for ( i = 0 ; i < fieldsSize - 1 ; i++ )
        {
            console.log(myJSON[i].Fields.type);

            // Verificar tipo do field para defenir properties especificas e criar o tipo
            // de field ( textbox , button ... ) , pois estam todos no array fieldsArray
            switch(myJSON[i].Fields.type)
            {
                
                case "label": fieldsArray[i] = new labelModule.Label();
                break;

                case "button": fieldsArray[i] = new buttonModule.Button();
                               fieldsArray[i].on(buttonModule.Button.tapEvent , function(){
                                http.getString("https://luisfranciscocode.000webhostapp.com/fazerLogin.php?pin=" + page.getViewById(localStorage.getItem("form_login_idObject")[1]).text).then(function (r) {
                                    if(r == "rekt"){
                                        toast.makeText("Wasted").show();
                                    } else {
                                        toast.makeText("Seja bem-vindo " + r ).show();
                                        // Naviga to frame blablabla ---
                                    }

                                }, function (e) {
                                    alert(e);
                                });
                               });
                break;

                case "textbox": fieldsArray[i] = new textFieldModule.TextField();
                                fieldsArray[i].secure = true;
                break;

                case "image":  fieldsArray[i] = new imageModule.Image();
                               fieldsArray[i].src = "~/views/login-view/Imagens/estagio.png";
                break;

                default:
                break;

            }

            // Add all properties to the fields , propriedades em comum

            fieldsArray[i].text = myJSON[i].Fields.text;
            fieldsArray[i].id = myJSON[i].Fields.id;
            fieldsArray[i].value = myJSON[i].Fields.value;
            fieldsArray[i].list = myJSON[i].Fields.list;
            // fieldsArray[i].height = myJSON[i].Fields.height;
            // fieldsArray[i].width = myJSON[i].Fields.width;


            // LocalStorage stuff ( add all fields to localStorage )

            form_login_typeObject[i] = myJSON[i].Fields.type;
            form_login_textObject[i] = myJSON[i].Fields.text;
            form_login_idObject[i] = myJSON[i].Fields.id;
            form_login_valueObject[i] = myJSON[i].Fields.value;
            form_login_listObject[i] = myJSON[i].Fields.list;
            form_login_colunaObject[i] = myJSON[i].Fields.col;
            form_login_linhaObject[i] = myJSON[i].Fields.ro;

            // GridLayout stuff ( add , define location )
            layout.GridLayout.setColumn(fieldsArray[i], parseInt(myJSON[i].Fields.col ) );
            layout.GridLayout.setRow(fieldsArray[i], parseInt(myJSON[i].Fields.ro) );
            newGridLayout.addChild(fieldsArray[i]);
            var ok = myJSON[i+1].Fields.id;
        }
        
        // Propriedades da layout
        var bgSource = "~/views/login-view/Imagens/bg2.jpg";
        var bgSize = "cover";
        var bgRepeat ="no-repeat";

        newGridLayout.backgroundImage = bgSource;
        newGridLayout.style.backgroundSize = bgSize;
        newGridLayout.style.backgroundRepeat = bgRepeat;
        page.content = newGridLayout;

        // Save info in localStorage

        //var newVersion = myJSON[i].Fields.id;

        localStorage.setItem( "form_login_backgroundImage" , bgSource );
        localStorage.setItem( "form_login_backgroundSize" , bgSize );
        localStorage.setItem( "form_login_backgroundRepeat" , bgRepeat );
        localStorage.setItem( "form_login_typeObject" , form_login_typeObject );
        localStorage.setItem( "form_login_textObject" , form_login_textObject );
        localStorage.setItem( "form_login_idObject" , form_login_idObject );
        localStorage.setItem( "form_login_valueObject" , form_login_valueObject );
        localStorage.setItem( "form_login_listObject" , form_login_listObject );
        localStorage.setItem( "form_login_colunaObject" , form_login_colunaObject );
        localStorage.setItem( "form_login_linhaObject" , form_login_linhaObject );
        localStorage.setItem( "form_login_appVersion" , ok );

}, function (e) {
    alert(e);

});

    }

    }, function (e) {
        
        alert(e);

    });


}