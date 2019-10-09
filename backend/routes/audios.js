const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = require("express").Router();
const mongoose = require("mongoose");
var path = require("path"),
  fs = require("fs"),
  url = require("url");
var qs = require("querystring");
const { Audio, validate } = require("../models/audio");
const { Comment } = require("../models/comment");
const { User } = require("../models/user");

// Получение всех аудио
router.get("/", async function(req, res) {
  var qstring = req.url.split("?")[1];
  qstring = qs.parse(qstring);
  if (qstring.category) {
    // Получение самых прослушиваемых аудио
    if (qstring.category === "popular") {
      const audios = await Audio.find()
        .sort({ auditions: "desc" })
        .limit(3);
      res.json(audios);
    }
    // Получение самых залайканых аудио
    else if (qstring.category === "rating") {
      const audios = await Audio.find()
        .sort({ likes: "desc" })
        .limit(3);
      res.json(audios);
    }
    // Получение понравившихся аудио
    else if (qstring.category === "liked") {
      const user = await User.findOne({ _id: qstring.userId });
      const audios = await Audio.find({ _id: { $in: user.likedAudios } });
      res.json(audios);
    }
  } else {
    const audios = await Audio.find();
    res.json(audios);
  }
});

router.get("/:id", async function(req, res) {
  // Получаем аудио по id
  const audio = await Audio.findOne({ _id: req.params.id });
  if (!req.headers.range) return res.json(audio);
  // Формируем путь к аудио файлу
  var filePath = path.join(__dirname, audio.pathToAudio);
  // Получаем информацию о файле
  var stat = fs.statSync(filePath);
  const total = stat.size;

  const range = req.headers.range;
  const parts = range.replace(/bytes=/, "").split("-");
  const partialStart = parts[0];
  const partialEnd = parts[1];

  const start = parseInt(partialStart, 10);
  const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
  const chunksize = end - start + 1;
  const rstream = fs.createReadStream(filePath, { start: start, end: end });
  res.writeHead(206, {
    "Content-Range": "bytes " + start + "-" + end + "/" + total,
    "Accept-Ranges": "bytes",
    "Content-Length": chunksize,
    "Content-Type": "audio/mpeg"
  });
  rstream.pipe(res);
});

router.post("/", [auth, admin], async function(req, res) {
  let audio = new Audio({
    title: req.body.title,
    singers: req.body.singers.split(",") || [],
    genres: ["test"],
    pathToAudio: `../public/audios/${req.files.file.name}`
  });

  req.files.file.mv(
    path.join(__dirname, `../public/audios/${req.files.file.name}`),
    async function(err) {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      audio = await audio.save();
      res.json(audio);
    }
  );
});

// Отсутствует middleware так как: прослушивания должны изменяться и от неавториз. П.
// Лайки могут ставить не только адмны
router.put("/:id", async (req, res) => {
  /*const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);*/
  const { title, singers, likes, auditions, genres, pathToAudio } = req.body;
  const audio = await Audio.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { title, singers, likes, auditions, genres, pathToAudio } },
    { new: true }
  );
  res.json(audio);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const audio = await Audio.findOneAndDelete({ _id: req.params.id });
  console.log(audio);
  // Удаление комментариев аудиозаписи
  await Comment.deleteMany({ audioId: audio._id });
  // Удаление записи из понравившихся
  await User.updateMany(
    { likedAudios: audio._id },
    { $pull: { likedAudios: audio._id } }
  );
  // Удаление файла
  fs.unlink(path.join(__dirname, audio.pathToAudio), err => {
    if (err) {
      return res.status(400).send(error.details[0].message);
    } else res.json(audio);
  });
});

// // Создание проекта
// router.post('/', auth, async function (req, res) {
// 	const { error } = validate(req.body);
// 	if (error) return res.status(400).send(error.details[0].message);
// 	let project = new Project({
// 		title: req.body.title,
// 		description: req.body.description,
// 		iterations: []
// 	});
// 	project = await project.save();
// 	// Добавление проекта пользователю
// 	await User.findOneAndUpdate({ _id: req.user._id }, { $push: { projects: project._id } });
// 	res.json(project);
// });

// router.get('/:id', async function (req, res) {
// 	const project = await Project.findOne({ _id: req.params.id });
// 	res.json(project);

// 	//return res.status(404).send('The project with the given ID was not found');
// });

// //Изменение проекта
// router.put('/:id', auth, async function (req, res) {
// 	//Validate - If invalid, return 400 - Bad Request
// 	const { error } = validate(req.body);
// 	if (error) return res.status(400).send(error.details[0].message);
// 	//Look up the project - If not existing, return 404
// 	const project = await Project.findOneAndUpdate( { _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description } }, { new: true });
// 	//Update the project - Return the updated project
// 	res.json(project);
// 	//return res.status(404).send('The project with the given ID was not found');
// });

// // Удаление проекта
// router.delete('/:id', auth, async function (req, res) {
// 	// Находим и удаляем проект
// 	const project = await Project.findOneAndDelete({ _id: req.params.id });
// 	//Удаление итераций объекта
// 	await Iteration.deleteMany({ _id: { $in: project.iterations } });
// 	// Удаление карточек проекта (в том числе BackLog)
// 	await Card.deleteMany({ _projectId: project._id });
// 	// Удаление этого проекта из проектов, доступных пользователям
// 	await User.updateMany({ projects: project._id }, { $pull: { projects: project._id } });
// 	res.json(project);
// 		//return res.status(404).send('The project with the given ID was not found');
// });

// //Получение итераций в рамках проекта
// router.get('/:prId/iterations/', auth, async function(req, res){
// 	const project = await Project.findOne({ _id: req.params.prId });
// 	// Данные отсортированы по состоянию: completed -> doint -> new, и по дате завершения
// 	const iterations = await Iteration.find({ _id: { $in:  project.iterations } }).sort({ state: 1, finishDate: 1 });
// 	res.json(iterations);
// 		//return res.status(404).send('The project with the given ID was not found' + err.message);

// });

module.exports = router;
