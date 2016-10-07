module.exports = {

    formatDate : function(date) {
        
        var d = {
            
            unix: Date.parse(date),
            natural: date.toLocaleString("en-GB", { day:"numeric", month: "long", year:"numeric" }) 
            
        }
        return d;
    
    },
    
    assertDate : function(date_parameter) {
        
        //if the request parameter is a full number, i'm having it considered as a unix parameter
        if (/^\d+$/.test(date_parameter)) {
            
            console.log("string is digits only, converting string to number and instantiating Date object");
            return new Date(Number(date_parameter));
            
        } else {
            
            console.log("Date parameter is not a number, instantiating Date object and having it decide wether it's valid or not")
            console.log(typeof(date_parameter));
            return new Date(date_parameter);
            
        }
        
    }

}