import ejs from 'ejs';
import wixExpressCsrf from 'wix-express-csrf';
import wixExpressRequireHttps from 'wix-express-require-https';

module.exports = (app, context) => {
  const config = context.config.load('{%projectName%}');

  app.use(wixExpressCsrf());
  app.use(wixExpressRequireHttps);

  app.get('/', async (req, res) => {
    const {
      language,
      basename,
      debug = process.env.NODE_ENV === 'development',
    } = req.aspects['web-context'];

    const renderModel = {
      language,
      basename,
      debug,
      clientTopology: config.clientTopology,
      title: 'Wix Full Stack Project Boilerplate',
    };

    const html = await ejs.renderFile('./src/index.ejs', renderModel, {
      cache: !debug,
    });

    res.send(html);
  });

  return app;
};
