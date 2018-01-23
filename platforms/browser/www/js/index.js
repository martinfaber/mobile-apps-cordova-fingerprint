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
        document.getElementById("verifyFP").addEventListener("click", this.verifyFingerprint);
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
                    window.plugins.touchid.verifyFingerprintWithCustomPasswordFallback(
                        'Scan your fingerprint please', // this will be shown in the native scanner popup
                        function(msg) {alert('ok: ' + msg)}, // success handler: fingerprint accepted
                        function(msg) {alert('not ok: ' + JSON.stringify(msg))} // error handler with errorcode and localised reason
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
    
  }
};

app.initialize();