Ext.regController('Bills', {

    // index action
    Index: function(options){
        var billList,
            that = this;
        
        if (!this.billsView) {
    		this.billsView = this.render({
                xtype: 'BillsView'
            });
            var billsController = this;
            billList = this.billsView.query('#BillList')[0];
            billList.addListener('itemtap', function(that, index, item, e){
                var record = that.store.getAt(index);
                billsController._gotoBill(record);
            });
        }
        that.billsView.showLoading(true);


    	getAPIData({
    		apiKey:'bills',
    		success : function (billsData) {
    			
    			that.billsView.billListTitle.update({
                    relevant : billsData.bills.length,
                    total : billsData.total
                });

                OKnesset.BillsStore.loadData(billsData.bills);
                OKnesset.BillsStore.sort(OKnesset.BillsStoreSorters.byDate);

                that.billsView.showLoading(false);
    		}
    	});

      
        // scroll bill list up
        if (options.pushed) {
            billList = this.billsView.query('#BillList')[0];
            if (billList.scroller) {
                billList.scroller.scrollTo({
                    x: 0,
                    y: 0
                });
            }
        }


        this.application.viewport.setActiveItem(this.billsView, options.animation);
    },


    /**
     * Returns true if the member is a minister, or is the chairperson of the
     * Knesset.
     *
     * @param member
     * @returns {Boolean}
     */
    hasExcuseForNoBills: function(member){
        return (
            member.current_role_descriptions !== null &&
            (member.current_role_descriptions.indexOf(OKnesset.strings.ministerIndicator) != -1 ||
            member.current_role_descriptions === OKnesset.strings.knessetChairman));
    },

    /**
     * Open Bill in browser. open the browser to display the bill in oknesset.org's
     * website
     */
    _gotoBill: function(record){
        var bill = record.data;
        OKnesset.app.controllers.navigation.dispatchPanel('BillDetails/Index/' + bill.id, this.historyUrl);
    }
});
