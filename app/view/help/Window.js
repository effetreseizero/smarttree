/**
 * Help Window with static content using 'contentEl' property.
 * @extends Ext.window.Window
 */
Ext.define('SmartTree.view.help.Window', {
    extend: 'Ext.window.Window',
    alias : 'widget.SmartTree_helpwindow',
    initComponent: function() {
        Ext.apply(this, {
            bodyCls: "SmartTree-helpwindow",
            closeAction: "hide",
            layout: 'fit',
            maxWidth: 600,
            title: "Help"
        });
        this.callParent(arguments);
    }
});
