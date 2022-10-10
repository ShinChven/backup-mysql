import loadConfig from '../src/config';
import backup from '../src/backup';

const config = loadConfig();

(async () => {
  if (config) {
    await backup(config);
  }
})().then(() => {
  process.exit(0);
}).catch((err)=>{
  console.error(err);
  process.exit(1);
});
