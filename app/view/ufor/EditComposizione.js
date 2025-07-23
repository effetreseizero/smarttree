Ext.define('SmartTree.view.ufor.EditComposizione', {
    extend: 'Ext.window.Window',
    alias:  'widget.uforeditcomposizione',
    width:  700,
    //height: 500,
    title:  'Composizione Ufor',
    layout: 'fit',
    layoutConfig : {
       //align : 'stretch'
    },
    autoShow: true,
    frame: true,
    modal:  true,
    constrain: true,
    store:  'ufor.TableUforCompS',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    fieldsetComposizione,
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Ok',
                action: 'ok'
            },
            {
                text: 'Cancel',
                action: 'cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});


//
// START OF FORM DEFINITION
//




var fieldsetComposizione = {
    xtype: 'fieldset',
    title : 'Composizione',
    flex: 1,
    border: false,
    bodyStyle : 'padding:6px 6px 0',
    //layout       : 'fit',
    defaultType : 'field',
    defaults : {
        xtype : 'textfield',
        labelWidth : 150
    },
    items : [
            {
                fieldLabel : 'Ufor',
                name : 'n_ufor',
                disabled: true
            },
            {
                fieldLabel : 'Specie',
                itemId: 'field_id_specie',
                name : 'id_specie',
                xtype: 'lktcombo',
                lkt_table: "specie",
                lkt_field: "specie",

            },
            {
                fieldLabel : 'Copertura strato 1',
                name : 'cop_str1',
                xtype: 'lktcombo',
                lkt_table: "ufor_comp",
                lkt_field: "cop_str",

            },
            {
                fieldLabel : 'Copertura strato 2',
                name : 'cop_str2',
                xtype: 'lktcombo',
                lkt_table: "ufor_comp",
                lkt_field: "cop_str",

            },
    ]
};



/**
 * When combo box is used on a form with dynamic store (remote mode)
 * then sometimes the combobox store would load after the form data.
 * And in that case the setValue method of combobox will not
 * set the combobox value properly. This override makes sure that the
 * combobox store is completely loaded before calling the setValue method.
 */


// clone an existing store
function deepCloneStore (source) {
    source = Ext.isString(source) ? Ext.data.StoreManager.lookup(source) : source;

    var target = Ext.create(source.$className, {
        model: source.model,
    });

    target.add(Ext.Array.map(source.getRange(), function (record) {
        return record.copy();
    }));

    return target;
}

// clone LookuptableS store
// bind new store to field
// filter llokuptable to specific values of field
function lkt_init_store(queryEvent, table_n, field_n) {
    var lkt_store = Ext.getStore('lookuptable.LookuptableS');
    var field_lkt_store = deepCloneStore (lkt_store)
    queryEvent.bindStore(field_lkt_store);
    queryEvent.store.clearFilter();
    queryEvent.store.filter("table_n",table_n,false,true);
    queryEvent.store.filter("field_n",field_n,false,true);

}

//
// Combo with shared single database lookup table
//
Ext.define('lktCombo', {
    extend : 'Ext.form.ComboBox',
    xtype: 'lktcombo',
    queryMode : 'local',
    displayField : 'text_v',
    valueField: 'code_v',
    editable: false,
    lkt_table: "",
    lkt_field: "",
    listeners: {
      beforerender: function(queryEvent, eOpts) {
        lkt_init_store(queryEvent,queryEvent.lkt_table,queryEvent.lkt_field);
      }
    },
});
