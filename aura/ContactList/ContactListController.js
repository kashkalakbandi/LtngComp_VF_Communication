({
    doInit : function(component, event, helper) {
        var action = component.get("c.getAllContacts");
        action.setParams({ });
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
              //  alert("From server: " + response.getReturnValue());
                component.set("v.contactList",response.getReturnValue());
                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete
            }});
        
        
        $A.enqueueAction(action);
        
    },
    setMap : function(component, event, helper) {
        
        var contactId = event.getSource().get("v.name");
        alert(contactId);
        var action = component.get("c.setContactLocation");
        action.setParams({"contactRecordId":contactId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               // alert("From server: " + response.getReturnValue());
                component.set("v.contact",response.getReturnValue());
                var jsontext = JSON.stringify(response.getReturnValue());
                var result = JSON.parse(jsontext);
                var streetVar = result.MailingStreet;
                var cityVar = result.MailingCity ;
                var countryVar = result.MailingCountry;
                var stateVar   = result.MailingState;
               // alert(streetVar+'--'+cityVar+'--'+countryVar+'--'+stateVar);
                var appEvent = $A.get("e.c:MapAlert");
                appEvent.setParams({
                    "contactId" :contactId,
                    "street":streetVar ,
                    "city":cityVar ,
                    "country":countryVar ,
                    "state":stateVar});
                appEvent.fire();
            }});
        // Notify the event with the id,street,city,state,country details
        
        $A.enqueueAction(action);
        
        
        
    }
})