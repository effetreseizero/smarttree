(function() {
    Ext.define('SmartTree.view.utente.ListUtente' ,{
        extend: 'Ext.window.Window',
        alias: 'widget.utentelistutente',
        title: 'Elenco Utenti SmartTree',

        height : 350,
        width  : 550,

        autoShow: true,
        frame: false,
        modal:  true,
        constrain: true,
        border: false,
        layout : 'fit',

        initComponent: function() {
            this.items = [
                {
                    xtype: 'gridpanel',
                    //alias: 'widget.colturagridcoltura',
                    store: 'utente.TableUtenteS',
                    columns: [
                        {
                            header: "Login",
                            dataIndex: "login",
                            flex: 5,
                        },
                        {
                            header: "Nome",
                            dataIndex: "nome",
                            flex: 5,
                        },
                        {
                            header: "Cognome",
                            dataIndex: "cognome",
                            flex: 5,
                        },
                        {
                            header: "Organizzazione",
                            dataIndex: "organizzazione",
                            flex: 5,
                        },
                        {
                            xtype: 'actioncolumn',
                            //width: 40,
                            items: [{
                                icon: 'resources/images/icons/Modify.gif',
                                handler: function(grid, rowIndex, colindex) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    var view = Ext.widget('utenteeditutente');
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
                        store: 'utente.TableUtenteS',
                        dock: 'bottom',
                        displayInfo : true
                    },

                    tools: [
                        {
                            type : 'plus',
                            itemId : 'addrecord',
                            callback: function(view,button,e) {
                                //var newUtente = Ext.create("SmartTree.model.utente.TableUtente");
                                //view.store.insert(view.store.count, newUtente);
                                var edit_view = Ext.widget('utentenewutente');
                                //edit_view.down('form').loadRecord(newUtente);
                            }
                        }
                    ]
                }
            ];

            this.buttons = [

            ];

            this.callParent(arguments);
        },



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
