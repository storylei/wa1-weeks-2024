import express from 'express';
import morgan from 'morgan';
import { getQuestion, listQuestions } from './dao.mjs';
// import dao from './dao.mjs'
//     dao.getQuestion

const app = express();
app.use(morgan('common'));
app.use(express.json());

app.get('/questions', (req, res) => {
  listQuestions()
    .then((l) => {
      res.json(l);
    })
    .catch((err) => {
      res.statusCode(500).send('Database error: ' + err);
    });
});

app.get('/questions/:id', (req, res) => {
  const questionId = req.params.id;
  getQuestion(questionId)
    .then((q) => {
      res.json(q);
    })
    .catch((err) => {
      res.statusCode(500).send('Database error: ' + err);
    });
});

app.listen(3000, () => {
  console.log('Running!');
});
