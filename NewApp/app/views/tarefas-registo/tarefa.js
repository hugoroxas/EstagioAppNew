var frameModule = require("ui/frame");
var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var listViewModule = require("ui/list-view");
var gridModule = require("ui/layouts/grid-layout");
var page;
var http = require("http");

exports.registoLoad = function(args){
    page = args.object;
    var newgrid = new gridModule.GridLayout;
    var arrayColumn = Array();
    var rowColumn = Array();
    var gotData = page.navigationContext;
    var ide = gotData.referencia;

    for ( i = 0 ; i < 2 ; i++ )
    {
 
            arrayColumn[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
            newgrid.addColumn(arrayColumn[i]);

    }

    for ( i = 0 ; i < 5 ; i++ )
    {

        arrayRow[i] = new layout.ItemSpec(1, layout.GridUnitType.star);
        newgrid.addRow(arrayRow[i]);

    }

    http.getString("https://luisfranciscocode.000webhostapp.com/tarefasTap.php?ide=" + ide)
    .then(function (r){
        var daaaados = r.replace(/"/g, '')
        array_dados = daaaados.split('/');

        // 4 labels, 4 campos, 8 linas e 2 colunas
        // colunas 0 e 1 para respetivamente labels e campos , nao esquecer adicionar margins
        // Assim como os dois ultimos buttons

    }, function (e) {
        toast.makeText("Fuck you").show();
    });
}