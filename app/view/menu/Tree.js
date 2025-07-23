Ext.define('SmartTree.view.menu.Tree', {
    extend : 'Ext.form.Panel',
    alias : 'widget.menutree',


    items : {
        xtype : 'treepanel',
        store : {
            root : {
                text : 'Root Node',
                expanded : true,
                children : [
                    {
                        itemId: 'prodotti',
                        text : 'Prodotti tracciati',
                        children : [
                            {
                                text : 'Pianta',
                                id: 'pianta',
                                leaf : true
                            },
                            {
                                text : 'Toppo',
                                id: 'toppo',
                                leaf : true
                            },
                        ]
                    },
                    {
                        itemId: 'amministrazione',
                        text : 'Amministrazione',
                        children : [
                            {
                                text : 'Utenti',
                                id: 'utenti',
                                leaf : true
                            },
                            {
                                text : 'Filiere e nodi',
                                id: 'filiere',
                                leaf : true
                            },
                            {
                                text : 'Piani forestali',
                                id: 'piani',
                                leaf : true
                            }
                        ]
                    },
                    {
                        itemId: 'configurazioni',
                        text : 'Configurazioni',
                        children : [
                            {
                                text : 'Tabella decodifica',
                                id: 'lookuptable',
                                leaf : true
                            }
                        ]
                    },
                ]
            }
        },
        rootVisible : false
    }

});
