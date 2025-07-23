Ext.define('SmartTree.model.pianta.TablePianta', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'rfid', type : 'string'},
        {name:'idnodo', type : 'string'},
        {name:'idmartellata', type : 'string'},
        {name:'specie', type : 'string'},
        {name:'classe', type : 'int'},
        {name:'altezza', type : 'float'},
        {name:'tariffa', type : 'int'},
        {name:'qualita', type : 'string'},
        {name:'gps_lon', type : 'float'},
        {name:'gps_lat', type : 'float'},
        {name:'accuracy', type : 'float'},
        {name:'timestamp', type : 'date'},
        {name:'note', type : 'string'},
        {name:'the_geom'},
    ]
});
