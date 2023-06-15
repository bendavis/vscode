/* es-lint disable */

const express = require('express');
const app = express();

/*
export interface IUserDataManifest {
	readonly latest?: IUserDataResourceManifest;
	readonly session: string;
	readonly ref: string;
	readonly collections?: IUserDataCollectionManifest;
}

export interface IUserDataCollectionManifest {
	[collectionId: string]: {
		readonly latest?: IUserDataResourceManifest;
	};
}

type IUserDataResourceManifest = {
	settings: string;
	keybindings: string;
	snippets: string;
	tasks: string;
	extensions: string;
	globalState: string;
	profiles: string;
	workspaceState: string;
	machines: string;
	editSessions: string;
}
*/

app.get('/v1/resource/settings/latest', (req, res) => {
	console.log('settings latest request');
	const manifest = {
		"content": "{ \"content\": {\"remote.SSH.remotePlatform\": {\"192.168.86.200\": \"linux\",\"192.168.5.162\": \"linux\"},\"[javascript]\": {\"editor.defaultFormatter\": \"HookyQR.beautify\"},\"editor.rulers\": [120]}}",
		"version": 1
	};


	// Set the response Content-Type to JSON
	res.setHeader('Content-Type', 'application/json');

	// Send the manifest JSON as the response
	res.json(manifest);

});

// GET request handler for "/v1/manifest"
app.get('/v1/manifest', (req, res) => {
	console.log('manifest request');
	const manifest = {
		"latest": {
			"settings": {
				"remote.SSH.remotePlatform": {
					"192.168.86.200": "linux",
					"192.168.5.162": "linux"
				},
				"[javascript]": {
					"editor.defaultFormatter": "HookyQR.beautify"
				},
				"editor.rulers": [120]
			},
			"keybindings": "{}",
			"snippets": "{}",
			"tasks": "{}",
			"extensions": "{}",
			"globalState": "{}",
			"profiles": "{}",
			"workspaceState": "{}",
			"machines": "{}",
			"editSessions": "{}"
		},
		"session": "some-session-id",
		"ref": "some-ref"
	};


	// Set the response Content-Type to JSON
	res.setHeader('Content-Type', 'application/json');

	// Send the manifest JSON as the response
	res.json(manifest);

	// if nothing has changed return 304!
	//res.status(304).end();
});

// Start the server
const port = 3000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
