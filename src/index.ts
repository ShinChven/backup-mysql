import loadConfig from './config';
import {CronJob} from 'cron';
import backup from './backup';


const config = loadConfig();

if (config?.cronTime) {
  new CronJob(config.cronTime, async () => {
    await backup(config);
  }).start();
  console.log('Backup cronjob is started', config.cronTime);
}else{
  console.log('Config not available, shutting down...');
}

