/**
 * Map controller
 * Used to manage map layers and showing their related views
 */
Ext.define('SmartTree.controller.Piano', {
    extend: 'Ext.app.Controller',

    id:'controllerpiano',

    models: [
        'piano.TablePiano',
        'piano.LayerPiano'
    ],
    stores: [
        'lookuptable.LookuptableS',
        'piano.TablePianoS',
        'piano.LayerPianoS'

    ],

    views: [
        'piano.SelectPanel',
        'piano.EditPiano',
        'Map'
    ],

    piano_vecLayer: null,

    init: function() {
        var me = this;

        me.listen({
            controller: {
                '*':{
                    map_created: me.loadStores,
                    map_destroyed: me.unloadStores,
                },
            },
            component: {
                "pianoselectpanel button#select": {       // #1
                    click: this.onButtonClickSelect // #2
                },
                "pianoselectpanel button#close": {       // #1
                    click: this.onButtonClickClose // #2
                },
                'treepanel': {
                    itemclick: function(tree, record){
                        switch(record.get('id')) {
                            case 'piano':
                                me.onMenuTreePianoItemSelect();
                                break;
                            default:
                        }
                    }
                },
                // edit ufor save
                'pianoeditpiano button[action=save]': {
                    click: me.updatePiano
                },
            },
            direct: {},
            global: {},
            store: {}


        });

        console.log('Piano controller init');

    },


     onButtonClickSelect: function(button, e, options) {
        var me = this;
        var pp = Ext.ComponentQuery.query('pianoselectpanel')[0],
            pc = pp.down('#pianocombo'),
            sb = pp.down('#select'),
            cb = pp.down('#close');
        SmartTree.config.Runtime.setPianoSelected(true);
        var sel_piano = pc.getValue();
        var ps = me.getPianoTablePianoSStore();
        var sel_ps_record = ps.getAt(ps.find('n_piano',sel_piano));
        SmartTree.config.Runtime.setPianoSelectedId(sel_ps_record.get('n_piano'));
        SmartTree.config.Runtime.setPianoSelectedOrigEpsg(sel_ps_record.get('orig_epsg'));
        SmartTree.config.Runtime.setPianoSelectedDestEpsg(sel_ps_record.get('dest_epsg'));
        SmartTree.config.Runtime.setPianoSelectedBoundL(sel_ps_record.get('bound_l'));
        SmartTree.config.Runtime.setPianoSelectedBoundB(sel_ps_record.get('bound_b'));
        SmartTree.config.Runtime.setPianoSelectedBoundR(sel_ps_record.get('bound_r'));
        SmartTree.config.Runtime.setPianoSelectedBoundT(sel_ps_record.get('bound_t'));
        SmartTree.config.Runtime.setPianoSelectedOfdWms(sel_ps_record.get('ofd_wms'));
        SmartTree.config.Runtime.setPianoSelectedOfdLayer(sel_ps_record.get('ofd_layer'));
        SmartTree.config.Runtime.setPianoSelectedOfdLayerAttribution(sel_ps_record.get('ofd_layer_attr'));
        SmartTree.config.Runtime.setPianoSelectedWmsAddr(sel_ps_record.get('wms_addr'));
        SmartTree.config.Runtime.setPianoSelectedWmsChmLayer(sel_ps_record.get('wms_chm_layer'));
        SmartTree.config.Runtime.setPianoSelectedWmsChmLayerAttribution(sel_ps_record.get('wms_chm_layer_attr'));
        SmartTree.config.Runtime.setPianoSelectedWmsVolumeHaLayer(sel_ps_record.get('wms_volume_ha_layer'));
        SmartTree.config.Runtime.setPianoSelectedWmsVolumeHaLayerAttribution(sel_ps_record.get('wms_volume_ha_layer_attr'));
        SmartTree.config.Runtime.setPianoSelectedWmsPesoSeccoHaLayer(sel_ps_record.get('wms_peso_secco_ha_layer'));
        SmartTree.config.Runtime.setPianoSelectedWmsPesoSeccoHaLayerAttribution(sel_ps_record.get('wms_peso_secco_ha_layer_attr'));
        SmartTree.config.Runtime.setPianoSelectedWfsAddr(sel_ps_record.get('wfs_addr'));
        SmartTree.config.Runtime.setPianoSelectedSld_piano(sel_ps_record.get('sld_piano'));
        SmartTree.config.Runtime.setPianoSelectedSld_ufor(sel_ps_record.get('sld_ufor'));
        SmartTree.config.Runtime.setPianoSelectedSld_ufor_selected(sel_ps_record.get('sld_ufor_selected'));
        SmartTree.config.Runtime.setPianoSelectedSld_particella(sel_ps_record.get('sld_particella'));
        SmartTree.config.Runtime.setPianoSelectedSld_particella_selected(sel_ps_record.get('sld_particella_selected'));
        SmartTree.config.Runtime.setPianoSelectedSld_priorita(sel_ps_record.get('sld_priorita'));
        SmartTree.config.Runtime.setPianoSelectedSld_coltura(sel_ps_record.get('sld_coltura'));


        //log selected piano
        console.log('Selected piano ');

        //enable disable components
        cb.enable();
        pc.disable();
        sb.disable();

        //show border panels
        var wr = Ext.ComponentQuery.query('#westRegion')[0],
            cr = Ext.ComponentQuery.query('#centerRegion')[0],
            er = Ext.ComponentQuery.query('#eastRegion')[0];
        wr.show();
        cr.show();
        er.show();


        //load selected piano layers on map
        this.fireEvent('piano_selected');

    },


    onButtonClickClose: function(button, e, options) {
        var pp = Ext.ComponentQuery.query('pianoselectpanel')[0],
            pc = pp.down('#pianocombo'),
            sb = pp.down('#select'),
            cb = pp.down('#close');

        SmartTree.config.Runtime.setPianoSelected(false);
        SmartTree.config.Runtime.setPianoSelectedId(null);

        //log selected piano
        console.log('Selected piano '+SmartTree.config.Runtime.getPianoSelected());

        //enable disable components
        cb.disable();
        pc.enable();
        sb.enable();

        //hide border panels
        var wr = Ext.ComponentQuery.query('#westRegion')[0],
            cr = Ext.ComponentQuery.query('#centerRegion')[0],
            er = Ext.ComponentQuery.query('#eastRegion')[0];

        wr.hide();

        cr.removeAll();
        cr.hide();

        er.removeAll();
        er.hide();

        this.fireEvent('piano_closed');
        console.log('piano closed');
    },


    loadStores: function(){

        var me = this;

        var saveStrategy = new OpenLayers.Strategy.Save({
            onCommit: function() {
                saveStrategy.layer.refresh();
            }
        });

        //
        // Add Piano layer

        me.piano_vecLayer = new OpenLayers.Layer.Vector(
            "Piano",
            {
                strategies: [new OpenLayers.Strategy.Fixed(),saveStrategy],
                protocol: new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    url: SmartTree.config.Runtime.getPianoSelectedWfsAddr(),
                    featurePrefix: 'SmartTree', //geoserver worspace name
                    featureType: "piano", //geoserver Layer Name
                    srsName: "EPSG:32633",
                    featureNS: "it.f360.SmartTree", // Edit Workspace Namespace URI
                    geometryName: "the_geog" // field in Feature Type details with type "Geometry"
                }),

                filter: new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.EQUAL_TO,
                            property: "n_piano",
                            value: SmartTree.config.Runtime.getPianoSelectedId()
                }),

                styleMap: new OpenLayers.StyleMap({'default':{
                    strokeColor: "#000000",
                    strokeOpacity: 1,
                    strokeWidth: 3,
                    fillColor: "#FFFFFF",
                    fillOpacity: 0,
                    // label with k_ufor
                    //label : "${k_ufor}",
                    //fontSize: "16px",
                    //fontFamily: "Courier New, monospace",
                    //fontWeight: "bold",
                }}),
            }
        );


        // manually bind store to layer
        me.getPianoLayerPianoSStore().bind(me.piano_vecLayer);

        //add layer to the Map panel
        var pm = Ext.ComponentQuery.query('panelmap')[0];

        pm.map.addLayer(me.piano_vecLayer);

        console.log('Layer piano added');



    },

    unloadStores: function(){
        var me = this;
        // manually unbind store to layer
        me.getPianoLayerPianoSStore().unbind();

        console.log('Layer piano removed');

    },


    onMenuTreePianoItemSelect: function() {
        console.log("onMenuTreePianoItemSelect");

        var p_store = Ext.getStore('piano.TablePianoS');
        var record = p_store.getAt(p_store.find('n_piano',SmartTree.config.Runtime.getPianoSelectedId()));
        var view = Ext.widget('pianoeditpiano');
        view.down('form').loadRecord(record);

    },

    onLaunch: function() {

    },

    onPianoSStoreLoad: function(store, records) {

    },


    updatePiano: function(button) {
        var me = this;
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);

        var p_store = me.getPianoTablePianoSStore();
        p_store.sync();

        win.unmask();
        win.close();


    },


});
