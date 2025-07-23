Ext.define('SmartTree.model.utente.TableUtente', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'idutente', type : 'string'},
        {name:'login', type : 'string'},
        {name:'password', type : 'string'},
        {name:'password_new', type : 'string'},
        {name:'password_new_chk', type : 'string'},
        {name:'livello_sw', type : 'int'},
        {name:'nome', type : 'string'},
        {name:'cognome', type : 'string'},
        {name:'organizzazione', type : 'string'},
        {name:'email', type : 'string'},
        {name:'telefono', type : 'string'},
    ]
});
