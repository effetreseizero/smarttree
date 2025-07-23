Ext.define('SmartTree.store.particella.LayerParticellaS', {
    extend: 'GeoExt.data.FeatureStore',
    model: 'SmartTree.model.particella.LayerParticella',
    sorters: ['n_part'],
    autoLoad: true
});