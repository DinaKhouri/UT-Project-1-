$(document).ready(function() {

    function pageLoad() {
        
        //Meetup Query Url
        var queryUrl = "https://api.meetup.com/topics?offset=0&format=json&search=homeless&photo-host=public&page=20&order=members&sig_id=274085378&sig=75c90a38fdd8621ef6539dbb8d372554abc3cf48&callback?";

            $.ajax({
                dataType:'jsonp',
                method:'get',
                url: queryUrl,
                success:function(response) {
                    console.log(response); //returns object
                for(var i=0;i<response.results.length; i++) {
                    var result = $("<h4><a href='"+response.results[i].link+"'>"+response.results[i].name+"</a><br></h4>");
                    $(".results").prepend(result);
                   }
                  },
                });  
              };	
    pageLoad();
});