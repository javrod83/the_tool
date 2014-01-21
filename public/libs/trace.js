define(["jquery", "libs/stacktrace"], function($, printStackTrace)
{

    var listener = null;
    var report_url = null;

    /*
    (function( jQuery ) {
    if ( window.XDomainRequest ) {
      jQuery.ajaxTransport(function( s ) {
        if ( s.crossDomain && s.async ) {
          if ( s.timeout ) {
            s.xdrTimeout = s.timeout;
            delete s.timeout;
          }
          var xdr;
          return {
            send: function( _, complete ) {
              function callback( status, statusText, responses, responseHeaders ) {
                xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
                xdr = undefined;
                complete( status, statusText, responses, responseHeaders );
              }
              xdr = new XDomainRequest();
              xdr.onload = function() {
                callback( 200, "OK", { text: xdr.responseText }, "Content-Type: " + xdr.contentType );
              };
              xdr.onerror = function() {
                callback( 404, "Not Found" );
              };
              xdr.onprogress = jQuery.noop;
              xdr.ontimeout = function() {
                callback( 0, "timeout" );
              };
              xdr.timeout = s.xdrTimeout || Number.MAX_VALUE;
              xdr.open( s.type, s.url );
              console.log(s.url);
              xdr.send( ( s.hasContent && s.data ) || null );
            },
            abort: function() {
              if ( xdr ) {
                xdr.onerror = jQuery.noop;
                xdr.abort();
              }
            }
          };
        }
      });
    }
    })( jQuery );
    */

    function navUserAgent(){
        var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/([\.\d]+)/i))!== null) M[2]= tem[1];
        return M.join(' ');
    }

    function init( _listener, _report_url, _options) {
        listener = _listener;
        report_url = _report_url;

        var filterCall = {
            defaultCoverage : defaultCoverage,
            stackCoverage   : stackCoverage
        }

        window.onerror = function(errorMsg, file, lineNumber) {
            filterCall[_options.coverage](_get_basic_error(errorMsg, file, lineNumber));
        };

        var gOldOnError = window.onerror;
        // Override previous handler.
        window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
            if (gOldOnError){
                // Call previous handler.
                gOldOnError(errorMsg, url, lineNumber);
            }
            // Just let default handler run.
            return false;
        }

        filterCall[_options.coverage]();

    }

    function _get_basic_error(errorMsg, file, lineNumber){

        if(errorMsg != undefined && file != undefined && lineNumber != undefined){
            return {
                uid:             window.location.href.substring(window.location.href.lastIndexOf("=") + 1),
                error_message:   errorMsg,
                file:            file.substring(file.lastIndexOf("/") + 1).replace('.','-[').concat(']'),
                file_path:       file.substring(0, file.lastIndexOf('/')),
                url:             window.location.href,
                line_number:     lineNumber,
                user_agent:      navUserAgent()
                //the_event :    JSON.stringify(window.event.error, true, 2)
            }
        }
        else return false
    }

    function defaultCoverage(basic_error){
        if(basic_error){
            listener.report(report_url, error)
        }
    }

    function stackCoverage(basic_error){

        //console.log(basic_error);

        window.logError = function(error) {
            var trace = printStackTrace({e: error});
            console.log('Error!\n' + 'Message: ' + error.message + '\nStack trace:\n' + trace.join('\n'));
        };

    }

    // API Publica
    return {
        init: init
    };

});


