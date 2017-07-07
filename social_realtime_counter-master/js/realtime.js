(function ($) {
    Drupal.behaviors.social_realtime_counter = {
        attach: function(context) {
        	var content_url = Drupal.settings.r_link.urls;
            //console.log(Drupal.settings.r_link.urls);

		    realtime_social(); //Run funtion
		    setInterval(realtime_social, 30000); // Fetch facebook and tweet once and every 30 seconds thereafter
           // Adjust setInterval to either fetch content in different frequency or remove to only fetch once.


		  // Fetch FB Likes
		  // Replace "Facebook" with your Facebook Profile/Page ID, or full external website address example : http://www.devzr.com .
		  // Get FB ID here:  http://graph.facebook.com/your_page_name
		  function realtime_social() {
		  	var fburl = '//graph.facebook.com/'+ content_url;
		  	var twurl = '//urls.api.twitter.com/1/urls/count.json?url='+ content_url + '&callback=?';
		  	//console.log(fburl);
		  	//console.log(twurl);
			    $.getJSON(fburl, function(data) {
			      //console.log(data);
			      //console.log(Drupal.settings.my_var.orderid);
			      var shares1 = parseInt(data.shares);
			       if(isNaN(shares1)){
			       	  shares1 = 0;
			       }

			      $('.fb-count').text(nFormatter(shares1));
			      
				      $.getJSON(twurl,function(data) {
				      //console.log(data);
				      var shares = parseInt(data.count);
				      $('.tw-count').text(nFormatter(shares));
				      var sum1 = shares1 + shares;
				      var sum1 = nFormatter(parseInt(sum1));  
				      //$('#totoal').text(sum1); option for sumary
				    });
			   });
		 }

		  // Pretty number format to add commas between numbers
		  // Source: http://www.mredkj.com/javascript/nfbasic.html
			function addCommas(nStr) {
			    nStr += '';
			    x = nStr.split('.');
			    x1 = x[0];
			    x2 = x.length > 1 ? '.' + x[1] : '';
			    var rgx = /(\d+)(\d{3})/;
			    while (rgx.test(x1)) {
			      x1 = x1.replace(rgx, '$1' + ',' + '$2');
			    }
			    return x1 + x2;
			}
			//How to format a number as 1.1K if a thousand or more, otherwise 900
			function nFormatter(num) {
			    if (num >= 1000000000) {
			        return (num / 1000000000).toFixed(1) + 'G';
			    }
			    if (num >= 1000000) {
			        return (num / 1000000).toFixed(1) + 'M';
			    }
			    if (num >= 1000) {
			        return (num / 1000).toFixed(1) + 'K';
			    }
			    return num;
			}
        }
    }
})(jQuery);