import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import {bootstrap} from 'aurelia-bootstrapper-webpack';

bootstrap(async aurelia => {
	LogManager.addAppender(new ConsoleAppender());
	LogManager.setLevel(LogManager.logLevel.debug);

	aurelia.use
		.standardConfiguration();

	await aurelia.start();
	aurelia.setRoot('app', document.getElementById('mainapp'));
});

