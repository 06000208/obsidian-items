/* eslint-disable @typescript-eslint/no-unused-vars */
import { App, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, ItemView } from "obsidian";
import { MetadataPaneView, ItemsPaneView } from "./panes";
import "./views.css";

interface ItemsPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: ItemsPluginSettings = {
    mySetting: "default",
};

export default class ItemsPlugin extends Plugin {
    settings: ItemsPluginSettings;
    metadataPane: MetadataPaneView;
    itemsPane: ItemsPaneView;

    async onload() {
        console.log("loading Items plugin");

        // Settings
        await this.loadSettings();
        this.addSettingTab(new SettingsTab(this.app, this));

        // Views
        // Won't be instantiated until setViewState() is used
        this.metadataPane = null;
        this.itemsPane = null;
        this.registerView(MetadataPaneView.viewTypeId, (leaf: WorkspaceLeaf) => (this.metadataPane = new MetadataPaneView(leaf)));
        this.registerView(ItemsPaneView.viewTypeId, (leaf: WorkspaceLeaf) => (this.itemsPane = new ItemsPaneView(leaf)));

        this.addCommand({
            id: "toggle-metadata-pane",
            name: "Toggle Metadata Pane",
            callback: function() {
                this.openPane(MetadataPaneView.viewTypeId, true, true);
            }.bind(this),
        });

        this.addCommand({
            id: "toggle-items-pane",
            name: "Toggle Items Pane",
            callback: function() {
                this.openPane(ItemsPaneView.viewTypeId, true, true);
            }.bind(this),
        });

        if (this.app.workspace.layoutReady) {
            this.initWorkspace();
        } else {
            // The "layout-ready" event seems to have been removed in favor of onLayoutReady();
            this.app.workspace.onLayoutReady(this.initWorkspace.bind(this));
        }
    }

    async onunload() {
        console.log("unloading Items plugin");
        await this.closePanes(MetadataPaneView.viewTypeId, this.metadataPane);
        await this.closePanes(ItemsPaneView.viewTypeId, this.itemsPane);
    }

    initWorkspace() {
        /** @TODO Make these tied to settings */
        this.openPane(MetadataPaneView.viewTypeId);
        this.openPane(ItemsPaneView.viewTypeId);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async closePanes(viewType: string, view: MetadataPaneView | ItemsPaneView = null): Promise<void> {
        // Views aren't instantiated until setViewState() is used
        if (view) await view.onClose();
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
