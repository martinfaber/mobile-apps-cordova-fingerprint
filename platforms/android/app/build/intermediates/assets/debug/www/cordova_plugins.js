cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-android-fingerprint-auth.FingerprintAuth",
    "file": "plugins/cordova-plugin-android-fingerprint-auth/www/FingerprintAuth.js",
    "pluginId": "cordova-plugin-android-fingerprint-auth",
    "clobbers": [
      "FingerprintAuth"
    ]
  },
  {
    "id": "cordova-plugin-touch-id.TouchID",
    "file": "plugins/cordova-plugin-touch-id/www/TouchID.js",
    "pluginId": "cordova-plugin-touch-id",
    "clobbers": [
      "window.plugins.touchid"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-android-fingerprint-auth": "1.4.1",
  "cordova-plugin-touch-id": "3.3.1",
  "cordova-plugin-whitelist": "1.3.3"
};
// BOTTOM OF METADATA
});