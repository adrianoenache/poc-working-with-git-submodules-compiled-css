(function() {

	var spawn = require('child_process').spawn;
	var regExp = /\$\{?([\w_]+)\}?/;

	var cmd = process.argv.slice(2).map(function(val) {
		var envVal = (val.match(regExp) || [])[1];
		if (envVal) {
			return val.replace(regExp, process.env[envVal]);
		}
		return val;
	});

	if (/^win/.test(process.platform) && !process.env.SHELL) {
		cmd = spawn('cmd', ['/s', '/c'].concat(cmd));
	} else {
		cmd = spawn(cmd.shift(), cmd);
	}

	cmd.stdout.on('data', function(data) {
		console.log('[stdout] ' + data);
	});

	cmd.stderr.on('data', function(data) {
		console.log('[stderr] ' + data);
	});

	cmd.on('close', function(code) {
		process.exit(code);
	});
}());
