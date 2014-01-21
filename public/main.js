define(["libs/trace", "libs/requestFilter","libs/brodcaster"], function(trace, requestFilter, brodcaster) {

    var options = {
        trace: {
            //coverage : "defaultCoverage"
            coverage : "stackCoverage"
        },
        requestFilter: {
            filterBy: 'by_status',
            parameters: {
                "action": "include",
                "codes": "all"
            }
        }
    };

    trace.init(brodcaster,"http://10.221.20.42:3010/storeJsError", options.trace);
    requestFilter.init(brodcaster,"http://10.221.20.42:3010/storeRestError", options.requestFilter);

});