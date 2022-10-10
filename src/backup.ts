import {Config} from './types';
import backupMySQL from './backup-mysql';
import path from 'path';

const backup = async (config: Config) => {
  if (Array.isArray(config.instances)) {
    for (const instance of config.instances) {
      if (Array.isArray(instance.databases)) {
        for (const database of instance.databases) {
          const outputDir = path.resolve(
            config.outputDir,
            [instance.host, instance.port + ''].join('_'),
            database.name
          );
          try {
            await backupMySQL({
              outputDir,
              keep: database.keep || config.defaultKeep || 1,
              host: instance.host,
              port: instance.port,
              user: instance.user,
              password: instance.password,
              database: database.name,
              compress: true,
            });
          } catch (e) {
            console.error('Backup failed:', outputDir);
            console.error('Backup failed:', e);
          }
        }
      }
    }
  }
};

export default backup;
