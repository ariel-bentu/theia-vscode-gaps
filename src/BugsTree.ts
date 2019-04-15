import * as vscode from 'vscode';
let path = require('path');

export class BugsTree implements vscode.TreeDataProvider<Bug> {

	//private _onDidChangeTreeData: vscode.EventEmitter<Bug | undefined> = new vscode.EventEmitter<Bug | undefined>();
	//readonly onDidChangeTreeData: vscode.Event<Bug | undefined> = this._onDidChangeTreeData.event;
    private _bugItems : Bug[];

	constructor(context : vscode.ExtensionContext) {
		this._bugItems = [
            new Bug("Bug1"),
            new Bug("Bug2")
        ];
		
	}

	getTreeItem(element: Bug): vscode.TreeItem {
		return element;
	}

	getChildren(module?: Bug): Thenable<Bug[]> {
        return Promise.resolve(this._bugItems);
	}


}

export class Bug extends vscode.TreeItem {


	constructor(public readonly label: string) {
		super(label);
    }

	get tooltip(): string {
		return `${this.label}`;
	}

	get description(): string {
		return this.label;
	}

	iconPath = {
	 	light: path.join(__filename, '..', '..', 'resources', 'light', 'bugs.svg'),
	 	dark: path.join(__filename, '..', '..', 'resources', 'dark', 'bugs.svg')
	};

}

