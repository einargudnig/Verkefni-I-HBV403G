const express = require('express');
const fs = require('fs');
const util = require('util');
const item = require('./item');

const readFile = util.promisify(fs.readFile);

const router = express.Router();

/*
 Fall sem tekur inn JSON skrána og
 'de-objectifyar' hann.
 Setjum hann í json fall.
*/
async function lesaJSON() {
  const file = await readFile('./lectures.json');
  const json = JSON.parse(file);
  return json;
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/*
  Fall sem tekur við JOSN skránni sem við unnum með áðan
  Leyfir okkur að vinna með lista úr JOSN skránni
  við sigtum út fyrirlestra úr JSON skránni og birtum
  með titlum á index.ejs síðu
*/
async function list(req, res) {
  // lesa fyrirlestrana inn og birta
  const title = 'Fyrirlestrar';
  const data = await lesaJSON();
  const { lectures } = data;
  // console.log(lectures);

  res.render('index', { title, lectures });
}

/*
  Fall sem tekur við JOSN skránni sem við unnu með áður
  Leyfir okkur að vinna við innihald úr fyrirlestrum
  Sigtum út efni(content) úr fyrirlestrum, hver með sitt
  slug.
  Tengjumst item síðunni með breytu og notum það efni sem
  við fundum þar.
  Birtum með innihaldi hvers fyrirlestur á síðu lecture.ejs
*/
async function lecture(req, res, next) {
  const { slug } = req.params;
  const data = await lesaJSON();
  const foundContent = data.lectures.find(a => a.slug === slug);
  // console.log(foundContent);
  if (!foundContent) {
    return next();
  }
  const { title } = foundContent;
  const { category } = foundContent;

  // Hér tengjum item.js skrána við og skilum niðurstöðunni úr því inn í html.
  const html = item.createContent(foundContent.content);
  res.render('lecture', {
    title, html, category, lecture: foundContent,
  });
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
