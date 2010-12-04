/**
 * BC JAVASCRIPT MAPI WRAPPER 1.0 (30 NOVEMBER 2010)
 * A Brightcove JavaScript Media API Wrapper
 * (Formerly known as Kudos)
 *
 * REFERENCES:
 *	 Website: http://opensource.brightcove.com
 *	 Source: http://github.com/brightcoveos/
 *
 * AUTHORS:
 *	 Brian Franklin, Professional Services Engineer, Brightcove
 *	 Matthew Congrove, Professional Services Engineer, Brightcove
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE. YOU AGREE TO RETAIN IN THE SOFTWARE AND ANY
 * MODIFICATIONS TO THE SOFTWARE THE REFERENCE URL INFORMATION, AUTHOR ATTRIBUTION AND
 * CONTRIBUTOR ATTRIBUTION PROVIDED HEREIN.
 */

var BCMAPI = new function () {
	this.token = "";
	this.callback = "BCMAPI.flush";
	this.url = "http://api.brightcove.com/services/library";
	this.calls = [
		{ "command" : "find_all_videos", "default" : false },
		{ "command" : "find_video_by_id", "default" : "video_id" },
		{ "command" : "find_video_by_id_unfiltered", "default" : "video_id" },
		{ "command" : "find_videos_by_ids", "default" : "video_ids" },
		{ "command" : "find_videos_by_ids_unfiltered", "default" : "video_ids" },
		{ "command" : "find_video_by_reference_id", "default" : "reference_id" },
		{ "command" : "find_video_by_reference_id_unfiltered", "default" : "reference_id" },
		{ "command" : "find_video_by_reference_ids", "default" : "reference_ids" },
		{ "command" : "find_video_by_reference_ids_unfiltered", "default" : "reference_ids" },
		{ "command" : "find_videos_by_campaign_id", "default" : "campaign_id" },
		{ "command" : "find_videos_by_tags", "default" : "or_tags" },
		{ "command" : "find_videos_by_text", "default" : "text" },
		{ "command" : "find_videos_by_user_id", "default" : "user_id" },
		{ "command" : "find_modified_videos", "default" : "from_date" },
		{ "command" : "find_related_videos", "default" : "video_id" },
		{ "command" : "find_all_playlists", "default" : false },
		{ "command" : "find_playlist_by_id", "default" : "playlist_id" },
		{ "command" : "find_playlists_by_ids", "default" : "playlist_ids" },
		{ "command" : "find_playlist_by_reference_id", "default" : "reference_id" },
		{ "command" : "find_playlists_by_reference_ids", "default" : "reference_ids" },
		{ "command" : "find_playlists_for_player_id", "default" : "player_id" },
		{ "command" : "search_videos", "default" : "all" }
	];

	/**
	 * Injects API calls into the head of a document
	 * @since 0.1
	 * @param string [pQuery] The query string for the API call to inject
	 * @return true
	 */
	this.inject = function (pQuery) {
		var pElement = document.createElement("script");
		pElement.setAttribute("src", this.url + "?" + pQuery);
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
				
				if (typeof this.calls[pCall].pDefault != "undefined") {
					pDefault = this.calls[pCall].pDefault;
				}
				
				break;
			}
		}

		pQuery = "command=" + pCommand;

		if ((typeof pParams == "object") && pParams) {
			for (var pParam in pParams) {
				if (pParam == "selector") {
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
	 * Default callback which does nothing
	 * @since 0.1
	 * @param mixed [pData] The data returned from the API
	 * @return true
	 */
	this.flush = function (pData) {
		return true;
	};
}();