import path from 'path';
import * as fs from 'fs-extra';
import mysqldumpWrapper from 'mysqldump-wrapper';
import moment from 'moment';

type BackupMySQLProps = {
  outputDir: string;
  keep: number;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  compress: boolean;
}

const backupMySQL = async (
 props: BackupMySQLProps) => {

  const  {
    outputDir,
    keep,
    host,
    port,
    database,
    user,
    password,
    compress,
  } = props;

  console.log('Backup:', props);

  await fs.ensureDir(outputDir);

  const resultFile = path.join(outputDir, `${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql`);

  await mysqldumpWrapper({
    database,
    host,
    port,
    user,
    password,
    compress,
    resultFile,
  });

  // remove old files
  // noinspection JSUnresolvedFunction
  const items = await fs.readdir(outputDir);

  // collect mysql files
  const files = new Array<string>();
  items.map(item => {
    const file = path.join(outputDir, item);
    const extname = path.extname(file);
    if (extname === '.sql' || extname ==='.gz') {
      files.push(file);
    }
  });

  // sort by create datetime
  files.sort(function (a, b) {
    return fs.statSync(b).mtime.getTime() -
      fs.statSync(a).mtime.getTime();
  });

  console.log(`Clean old backup files, keep ${keep} ${keep > 1 ? 'files' : 'file'}`);

  // remove old files
  for (let i = keep; i < files.length; i++) {
    try {
      await fs.remove(files[i]);
      console.log('Deleted:' + files[i]);
    } catch (e) {
      console.error(e);
      console.log('Deleting failed：' + files[i]);
    }
  }


};

export default backupMySQL;
