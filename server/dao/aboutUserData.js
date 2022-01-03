// 获取用户的基础信息
const jwtAPI = require("jsonwebtoken");
const dbmodel = require("../model/dbmodel");
var User = dbmodel.model("user");
var path = require("path");
var fs = require("fs");
var formidable = require("formidable");
// 这一块代码复用率不高，可以再加一个函数用来储存前面的获取数据库的信息
async function toDB(req) {
  const secretKey = "nibaba..";
  const token = (req.headers.authorization || "").split(" ")[1];
  const jwtResult = jwtAPI.verify(token, secretKey);
  const result = await User.findOne({ name: jwtResult.username }).catch();
  return result;
}

exports.getUserData = async (req, res) => {
  let result = await toDB(req);
  // 初始化发送数据
  const Fresult = {};
  // 把密码留下来 下面是筛选功能 result 还有一层 '$__', '$isNew', '_doc'
  Object.keys(result._doc)
    // 用filter处理想要的数据
    .filter((key) => key !== "password" && key !== "tags")
    .forEach((key) => {
      Fresult[key] = result[key];
    });
  res.status(200).send({
    code: 200,
    data: Fresult,
  });
};

exports.getUserTags = async (req, res) => {
  let result = await toDB(req);
  // 初始化发送数据
  const Fresult = {};
  // 把密码留下来 下面是筛选功能 result 还有一层 '$__', '$isNew', '_doc'
  Object.keys(result._doc)
    .filter((key) => key == "tags")
    .forEach((key) => {
      Fresult[key] = result[key];
    });
  res.status(200).send({
    code: 200,
    data: Fresult,
  });
};

// 上传用户的标签内容
exports.updateUserTags = (req, res) => {
  req.body.sort((a, b) => {
    return b.value - a.value;
  });
  const secretKey = "nibaba..";
  const token = (req.headers.authorization || "").split(" ")[1];
  const jwtResult = jwtAPI.verify(token, secretKey);
  User.findOneAndUpdate(
    { name: jwtResult.username },
    { tags: req.body },
    {},
    // data返回修改前的数据信息
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(data);
    }
  );
  res.send({
    code: 200,
    message: "修改标签成功",
  });
};

// 上传并储存用户的图片
exports.updateUserImg = (req, res) => {
  //拦截请求
  var form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.uploadDir = path.join(__dirname, "../public/images");
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;

  //处理图片
  //field 表示普通控件
  //files  表示文件控件
  form.parse(req, function (err, fields, files) {
    console.log(files.file._writeStream.path);
    // 提取文件名
    var filename = files.file.originalFilename
    var nameArray = filename.split(".");
    var type = nameArray[nameArray.length - 1];
    var name = "";

    //多张图片？ 
    for (var i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i];
    }
    var date = new Date();
    var time =
      "_" +
      date.getFullYear() +
      "_" +
      date.getMonth() +
      "_" +
      date.getDay() +
      "_" +
      date.getHours() +
      "_" +
      date.getMinutes();
    var avatarName = name + time + "." + type;
    var newPath = form.uploadDir + "/" + avatarName;
    fs.renameSync(files.file._writeStream.path, newPath); //重命名
    res.send({ data: "/images/" + avatarName });
  });
};

