/* eslint-disable @typescript-eslint/no-unused-vars */
import { App, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";
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
        await this.loadSettings();

        this.registerView(MetadataPaneView.viewTypeId, (leaf) => (
            this.metadataPane = new MetadataPaneView(leaf)
        ));

        this.registerView(ItemsPaneView.viewTypeId, (leaf) => (
            this.metadataPane = new ItemsPaneView(leaf)
        ));

        this.addSettingTab(new SettingsTab(this.app, this));
    }

    async onunload() {
        console.log("unloading Items plugin");

        // Clean up metadata pane
        await this.metadataPane.onClose();
        this.app.workspace.getLeavesOfType(MetadataPaneView.viewTypeId).forEach((leaf) => leaf.detach());

        // Clean up items pane
        await this.itemsPane.onClose();
        this.app.workspace.getLeavesOfType(ItemsPaneView.viewTypeId).forEach((leaf) => leaf.detach());
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
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

        containerEl.createEl("h2", { text: "Settings? Yeah" });

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
