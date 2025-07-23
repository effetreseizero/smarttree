Ext.define('SmartTree.store.ufor.LayerObiettivoS', {
    extend: 'GeoExt.data.FeatureStore',
    model: 'SmartTree.model.ufor.LayerObiettivo',
    sorters: ['n_obiet'],
    autoLoad: true
});