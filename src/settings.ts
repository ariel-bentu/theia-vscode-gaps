import { workspace, window } from "vscode";

export const EXT_NAME = process.env.EXT_NAME || 'Bugs';

export function cmdSettingsView() {
    let conf = workspace.getConfiguration(EXT_NAME.toLowerCase());
    if (conf) {
        window.showInformationMessage("Settings: " + JSON.stringify(conf));
    } else {
        window.showErrorMessage("Settings: " + EXT_NAME.toLowerCase() + "not found");
    }
}