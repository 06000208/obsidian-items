# Items

A plugin for [obsidian](https://obsidian.md/) that implements "items" and graphical interfaces for editing metadata.

This, in essence, provides database-esque functionality and the graphical views/field editing you may be familiar with from [productivity](https://en.wikipedia.org/wiki/Productivity_software) or [collaborative](https://en.wikipedia.org/wiki/Collaborative_software) services such as [notion](https://en.wikipedia.org/wiki/Notion_(productivity_software)), [airtable](https://en.wikipedia.org/wiki/Airtable), [trello](https://en.wikipedia.org/wiki/Trello), etc.

## What is an item?

An item as defined by this plugin is a specific person, place, or thing. In other words, they are data or metadata representing anything, and they can be used in any way. Examples include a markdown note, your favorite video game, an article you want to read later, and so on.

On a technical level, the following may be individual items within the plugin:

- Markdown notes
- YAML and JSON Files
- CSV and TSV Files
- Folders
- Files of any type
- JSON Objects (inside a JSON file's items array)
- Individual rows of CSV and TSV files

And all items may optionally:

- Have complex data (such as the text of a markdown note or the binary data of an image)
- Have metadata (such as title, icon, description, tags, custom fields)
- Be exclusively metadata (json objects, csv/tsv rows, markdown files with only yaml data, etc)
- Contain any number of nested items
  - Have metadata detailing how it should display it's nested items (such as a list, table, gallery, timeline, tier list board, etc)

## Why?

Mainly that nothing like this exists yet, not in obsidian or anywhere else, to the best of my knowledge. I've tried too many applications and services to count, and while a handful came close, none were suitable for me or my workflow.

Meanwhile, Obsidian's philosophy and design was very appealing, and it succeeds where so many other things fail, yet it lacks what I need for seamlessly and easily structuring data, rather than notes or knowledge. So I've decided to make it myself & seek out other contributors to make it the best we can.

This plugin happens to be a sister project to [item engine](https://github.com/06000208/item-engine), a WebExtension applying the same ideas to browser bookmarks.

I'm [not the first person](https://discord.com/channels/686053708261228577/694233507500916796/890793522100322305) to want this of course, and I'm taking direct inspiration from many pre-existing things:

- [Productivity software](https://en.wikipedia.org/wiki/Productivity_software)
- [Collaborative software](https://en.wikipedia.org/wiki/Collaborative_software)
- [Task management software](https://en.wikipedia.org/wiki/Task_management#Task_management_software)
- [Reference management software](https://en.wikipedia.org/wiki/Reference_management_software)
- [Browser bookmarks](https://en.wikipedia.org/wiki/Bookmark_(digital))
- [Wikis](https://en.wikipedia.org/wiki/Wiki)
- [Note-taking](https://en.wikipedia.org/wiki/Note-taking) software
- [Knowledge bases](https://en.wikipedia.org/wiki/Knowledge_base)
- [Password managers](https://en.wikipedia.org/wiki/Password_manager)
- [Tag editors](https://en.wikipedia.org/wiki/Tag_editor)

I want to commend the incredible plugins [Dataview](https://github.com/blacksmithgu/obsidian-dataview), [Templater](https://github.com/SilentVoid13/Templater), [Kanban](https://github.com/mgmeyers/obsidian-kanban), [MetaEdit](https://github.com/chhoumann/MetaEdit), and [Supercharged Links](https://github.com/mdelobelle/obsidian_supercharged_links) for building on and expanding how the obsidian community uses metadata.

## Ideas

This section may be moved out of the readme to discussions in the imminent future.

- Metadata Pane, renders the currently focused item's metadata as GUI editable fields

- Pane equivalents for the File Explorer, Search, and Tag Panes
  - Offering too many new panes is not ideal and would be cluttered, make functionality make sense for obsidian instead of building a new app ontop of it
  
  - Item Explorer Pane
    
    - Shows all items within your vault in a nested fashion, based upon the File Explorer
    
    - Would support opening any item with left click or ctrl + left click, including folders
    
    - Items containing items would shown in collapsible tree view, with nesting working the same way tags do in the Tag Pane with arrows
    
    - Airtable and notion both have powerful filters and sorts, which are relevant here. You should, for example, be able to use search items by way of filtering them with obsidian's search syntax
    
    - In the normal File Explorer or elsewhere in obsidian, you would be able to right click a file, folder, note, etc. and open it as an item instead
  
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
