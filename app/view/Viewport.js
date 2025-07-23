Ext.define('SmartTree.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'border',
    defaults : {
        frame : true,
        split : true
    },
    requires: [
        'Ext.layout.container.Border',
        'Ext.resizer.Splitter',
        'SmartTree.view.Header',
        'SmartTree.view.login.LoginPanel',
        'SmartTree.view.nodo.SelectPanel',
        'SmartTree.view.menu.Tree',
        /*'SmartTree.view.Map',
        'SmartTree.view.particella.LayerList',
        'SmartTree.view.ufor.LayerList'*/
    ],

    items: [
        {
            xtype: 'panel',
            border: false,
            layout: 'fit',
            region : 'north',
            dockedItems: [
                {
                    xtype : 'SmartTreeheader',

                },
                {
                    xtype : 'loginloginpanel',
                     region : 'north',
                },
                {
                    xtype : 'nodoselectpanel',
                    region : 'north',
                }
            ]
        },
        {
            xtype : 'container',
            region : 'west',
            layout : 'fit',
            id : 'westRegion',
            width : 150,
            minWidth : 300,
            hidden: false,
            items : {
                xtype : 'menutree',
            }
        },
        {
            xtype : 'container',
            region : 'center',
            layout : 'anchor',
            id : 'centerRegion',
            hidden: false,
            items : [

            ]
        },
        /*{
            xtype : 'container',
            region : 'east',
            layout : 'fit',
            id : 'eastRegion',
            width : 150,
            minWidth : 300,
            hidden: false,
            //maxWidth : 300,
            items : [

            ]
        }*/
    ],

    initComponent: function() {


        console.log('init viewport');
        this.callParent(arguments);


    }
});
