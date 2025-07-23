Ext.define('SmartTree.view.nodo.SelectPanel', {
    extend : 'Ext.form.Panel',
    alias : 'widget.nodoselectpanel',


    tbar: [
        {
            xtype: 'combo',
            itemId: 'nodocombo',
            fieldLabel: 'Nodo Filiera',
            allowBlank: false,
            forceSelection : true,
            width : 500,
            displayField: 'nome',
            valueField: 'idnodo',

            store: 'nodo.TableNodoS'
        },
        {
            itemId: 'select',
            text : 'Seleziona',
            formBind: true,
        },
        '->',
        {
            itemId: 'close',
            text : 'Chiudi',
            disabled: true
        }
    ]

});
