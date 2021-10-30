/**
 * Module providing utility functions and types for using some of obsidian's gui elements in your plugin
 * @version 0.0.1
 * @module gui
 */
import { setIcon } from "obsidian";
import { dev, buttonSize } from "./constants";
type ClickListener = (ev: MouseEvent, element: HTMLElement, viewType: string) => void;

/**
 * Creates a nav-action-button and appends it to the provided div with a click listener
 * @note It's possible to use code like `button.appendChild(new DOMParser().parseFromString(iconElement, "text/xml").documentElement);` to use your own svg, but it's better to register your icon in obsidian using the [addIcon function](https://marcus.se.net/obsidian-plugin-docs/api/functions/addIcon)
 * @param {HTMLDivElement} div
 * @param {?string} viewType - The view type string of the view your button is in, otherwise null if not applicable
 * @param {string} label - String used for the aria-label attribute shown to users on hover
 * @param {string} iconName - String corresponding to one of [obsidian's icons](https://github.com/mgmeyers/obsidian-icon-swapper/blob/main/src/icons.ts) or an icon you've added yourself via [addIcon()](https://marcus.se.net/obsidian-plugin-docs/api/functions/addIcon)
 * @param {ClickListener} listener
 * @param {?boolean} [defaultToggleState] - Optional true or false boolean for the default state of a toggleable button
 */
export const createButton = function(div: HTMLDivElement, viewType: null | string, label: string, iconName: string, listener: ClickListener, defaultToggleState: null | boolean = null): void {
    /**
     * Div element used for buttons
     * @note Using the aria-label attribute rather than title uses obsidian's built in hover rather than the webview hover
     * @note I'm supporting aria-pressed for buttons which act as toggles, but it doesn't seem like there's any support for keyboard navigation generally, nor is there a keydown listener to use in tandem with onClickEvent, so there's not much I can do
     */
    const info: {cls?: string, attr?: Record<string, string | boolean>} = {
        cls: "nav-action-button",
        attr: {
            "aria-label": label,
        },
    };
    if (defaultToggleState !== null) {
        info.attr["aria-pressed"] = defaultToggleState;
        if (defaultToggleState) info.cls = "nav-action-button is-active";
    }
    const button = div.createDiv(info);
    setIcon(button, iconName, buttonSize);
    // Don't know if there's a better way to do this, but it would be nice if there was
    // Are the anonymous functions created by this kept in memory after the button is destroyed? I would hope not, but it doesn't look like there's an opposing function to onClickEvent, so I'm going to disregard that possibility as a micro optimization for now */
    button.onClickEvent(function(this: HTMLElement, ev: MouseEvent): void {
        if (dev) console.log(viewType);
        listener(ev, this, viewType);
    });
};
