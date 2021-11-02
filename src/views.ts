import { ItemView, WorkspaceLeaf } from "obsidian";
import { createButton } from "./gui";
import { dev } from "./constants";
import "./views.css";

// Can't define these inside the constructor, because when getViewType is used by obsidian, the constructor somehow hasn't ran yet
// https://discord.com/channels/686053708261228577/840286264964022302/899785798738640916
export const MetadataPaneViewType = "ie-metadata-pane";
export const MetadataPaneDisplayName = "Edit Metadata";
export const MetadataPaneIcon = "bullet-list";
export const ItemsPaneViewType = "ie-items-pane";
export const ItemsPaneDisplayName = "Items";
export const ItemsPaneIcon = "documents";

/**
 * Edit/add metadata to the currently focused file
 */
export class MetadataPaneView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    /** The view type string used by obsidian */
    getViewType(): string { return MetadataPaneViewType; }

    /** Human readable text displayed to the user by obsidian */
    getDisplayText(): string { return MetadataPaneDisplayName; }

    /** The icon obsidian uses for the view */
    getIcon(): string { return MetadataPaneIcon; }

    async onOpen() {
        const content = this.containerEl.children[1]; // this.containerEl.querySelector(".view-content");
        content.empty();
        const header = content.createDiv({ cls: "nav-header" });
        const buttons = header.createDiv({ cls: "nav-buttons-container" });
        createButton(buttons, MetadataPaneViewType, "Field Sort Order", "up-and-down-arrows", function(ev, element, viewType) {
            //
        });
        const container = content.createDiv({ cls: "nav-ie-container" });
        const title = container.createDiv({ cls: "nav-ie-title" });
        title.createSpan({ text: MetadataPaneDisplayName });
        if (dev) console.log("Pane opened", this.containerEl);
    }

    async onClose() {
        // Nothing to clean up
    }
}

/**
 * Display/index items in the vault
 * - This custom pane could be able to open found items in a custom view by default in a way that the file explorer can't
 * - How this works is of great importance to obsidian items, because its part of the plugins identity
 *   - Similarly to the file explorer, but for items in a manually controlled fashion? (ie. notion like)
 *   - Built in categories that open views? (ie. google keep like)
 *   - A tree view of every item, displaying every item, and nesting every connected item? Could be a toggable mode
 * - On one hand, I don't want it to work like folders where there's only 1 instance of an item and it can't be r
 * - Relationships between items is two-way, like in the graph view, so I'd like it to be able to show nested items allowing duplication (ie. notes on r/obsidianmd, reddit, and obsidian, the first is related to both of the latter)
 * - Some of these ideas will have to be implemented in a different pane bc they fundamentally conflict w/ each other
 */
export class ItemsPaneView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    /** The view type string used by obsidian */
    getViewType(): string { return ItemsPaneViewType; }

    /** Human readable text displayed to the user by obsidian */
    getDisplayText(): string { return ItemsPaneDisplayName; }

    /** The icon obsidian uses for the view */
    getIcon(): string { return ItemsPaneIcon; }

    async onOpen() {
        const content = this.containerEl.children[1]; // this.containerEl.querySelector(".view-content");
        content.empty();
        const header = content.createDiv({ cls: "nav-header" });
        const buttons = header.createDiv({ cls: "nav-buttons-container" });
        createButton(buttons, ItemsPaneViewType, "Settings", "gear", function(ev, element, viewType) {
            //
        });
        const container = content.createDiv({ cls: "nav-ie-container" });
        const title = container.createDiv({ cls: "nav-ie-title" });
        title.createSpan({ text: ItemsPaneDisplayName });
        if (dev) console.log("Pane opened", this.containerEl);
    }

    async onClose() {
        // Nothing to clean up
    }
}

/** @todo Theorize about other panes that display or interact with items */
