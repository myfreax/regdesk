import articleModel from './article-model';
import accessControl from '../accessControl';
import mongoose from 'mongoose';
import { Response } from '../response';

const articleContller = {
  // curl  http://127.0.0.1:3000/articles/admin 200
  // curl  http://127.0.0.1:3000/articles/user 403
  async findAll(user: string) {
    const permission = accessControl.can(user).readAny('article');
    if (permission.granted) {
      const article = await articleModel.find();
      return new Response(article);
    }
    return new Response(null, 403, 'Permission Denied');
  },

  // curl http://127.0.0.1:3000/articles/638086d754ea0e159b9c4b45
  async findById(user: string, id: string) {
    const article = await articleModel.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    const permission =
      user === article.user
        ? accessControl.can(user).readOwn('article')
        : accessControl.can(user).readAny('article');
    if (permission.granted) {
      return new Response(article);
    } else {
      return new Response(null, 403, 'Permission Denied');
    }
  },

  // curl -X DELETE http://127.0.0.1:3000/articles/638085e7fd9376cdf1d395e7
  async deleteById(user: string, id: string) {
    const article = await articleModel.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    const permission =
      user === article.user
        ? accessControl.can(user).deleteOwn('article')
        : accessControl.can(user).deleteAny('article');
    if (permission.granted) {
      const success = await article.deleteOne();
      return new Response({ success });
    } else {
      return new Response(null, 403, 'Permission Denied');
    }
    ///return articleModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
  },

  // curl -X POST -H "Content-Type: application/json"  -d '{"title": "myfreax", "website": "www.myfreax.com"}'  http://127.0.0.1:3000/articles
  async create(user: string, body: Record<string, any>) {
    const article = new articleModel({ user, ...body });
    await article.save();
    return new Response(article);
  },

  // curl - X DELETE http://127.0.0.1:3000/articles/638078ca6a0fe7bd407cef1f/website
  async deleteFieldById(user: string, id: string, field: string) {
    const article = await articleModel.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    const permission =
      user === article.user
        ? accessControl.can(user).updateOwn('article')
        : accessControl.can(user).updateAny('article');
    if (permission.granted) {
      //const article = await articleModel.findById({ _id: new mongoose.Types.ObjectId(id) });
      article.set(field, undefined);
      await article.save();
      return new Response(article);
    } else {
      return new Response(null, 403, 'Permission Denied');
    }
  },

  // curl -X POST -H "Content-Type: application/json"   http://127.0.0.1:3000/articles/638086d754ea0e159b9c4b45/rename/website/site
  async renameFieldById(
    user: string,
    id: string,
    newField: string,
    field: string,
  ) {
    const article = await articleModel.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    const permission =
      user === article.user
        ? accessControl.can(user).updateOwn('article')
        : accessControl.can(user).updateAny('article');
    if (permission.granted) {
      article.set(newField, article[field]);
      article.set(field, undefined);
      await article.save();
      return new Response(article);
    } else {
      return new Response(null, 403, 'Permission Denied');
    }
  },
};

export default articleContller;
