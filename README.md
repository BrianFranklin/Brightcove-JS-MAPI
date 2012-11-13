About
=====

This project provides a starting point for integrating the Brightcove Media
API into your application. It provides simple ways to interact with the
API.

Compatibility Notice
====================

Please note that the JavaScript MAPI Wrapper v1.0+ is **not** compatible with any
previous versions (when it was known as "Kudos"). The class name has been
changed, numerous functions have been re-named, and methods have been
updated to take advantage of Brightcove API changes.

If you need assistance in determining what changes have been made, please
send an e-mail to opensource@brightcove.com with your request.

Basic Usage
===========
A basic example containing a query for all videos in an account.
	
	<script src="bc-mapi.js" type="text/javascript"></script>
	<script type="text/javascript">
		// Make a call to the API requesting content
		// Note that a callback function is needed to handle the returned data
		BCMAPI.find("find_all_videos", { "callback" : "handle" });
		
		// Our callback loops through the returned videos, alerting their names
		function handle (pResponse) {
			for (var pVideo in pResponse.items) {
				alert(pVideo.name);
			}
		}
	</script>
	

Advanced Usage
==============
An advanced example containing a query for all videos in an account as well as instantiation options.
	
	<script src="bc-mapi.js" type="text/javascript"></script>
	<script type="text/javascript">
		// Set the default token and handler for calls
		BCMAPI.token = "TOKEN.GOES.HERE";
		BCMAPI.callback = "MyClass.myMethod";
		
		// Our call response will now be sent to MyClass.method
		BCMAPI.find("find_all_videos");
		
		// With a token and callback function set, we can use find()'s params as a selector
		BCMAPI.find("find_video_by_id", 1234567890);
		
		// You can also omit "find" from all API commands for efficiency
		BCMAPI.find("video_by_id", 1234567890);
	</script>
		
Search Videos Usage
===================
An example containing a search_videos call with multiple search terms.

	<script src="bc-mapi.js" type="text/javascript"></script>
	<script type="text/javascript">
		// Set the default token and handler for calls
		BCMAPI.token = "TOKEN.GOES.HERE";
		BCMAPI.callback = "MyClass.myMethod";
		// Set params
		var params = {};
		params.any = ["tag:sea","tag:fish"];
		
		// Our call response will now be sent to MyClass.method
		BCMAPI.search(params);
	</script>

	


Methods
=======

BCMAPI
------
The Media API wrapper class.

### Properties
- **token** *Public - The Brightcove API token*

	Type:		String
	
- **callback** *Public - The function to execute upon API return*

	Type:		Function
	
- **request** *Public - The full request that is executed (for debugging purposes)

	Type:		String
	
	
find
----
Performs an API query.

### Arguments
- **pCommand** *A Brightcove API method*

	Default:	
	Type:		String
	
- **pParams** *Either an object containing the API parameters to apply to the given command, or a single value which is applied to the command's default selector*

	Default:	
	Type:		Mixed

### Return Value

	true
	
	
search
------
Performs an API search query.
		
- **pParams** *Either an object containing the API parameters to apply to the given command, or a single value which is applied to the command's default selector; for "any", "all" or "none" arguments, use a string value for a single search term, or an array value for multiple search terms*
	
	Default:	
	Type:		Mixed	

### Return Value

	true