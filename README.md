# quiver-node-reader
This app is a reader for notes created from [Quiver Notebook](http://happenapps.com/) application.
The goal of this project is to create an Express WEB server which serve original notebooks (qvnotebook) and notes (qvnote) without exporting them.

### Main goal
* Read notes from [QVNOTEBOOK](https://github.com/HappenApps/Quiver/wiki/Quiver-Data-Format)
* Create a filterable list of all notes by notebook
* Create a list of all tags to have quick access of notes by tag

### Motivation
As a WEB developer I'm mainly working on MacOS and using Quiver with my all team mates.
I'm currently switching on GNU Linux then Quiver is unfortunately not compatible with this system, as my team mates still working on MacOS and using this tool I need to have access of all our shared Quiver notes but also at my personal notes.
Currently I didn't planify to make this tool a note editor. The focus is currently only to be a great reader.

### Project technologies
To build this tool here is the main used technologies:
* NodeJS
* ExpressJS
* React
* Redux

### Wanna help?
Just clone the repository, install node dependancies, build the React app and start the web server with the following steps:
* git clone https://github.com/Gulivertx/quiver-node-reader.git
* yarn *or* npm install
* yarn run dev *or* npm run dev

The command *dev* will start express server on https://localhost:3000 and also build the React app. It will also keep wathing changes in the React app files.

### Information
I just started this project few days ago, it is not finish and will grew up the next few days.
The current status allow to start the server and have a list of all notebooks, notes, tags, select a note and read it.
My current focus will now be to improve UI.
