const express = require('express');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const router = express.Router();

async function lesaJSON() {
  const file = await readFile('./lectures.json');
  const json = JSON.parse(file);
  return json;
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function list(req, res) {
  //lesa fyrirlestrana inn og birta
  const title = 'Fyrirlestrar';
  const data = await lesaJSON();
  const { lectures } = data;
  //console.log(lectures);

  res.render('index', { title, lectures });
}
//console.log('banani');
//console.log('annar banani');
async function lecture(req, res, next) {
  const { slug } = req.params;
  const data = await lesaJSON();
  const foundContent = data.lectures.find(a => a.slug === slug);
  console.log(foundContent);

  if (!foundContent) {
    return next();
  }
  const { title } = foundContent;
  const { category } = foundContent;

  const html = item.createContent(foundContent.content);
  return res.render('lecture', { title, html, category, lecture: foundContent });
}






router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
