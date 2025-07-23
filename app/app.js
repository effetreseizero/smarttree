


Ext.require([

    // We need to require this class, even though it is used by Ext.EventObjectImpl
    // see: http://www.sencha.com/forum/showthread.php?262124-Missed-(-)-dependency-reference-to-a-Ext.util.Point-in-Ext.EventObjectImpl
    'Ext.util.Point',


]);

Ext.application({
    name: 'SmartTree',

    requires:[
        'SmartTree.config.Runtime'
    ],


    controllers: [
        'Login',
        'Map',
        'Menu',
        'Nodo',
        'Utente',
        'Pianta',
        'Toppo',
        'Piano',
        'Particella',
        'Ufor',
        'Obiettivo',
        'Coltura',
        'Lookuptable',
    ],

    models: [
    ],

    stores: [

    ],

    views: [

    ],

    autoCreateViewport: false,

    launch: function(){
        Ext.widget('loginwindow');
    }
});
