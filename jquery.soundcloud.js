(function($)
{
	$.fn.soundcloud = function(options)
	{
		// Default settings
		var defaults = {
			client_id:      false,
			url:            false,
			callback:       false,
			maxwidth:       '100%',
			maxheight:      false,
			color:          false,
			auto_play:      false,
			show_comments:  true,
			iframe:         false
		};

		// Overrides the defaults with passed in options
		options = $.extend(defaults, options);

		var protocol = document.location.protocol == 'https:' ? 'https://' : 'http://';

		if (typeof SC === 'undefined')
		{
			// Adds the SoundCloud SDK
			var script    = document.createElement('script');
			script.src    = protocol + 'connect.soundcloud.com/sdk.js';
			$('body').append(script);
		}

		return this.each(function()
		{
			try
			{
				// Overrides the options with the data attributes
				options = $.extend(options, $(this).data());

				// Checks that we have a client ID
				if (!options.client_id)
				{
					throw 'Missing client ID.';
				}

				//	SC.initialize({ client_id: options.client_id });
				//	var track_url = protocol + options.url;
				//	SC.oEmbed(track_url, { auto_play: true, maxheight: 166 }, function(oEmbed)
				//	{
				//	   //'$(".soundcloud").eq(' + index + ').replaceWith(oEmbed.html.replace("https:", "http:"));',
				//	   console.log(oEmbed);
				//	});
			}
			catch (error)
			{
				console.log('[jQuery.SoundCloud] [error] ' + error);
			}
		});
	}
})(jQuery);
