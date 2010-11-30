/**
 * BC JAVASCRIPT MAPI WRAPPER 1.0 (12 OCTOBER 2010)
 * A Brightcove JavaScript Media API Wrapper
 * (Formerly known as Kudos)
 *
 * REFERENCES:
 *	 Website: http://opensource.brightcove.com
 *	 Source: http://github.com/brightcoveosi/
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
		{ "s" : "find_all_videos", "o" : false },
		{ "s" : "find_video_by_id", "o" : "video_id" },
		{ "s" : "find_video_by_id_unfiltered", "o" : "video_id" },
		{ "s" : "find_videos_by_ids", "o" : "video_ids" },
		{ "s" : "find_videos_by_ids_unfiltered", "o" : "video_ids" },
		{ "s" : "find_video_by_reference_id", "o" : "reference_id" },
		{ "s" : "find_video_by_reference_id_unfiltered", "o" : "reference_id" },
		{ "s" : "find_video_by_reference_ids", "o" : "reference_ids" },
		{ "s" : "find_video_by_reference_ids_unfiltered", "o" : "reference_ids" },
		{ "s" : "find_videos_by_campaign_id", "o" : "campaign_id" },
		{ "s" : "find_videos_by_tags", "o" : "or_tags" },
		{ "s" : "find_videos_by_text", "o" : "text" },
		{ "s" : "find_videos_by_user_id", "o" : "user_id" },
		{ "s" : "find_modified_videos", "o" : "from_date" },
		{ "s" : "find_related_videos", "o" : "video_id" },
		{ "s" : "find_all_playlists", "o" : false },
		{ "s" : "find_playlist_by_id", "o" : "playlist_id" },
		{ "s" : "find_playlists_by_ids", "o" : "playlist_ids" },
		{ "s" : "find_playlist_by_reference_id", "o" : "reference_id" },
		{ "s" : "find_playlists_by_reference_ids", "o" : "reference_ids" },
		{ "s" : "find_playlists_for_player_id", "o" : "player_id" },
		{ "s" : "search_videos", "o" : "all" }
	];

	/**
	 * Create a script element and include the API result
	 * @since 0.1
	 * @param string [s] A query string with no leading question mark
	 * @return true
	 */
	this.inject = function (s) {
		var e = document.createElement("script");
		e.setAttribute("src", this.url + "?" + s);
		e.setAttribute("type", "text/javascript");
		document.getElementsByTagName("head")[0].appendChild(e);
		return true;
	};

	/**
	 * Construct the API call
	 * @since 1.0
	 * @param string [s] A Brightcove API method
	 * @param mixed [v] Either an object containing the API parameters to apply to the given command, or a single value which is applied to the command's default selector
	 * @return true
	 */
	this.find = function (s, v) {
		v = v || null;
		var o = null;
		var q = "";
		s = s.toLowerCase().replace(/(find_)|(_)|(get_)/g, "");

		for (var z in this.calls) {
			if (typeof this.calls[z].s == "undefined") { continue; }
			if (s == this.calls[z].s.toLowerCase().replace(/(find_)|(_)|(get_)/g, "")) {
				s = this.calls[z].s;
				if (typeof this.calls[z].o != "undefined") {
					o = this.calls[z].o;
				}
				break;
			}
		}

		q = "command=" + s;

		if ((typeof v == "object") && v) {
			for (var x in v) {
				if (x == "selector") {
					q += "&" + o + "=" + encodeURIComponent(v[x]);
				} else {
					q += "&" + x + "=" + encodeURIComponent(v[x]);
				}
			}

			if (typeof v.callback != "string") {

				q += "&callback=" + this.callback;
			}

			if (typeof v.token != "string") {
				q += "&token=" + this.token;
			}
		} else if (v) {
			q += "&" + o + "=" + encodeURIComponent(v) + "&callback=" + this.callback;
			q += "&token=" + this.token;
		} else {
			q += "&token=" + this.token;
			q += "&callback=" + this.callback;
		}

		this.inject(q);

		return true;
	};

	/**
	 * Dummy method for search calls
	 * @since 1.0
	 * @param string [s] A Brightcove API method
	 * @param mixed [v] Either an object containing the API parameters to apply to the given command, or a single value which is applied to the command's default selector
	 * @return true
	 */
	this.search = function (v) {
		return this.find("search_videos", v);
	};

	/**
	 * Default callback which does nothing
	 * @since 0.1
	 * @return true
	 */
	this.flush = function (s) {
		return true;
	};
}();