# mobile-apps-cordova-fingerprint
An Apache Cordova application for fingerprint authentication

## Android
To use the touch ID on an Android device, you have to install the following plugin: [cordova-plugin-android-fingerprint-auth](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth). This plugin runs on Android 6+ and references the samples on the [Android 6.0 API webpage](http://developer.android.com/about/versions/marshmallow/android-6.0.html).

To install the plugin, execute the following command in the command promt (be sure to be in the right folder): 
````shell
cordova plugin add cordova-plugin-android-fingerprint-auth
````
After a successful installation of the plugin, a global variable, named `FingerprintAuth`, will be accesible, which offers four methods:
* [isAvailable(isAvailableSuccess, isAvailableError)](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#module_fingerprintauth.isAvailable)
* [encrypt(encryptConfig, successCallback, errorCallback)](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#module_fingerprintauth.encrypt)
* [decrypt(decryptConfig, successCallback, errorCallback)](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#module_fingerprintauth.decrypt)
* [delete(deleteConfg, successCallback, errorCallback)](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#module_fingerprintauth.delete)

With `isAvailable(..)` you check if the device has fingerprint recognition. If it does and has one or more registered fingerprints, you can use the `encrypt(..)` method to show the dialog that verifies the fingerprint and encrypt some data inside that you can decrypt later using the decrypt method.

*Hint*: If you are using an emulator, you have to register a fingerprint first:
In the emulator go to `settings` - `Security & location` - `Fingerprint` and follow the instructions. To use a finger to authenticate, go to the settings of the Android emulator `Extended controls` - `Fingerprint`, choose a finger and use it via the button.   

To **authenticate**(fingerprint or backup) something with the fingerprint device, just call the `encrypt(..)` method. This method expects an object with its configuration, but for an simple authentication you just need the clientId. If you want to use more features of the encryptconfig-object, you can look it up [here](https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth#fingerprintauth-config-object).

<p align="center">
  <img src="/img/Android_2.png" width="250"/>
  <img src="/img/Android_3.png" width="250"/>
  <img src="/img/Android_1.png" width="250"/>
</p>


## iOS

<p align="center">
  <img src="/img/iOS_1.PNG" width="250"/>
  <img src="/img/iOS_2.PNG" width="250"/>
</p>

