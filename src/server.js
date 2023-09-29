import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const {json} = require('body-parser');
import session from 'express-session';
import sessionFileStore from 'session-file-store'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = sessionFileStore(session);


polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		json(),
		sirv('static', { dev }),
		sapper.middleware({
			secret: 'conduit',
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 31536000
			},store: new FileStore({
				path: `.sessions`
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);

	});
