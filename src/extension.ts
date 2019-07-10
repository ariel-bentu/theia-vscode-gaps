import * as vscode from 'vscode';
import {BugsTree, Bug} from './BugsTree'
import { cmdSettingsView } from './settings';

export function activate(context: vscode.ExtensionContext) {
	//registration of the TreeView
	let bugsTree = new BugsTree(context);
	vscode.window.createTreeView<Bug>('BugsTree',
		{treeDataProvider:bugsTree});

	console.log('Congratulations, your extension "bugs" is now active!');

	let disposable = vscode.commands.registerCommand('bug1', (bug: Bug) => {
		vscode.window.showInformationMessage('This is bugs1 command!' + bug.label);
	});
	context.subscriptions.push(disposable);

	context.subscriptions.push(vscode.commands.registerCommand('settings.view', cmdSettingsView))

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(configUpdated));




	disposable = vscode.commands.registerCommand('picker.many', (bug: Bug) => {
		vscode.window.showInformationMessage('This is picker.many command!' + bug.label);

		vscode.window.showQuickPick(['abc','xyz'], {canPickMany:true}).then(res => {
			vscode.window.showInformationMessage(JSON.stringify(res));
		});
	});
	context.subscriptions.push(disposable);
}

function configUpdated() {
	vscode.window.showInformationMessage("Config updated");
}



export function deactivate() {}
