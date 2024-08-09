"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.griddoPrimitiveCompletion = void 0;
const vscode = require("vscode");
function griddoPrimitiveCompletion(lineText) {
    // Read theme.map file
    // Obtén el path del workspace
    const workspaceFolders = vscode.workspace.workspaceFolders;
    let allPrimitives;
    if (workspaceFolders) {
        const workspacePath = workspaceFolders[0].uri.fsPath;
        allPrimitives = require(workspacePath + "/src/themes/.theme-map.js");
    }
    else {
        console.log("No se encontró ningún workspace abierto.");
    }
    const allPrimsCategorized = categorizePrimitives(allPrimitives);
    // ---------------
    // background
    // ---------------
    if (lineText.includes("background-color:")) {
        return getCompletionItem(allPrimsCategorized.bg);
    }
    // ---------------
    // borders
    // ---------------
    // color
    if (lineText.includes("border:")) {
        return getCompletionItem(allPrimsCategorized.borderColor);
    }
    // width
    if (lineText.includes("border-width:")) {
        return getCompletionItem(allPrimsCategorized.borderWidth);
    }
    // ---------------
    // text color
    // ---------------
    if (lineText.includes("color:")) {
        return getCompletionItem(allPrimsCategorized.color);
    }
    // ---------------
    // font family
    // ---------------
    if (lineText.includes("font-family:")) {
        return getCompletionItem(allPrimsCategorized.fontFamily);
    }
    // ---------------
    // opacity
    // ---------------
    if (lineText.includes("opacity:")) {
        return getCompletionItem(allPrimsCategorized.opacity);
    }
    // ---------------
    // radius
    // ---------------
    if (lineText.match(/border-.*radius/)) {
        return getCompletionItem(allPrimsCategorized.radius);
    }
    // ---------------
    // spacing
    // ---------------
    if (lineText.includes("margin") ||
        lineText.includes("padding") ||
        lineText.includes("top:") ||
        lineText.includes("right:") ||
        lineText.includes("bottom:") ||
        lineText.includes("left:")) {
        return getCompletionItem(allPrimsCategorized.spacing);
    }
    return [];
}
exports.griddoPrimitiveCompletion = griddoPrimitiveCompletion;
function getCompletionItem(primitives) {
    return (primitives.map((primitive) => {
        const item = new vscode.CompletionItem({
            label: primitive.cssVar,
            //  description: ` ${primitive.value}`
        }, vscode.CompletionItemKind.Variable);
        // item.documentation = primitive?.description;
        return item;
    }) || []);
}
function categorizePrimitives(allPrims) {
    const categories = {
        bg: [{ cssVar: "" }],
        borderColor: [{ cssVar: "" }],
        borderWidth: [{ cssVar: "" }],
        color: [{ cssVar: "" }],
        fontFamily: [{ cssVar: "" }],
        opacity: [{ cssVar: "" }],
        radius: [{ cssVar: "" }],
        size: [{ cssVar: "" }],
        spacing: [{ cssVar: "" }],
    };
    const mapCSSVarToSTring = (primitiveGroup) => {
        return primitiveGroup.values.map((value) => ({
            cssVar: value,
        }));
    };
    allPrims.forEach((primitiveGroup) => {
        const mappedCats = mapCSSVarToSTring(primitiveGroup);
        // -------------
        // background
        // -------------
        if (primitiveGroup.id === "bg") {
            categories.bg.push(...mappedCats);
        }
        // -------------
        // borders
        // -------------
        // color
        if (primitiveGroup.id === "border" ||
            primitiveGroup.id === "borderButton") {
            categories.borderColor.push(...mappedCats);
        }
        // width
        if (primitiveGroup.id === "borderWidth") {
            categories.borderWidth.push(...mappedCats);
        }
        // -------------
        // text color
        // -------------
        if (primitiveGroup.id === "text") {
            categories.color.push(...mappedCats);
        }
        // -------------
        // font family
        // -------------
        if (primitiveGroup.id === "fontFamily") {
            categories.fontFamily.push(...mappedCats);
        }
        // -------------
        // opacity
        // -------------
        if (primitiveGroup.id === "opacity") {
            categories.opacity.push(...mappedCats);
        }
        // -------------
        // radius
        // -------------
        if (primitiveGroup.id === "radii") {
            categories.radius.push(...mappedCats);
        }
        // -------------
        // spacing
        // -------------
        if (primitiveGroup.id === "spacing") {
            categories.spacing.push(...mappedCats);
        }
    });
    return categories;
}
//# sourceMappingURL=index.js.map