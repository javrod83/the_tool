define(["libs/xhook"], function(xhook)
{

    filter = {
        by_status: false,
        by_url: false,
        status_codes: [],
        urls: [],
        apply: {
            status: function() {
                return false;
            },
            url: function() {
                return false;
            }
        }
    };
    
    var listener = null;
    var report_url = null;

    function init( _listener, _report_url, _options) {

        console.log("[INFO] Inicializando request filter.");

        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(needle) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === needle) {
                        return i;
                    }
                }
                return -1;
            };
        }

        listener = _listener;
        report_url =_report_url;

        xhook.after(function(request, response) {
            _filter(request, response);

        });

        console.log('params');
        console.log(_options.parameters);

        var filterCall = {
            by_status : by_status,
            by_url : by_url
        };

        //read and load params

        filterCall[_options.filterBy](_options.parameters);

    }


    function _filter(request, response) {
        console.log("[INFO]request filter called ! ");
        //filtering by url ? 


        if (request.url == report_url)
            {
                
                return 0 ;
            }

        if (filter.by_url) 
            {
            console.log("Filtering urls: TRUE ");
            //current url it's beeing tracked ? 

            if (filter.apply.url(request.url))
                {

                    console.log("Filtering status: TRUE ");
                    if (filter.by_status) {
                        if (filter.apply.status(request,response)) {
                            _log_this(request, response);
                        } else {
                            //dont track this one 
                        }
                    } else {
                        console.log("Filtering STATUS: FALSE ");

                        console.log("log: "+request.url+" : "+response.status);
                        _log_this(request, response);
                    }
                } 
            else 
                {

                //do not track this one ! 
                }
        } 
        else // check any url 
            {
                console.log("Filtering urls: FALSE ");
                
                if (filter.by_status) {
                    console.log("Filtering status: TRUE ");

                    if (filter.apply.status(request,response)) {
                        _log_this(request, response);
                        console.log("logued  " + request.url);
                    } else {
                        console.log("ignored  " + request.url + " status:[ "+response.status+" ]");
                        //dont log this one 
                    }
                } else
                    {
                        console.log("Filtering status : FALSE");
                        //_log_this(request, response);    
                    }

                    
            }
    }


    function by_status(params) {

        console.log("filter requests : by status");
        if ("action" in params && "codes" in params) {
            filter.by_status = true;

            switch (params.action) {
                case "include":
                    if (params.codes == "all")
                        filter.apply.status=_set_include_all_status_codes_filter();
                    else
                        filter.apply.status=_set_include_code_filter(params.codes);
                break;
                case "exclude":
                    filter.apply.status=_set_exclude_code_filter(params.codes);
                break;
            }
        } else {
            filter.by_status = false;
            filter.status_codes = [];
        }
    }

    function by_url(param) {
        if ("action" in params && "urls" in params) {
            filter.by_status = true;

            switch (params.action) {
                case "include":
                    if (params.codes == "all")
                        filter.apply.url = _set_include_all_status_codes_filter();
                    else
                        filter.apply.url = _set_include_urls_filter(params.codes);
                    break;
                case "exclude":
                    filter.apply.url = _set_exclude_urls_filter(params.codes);
                    break;
            }
        } else {
            console.log(" cant set url filter , wrogn params");
            filter.by_url = false;
            filter.urls = [];
        }
    }

    function _set_include_all_status_codes_filter() {

         console.log("filter requests : _set_include_all_status_codes_filter ");

        return function(request, response) {


            console.log("filter: [ response.status >= 400 && response.status <= 599 ]");
            console.log("status: [ "+response.status+" ]");
            console.log("  eval: [ "+(response.status >= 400 && response.status <= 599)+" ]");

            return (response.status >= 400 && response.status <= 599);
        };
    }

    function _set_include_code_filter(codes) {
        filter.status_codes = codes;

        return function(request, response) {
            return (filter.status_codes.indexOf(response.status) != -1);
        };
    }

    function _set_exclude_code_filter(codes) {
        filter.status_codes = codes;

        return function(request, response) {
            return (filter.status_codes.indexOf(response.status) == -1);
        };
    }

    function _set_include_urls_filter(urls) {
        filter.urls = urls;
        return function(request, response) {
            return (filter.status_codes.indexOf(request.url) != -1);
        };
    }

    function _set_exclude_urls_fitler(urls) {
        filter.urls = urls;
        return function(request, response) {
            return (filter.status_codes.indexOf(request.url) == -1);
        };
    }

    function _log_this(request, response) {
        listener.report(report_url,{
            "request": request,
            "response": response
        });


    }



    // API Publica
    return {
        init: init,
        by_status: by_status,
        by_url: by_url
    };

});

