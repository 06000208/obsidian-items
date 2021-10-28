/* eslint-disable @typescript-eslint/no-unused-vars */
import { App, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, ItemView } from "obsidian";
import { MetadataPaneViewType, MetadataPaneView, ItemsPaneViewType, ItemsPaneView } from "./views";

const dev = process.env.BUILD !== "production";

interface ItemsPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: ItemsPluginSettings = {
    mySetting: "default",
};

export default class ItemsPlugin extends Plugin {
    settings: ItemsPluginSettings;

    async onload() {
        if (dev) console.log("loading Items plugin");

        // Settings
        await this.loadSettings();
        this.addSettingTab(new SettingsTab(this.app, this));

        // Views
        this.registerView(MetadataPaneViewType, (leaf: WorkspaceLeaf) => new MetadataPaneView(leaf));
        this.registerView(ItemsPaneViewType, (leaf: WorkspaceLeaf) => new ItemsPaneView(leaf));

        // Commands
        this.addCommand({
            id: "ie-toggle-metadata-pane",
            name: "Toggle Metadata Pane",
            callback: function() {
                this.openPane(MetadataPaneViewType, true, true);
            }.bind(this),
        });
        this.addCommand({
            id: "ie-toggle-items-pane",
            name: "Toggle Items Pane",
            callback: function() {
                this.openPane(ItemsPaneViewType, true, true);
            }.bind(this),
        });

        // Ribbons
        if (dev) {
            this.addRibbonIcon("dice", "Print leaf types", () => {
                this.app.workspace.iterateAllLeaves((leaf) => {
                    console.log(leaf.getViewState().type);
                });
            });
        }

        // Initialization
        if (this.app.workspace.layoutReady) {
            this.initWorkspace();
        } else {
            // The "layout-ready" event seems to have been removed in favor of onLayoutReady();
            this.app.workspace.onLayoutReady(this.initWorkspace.bind(this));
        }
    }

    async onunload() {
        if (dev) console.log("unloading Items plugin");
        await this.closePanes(MetadataPaneViewType);
        await this.closePanes(ItemsPaneViewType);
    }

    initWorkspace() {
        /** @TODO Make these tied to settings */
        this.openPane(MetadataPaneViewType);
        this.openPane(ItemsPaneViewType);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async closePanes(viewType: string): Promise<void> {
        const leaves = this.app.workspace.getLeavesOfType(viewType);
        for (const leaf of leaves) {
            if (leaf.view instanceof MetadataPaneView || leaf.view instanceof ItemsPaneView) {
                await leaf.view.onClose();
            }
        }
        this.app.workspace.detachLeavesOfType(viewType);
    }

    async openPane(viewType: string, reveal = false, toggle = false): Promise<void> {
        if (!this.app.workspace.getLeavesOfType(viewType).length) {
            await this.app.workspace.getRightLeaf(false).setViewState({
                type: viewType,
                active: true,
            });
        } else if (toggle) {
            this.closePanes(viewType);
        }
        if (reveal) this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(viewType)[0]);
    }
}

class SettingsTab extends PluginSettingTab {
    plugin: ItemsPlugin;

    constructor(app: App, plugin: ItemsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        // containerEl.createEl("h2", { text: "Settings" });

        new Setting(containerEl)
            .setName("Setting #1")
            .setDesc("It's a secret")
            .addText(text => text
                .setPlaceholder("Enter your secret")
                .setValue("")
                .onChange(async (value) => {
                    console.log("Secret: " + value);
                    this.plugin.settings.mySetting = value;
                    await this.plugin.saveSettings();
                }));
    }
}
