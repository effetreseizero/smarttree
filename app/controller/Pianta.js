Ext.define('SmartTree.controller.Pianta', {
    extend: 'Ext.app.Controller',

    id:'controllerpianta',

    models: [
        'pianta.TablePianta',
    ],
    stores: [
        'pianta.TablePiantaS',
    ],

    views: [
        'pianta.ListPianta',
        'pianta.PanelListPianta',
        //'pianta.EditPianta',
        //'pianta.NewPianta',
    ],

    init: function() {
        var me = this;

        me.listen({
            controller: {
                 // select and close piano
                // '*':{
                //     map_created: me.loadStores,
                //     map_destroyed: me.unloadStores,
                // },
            },
            component:{

                // click on pianta gridpanel
                'piantalistpianta gridpanel': {
                    //containercontextmenu: me.grid_pianta_container_doRowCtxMenu,
                },
                'treepanel': {
                    itemclick: function(tree, record){
                        item = record.get('id');
                        switch(item) {
                            case 'pianta':
                                me.openPiantaPanel();
                                break;
                            // case 'pianta_sys':
                            //         me.getPiantaTablePiantaSysSStore().load();
                            //         var view = Ext.widget('piantalistpiantasys');
                            //
                            //         break;
                            default:
                        }

                    }
                },




                // Edit pianta save
                'piantaeditpianta button[action=save]': {
                    click: function(button) {
                        var me = this;
                        var win    = button.up('window'),
                            form   = win.down('form'),
                            record = form.getRecord(),
                            values = form.getValues();

                        win.mask("Saving to web-database... Please wait...", 'Saving');

                        record.set(values);

                        var tps = me.getPiantaTablePiantaSStore();
                        if(tps.getModifiedRecords().length>0){
                            tps.sync({
                                success:function(){
                                    console.log("pianta sync ended");
                                    var grid = Ext.ComponentQuery.query('piantalistpianta')[0].down('gridpanel');
                                    grid.getStore().load();
                                    grid.getView().refresh();
                                    win.unmask();
                                    win.close();

                                },
                            });
                        }else{
                            win.unmask();
                            win.close();
                        }
                    }
                },

                'piantaeditpianta button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('piantalistpianta')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },


                // New pianta save
                'piantanewpianta button[action=save]': {
                    click: function(button) {
                        var me = this;
                        var win    = button.up('window'),
                            form   = win.down('form'),
                            values = form.getValues();

                        win.mask("Saving to web-database... Please wait...", 'Saving');

                        var newPianta = Ext.create("SmartTree.model.pianta.TablePianta");
                        newPianta.set(values);

                        var tps = me.getPiantaTablePiantaSStore();

                        tps.insert(tps.count, newPianta);

                        if(tps.getModifiedRecords().length>0){
                            tps.sync({
                                success:function(){
                                    console.log("pianta sync ended");
                                    var grid = Ext.ComponentQuery.query('piantalistpianta')[0].down('gridpanel');
                                    grid.getStore().load();
                                    grid.getView().refresh();
                                    win.unmask();
                                    win.close();

                                },
                            });
                        }else{
                            win.unmask();
                            win.close();
                        }
                    }
                },

                'piantanewpianta button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('piantalistpianta')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },


            },
        });

        console.log('Pianta controller init');

    },

    openPiantaPanel: function(){
        me=this;
        if(!SmartTree.config.Runtime.getNodoSelected()){
            Ext.Msg.show({
                title:'Attenzione!',
                msg: 'Selezionare Nodo Filiera!', // #6
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }else{
            me.getPiantaTablePiantaSStore().load({
                callback:function(){


                    var new_map = new OpenLayers.Map({
                        allOverlays: false,
                        fallThrough: false,
                        controls: [
                                    new OpenLayers.Control.Navigation(),
                                    new OpenLayers.Control.PanZoomBar(),
                                    new OpenLayers.Control.LayerSwitcher({'ascending':false}),
                                    new OpenLayers.Control.OverviewMap(),
                                    new OpenLayers.Control.KeyboardDefaults(),
                                    new OpenLayers.Control.Attribution()
                                ],
                    });
                    var layers = [];
                    new_map.addLayer(new OpenLayers.Layer.OSM());
                    new_map.setCenter(new OpenLayers.LonLat(1835711.70, 4695068.04), 8);

                    console.log('map created');
                    this.fireEvent('map_created');

                    var sc = new OpenLayers.Control.SelectFeature(
                        [],
                        {
                            //add ID
                            id: 'layerSelectControl',
                        }
                    );
                    new_map.addControl(sc);


                    /*
                    vecLayer = new OpenLayers.Layer.Vector(
                        "Pianta",
                        {
                            strategies: [new OpenLayers.Strategy.Fixed()],
                            protocol: new OpenLayers.Protocol.WFS({
                                version: "1.1.0",
                                url: 'http://localhost:8080/geoserver/wfs',
                                featurePrefix: 'smarttree', //geoserver worspace name
                                featureType: "pianta", //geoserver Layer Name
                                srsName: "EPSG:4326",
                                featureNS: "it.alforlab.smarttree", // Edit Workspace Namespace URI
                                geometryName: "the_geom" // field in Feature Type details with type "Geometry"
                            }),

                            filter: new OpenLayers.Filter.Comparison({
                                        type: OpenLayers.Filter.Comparison.EQUAL_TO,
                                        property: "idnodo",
                                        value: SmartTree.config.Runtime.getNodoSelectedId()
                            }),
                        }
                    );

                    // manually bind store to layer
                    me.getPiantaTablePiantaSStore().bind(vecLayer);
                    console.log('Store pianta bound');

                    //add layer to the Map panel

                    var pm = Ext.ComponentQuery.query('panelmap')[0];
                    pm.map.addLayer(vecLayer);
                    console.log('Layer pianta added');


                    //add layer to map select feature control
                    var sc = pm.map.getControlsBy("id", "layerSelectControl")[0];
                    var currLayers = sc.layers;
                    if ( currLayers != null) {
                          currLayers.push(vecLayer);
                          sc.setLayer(currLayers);
                    } else {
                          sc.setLayer([layer]);
                    }

                    // create particella layerlist

                    var plp = new SmartTree.view.pianta.PanelListPianta({
                        selModel: new GeoExt.selection.FeatureModel({
                            selectControl: sc
                        })
                    });



                    //
                    // init table store

                    //me.getParticellaTableParticellaSStore().load();
                    console.log('Store particella table loaded');
                    */


                    var plp = new Ext.widget('piantapanellistpianta');


                    var pm = new SmartTree.view.Map({
                        map: new_map,
                        dockedItems: [{

                        }]
                    });

                    // add panelmap  to centerRegion
                    var cr = Ext.getCmp('centerRegion');
                    cr.removeAll();

                    cr.add([plp]);
                    cr.add([pm]);

                    cr.items.items[0].anchor = '100% 50%';
                    cr.items.items[1].anchor = '100% 50%';
                    cr.doLayout();
            }
        });
        }
    },

    loadStores: function(){

        var me = this;
        me.getPiantaTablePiantaSStore().load();
        console.log('Store pianta loaded');
    },

    unloadStores: function(){

        var me = this;

        //
        // unbind table store
        me.getPiantaTablePiantaSStore().removeAll();
        console.log('Store pianta unloaded');
    },

});
