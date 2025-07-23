Ext.define('SmartTree.store.ufor.LayerUforS', {
    extend: 'GeoExt.data.FeatureStore',
    model: 'SmartTree.model.ufor.LayerUfor',
    sorters: ['n_ufor'],
    autoLoad: true
});