import loadConfig from './config';
import {CronJob} from 'cron';
import backup from './backup';
import timestamp from './timestamp';


const config = loadConfig();

if (config?.cronTime) {
  new CronJob(config.cronTime, async () => {
    await backup(config);
  }).start();
  console.log(timestamp(), 'Backup cronjob is started', config.cronTime);
} else {
  console.log(timestamp(), 'Config not available, shutting down...');
}

