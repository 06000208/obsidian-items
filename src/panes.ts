import { ItemView, WorkspaceLeaf } from "obsidian";
import "./metadata.css";

export class MetadataPaneView extends ItemView {
    viewTypeId: string;
    displayName: string;

    static viewTypeId = "metadata-pane";
    static displayName = "Edit Metadata";

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
        this.viewTypeId = MetadataPaneView.viewTypeId;
        this.displayName = MetadataPaneView.displayName;
    }

    getViewType() {
        return this.viewTypeId;
    }

    getDisplayText() {
        return this.displayName;
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("h4", { text: this.displayName });
    }

    async onClose() {
        // Nothing to clean up.
    }
}

export class ItemsPaneView extends ItemView {
    viewTypeId: string;
    displayName: string;

    static viewTypeId = "items-pane";
    static displayName = "Items";

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
        this.viewTypeId = ItemsPaneView.viewTypeId;
        this.displayName = ItemsPaneView.displayName;
    }

    getViewType() {
        return this.viewTypeId;
    }

    getDisplayText() {
        return this.displayName;
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("h4", { text: this.displayName });
    }

    async onClose() {
        // Nothing to clean up.
    }
}
