(function($)
{
	$.fn.soundcloud = function(options)
	{
		// Default settings
		var defaults = {
			auto_play:      false,
			//callback:       false,
			client_id:      false,
			color:          false,
			iframe:         true,
			maxheight:      false,
			maxwidth:       false,
			show_comments:  true,
			url:            false
		};

		// Overrides the defaults with passed in options
		options = $.extend({}, defaults, options);

		var elements = this;
		var protocol = document.location.protocol == 'https:' ? 'https://' : 'http://';

		if (typeof SC === 'undefined')
		{
			$.getScript(
				protocol + 'connect.soundcloud.com/sdk.js',
				function()
				{
					elements.each(function(index, element)
					{
						try
						{
							// Overrides the options with the data attributes
							parameters = $.extend({}, options, $(this).data());

							// Checks that we have a client ID
							if (!parameters.client_id)
							{
								throw 'Missing client ID.';
							}

							SC.initialize({ client_id: parameters.client_id });

							// Request the embed HTML
							SC.oEmbed(
								parameters.url,
								parameters,
								function(oEmbed)
								{
									$(element).replaceWith(oEmbed.html.replace("https://", protocol));
								}
							);
						}
						catch (error)
						{
							console.log('[jQuery.SoundCloud] [error] ' + error);
						}
					});
				}
			);
		}

		return this;
	}
})(jQuery);
