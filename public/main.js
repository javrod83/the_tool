define(["libs/trace", "libs/requestFilter","libs/brodcaster", "libs/xhook"], function(trace, requestFilter,brodcaster) {

      var client = {
        register: function(obj) {
            console.log("ALL RIGHT !!!!");
            console.log(obj);
        }
    };

    


    requestFilter.init(brodcaster,"http://10.221.20.42:3010/storeRestError");
    requestFilter.by_status({
        "action": "include",
        "codes": "all"
    });







});



//http://10.221.20.42:3010/storeRestError