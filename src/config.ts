import YAML from 'yaml';
import fs from 'fs-extra';
import {Config} from './types';
import path from 'path';

const loadConfig = () => {
  const configFilePath = path.resolve('config/config.yml');
  if (fs.existsSync(configFilePath)) {
    return YAML.parse(fs.readFileSync('config/config.yml', 'utf8')) as Config;
  }
  console.log('Config file not found:', configFilePath);
  console.log('Please create:', 'config/config.yml');
}

export default loadConfig;
