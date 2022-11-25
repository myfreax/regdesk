import * as express from 'express';
import articleContller from './article-controller';
import './article-permissoon';
const router = express.Router();

// find articles
router.get('/:user', async (req, res) => {
  const data = await articleContller.findAll(req.params.user);
  const { statusCode, ...result } = data;
  res.statusCode = statusCode;
  res.json({ ...result });
});

// find article by id
router.get('/:user/:id', async (req, res) => {
  const data = await articleContller.findById(req.params.user, req.params.id);
  const { statusCode, ...result } = data;
  res.statusCode = statusCode;
  res.json({ ...result });
});

// delete article
router.delete('/:user/:id', async (req, res) => {
  const data = await articleContller.deleteById(req.params.user, req.params.id);
  const { statusCode, ...result } = data;
  res.statusCode = statusCode;
  res.json({ ...result });
});

// delete article field
router.delete('/:user/:id/:field', async (req, res) => {
  const data = await articleContller.deleteFieldById(
    req.params.user,
    req.params.id,
    req.params.field,
  );
  const { statusCode, ...result } = data;
  res.statusCode = statusCode;
  res.json({ ...result });
});

router.post('/:user/:id/rename/:field/:newField', async (req, res) => {
  const data = await articleContller.renameFieldById(
    req.params.user,
    req.params.id,
    req.params.newField,
    req.params.field,
  );
  const { statusCode, ...result } = data;
  res.statusCode = statusCode;
  res.json({ ...result });
});

router.post('/:user', async (req, res) => {
  const data = await articleContller.create(req.params.user, req.body);
  const { statusCode, ...result } = data;
  res.statusCode = statusCode;
  res.json({ ...result });
});

export default router;
