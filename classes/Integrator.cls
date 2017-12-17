public class Integrator {
    
    
    
    public Contact cont{set;get;}
    public Contact ev{set;get;}
    
    public String street{get;set;}
    public String city{get;set;}
    public String state{get;set;}
    public String country{get;set;}
    
    public String pageDataList{get;set;}
    
    
    public boolean updateMap;
    
    
    public Integrator(ApexPages.StandardController stdController) {
        this.cont = (Contact)stdController.getRecord();
    }
    
    @AuraEnabled
    public static Contact setContactLocation(Id contactRecordId)
    {
        Contact ev = [SELECT Id,Name,MailingCountry,MailingState,MailingCity,MailingStreet FROM Contact WHERE Id=:contactRecordId]; 
        System.debug(ev);
        
        return ev;
    }
    
    @AuraEnabled
    public static List<Contact> getAllContacts()
    {
        List<Contact> contList = [SELECT Id,FirstName,LastName,MailingCountry,MailingState,MailingCity,MailingStreet FROM Contact WHERE MailingCountry!=null AND MailingState!= null AND MailingCity != null AND MailingStreet != null ]; 
        System.debug(contList);
        return contList;
        
    }
    
    
    public void setParam()
    {
        system.debug('debugdata'+pageDataList);
        
        String[] listToReturn = new List<String>();
        if(String.isNotBlank(pageDataList)) {
            for(String eachStr : pageDataList.split(',')) {
                listToReturn.add(eachStr);
            }
            
            this.city=listToReturn[1];
            this.state=listToReturn[2];
            this.country=listToReturn[3];
            this.street=listToReturn[4];
            
            
            System.debug('Address'+listToReturn);
        }
        
    }
}