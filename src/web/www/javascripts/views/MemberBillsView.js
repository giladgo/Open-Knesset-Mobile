/**
 * Member Bills
 */
OKnesset.app.views.MemberBillsView = new Ext.extend(OKnesset.Panel, {
    id: 'MemberBillsView',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    currentMemeber: null,
    initComponent: function(){
    	
        this.memberBillList = new OKnesset.app.views.MemberBillsView.BillList();
        
        this.memberBillListTitle = new Ext.Panel({
                id: "memberBillListTitle",
                cls: 'titlePanel',
                // padding: '5',
                tpl: new Ext.XTemplate('<div class="hebTitle">{[this.memberBillListTitle(values.relevant, values.total)]}</div>', 
                    {
                        compiled: true,         
                        memberBillListTitle : function(relevant, total){
                            return Ext.util.Format.format(OKnesset.strings.memberBillsOutOf, relevant, total);
                        }
                    })
            });
        this.items = [this.memberBillListTitle, this.memberBillList];
        OKnesset.app.views.MemberBillsView.superclass.initComponent.apply(this, arguments);
    }
});



Ext.reg('MemberBillsView', OKnesset.app.views.MemberBillsView);

OKnesset.app.views.MemberBillsView.BillList = new Ext.extend(Ext.List, {
    id: 'MemberBillList',
    itemTpl: '<div>{full_title}</div>',
    store: OKnesset.BillsStore,
    layout: 'fit',
    deferEmptyText: false,
    grouped: true,
    flex: 1.5,
    onItemDisclosure: true
});