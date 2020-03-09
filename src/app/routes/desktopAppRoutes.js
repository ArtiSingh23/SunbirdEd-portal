const desktopAppHelper = require('../helpers/desktopAppHelper.js');
const crashReporter = require('../helpers/desktopCrashReporter.js');

const bodyParser = require('body-parser');
const logger = require('sb_logger_util_v2');

const multer = require('multer'),
  storage = multer.memoryStorage(),
  uploadStrategy = multer({ storage: storage }).single('upload_file_minidump');

module.exports = function (app) {
    app.post('/v1/desktop/update', bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    desktopAppHelper.getAppUpdate(), () => {
        logger.info({msg: '/v1/desktop/update called'});
    })

    app.post('/v1/desktop/upload-crash-logs', uploadStrategy, crashReporter.storeCrashLogsToAzure());
}
