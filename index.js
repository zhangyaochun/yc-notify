'use strict';

var os = require('os');
var path = require('path');
var spawn = require('child_process').spawn;

var cmd = path.resolve(__dirname + '/asset/Notifier.app/Contents/MacOS/Notifier');

function supportCheck() {
	return os.type() === 'Darwin' && parseFloat(os.release()) >= 12;
}


function isString(source) {
	return Object.prototype.toString.call(source) === '[object String]';
}

exports.notify = function(opts) {
	if (supportCheck()) {
		if (isString(opts)) {
			opts = {
				message: opts
			}
		} else {
			 opts.title = opts.title ? opts.title : process.title;
		}

		var args = [];
		Object.keys(opts).forEach(function(key){
			args = args.concat(['-' + key,opts[key]]);
		});

		spawn(cmd, args);
	}
}