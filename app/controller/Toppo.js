Ext.define('SmartTree.controller.Toppo', {
    extend: 'Ext.app.Controller',

    id:'controllertoppo',

    models: [
        'toppo.TableToppo',
    ],
    stores: [
        'toppo.TableToppoS',
    ],

    views: [
        'toppo.ListToppo',
        'toppo.PanelListToppo',
        //'toppo.EditToppo',
        //'toppo.NewToppo',
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

                // click on toppo gridpanel
                'toppolisttoppo gridpanel': {
                    //containercontextmenu: me.grid_toppo_container_doRowCtxMenu,
                },
                'treepanel': {
                    itemclick: function(tree, record){
                        item = record.get('id');
                        switch(item) {
                            case 'toppo':
                                me.openToppoPanel();
                                break;
                            // case 'toppo_sys':
                            //         me.getToppoTableToppoSysSStore().load();
                            //         var view = Ext.widget('toppolisttopposys');
                            //
                            //         break;
                            default:
                        }

                    }
                },




                // Edit toppo save
                'toppoedittoppo button[action=save]': {
                    click: function(button) {
                        var me = this;
                        var win    = button.up('window'),
                            form   = win.down('form'),
                            record = form.getRecord(),
                            values = form.getValues();

                        win.mask("Saving to web-database... Please wait...", 'Saving');

                        record.set(values);

                        var tps = me.getToppoTableToppoSStore();
                        if(tps.getModifiedRecords().length>0){
                            tps.sync({
                                success:function(){
                                    console.log("toppo sync ended");
                                    var grid = Ext.ComponentQuery.query('toppolisttoppo')[0].down('gridpanel');
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

                'toppoedittoppo button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('toppolisttoppo')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },


                // New toppo save
                'topponewtoppo button[action=save]': {
                    click: function(button) {
                        var me = this;
                        var win    = button.up('window'),
                            form   = win.down('form'),
                            values = form.getValues();

                        win.mask("Saving to web-database... Please wait...", 'Saving');

                        var newToppo = Ext.create("SmartTree.model.toppo.TableToppo");
                        newToppo.set(values);

                        var tps = me.getToppoTableToppoSStore();

                        tps.insert(tps.count, newToppo);

                        if(tps.getModifiedRecords().length>0){
                            tps.sync({
                                success:function(){
                                    console.log("toppo sync ended");
                                    var grid = Ext.ComponentQuery.query('toppolisttoppo')[0].down('gridpanel');
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

                'topponewtoppo button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('toppolisttoppo')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },


            },
        });

        console.log('Toppo controller init');

    },

    openToppoPanel: function(){
        me=this;
        if(!SmartTree.config.Runtime.getNodoSelected()){
            Ext.Msg.show({
                title:'Attenzione!',
                msg: 'Selezionare Nodo Filiera!', // #6
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }else{
            me.getToppoTableToppoSStore().load({
                callback:function(){

                    /*
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
                        "Toppo",
                        {
                            strategies: [new OpenLayers.Strategy.Fixed()],
                            protocol: new OpenLayers.Protocol.WFS({
                                version: "1.1.0",
                                url: 'http://localhost:8080/geoserver/wfs',
                                featurePrefix: 'smarttree', //geoserver worspace name
                                featureType: "toppo", //geoserver Layer Name
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
                    me.getToppoTableToppoSStore().bind(vecLayer);
                    console.log('Store toppo bound');

                    //add layer to the Map panel

                    var pm = Ext.ComponentQuery.query('panelmap')[0];
                    pm.map.addLayer(vecLayer);
                    console.log('Layer toppo added');


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

                    var plp = new SmartTree.view.toppo.PanelListToppo({
                        selModel: new GeoExt.selection.FeatureModel({
                            selectControl: sc
                        })
                    });



                    //
                    // init table store

                    //me.getParticellaTableParticellaSStore().load();
                    console.log('Store particella table loaded');
                    */


                    var tlt = new Ext.widget('toppopanellisttoppo');


                    /*var pm = new SmartTree.view.Map({
                        map: new_map,
                        dockedItems: [{

                        }]
                    });*/

                    // add panelmap  to centerRegion
                    var cr = Ext.getCmp('centerRegion');
                    cr.removeAll();

                    cr.add([tlt]);
                    //cr.add([pm]);

                    cr.items.items[0].anchor = '100% 50%';
                    cr.items.items[1].anchor = '100% 50%';
                    cr.doLayout();
            }
        });
        }
    },

    loadStores: function(){

        var me = this;
        me.getToppoTableToppoSStore().load();
        console.log('Store toppo loaded');
    },

    unloadStores: function(){

        var me = this;

        //
        // unbind table store
        me.getToppoTableToppoSStore().removeAll();
        console.log('Store toppo unloaded');
    },

});
