Ext.define('SmartTree.store.pianta.TablePiantaS', {
    extend: 'Ext.data.Store',
    //extend: 'GeoExt.data.FeatureStore',
    autoLoad: false,
    model: 'SmartTree.model.pianta.TablePianta',
    proxy: {
        type: 'ajax',
        api: {
            create: 'app/php/pianta/tablepianta_create.php', // Called when saving new records
            read: 'app/php/pianta/tablepianta_read.php', // Called when reading existing records
            update: 'app/php/pianta/tablepianta_update.php', // Called when updating existing records
            destroy: 'app/php/pianta/tablepianta_destroy.php' // Called when deleting existing records
        },
        reader: {
            type: 'json',
        },

        writer: {
            type : 'json',
            allowSingle : false,
        },

        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST',
        },

        success: function(conn, response, options, eOpts) {
            console.log('success');
            Ext.Msg.show({
                title:'Success!',
                msg: conn.responseText,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },

        failure: function(conn, response, options, eOpts) {
            console.log('failure');
            Ext.Msg.show({
                title:'Error!',
                msg: conn.responseText,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },

        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        },

    },

    listeners: {
        beforeload: function(store, operation){
            this.proxy.extraParams['idnodo'] = SmartTree.config.Runtime.getNodoSelectedId();
        },

        /*write: function(store, operation){
            this.fireEvent('store_end_write');
            console.log('store_end_write event');

        }*/
    },
    //sorters: ['idmartellata'],


});
