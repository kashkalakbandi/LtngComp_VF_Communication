({
	sendToVF : function(component, event, helper) {
		 var vfWindow = component.find("vfFrame").getElement().contentWindow;
        vfWindow.postMessage("dkjlaskdaskd", vfOrigin);
	},
    
    handleMapEvent : function(component, event, helper) {
        var message = event.getParam("contactId");
                var cityParam = event.getParam("city");
                var stateParam = event.getParam("state");
                var countryParam = event.getParam("country");
                var streetParam = event.getParam("street");

		 component.set("v.messageFromEvent", message);
         component.set("v.cityFromEvent", cityParam);
         component.set("v.stateFromEvent", stateParam);
         component.set("v.countryFromEvent", countryParam);
         component.set("v.streetFromEvent", streetParam);
        
        var dataList = [message,cityParam,stateParam,countryParam,streetParam];
        
        var vfOrigin = "https://wavestudiow18.my.salesforce.com";
        var vfWindow = component.find("vfFrame").getElement().contentWindow;
        vfWindow.postMessage(dataList, vfOrigin);
	}
    
    
})