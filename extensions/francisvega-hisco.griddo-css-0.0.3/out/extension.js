"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const utils_1 = require("./utils");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("griddo-theme.griddocss", () => {
        const provider = {
            provideCompletionItems(document, position) {
                const lineText = document.lineAt(position).text;
                return (0, utils_1.griddoPrimitiveCompletion)(lineText);
            },
        };
        vscode.languages.registerCompletionItemProvider([{ language: "css" }, { language: "postcss" }, { language: "scss" }], provider, "--");
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map