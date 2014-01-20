define(["jquery"], function($){


    function report(url,data) 
        {
            $.ajax({
              type: "POST",
              url: url,
              data: data,
              error: error,
              success: success
            });
        }

        function error(data)
            {
                console.log("ERROR");
                console.log(data);
            }

        function success(data)
            {
                  console.log("SUCCESS");
                  console.log(data);
            }

 
    // API Publica
    return {
        report: report

    };

});

