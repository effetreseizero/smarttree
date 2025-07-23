Ext.define('SmartTree.model.toppo.TableToppo', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'rfid', type : 'string'},
        {name:'idtaglio', type : 'string'},
        {name:'idnodo', type : 'string'},
        {name:'rfid_pianta', type : 'string'},
        {name:'diam_mediano', type : 'int'},
        {name:'lunghezza', type : 'int'},
        {name:'timestamp', type : 'date'},
        {name:'note', type : 'string'},
    ]
});
