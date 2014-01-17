require([
	
	"trace",
	"http://desa.despegar.com.ar:3000/requestFilter.js"
		],
function(
	
	trace,
	requestFilter
) {

    var client = {
        register: function(obj) {
            console.log("ALL RIGHT !!!!");
            console.log(obj);
        }
    };

    requestFilter.init(client);
    requestFilter.by_status({
        "action": "include",
        "codes": "all"
    });

});