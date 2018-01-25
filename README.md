# mobile-apps-cordova-fingerprint
An Apache Cordova application example for fingerprint authentication as part of my "Mobile Applications" lecture.

## Android
### Installation
To use the touch ID on an Android device, you have to install the following plugin: [cordova-plugin-android-fingerprint-auth](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth). This plugin runs on Android 6+ and references the samples on the [Android 6.0 API webpage](http://developer.android.com/about/versions/marshmallow/android-6.0.html).

To install the plugin, execute the following command in the command promt (be sure to be in the right folder): 
```shell
cordova plugin add cordova-plugin-android-fingerprint-auth
```
or clone the repository:
```shell
cordova plugin add https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth.git
```

### Usage
After a successful installation of the plugin, a global variable, named `FingerprintAuth`, will be accesible, which offers four methods:
* [isAvailable(isAvailableSuccess, isAvailableError)](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#module_fingerprintauth.isAvailable)
* [encrypt(encryptConfig, successCallback, errorCallback)](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#module_fingerprintauth.encrypt)
* [decrypt(decryptConfig, successCallback, errorCallback)](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#module_fingerprintauth.decrypt)
* [delete(deleteConfg, successCallback, errorCallback)](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#module_fingerprintauth.delete)

With `isAvailable(..)` you check if the device has fingerprint recognition. If it does and has one or more registered fingerprints, you can use the `encrypt(..)` method to show the dialog that verifies the fingerprint and encrypt some data inside that you can decrypt later using the decrypt method.    
To simply **authenticate** something (via fingerprint or backup-method), just call the `encrypt(..)` method. This method expects an object with its configuration, but for an simple authentication you just need the clientId. If you want to use more features of the encryptconfig-object, you can look it up [here](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#fingerprintauth-config-object).

*Hint*: If you are using an emulator, you have to register a fingerprint first:
In the emulator go to `settings` - `Security & location` - `Fingerprint` and follow the instructions. To use a finger to authenticate, go to the settings of the Android emulator `Extended controls` - `Fingerprint`, choose a finger and use it via the button.   

### Screenshots
<p align="center">
  <img src="/img/Android_2.png" width="250" height="433"/>
  <img src="/img/Android_3.png" width="250" height="433"/>
  <img src="/img/Android_1.png" width="250" height="433"/>
</p>


## iOS
### Installation
To use the Touch ID on an iPhone, you also have to install a plugin: [cordova-plugin-touch-id](https://github.com/EddyVerbruggen/cordova-plugin-touch-id). It requires minimum iOS 8 and works on all iPhones with Touch ID (since iPhone 5s). Face ID on iPhone X is also supported.

To install the plugin, execute the following command in the command promt (be sure to be in the right folder): 
```shell
cordova plugin add cordova-plugin-touch-id
```
or clone the repository:
```shell
cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-touch-id
```

### Usage
After a succesfully installation of the plugin, an object will be registered in `window.plugins` named `touchid`, which offers some methods:
* isAvailable(isAvailableSuccess, isAvailableError)
* verifyFingerprint(textForPopup, successCallback, errorCallback)
* verifyFingerprintWithCustomPasswordFallback(textForPopup, successCallback, errorCallback)
* verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(textForPopup, textForAlternativeAutheticationMethod, successCallback, errorCallback)

With ```isAvailable``` you can check, if the device has an active/configured Touch ID. The successhandler gives you the oppertunity to get the type of the authentication method (Face ID or Touch ID). You can use it like this:
```javascript
window.plugins.touchid.isAvailable(
  function(type) {alert(type)}, // type returned to success callback: 'face' on iPhone X, 'touch' on other devices
  function(msg) {alert('not available, message: ' + msg)} // error handler: no TouchID available
);
```

The other methods are used to verify the fingerprint. They differ in their behavior, if the fingerprint gets rejected and the user gets offered a alternative method for authentication. ```verifyFingerprint(..)``` will offer the a fallback option called 'enter passcode' which shows the default passcode UI when pressed.
```javascript
window.plugins.touchid.verifyFingerprint(
  'Scan your fingerprint please', // this will be shown in the native scanner popup
   function(msg) {alert('ok: ' + msg)}, // success handler: fingerprint accepted
   function(msg) {alert('not ok: ' + JSON.stringify(msg))} // error handler with errorcode and localised reason
);
```

With ```verifyFingerprintWithCustomPasswordFallback(..)``` you can provide your own fallback option. For this you can use some information from the errorhandler: if the error code is equal -2, the user pressed the 'enter password' fallback.
```javascript
window.plugins.touchid.verifyFingerprintWithCustomPasswordFallback(
  'Scan your fingerprint please', // this will be shown in the native scanner popup
   function(msg) {alert('ok: ' + msg)}, // success handler: fingerprint accepted
   function(msg) {alert('not ok: ' + JSON.stringify(msg))} // error handler with errorcode (msg.code) and localised reason; here you can implement your own fallback option
);
```

The ```verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(..)``` method has the same functionality like ```verifyFingerprintWithCustomPasswordFallback(..)```, but with this method you can customize the the text label authentication fallback option.
```javascript
window.plugins.touchid.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
  'Scan your fingerprint please', // this will be shown in the native scanner popup
  'Enter PIN', // this will become the 'Enter password' button label
   function(msg) {alert('ok: ' + msg)}, // success handler: fingerprint accepted
   function(msg) {alert('not ok: ' + JSON.stringify(msg))} // error handler with errorcode and localised reason
);
```
### Security
Since iOS9 it's possible to check whether or not the list of enrolled fingerprints changed since the last time you checked it. It's recommended you add this check so you can counter hacker attacks to your app ([an article to this topic](https://www.linkedin.com/pulse/fingerprint-trojan-per-thorsheim)).
Because of this reason, there is the method `didF` to check, if the list of enrolled fingerprints changed since the last time.
```javascript
window.plugins.touchid.didFingerprintDatabaseChange(
    function(changed) {
        if (changed) {
            // re-auth the user by asking for his credentials before allowing a fingerprint scan again
        } else {
            // call the fingerprint scanner
        }
    }
);
```

### Screenshots
<p align="center">
  <img src="/img/iOS_1.PNG" width="250"/>
  <img src="/img/iOS_2.PNG" width="250"/>
</p>

## Sources

* [How to use fingerprint authentication in cordova (phonegap,ionic) for Android and iOS](https://ourcodeworld.com/articles/read/190/how-to-use-fingerprint-authentication-in-cordova-phonegap-ionic-for-android-and-ios)
* [EddyVerbruggen/cordova-plugin-touch-id](https://github.com/EddyVerbruggen/cordova-plugin-touch-id)
* [mjwheatley/cordova-plugin-android-fingerprint-auth](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth)

## License
<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />Dieses Werk ist lizenziert unter einer <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Namensnennung 4.0 International Lizenz</a>.
