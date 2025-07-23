Ext.define('SmartTree.controller.Utente', {
    extend: 'Ext.app.Controller',

    id:'controllerutente',

    models: [
        'utente.TableUtente',
    ],
    stores: [
        'utente.TableUtenteS',
    ],

    views: [
        'utente.ListUtente',
        'utente.EditUtente',
        'utente.NewUtente',
    ],

    init: function() {
        var me = this;

        me.listen({
            controller: {
                 // select and close piano
                // '*':{
                //     map_created: me.loadStores,
                //     map_destroyed: me.unloadStores,
                // },
            },
            component:{

                // click on utente gridpanel
                'utentelistutente gridpanel': {
                    //containercontextmenu: me.grid_utente_container_doRowCtxMenu,
                },
                'treepanel': {
                    itemclick: function(tree, record){
                        item = record.get('id');
                        switch(item) {
                            case 'utenti':
                                me.getUtenteTableUtenteSStore().load();
                                var view = Ext.widget('utentelistutente');
                                break;
                            // case 'utente_sys':
                            //         me.getUtenteTableUtenteSysSStore().load();
                            //         var view = Ext.widget('utentelistutentesys');
                            //
                            //         break;
                            default:
                        }

                    }
                },




                // Edit utente save
                'utenteeditutente button[action=save]': {
                    click: function(button) {
                        var me = this;
                        var win    = button.up('window'),
                            form   = win.down('form'),
                            record = form.getRecord(),
                            values = form.getValues();

                        win.mask("Saving to web-database... Please wait...", 'Saving');

                        record.set(values);

                        var tps = me.getUtenteTableUtenteSStore();
                        if(tps.getModifiedRecords().length>0){
                            tps.sync({
                                success:function(){
                                    console.log("utente sync ended");
                                    var grid = Ext.ComponentQuery.query('utentelistutente')[0].down('gridpanel');
                                    grid.getStore().load();
                                    grid.getView().refresh();
                                    win.unmask();
                                    win.close();

                                },
                            });
                        }else{
                            win.unmask();
                            win.close();
                        }
                    }
                },

                'utenteeditutente button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('utentelistutente')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },


                // New utente save
                'utentenewutente button[action=save]': {
                    click: function(button) {
                        var me = this;
                        var win    = button.up('window'),
                            form   = win.down('form'),
                            values = form.getValues();

                        win.mask("Saving to web-database... Please wait...", 'Saving');

                        var newUtente = Ext.create("SmartTree.model.utente.TableUtente");
                        newUtente.set(values);

                        var tps = me.getUtenteTableUtenteSStore();

                        tps.insert(tps.count, newUtente);

                        if(tps.getModifiedRecords().length>0){
                            tps.sync({
                                success:function(){
                                    console.log("utente sync ended");
                                    var grid = Ext.ComponentQuery.query('utentelistutente')[0].down('gridpanel');
                                    grid.getStore().load();
                                    grid.getView().refresh();
                                    win.unmask();
                                    win.close();

                                },
                            });
                        }else{
                            win.unmask();
                            win.close();
                        }
                    }
                },

                'utentenewutente button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('utentelistutente')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },


            },
        });

        console.log('Utente controller init');

    },

    loadStores: function(){

        var me = this;
        me.getUtenteTableUtenteSStore().load();
        console.log('Store utente loaded');
    },

    unloadStores: function(){

        var me = this;

        //
        // unbind table store
        me.getUtenteTableUtenteSStore().removeAll();
        console.log('Store utente unloaded');
    },

});
