(function() {
    Ext.define('SmartTree.view.toppo.PanelListToppo' ,{
        extend: 'Ext.grid.Panel',
        alias: 'widget.toppopanellisttoppo',
        title: 'Elenco Toppi',

        xtype: 'gridpanel',
        //alias: 'widget.colturagridcoltura',
        store: 'toppo.TableToppoS',
        columns: [
            {
                header: "RFID",
                dataIndex: "rfid",
                flex: 5,
            },
            {
                header: "RFID Pianta",
                dataIndex: "rfid_pianta",
                flex: 3,
            },
            {
                header: "D mediano",
                dataIndex: "diam_mediano",
                flex: 3,
            },
            {
                header: "Lunghezza",
                dataIndex: "lunghezza",
                flex: 3,
            },
            /*{
                xtype: 'actioncolumn',
                //width: 40,
                items: [{
                    icon: 'resources/images/icons/Modify.gif',
                    handler: function(grid, rowIndex, colindex) {
                        var record = grid.getStore().getAt(rowIndex);
                        var view = Ext.widget('toppoedittoppo');
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
            }*/
        ],

        loadMask: true,
        selType: 'rowmodel',
        singleSelect : true,
        stripeRows   : true,
        bbar: {
            xtype : 'pagingtoolbar',
            store: 'toppo.TableToppoS',
            dock: 'bottom',
            displayInfo : true
        },

        /*tools: [
            {
                type : 'plus',
                itemId : 'addrecord',
                callback: function(view,button,e) {
                    //var newToppo = Ext.create("SmartTree.model.toppo.TableToppo");
                    //view.store.insert(view.store.count, newToppo);
                    var edit_view = Ext.widget('topponewtoppo');
                    //edit_view.down('form').loadRecord(newToppo);
                }
            }
        ]*/


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
