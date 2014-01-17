define(["jquery"], function($)
{

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


navigator.sayswho = (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/([\.\d]+)/i))!== null) M[2]= tem[1];
    return M.join(' ');
})();

window.onerror = function(errorMsg, file, lineNumber) {

    $.post('http://10.221.20.42:3010/storeJsError', {
      
        uid:             window.location.href.substring(window.location.href.lastIndexOf("=") + 1),
        error_message:   errorMsg,
        file:            file,
        url:             window.location.href,
        line_number:     lineNumber,
        user_agent:      navigator.sayswho
        //the_event :      JSON.stringify(window.event.error, true, 2)
      
    });

};


});


