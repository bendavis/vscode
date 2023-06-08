/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import * as crypto from 'crypto';

export function activate(context: vscode.ExtensionContext) {
	// Define an array to store the authentication sessions
	const sessions: vscode.AuthenticationSession[] = [];

	// Define the provider
	const provider: vscode.AuthenticationProvider = {
		onDidChangeSessions: new vscode.EventEmitter<vscode.AuthenticationProviderAuthenticationSessionsChangeEvent>().event,
		getSessions: () => {
			// Return a copy of the sessions array
			return Promise.resolve([...sessions]);
		},
		createSession: async () => {
			// Generate a random MD5 hash as the session ID
			const sessionId = crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex');

			// Create the authentication session with the generated ID
			const session: vscode.AuthenticationSession = {
				accessToken: 'placeholder',
				id: sessionId,
				account: {
					id: 'hacker',
					label: 'label'
				},
				scopes: [
					'user:email'
				]
			};

			// Add the session to the sessions array
			sessions.push(session);

			return Promise.resolve(session);
		},
		removeSession: async (sessionId: string) => {
			// Find the index of the session with the given sessionId
			const sessionIndex = sessions.findIndex(session => session.id === sessionId);

			// If a matching session is found, remove it from the sessions array
			if (sessionIndex !== -1) {
				sessions.splice(sessionIndex, 1);
			}
		}
	};

	// Register the authentication provider
	const disposable = vscode.authentication.registerAuthenticationProvider('hacked-auth', 'hacked authenticator', provider, { supportsMultipleAccounts: false });

	context.subscriptions.push(disposable);
}

export function deactivate() { }
