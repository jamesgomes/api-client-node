import app from './app';
import config from './config/config';

app.listen(config.webPort, () => {
    console.log('App iniciado na porta: ', config.webPort);
});

