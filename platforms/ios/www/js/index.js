/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById("verifyFP").addEventListener("click", this.verifyFingerprint.bind(this));
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

  verifyFingerprintiOS: function () {
      window.plugins.touchid.isAvailable(
          // success handler; available
          function() {
            window.plugins.touchid.didFingerprintDatabaseChange(
                function(changed) {
                  if (changed) {
                    // re-auth the user by asking for his credentials before allowing a fingerprint scan again
                    alert('Please re-authenticate')
                  } else {
                    // call the fingerprint scanner
                    window.plugins.touchid.verifyFingerprint(
                        'Scan your fingerprint please', // this will be shown in the native scanner popup
                        function() {console.log('fingerprint accepted')}, // success handler: fingerprint accepted
                        function(msg) {console.log('fingerprint not accepted')} // error handler with errorcode and localised reason
                    );
                  }
                }
            );
          },
          // error handler; not available
          function(msg) {
            // use a more traditional auth mechanism
            alert('Fingerprint is not available')
          }
      );
    },
    
  verifyFingerprintAndroid: function () {
    FingerprintAuth.isAvailable(function (result) {

      console.log("FingerprintAuth available: " + JSON.stringify(result));

      // If has fingerprint device and has fingerprints registered
      if (result.isAvailable == true && result.hasEnrolledFingerprints == true) {

        var encryptConfig = {
          clientId: "myAppName",
          username: "currentUser",
          password: "currentUserPassword",
          maxAttempts: 5,
          locale: "en_US",
          dialogTitle: "Hello to my Touch ID authentication",
          dialogMessage: "Please place your finger on your Touch ID sensor",
          dialogHint: "No one will steal your identity, promised"
        };

        // Set config and success callback
        FingerprintAuth.encrypt(encryptConfig, function(_fingerResult){
          console.log("successCallback(): " + JSON.stringify(_fingerResult));
          if (_fingerResult.withFingerprint) {
            console.log("Successfully encrypted credentials.");
            console.log("Encrypted credentials: " + result.token);
          } else if (_fingerResult.withBackup) {
            console.log("Authenticated with backup password");
          }
          // Error callback
        }, function(err){
          if (err === "Cancelled") {
            console.log("FingerprintAuth Dialog Cancelled!");
          } else {
            console.log("FingerprintAuth Error: " + err);
          }
        });
      }
    }, function (message) {
      console.log("isAvailableError(): " + message);
    });
  },
  
  verifyFingerprint: function () {
    // if IOS
    if(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)){
      this.verifyFingerprintiOS();
      // If Android
    }else if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
      this.verifyFingerprintAndroid();
      // If other OS
    }else{
      alert("There's no plugin to verify fingerprint in this platform");
    }
  }
};

app.initialize();