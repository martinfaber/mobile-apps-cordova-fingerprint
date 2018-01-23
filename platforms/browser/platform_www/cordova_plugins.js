cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-touch-id/www/TouchID.js",
        "id": "cordova-plugin-touch-id.TouchID",
        "pluginId": "cordova-plugin-touch-id",
        "clobbers": [
            "window.plugins.touchid"
        ]
    },
    {
        "file": "plugins/cordova-plugin-android-fingerprint-auth/www/FingerprintAuth.js",
        "id": "cordova-plugin-android-fingerprint-auth.FingerprintAuth",
        "pluginId": "cordova-plugin-android-fingerprint-auth",
        "clobbers": [
            "FingerprintAuth"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-touch-id": "3.3.1",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-android-fingerprint-auth": "1.4.1"
}
// BOTTOM OF METADATA
});