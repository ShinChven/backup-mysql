import YAML from 'yaml';
import fs from 'fs-extra';
import {Config} from './types';
import path from 'path';
import timestamp from './timestamp';

const loadConfig = () => {
  const configFilePath = path.resolve('config/config.yml');
  if (fs.existsSync(configFilePath)) {
    return YAML.parse(fs.readFileSync('config/config.yml', 'utf8')) as Config;
  }
  console.log(timestamp(), 'Config file not found:', configFilePath);
  console.log(timestamp(), 'Please create:', 'config/config.yml');
}

export default loadConfig;
