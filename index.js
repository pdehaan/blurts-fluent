#!/usr/bin/env node

const fs = require("fs");
const { parse } = require("fluent-syntax");

const argv = process.argv.slice(2);

checkLocale(...argv);

function checkLocale(ftlFile = "./locales/en/app.ftl") {
  const ftl = fs.readFileSync(ftlFile, "utf-8");
  const { body } = parse(ftl, { withSpans: false });
  const checkCase = str => str === str.toLowerCase();

  body.forEach(resource => {
    switch (resource.type) {
      case "Term":
      case "Message":
        if (!checkCase(resource.id.name)) {
          console.log(`${resource.type} => ${resource.id.name}`);
        }
        break;
    }
  });
}