// PersistentFile {
//   _events: [Object: null prototype] { error: [Function (anonymous)] },
//   _eventsCount: 1,
//   _maxListeners: undefined,
//   lastModifiedDate: 2022-01-03T04:20:53.191Z,
//   filepath: 'D:\\vue\\vue-chat\\chat\\server\\public\\images\\f5418a1b5a36ac047b4cb6700',
//   newFilename: 'f5418a1b5a36ac047b4cb6700',
//   originalFilename: '1.jpg',
//   mimetype: 'image/jpeg',
//   hashAlgorithm: false,
//   size: 5178,
//   _writeStream: WriteStream {
//     _writableState: WritableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       finalCalled: true,
//       needDrain: false,
//       ending: true,
//       ended: true,
//       finished: true,
//       destroyed: false,
//       decodeStrings: true,
//       defaultEncoding: 'utf8',
//       length: 0,
//       writing: false,
//       corked: 0,
//       sync: false,
//       bufferProcessing: false,
//       onwrite: [Function: bound onwrite],
//       writecb: null,
//       writelen: 0,
//       afterWriteTickInfo: null,
//       buffered: [],
//       bufferedIndex: 0,
//       allBuffers: true,
//       allNoop: true,
//       pendingcb: 0,
//       prefinished: true,
//       errorEmitted: false,
//       emitClose: true,
//       autoDestroy: true,
//       errored: null,
//       closed: false
//     },
//     _events: [Object: null prototype] { error: [Function (anonymous)] },
//     _eventsCount: 1,
//     _maxListeners: undefined,
//     path: 'D:\\vue\\vue-chat\\chat\\server\\public\\images\\f5418a1b5a36ac047b4cb6700',
//     fd: 4,
//     flags: 'w',
//     mode: 438,
//     start: undefined,
//     autoClose: true,
//     pos: undefined,
//     bytesWritten: 5178,
//     closed: false,
//     [Symbol(kFs)]: {
//       appendFile: [Function: appendFile],
//       appendFileSync: [Function: appendFileSync],
//       access: [Function: access],
//       accessSync: [Function: accessSync],
//       chown: [Function: chown],
//       chownSync: [Function: chownSync],
//       chmod: [Function: chmod],
//       chmodSync: [Function: chmodSync],
//       close: [Function: close],
//       closeSync: [Function: closeSync],
//       copyFile: [Function: copyFile],
//       copyFileSync: [Function: copyFileSync],
//       createReadStream: [Function: createReadStream],
//       createWriteStream: [Function: createWriteStream],
//       exists: [Function: exists],
//       existsSync: [Function: existsSync],
//       fchown: [Function: fchown],
//       fchownSync: [Function: fchownSync],
//       fchmod: [Function: fchmod],
//       fchmodSync: [Function: fchmodSync],
//       fdatasync: [Function: fdatasync],
//       fdatasyncSync: [Function: fdatasyncSync],
//       fstat: [Function: fstat],
//       fstatSync: [Function: fstatSync],
//       fsync: [Function: fsync],
//       fsyncSync: [Function: fsyncSync],
//       ftruncate: [Function: ftruncate],
//       ftruncateSync: [Function: ftruncateSync],
//       futimes: [Function: futimes],
//       futimesSync: [Function: futimesSync],
//       lchown: [Function: lchown],
//       lchownSync: [Function: lchownSync],
//       lchmod: undefined,
//       lchmodSync: undefined,
//       link: [Function: link],
//       linkSync: [Function: linkSync],
//       lstat: [Function: lstat],
//       lstatSync: [Function: lstatSync],
//       lutimes: [Function: lutimes],
//       lutimesSync: [Function: lutimesSync],
//       mkdir: [Function: mkdir],
//       mkdirSync: [Function: mkdirSync],
//       mkdtemp: [Function: mkdtemp],
//       mkdtempSync: [Function: mkdtempSync],
//       open: [Function: open],
//       openSync: [Function: openSync],
//       opendir: [Function: opendir],
//       opendirSync: [Function: opendirSync],
//       readdir: [Function: readdir],
//       readdirSync: [Function: readdirSync],
//       read: [Function: read],
//       readSync: [Function: readSync],
//       readv: [Function: readv],
//       readvSync: [Function: readvSync],
//       readFile: [Function: readFile],
//       readFileSync: [Function: readFileSync],
//       readlink: [Function: readlink],
//       readlinkSync: [Function: readlinkSync],
//       realpath: [Function],
//       realpathSync: [Function],
//       rename: [Function: rename],
//       renameSync: [Function: renameSync],
//       rm: [Function: rm],
//       rmSync: [Function: rmSync],
//       rmdir: [Function: rmdir],
//       rmdirSync: [Function: rmdirSync],
//       stat: [Function: stat],
//       statSync: [Function: statSync],
//       symlink: [Function: symlink],
//       symlinkSync: [Function: symlinkSync],
//       truncate: [Function: truncate],
//       truncateSync: [Function: truncateSync],
//       unwatchFile: [Function: unwatchFile],
//       unlink: [Function: unlink],
//       unlinkSync: [Function: unlinkSync],
//       utimes: [Function: utimes],
//       utimesSync: [Function: utimesSync],
//       watch: [Function: watch],
//       watchFile: [Function: watchFile],
//       writeFile: [Function: writeFile],
//       writeFileSync: [Function: writeFileSync],
//       write: [Function: write],
//       writeSync: [Function: writeSync],
//       writev: [Function: writev],
//       writevSync: [Function: writevSync],
//       Dir: [class Dir],
//       Dirent: [class Dirent],
//       Stats: [Function: Stats],
//       ReadStream: [Getter/Setter],
//       WriteStream: [Getter/Setter],
//       FileReadStream: [Getter/Setter],
//       FileWriteStream: [Getter/Setter],
//       _toUnixTimestamp: [Function: toUnixTimestamp],
//       F_OK: 0,
//       R_OK: 4,
//       W_OK: 2,
//       X_OK: 1,
//       constants: [Object: null prototype],
//       promises: [Getter]
//     },
//     [Symbol(kCapture)]: false,
//     [Symbol(kIsPerformingIO)]: false
//   },
//   hash: null,
//   [Symbol(kCapture)]: false
// }