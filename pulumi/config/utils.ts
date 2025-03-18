// import * as archiver from 'archiver';
import {
  createWriteStream,
  readdirSync,
  readFileSync,
  statSync,
  WriteStream,
} from 'fs';
import { join as pathJoin, relative as pathRelative } from 'path';


// export const zippedApp: (_: string, __: RegExp) => string = (
//   (relPath: string, ignore: RegExp): string => {
//     const appDir: string = pathJoin(__dirname, relPath);
//     const zipName: string = `./${
//       cleanString((new Date()).toISOString())
//     }-${
//       cleanString(pathRelative(__dirname, appDir))
//     }.zip`;
//     const archive: archiver.Archiver = archiver('zip', { zlib: { level: 9 } });
//     const zipFile: WriteStream = createWriteStream(zipName) as WriteStream;

//     archive
//       .directory(appDir, false)
//       .on('error', err => { throw err; })
//       .pipe(zipFile);

//       recursiveWalk(appDir, ignore, async (blkPath: string) => {
//       archive.append(
//         readFileSync(blkPath),
//         { name: pathRelative(appDir, blkPath) }
//       );
//     });
//     archive.finalize();

//     return zipName;
//   }
// );


const recursiveWalk = (
  fileSystemBlock: string,
  ignore: RegExp | null,
  fileCallback: Function
) => {
  readdirSync(fileSystemBlock).forEach(block => {
    const blockPath = pathJoin(fileSystemBlock, block);
    if (ignore !== null && ignore.test(blockPath)) return;

    fileCallback(blockPath);
    if (statSync(blockPath).isDirectory()) recursiveWalk(
      blockPath,
      ignore,
      fileCallback
    );
  });
}

const cleanString = (str: string): string => (
  str.replace(/[^\w\s\']|_/g, '').replace(/\s+/g, '')
);

export const prjName = (component: string): string => (
  `monitor-ssindex-${component}`
);

export const prjDemoName = (component: string): string => (
  `demo-monitor-ssindex-${component}`
);