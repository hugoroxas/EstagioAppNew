var frameModule = require("ui/frame");
var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var textModule = require("ui/text-view");
var gridModule = require("ui/layouts/grid-layout");
var page;
var scrollModule = require("ui/scroll-view");
var http = require("http");

exports.registoLoad = function(args){
    page = args.object;
    var array_dados = Array();
    var stackLayout = new layout.StackLayout;
    var newgrid = new gridModule.GridLayout;
    var arrayRow = Array();
    var arrayColumn = Array();
    var gotData = page.navigationContext;
    var ide = gotData.referencia;

    http.getString("https://luisfranciscocode.000webhostapp.com/tarefasTap.php?ide=" + ide)
    .then(function (r){
        var daaaados = r.replace(/"/g, '')
        array_dados = daaaados.split('/');
        // 4 labels, 4 campos, 8 linas e 2 colunas
        // colunas 0 e 1 para respetivamente labels e campos , nao esquecer adicionar margins
        // Assim como os dois ultimos buttons

        for ( i = 0 ; i < 9 ; i++ )
        {
            if (i==8){
                arrayRow[i] = new gridModule.ItemSpec(1, gridModule.GridUnitType.star);
            }
            else if (j % 2 === 0){
                arrayRow[i] = new gridModule.ItemSpec(50, gridModule.GridUnitType.pixel);
            }
            else{
                arrayRow[i] = new gridModule.ItemSpec(1, gridModule.GridUnitType.auto);
            }
            newgrid.addRow(arrayRow[i]);

        }

        arrayColumn[0] = new gridModule.ItemSpec(1, gridModule.GridUnitType.star);
        newgrid.addColumn(arrayColumn[0]);
        var subtrator = 1;
        var fieldArray = Array();

        for(j=0; j<8; j++){
            if (j % 2 === 0){
                fieldArray[j] = new labelModule.Label();
                fieldArray[j].className = "label1";
            }
            else{
                if (j == 5){
                    fieldArray[j] = new scrollModule.ScrollView();
                    fieldArray[j].orientation = "vertical";
                    var campo = new textModule.TextView();
                    campo.className = "label2";
                    campo.isEnabled = false;
                    campo.text = array_dados[j - subtrator];
                    subtrator++;
                    fieldArray[j].content = campo;
                }
                else{
                    fieldArray[j] = new textModule.TextView();
                    fieldArray[j].className = "label2";
                    fieldArray[j].isEnabled = false;
                    fieldArray[j].text = array_dados[j - subtrator];
                    subtrator++;
                }   
            }
        }

        fieldArray[0].text = "User:";
        fieldArray[2].text = "Tarefa:";
        fieldArray[4].text = "Descrição";
        fieldArray[6].text = "Estado:";

        for(j=0; j<8; j++){
            gridModule.GridLayout.setColumn(fieldArray[j],0);
            gridModule.GridLayout.setRow(fieldArray[j], j);
            newgrid.addChild(fieldArray[j]);
        }

        var buttonEdit = new buttonModule.Button();
        var buttonEstado = new buttonModule.Button();

        buttonEdit.text = "Editar";
        buttonEstado.text = "Mudar Estado";

        stackLayout.orientation = "horizontal";
        stackLayout.addChild(buttonEdit);
        stackLayout.addChild(buttonEstado);

        gridModule.GridLayout.setColumn(stackLayout,0);
        gridModule.GridLayout.setRow(stackLayout, 8);
        newgrid.addChild(stackLayout);

        page.content = newgrid;
    
    }, function (e) {
        toast.makeText("Fuck you").show();
    });
}