Ext.define('SmartTree.store.ufor.TableUforIntDescS', {
    extend: 'Ext.data.Store',
    model: 'SmartTree.model.ufor.TableUforIntDesc',
    storeId: 'tableUforIntDescS',
    proxy: {
        type: 'ajax',
        api: {
            create: 'app/php/ufor/tableuforintdesc_create.php', // Called when saving new records
            read: 'app/php/ufor/tableuforintdesc_read.php', // Called when reading existing records
            update: 'app/php/ufor/tableuforintdesc_update.php', // Called when updating existing records
            destroy: 'app/php/ufor/tableuforintdesc_destroy.php' // Called when deleting existing records
        },
        reader: {
            type: 'array',
        },
        
        writer: {
            type : 'json',
            allowSingle : false,
        },
        
        actionMethods: {
            read: 'POST',
            update: 'POST'
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
            this.proxy.extraParams['n_piano'] = SmartTree.config.Runtime.getPianoSelectedId();
            this.proxy.extraParams['n_ufor'] = SmartTree.config.Runtime.getUforSelectedId();
        },

        
        /*write: function(store, operation){
            this.fireEvent('store_end_write');
            console.log('store_end_write event');
            
        }*/
    },
    sorters: ['n_desc'],
    
    
});