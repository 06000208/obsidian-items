# Items

An [obsidian](https://obsidian.md/) plugin that adds relational data and graphical metadata editing, aiming to give people the tools to structure data in addition to markdown notes and knowledge

This provides the database-esque functionality and intuitive editing you may be familiar with from [productivity](https://en.wikipedia.org/wiki/Productivity_software) or [collaborative](https://en.wikipedia.org/wiki/Collaborative_software) services such as [notion](https://en.wikipedia.org/wiki/Notion_(productivity_software)), [airtable](https://en.wikipedia.org/wiki/Airtable), [trello](https://en.wikipedia.org/wiki/Trello), etc.

⚠️ This is a work in progress, and there are no releases available yet.

This plugin is a sister project to [item engine](https://github.com/06000208/item-engine), a WebExtension applying the same ideas to browser bookmarks.

## Example use cases

- Quickly and easily adding/editing metadata (such as yaml fields in a markdown note) via Metadata Pane
- Templating metadata from existing items so you don't have to manually add fields one by one
- Using "atomic data" in the same fashion as one might use atomic notes
- See connections between data at a glance and easily navigate them
- Gallery views, with items supplying content to be displayed such as an image or description
- Export your entire vault or specific items to structured JSON or CSV
<!-- - Using a folder (or any item) as a gallery, showing metadata (such as an image) from items within -->

## Whats an Item?

An item as defined by this plugin is simply [something](https://en.wikipedia.org/wiki/Object_(philosophy)) that can have metadata associated with it, usually a specific , though they can be used for anything. In other words, they are akin to your markdown notes, rows in spreadsheets, database records, kanban cards with custom fields, json objects, and so on.

Items can be abstracted from your notes and files in a variety of powerful ways. On a technical level, the following things may be individual items:

- Markdown notes
- JSON and YAML Files
- JSON Objects
- CSV and TSV Files
- Individual rows of CSV and TSV files
- Files of any type
- Folders

And all items may optionally:

- Have metadata (such as title, icon, description, image, tags, any kind of custom name-value field)
- Be exclusively metadata (json objects, csv/tsv rows, etc)
- Contain any number of nested items

## Why?

Nothing quite like this exists yet, not in obsidian or anywhere else, to the best of my knowledge. I've tried too many applications and services to count, and while a handful came close, none were suitable for me or what I needed from them. I came to realize that If I wanted this, I would have to do it myself.

Obsidian's philosophy and design is very appealing, and it's community is wonderful. It doesn't matter that it lacks this built in, because it can be pushed the extra step.

Think of items as an approach to structuring data, while core obsidian focuses on structuring knowledge and notes.

I'm not the only person to want this or similar things ([1](https://forum.obsidian.md/t/relational-databases/10926), [2](https://forum.obsidian.md/t/allow-links-in-yaml-front-matter-notion-like-databases-from-metadata-links-as-first-class-citizens/10052), [3](https://discord.com/channels/686053708261228577/694233507500916796/890793522100322305), etc), so I feel it's worth making.

Inspiration is being taken from many pre-existing things to make it happen:

- [Productivity software](https://en.wikipedia.org/wiki/Productivity_software)
- [Collaborative software](https://en.wikipedia.org/wiki/Collaborative_software) 
- [Browser bookmarks](https://en.wikipedia.org/wiki/Bookmark_(digital))
- [Reference management software](https://en.wikipedia.org/wiki/Reference_management_software)
- [Wikis](https://en.wikipedia.org/wiki/Wiki)
- [Password managers](https://en.wikipedia.org/wiki/Password_manager)
- [Tag editors](https://en.wikipedia.org/wiki/Tag_editor)

## Credits & Attributions

- I want to commend and thank the incredible plugins [Dataview](https://github.com/blacksmithgu/obsidian-dataview), [Templater](https://github.com/SilentVoid13/Templater), [Kanban](https://github.com/mgmeyers/obsidian-kanban), [Metatable](https://github.com/arnau/obsidian-metatable), [Folder Note Plugin](https://github.com/xpgo/obsidian-folder-note-plugin), [MetaEdit](https://github.com/chhoumann/MetaEdit), and [Supercharged Links](https://github.com/mdelobelle/obsidian_supercharged_links) for building on and expanding how the obsidian community uses metadata

- I give my thanks to [Notion.so](https://www.notion.so), [Trello](https://trello.com/), [Airtable](https://airtable.com/), [Keepass 2](https://keepass.info), [Google Sheets](https://www.google.com/sheets/about), [tiddlywiki](https://tiddlywiki.com), [Zotero](https://www.zotero.org/), [Firefox](https://www.mozilla.org/en-US/firefox/browsers/), and [Pinboard](https://pinboard.in) for inspiration and providing real world examples of design choices

## Ideas & Questions

This section may be moved out of the readme to the repository's discussions forum or wiki in the imminent future

- Goals
  - I want everything within the plugin to be designed as simple and practical as possible
  - Speed and optimization is of great importance. The plugin should never cause obsidian to have worse performance

- Metadata Pane, renders the currently focused item's metadata as GUI editable fields

- How are items referenced? Ideally, it would be as easy as linking markdown notes and feature the same autocompletion capabilities.
  - If you wanted to have a gallery view for all items with a tag, or 4 specific items without nesting those items directly, how would you go about that?
    - This simply doesn't make sense in some contexts. For example, a csv item. It's much harder to make  sense of items originating external locations than if it restricted sub items to the csv's rows or forwent the capabilities to do this entirely
  - Obsidian has settings for how links are auto generated, it should be respected if its possible to link items from markdown notes
  - How would wikilinks vs markdown links be different?
  - Obsidian already disallows `* " \ / < > : | ?` from markdown note names, It's not a stretch that if csv has a Name column, you could nest items like `Item B` under `Item A` via naming it `Item A/Item B`

- Item Templates, populates your item with a set of user defined fields so you don't have to manually add each, would also support default values

- Dunno how feasible is it to add non-markdown file items to core obsidian features like graph view and search. Right now I'm thinking the more concentrated and integrated into obsidian's normal functionality, rather than creating new panes or windows, the better.

- Pane equivalents for the File Explorer, Search, and Tag Panes
  - Offering too many new panes is not ideal and would be cluttered, make functionality make sense for obsidian instead of building a new app ontop of it
  
  - Item Explorer Pane
    
    - Shows all items within your vault in a nested fashion, based upon the File Explorer
    
    - Would support opening any item with left click or ctrl + left click, including folders
    
    - Items containing items would shown in collapsible tree view, with nesting working the same way tags do in the Tag Pane with arrows
    
    - Airtable and notion both have powerful filters and sorts, which are relevant here. You should, for example, be able to use search items by way of filtering them with obsidian's search syntax
    
    - In the normal File Explorer or elsewhere in obsidian, you would be able to right click a file, folder, note, etc. and open it as an item via context menu
      
      - Keep in mind for some things, like folders and some file types, using them as an item will create a JSON file. Clicking that in the regular File Explorer would be a method of opening it as an item as well
 
  - For a tag pane that supports items, I'm going to expose methods and use them within [Tag Explorer](https://github.com/06000208/obsidian-tag-explorer) as optional integration

- A new kind of preview/edit mode or a model dubbed the Item Editor?
  
  - Would behave similar to viewing a specific card in trello, page in notion, or record in airtable
  
  - May display items in a variety of graphically editable and interactive "views"
    
    - These behave similar to notion's blocks, and include things such as a table, kanban board, gallery, list, calendar, timeline, etc
    
    - A [kanban plugin](https://github.com/mgmeyers/obsidian-kanban) already exists, and I want to interface with it or other plugins that provide similar views instead of reinventing the wheel, though I have no idea how that would work for items which aren't markdown notes
    
    - Airtable and notion both have powerful filters and sorts
    
    - Markdown files for example could have metadata graphically editable at the top and their body editable below, but I'm not sure if it the latter part is worth/I don't want to recreate or replace obsidian's regular edit mode. The better way to go about this would be the Metadata Pane, I think.

- Functional equivalence: The idea that items, although they may be stored in very different ways, may interacted with as though they were the same thing. For example, compare a JSON Object such as `{ "name": "Example", "body": "hello world" }` to a markdown note named `Example` containing `hello world`
  - Obsidian already does this, since it revolves around markdown notes and not markdown files, omitting things like the .md extension from the name

- Exploring obsidian tag + item linking, inspired by [tiddlywiki](https://en.wikipedia.org/wiki/TiddlyWiki)'s behavior and ability to make pages of the same name correspond to tags

## Code Of Conduct

This project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating, you're expected to abide by its terms. Please report unacceptable behavior to [a0600208@protonmail.com](mailto:a0600208@protonmail.com)
