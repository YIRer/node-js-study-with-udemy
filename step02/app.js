const yargs = require("yargs");
const noteHandlers = require("./noteHandlers");

yargs.version("1.0.1");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      desc: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    noteHandlers.addNodte(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      desc: "Note title to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    noteHandlers.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "List your notes",
  handler: () => {
    noteHandlers.noteList();
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      desc: "Note title to read",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    noteHandlers.readNote(argv.title);
  },
});

yargs.parse();
