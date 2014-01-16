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


window.MaximumErrorCount = 5;
var errors = [];

navigator.sayswho = (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    return M.join(' ');
})();

window.onerror = function(errorMsg, file, lineNumber) {
  window.errorCount || (window.errorCount = 0);

  if (window.errorCount <= window.MaximumErrorCount) {

    alert('$.post');
    
    jQuery.post('http://127.0.0.1:3000/store_error', {
      
        uid:             window.location.href.substring(window.location.href.lastIndexOf("=") + 1),
        error_message:   errorMsg,
        file:            file,
        url:             window.location.href,
        line_number:     lineNumber,
        user_agent:      navigator.sayswho,
        the_event :      JSON.stringify(window.event.error, true, 2)
      
    });

    var _error = {
          uid:             window.location.href.substring(window.location.href.lastIndexOf("=") + 1),
          error_message:   errorMsg,
          file:            file,
          url:             window.location.href,
          line_number:     lineNumber,
          user_agent:      navigator.sayswho
    };

    alert('$.ajax');

    jQuery.ajax({
      url: "http://127.0.0.1:3000/store_error",
      cache: false,
      data: _error,
      type: "POST"
    })
    .done(function(data) {
      alert("funco");
    })
    .fail(function(){
      alert("an error occurred");
    });

    /*var _errors = {
        uid:             window.location.href.substring(window.location.href.lastIndexOf("=") + 1),
        //error_message:   encodeURIComponent(errorMsg),
        error_message:   errorMsg,
        file:            file,
        url:             window.location.href,
        line_number:     lineNumber,
        user_agent:      navigator.sayswho
    };


console.log(_errors);
   makeCorsRequest(_errors);
   window.MaximumErrorCount++;

  }
}


// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(_errors) {
  // All HTML5 Rocks properties support CORS.
  //var url = 'http://10.221.20.50:3000/store_error';
  var url = 'http://10.221.20.42:3000/store_error';
  
  var xhr = createCORSRequest('POST', url);
  

  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
   console.log(text);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  console.log(_errors);
  xhr.send(_errors);
}



/*var _errs = ['test'];  // This is the error "queue" - the only variable we add in the global namespace
(function (window, document) {
    // This self-executing function lets us control scope better,
    // and gives us better compressibility using common minifiers.
 
    if (document.location.protocol != "https:") {  // For now, we aren't supporting https
        window.onerror = function (errorMsg, file, lineNumber) {
            _errs.push({
                uid:             window.location.href.substring(window.location.href.lastIndexOf("=") + 1),
                error_message:   encodeURIComponent(errorMsg),
                file:            file,
                url:             window.location.href,
                line_number:     lineNumber,
                user_agent:      navigator.userAgent,
                the_event :      JSON.stringify(window.event.error, true, 2)
            });
            return false;
        };
 
        var loader = function () {
            makeCorsRequest(_errs);
        };
 
        // Wait until window.onload before downloading any more code.
        window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
    }
})(window, document);*/