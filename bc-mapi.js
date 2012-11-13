/*
 * Copyright 2012 Brian Franklin

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var BCMAPI = new function () {
	this.token = "";
	this.callback = "BCMAPI.flush";
	this.url = "http://api.brightcove.com/services/library";
	this.request = this.url;
	this.calls = [
		{ "command" : "find_all_videos", "def" : false },
		{ "command" : "find_video_by_id", "def" : "video_id" },
		{ "command" : "find_video_by_id_unfiltered", "def" : "video_id" },
		{ "command" : "find_videos_by_ids", "def" : "video_ids" },
		{ "command" : "find_videos_by_ids_unfiltered", "def" : "video_ids" },
		{ "command" : "find_video_by_reference_id", "def" : "reference_id" },
		{ "command" : "find_video_by_reference_id_unfiltered", "def" : "reference_id" },
		{ "command" : "find_videos_by_reference_ids", "def" : "reference_ids" },
		{ "command" : "find_videos_by_reference_ids_unfiltered", "def" : "reference_ids" },
		{ "command" : "find_videos_by_campaign_id", "def" : "campaign_id" },
		{ "command" : "find_videos_by_tags", "def" : "or_tags" },
		{ "command" : "find_videos_by_text", "def" : "text" },
		{ "command" : "find_videos_by_user_id", "def" : "user_id" },
		{ "command" : "find_modified_videos", "def" : "from_date" },
		{ "command" : "find_related_videos", "def" : "video_id" },
		{ "command" : "find_all_playlists", "def" : false },
		{ "command" : "find_playlist_by_id", "def" : "playlist_id" },
		{ "command" : "find_playlists_by_ids", "def" : "playlist_ids" },
		{ "command" : "find_playlist_by_reference_id", "def" : "reference_id" },
		{ "command" : "find_playlists_by_reference_ids", "def" : "reference_ids" },
		{ "command" : "find_playlists_for_player_id", "def" : "player_id" },
		{ "command" : "search_videos", "def" : "all" }
	];

	/**
	 * Injects API calls into the head of a document
	 * @since 0.1
	 * @param string [pQuery] The query string for the API call to inject
	 * @return true
	 */
	this.inject = function (pQuery) {
		var pElement = document.createElement("script");
		this.request =  this.url + "?" + pQuery;
		pElement.setAttribute("src", this.request);
		pElement.setAttribute("type", "text/javascript");
		document.getElementsByTagName("head")[0].appendChild(pElement);
		
		return true;
	};

	/**
	 * Performs an API query.
	 * @since 1.0
	 * @param string [pCommand] A Brightcove API method
	 * @param mixed [pParams] Either an object containing the API parameters to apply to the given command, or a single value which is applied to the command's default selector
	 * @return true
	 */
	this.find = function (pCommand, pParams) {
		pCommand = pCommand.toLowerCase().replace(/(find_)|(_)|(get_)/g, "");
		pParams = pParams || null;
		var pDefault = null;
		var pQuery = "";

		for (var pCall in this.calls) {
			if (typeof this.calls[pCall].command == "undefined") {
				continue;
			}
			
			if (pCommand == this.calls[pCall].command.toLowerCase().replace(/(find_)|(_)|(get_)/g, "")) {
				pCommand = this.calls[pCall].command;
				
				if (typeof this.calls[pCall].def != "undefined") {
					pDefault = this.calls[pCall].def;
				}
				
				break;
			}
		}

		pQuery = "command=" + pCommand;

		if ((typeof pParams == "object") && pParams) {
			for (var pParam in pParams) {
  			if (pParam == "any" || pParam == "all" || pParam == "none") {
    			if (this.isArray(pParams[pParam])) {
      			for (var idx in pParams[pParam]) {
        			pQuery += "&" + pParam + "=" + encodeURIComponent(pParams[pParam][idx]);
      			} 
    			} else {
            pQuery += "&" + pParam + "=" + encodeURIComponent(pParams[pParam]);        			
          }
  			}
				if (pParam == "selector" && pParam !== "all") {    				
    					pQuery += "&" + pDefault + "=" + encodeURIComponent(pParams[pParam]);
    				} else {
    					pQuery += "&" + pParam + "=" + encodeURIComponent(pParams[pParam]);
    				}
			}

			if (typeof pParams.callback != "string") {
				pQuery += "&callback=" + this.callback;
			}

			if (typeof pParams.token != "string") {
				pQuery += "&token=" + this.token;
			}
		} else if (pParams) {
			pQuery += "&" + pDefault + "=" + encodeURIComponent(pParams) + "&callback=" + this.callback;
			pQuery += "&token=" + this.token;
		} else {
			pQuery += "&token=" + this.token;
			pQuery += "&callback=" + this.callback;
		}

		this.inject(pQuery);

		return true;
	};

	/**
	 * Performs an API search query
	 * @since 1.0
	 * @param mixed [pParams] Either an object containing the API parameters to apply to the given command, or a single value which is applied to the command's default selector
	 * @return true
	 */
	this.search = function (pParams) {
		return this.find("search_videos", pParams);
	};
	
	/**
	 * Determines if param member is an array
	 * @since 1.1
	 * @param mixed [o] The param member
	 * @return boolean
	 */
	 this.isArray = function(o) {
	   return Object.prototype.toString.call(o) === '[object Array]';
	 }

	/**
	 * Default callback which does nothing
	 * @since 0.1
	 * @param mixed [pData] The data returned from the API
	 * @return true
	 */
	this.flush = function (pData) {
		return true;
	};
}();