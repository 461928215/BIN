define(
	[],
function()
{
	var effecters = 
	{
		"nativeIO" :
		[
			// In
			function(curView, preView)
			{
				curView.show();
				//preView.hide();
			},
			// Out
			function(curView, preView)
			{
				preView.show();
				curView.hide();
				curView.remove();
			}
		],
		"nativeSSIO" :
		[
			// In
			function(curView, preView)
			{
				
			},
			// Out
			function(curView, preView)
			{
				preView.show();
				preView.animateSlideInLeft(function()
				{
					preView.show();
				});
				curView.animateSlideOutRight(function()
				{
					curView.hide();
					curView.remove();
				});
			}
		],
		"nativeSNIO" :
		[
			// In
			function(curView, preView)
			{
				
			},
			// Out
			function(curView, preView)
			{
				setTimeout(function()
				{
					preView.show();
					curView.hide();
					curView.remove();
				}, 500);
			}
		],
		"noIO" :
		[
			// In
			function(curView, preView)
			{
				curView.show();
				preView.hide();
			},
			// Out
			function(curView, preView)
			{
				preView.show();
				curView.hide();
				curView.remove();
			}
		],
		"fadeIO" :
		[
			// In
			function(curView, preView, aniEnd)
			{
				curView.show();
				curView.animateFadeIn(function()
				{
					preView.hide();
					curView.show();
					if(aniEnd)
					{
						aniEnd();
					}
				});
			},
			// Out
			function(curView, preView)
			{
				preView.show();
				curView.animateFadeOut(function()
				{
					curView.hide();
					curView.remove();
					preView.show();
				});
			}
		],
		"rightIO" :
		[
			// In
			function(curView, preView, aniEnd)
			{
				curView.show();
				curView.animateSlideInRight(function()
				{
					preView.hide();
					curView.show();

					if(aniEnd)
					{
						aniEnd();
					}
				});
			},
			// Out
			function(curView, preView)
			{
				preView.show();
				curView.animateSlideOutRight(function()
				{
					curView.hide();
					curView.remove();
					preView.show();
				});
			}
		],
		"leftIO" :
		[
			// In
			function(curView, preView, aniEnd)
			{
				curView.show();
				curView.animateSlideInLeft(function()
				{
					preView.hide();
					curView.show();

					if(aniEnd)
					{
						aniEnd();
					}
				});
			},
			// Out
			function(curView, preView)
			{
				preView.show();
				curView.animateSlideOutLeft(function()
				{
					curView.hide();
					curView.remove();
					preView.show();
				});
			}
		],
		"rightILeftO" :
		[
			// In
			function(curView, preView, aniEnd)
			{
				preView.animateSlideOutLeft(function()
				{
					preView.hide();
				});
				curView.show();
				curView.animateSlideInRight(function()
				{
					curView.show();

					if(aniEnd)
					{
						aniEnd();
					}
				});
			},
			// Out
			function(curView, preView)
			{
				preView.show();
				preView.animateSlideInLeft(function()
				{
					preView.show();
				});
				curView.animateSlideOutRight(function()
				{
					curView.hide();
					curView.remove();
				});
			}
		]
	}


	return effecters;
});