import accessControl from '../accessControl';

accessControl
  .grant('user')
  .createOwn('article')
  .updateOwn('article')
  .deleteOwn('article')
  .readOwn('article')
  .grant('admin')
  .extend('user')
  .readAny('article')
  .deleteAny('article')
  .updateAny('article');
