Ext.define('SmartTree.view.utente.EditUtente', {
    extend: 'Ext.window.Window',
    alias:  'widget.utenteeditutente',
    width:  700,
    //height: 500,
    title:  'Dati Utente',
    layout: 'fit',
    layoutConfig : {
       //align : 'stretch'
    },
    autoShow: true,
    frame: true,
    modal:  true,
    constrain: true,
    store:  'utente.TableUtenteS',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    fieldsetUtente,
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
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




var fieldsetUtente = {
    xtype: 'fieldset',
    title : 'Dati generali',
    flex: 1,
    border: false,
    bodyStyle : 'padding:6px 6px 0',
    layout       : 'fit',
    defaultType : 'field',
    defaults : {
        xtype : 'textfield',
        labelWidth : 150
    },
    items : [
            {
                fieldLabel : 'Login',
                name : 'login',
                disabled: true
            },
            {
                fieldLabel : 'Password',
                name : 'password',
                inputType: 'password',
                disabled: true
            },
            {
                fieldLabel : 'Nuova password',
                name : 'password_new',
                inputType: 'password'
            },
            {
                fieldLabel : 'Conferma nuova password',
                name : 'password_new_chk',
                inputType: 'password'
            },
            {
                fieldLabel : 'Livello software SmartTree',
                name : 'livello_sw'
            },
            {
                fieldLabel : 'Nome',
                name : 'nome'
            },
            {
                fieldLabel : 'Cognome',
                name : 'cognome'
            },
            {
                fieldLabel : 'Organizzazione',
                name : 'organizzazione'
            },
            {
                fieldLabel : 'Email',
                name : 'email'
            },
            {
                fieldLabel : 'Telefono',
                name : 'telefono'
            },
            // {
            //     fieldLabel : 'Obiettivo 5',
            //     name : 'obiett5',
            //     xtype: 'combo',
            //     store: 'obiettivo.TableObiettivoS',
            //     valueField: "n_obiett",
            //     displayField: "titolo",
            //
            // },

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
