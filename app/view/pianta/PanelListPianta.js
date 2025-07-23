(function() {
    Ext.define('SmartTree.view.pianta.PanelListPianta' ,{
        extend: 'Ext.grid.Panel',
        alias: 'widget.piantapanellistpianta',
        title: 'Elenco Piante',

        xtype: 'gridpanel',
        //alias: 'widget.colturagridcoltura',
        store: 'pianta.TablePiantaS',
        columns: [
            {
                header: "Martellata",
                dataIndex: "idmartellata",
                flex: 5,
            },
            {
                header: "RFID",
                dataIndex: "rfid",
                flex: 5,
            },
            {
                header: "Specie",
                dataIndex: "specie",
                flex: 3,
            },
            {
                header: "Classe diametrica",
                dataIndex: "classe",
                flex: 5,
            },
            {
                xtype: 'actioncolumn',
                //width: 40,
                items: [{
                    icon: 'resources/images/icons/Modify.gif',
                    handler: function(grid, rowIndex, colindex) {
                        var record = grid.getStore().getAt(rowIndex);
                        var view = Ext.widget('piantaeditpianta');
                        view.down('form').loadRecord(record);
                    }
                }],
                flex: 1,
            },
            {
                xtype: 'actioncolumn',
                //width: 40,
                items: [{
                    icon: 'resources/images/icons/Delete.gif',
                    handler: function(grid, rowIndex, colindex) {
                        var record = grid.getStore().getAt(rowIndex);
                        Ext.MessageBox.confirm(
                           'Confirm delete',
                           'Are you sure?',
                           function(btn) {
                                if (btn == 'yes') {
                                    grid.store.remove(record);
                                    grid.store.sync();
                                }
                           }
                        );
                    }
                }],
                flex: 1,
            }
        ],

        loadMask: true,
        selType: 'rowmodel',
        singleSelect : true,
        stripeRows   : true,
        bbar: {
            xtype : 'pagingtoolbar',
            store: 'pianta.TablePiantaS',
            dock: 'bottom',
            displayInfo : true
        },

        tools: [
            {
                type : 'plus',
                itemId : 'addrecord',
                callback: function(view,button,e) {
                    //var newPianta = Ext.create("SmartTree.model.pianta.TablePianta");
                    //view.store.insert(view.store.count, newPianta);
                    var edit_view = Ext.widget('piantanewpianta');
                    //edit_view.down('form').loadRecord(newPianta);
                }
            }
        ]


    });


    /**
        Grid Lookup render function
    */

    function lookupTextV(table_n,field_n,code_v){
        var lkt_store = Ext.getStore('lookuptable.LookuptableS');
        var record = lkt_store.queryBy(function(record,id){
            var record = (record.get('table_n') == table_n && record.get('field_n') == field_n && record.get('code_v') == code_v );
            return record;
        });
        return (record.items.length)>0?record.items[0].get("text_v"):"---";
    }


})();
