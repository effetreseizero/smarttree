/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('SmartTree.view.Header', {
    extend: 'Ext.Component',
    alias: 'widget.SmartTreeheader',

    dock: 'top',
    baseCls: 'SmartTree-header',

    config: {
        style:"background-color:white;",
    },
    initComponent: function() {
      Ext.applyIf(this, {
          html: '<img src="resources/images/header-logo.png" style=" height: 100px; border:0;" alt="" >'
      });

        this.callParent(arguments);
    }
});
