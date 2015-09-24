define(["bin/util/osUtil"], function(osUtil)
{
	var hierarchyDone = false;

	var load = null;

	var genLoadTask = function(name, config, cb)
	{
		return function()
		{
			if(typeof(config) === "string")
			{
				require([config], function(ret){cb(name, ret)});
			}
			else
			{
				load(config, function(ret){cb(name, ret)});
			}
		}
	}

	load = function(config, cb)
	{
		var ret  = {};
		var path = config._path;
		
		var c = 0;
		var t = [];
		if(path)
		{
			++c;
			t.push(genLoadTask(null, path, function(name, value)
			{
				--c;

				_.extend(value, ret);
				ret = value;

				if(c === 0)
				{
					cb(ret);
				}
			}));

			delete config._path;
		}

		for(var key in config)
		{
			++c;

			t.push(genLoadTask(key, config[key], function(name, value)
			{
				--c;

				ret[name] = value;

				if(c === 0)
				{
					cb(ret);
				}
			}));
		}

		if(path)
		{
			config._path = path;
		}

		if(c === 0)
		{
			cb();
		}
		else
		{
			for(var i=0,i_sz=t.length; i<i_sz; ++i)
			{
				t[i]();
			}
		}
	}

	

	var Class = {};

	Class._cbs = [];

	Class.load = function(cb)
	{
		var self = this;

		Backbone.on("HIERARCHY_DONE", function()
		{
			Backbone.off("HIERARCHY_DONE");
			
			hierarchyDone = true;
			var cbs = self._cbs;
			self._cbs = [];

			osUtil.nextTick(function()
			{
				for(var i=0,i_sz=cbs.length; i<i_sz; ++i)
				{
					cbs[i]();
				}
			});
		});

		if(cb)
		{
			this._cbs.push(cb);
		}

		load(bin.classConfig, function(ret)
		{
			_.extend(bin, ret);

			Backbone.trigger("HIERARCHY_DONE");
		});
	}

	Class.onLoad = function(cb)
	{
		if(hierarchyDone)
		{
			osUtil.nextTick(cb);
		}
		else
		{
			this._cbs.push(cb);
		}
	}

	return Class;
});