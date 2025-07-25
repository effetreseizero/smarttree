Ext.define('SmartTree.model.piano.TablePiano', {
    extend: 'Ext.data.Model',
    fields: [
        'n_piano',
        'proprieta',
        'nome',
        'anno_in',
        'anno_val',
        'rit_priorita',
        'orig_epsg',
        'dest_epsg',
        'bound_l',
        'bound_b',
        'bound_r',
        'bound_t',
        'ofd_wms',
        'ofd_layer',
        'ofd_layer_attr',
        'wms_addr',
        'wms_chm_layer',
        'wms_chm_layer_attr',
        'wms_volume_ha_layer',
        'wms_volume_ha_layer_attr',
        'wms_peso_secco_ha_layer',
        'wms_peso_secco_ha_layer_attr',
        'wfs_addr',
        'sld_piano',
        'sld_ufor',
        'sld_ufor_selected',
        'sld_particella',
        'sld_particella_selected',
        'sld_priorita',
        'sld_coltura',
    ]
});
