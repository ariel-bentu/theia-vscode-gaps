import * as vscode from 'vscode';
import {BugsTree, Bug} from './BugsTree'

export function activate(context: vscode.ExtensionContext) {
	//registration of the TreeView
	let bugsTree = new BugsTree(context);
	vscode.window.registerTreeDataProvider('BugsTree', bugsTree);

	console.log('Congratulations, your extension "bugs" is now active!');

	let disposable = vscode.commands.registerCommand('bug1', (bug: Bug) => {
		vscode.window.showInformationMessage('This is bugs1 command!' + bug.label);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('bug2', (bug: Bug) => {
		vscode.window.showInformationMessage('This is bugs2 command!' + bug.label);
	});
	context.subscriptions.push(disposable);
	disposable = vscode.commands.registerCommand('bug.Start', () => {
		vscode.window.showInformationMessage('Activated');
	});
	context.subscriptions.push(disposable);

	// Laucnh configuration API - does not work:
	disposable = vscode.commands.registerCommand('lunch.config.get', () => {
		let conf = findLaunchConfiguration_VSCODE("Test1")
		if (conf) {
			vscode.window.showInformationMessage('Launch configuration Test1 has been found :-)');
		} else {
			vscode.window.showInformationMessage('Launch configuration Test1 has NOT been found :-(');
		}
	});
	context.subscriptions.push(disposable);


	disposable = vscode.commands.registerCommand('lunch.config.create', () => {
		let conf = {
			"type": "node",
			"request": "launch",
			"name": "Test2",
			"program": "${workspaceFolder}/app.js"
		};

		saveLaunchConfiguration_VSCODE(conf);

		let findConf = findLaunchConfiguration_VSCODE("Test2")
		if (findConf) {
			vscode.window.showInformationMessage('Launch configuration Test2 has been created :-)');
		} else {
			vscode.window.showInformationMessage('Launch configuration Test2 failed to create :-(');
		}
	});
	context.subscriptions.push(disposable);

}


function findLaunchConfiguration_VSCODE(name: string) : any {
	const launchConfig = vscode.workspace.getConfiguration('launch');
	let configurations = launchConfig['configurations'];
	if (configurations) {
		for (var conf of configurations) {
			if (conf.name == name) {
				return conf;
			}
		}
	}
	return undefined;
}


function saveLaunchConfiguration_VSCODE(configuration : any) : boolean {
	const launchConfig = vscode.workspace.getConfiguration('launch');
	let configurations = launchConfig['configurations'];
	if (!configurations) {
		configurations = [];
	}

	configurations.push(configuration);
	launchConfig.update('configurations', configurations, false);
	return true;
}





export function deactivate() {}
