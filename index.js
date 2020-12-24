const fs = require('fs');

const displayInfo = {
  kilby_texas_instruments: {
    linkName: 'Jack Kilby',
    subTitle: 'Jack Kilby - Texas Instruments'
  },
  lawrence_clouds_end: {
    linkName: 'T.E. Lawrence',
    subTitle: 'T.E. Lawrence - Cloud\'s Hill'
  },
  dahl_writing_hut: {
    linkName: 'Roald Dahl',
    subTitle: 'Roald Dahl - Writing Hut'
  },
  montaigne_tower: {
    linkName: 'Montaigne',
    subTitle: 'Montaigne - Tower'
  }
};

function sortFn(a,b) {
  if (a.linkName.toLowerCase() < b.linkName.toLowerCase()) {
    return -1;
  } else if (a.linkName.toLowerCase() > b.linkName.toLowerCase()) {
    return 1;
  } else {
    return 0;
  }  
}

function makeSidebar(files) {
  let x = files
    .map(file => ({ linkName: displayInfo[file].linkName, fileName: file }))
    .sort(sortFn)
    .reduce((acc, info) => {
      return acc + `<li><a href="${info.fileName}.html">${info.linkName}</a></li>`
    }, '<ul>');
  x += '</ul>';
  return x;
}

function makeHeader() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Spaces</title>
    <link rel="stylesheet" href="reset.css" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <header><h1><a href="/">Spaces</a><h1></header>`;
}

function makeFiles(files) {
  for (file of files) {  
    let content = '';
    content += makeHeader();
    content += makeSidebar(files);
    content += `<main><h2>${displayInfo[file].subTitle}</h2>`;
    const images = fs.readdirSync(`${__dirname}/spaces/${file}`);
    for (image of images) {
      content += `<img src="spaces/${file + '/' + image}" />`;
    }
    content += '</main></div></body></html>';
    fs.writeFileSync(`${file}.html`, content);
  }
}

function makeIndex(files) {
  let content = '';
  content += makeHeader();
  content += makeSidebar(files);
  content += '<main>hello world</main>';
  content += '</div></body></html>';
  fs.writeFileSync(`index.html`, content);
}

const files = fs.readdirSync(`${__dirname}/spaces`);
makeIndex(files);
makeFiles(files);
