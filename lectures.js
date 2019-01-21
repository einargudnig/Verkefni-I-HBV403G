const express = require('express'),
        util = require('util'),
        fs = require('fs');

const router = express.Router();
const lectures_json_path = './lectureData/lectures.json';

const readFilePromise = util.promisify(fs.readFile);

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function list(req, res) {
  const json_file = await readJSONasync(lectures_json_path);
  res.render("pages/list", { json: json_file, slug: req.originalUrl });
}

async function lecture(req, res, next) {
  /* todo útfæra */
}



router.get('/', catchErrors(list));
router.get('/html', catchErrors(list));
router.get('/css', catchErrors(list));
router.get('/js', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
