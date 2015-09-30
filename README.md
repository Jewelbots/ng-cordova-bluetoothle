# ng-cordova-bluetoothle

This wraps the [Bluetooth Low Energy Phonegap Plugin](https://github.com/randdusing/BluetoothLE) by Rand Dusing in AngularJS code so it can be used more easily in AngularJS mobile applications.



## Installation

* Install the Bluetooth LE Plugin: ``` cordova plugin add cordova-plugin-bluetoothle ```
* Install the Angular Wrapper (need to fix): ``` bower install git://github.com/randdusing/ng-cordova-bluetoothle.git#master ```



### Example App

An example app has been created using the Ionic Framework to demonstrate the functionality. It's pretty basic right now, but eventually I'd like to make it into a pretty fancy Bluetooth LE explorer. To install the example app, follow the steps below:

* Create a new Ionic Project: ionic start test tabs
* Install the Bluetooth LE plugin: cordova plugin add cordova-plugin-bluetoothle
* Install the Angular Wrapper (need to fix): bower install git://github.com/randdusing/ng-cordova-bluetoothle.git#master
* Add contents from /example to /www of the Cordova project, replacing if necessary
* Build and run the Cordova project



### Example Usage
The example app is still your best resource!

#### Initialize
```
  $cordovaBluetoothLE.initialize({request:true}).then(null,
    function(obj) {
      //Handle errors
    },
    function(obj) {
      //Handle successes
    }
  );
```

Initialize uses the notify callback to keep track of changes in the Bluetooth state (on/off).

#### Scan
```
  $cordovaBluetoothLE.startScan({serviceUuids:[]}).then(null,
    function(obj) {
      //Handle errors
      console.log(obj.message);
    },
    function(obj) {
      if (obj.status == "scanResult")
      {
        //Device found
      }
      else if (obj.status == "scanStarted")
      {
        //Scan started
      }
    }
  );
```

Scan uses the notify callback as well since multiple scanned devices may be returned.

#### Connect
```
  $cordovaBluetoothLE.connect({address:"ABCDEFG"}).then(null,
    function(obj) {
      //Handle errors
      console.log(obj.message);
    },
    function(obj) {
      if (obj.status == "connected") {
        //Device connected
      } else if (obj.status == "connecting") {
        //Device connecting
      } else {
        //Device disconnected or disconnected, handle this error
      }
    }
  );
```

Connect uses the notify callback as well since the connection state may change.



## Available Functions
For details on each function, please visit https://github.com/randdusing/BluetoothLE. A few methods require you wait for notify rather than resolve since the callback may be called multiple times: intialize, startScan, connect, reconnect, disconnect, subscribe. Enable and disable only wait for error since the "success" is returned to the initialize

$cordovaBluetoothLE.initialize(params).then(null, error, success);
$cordovaBluetoothLE.enable().then(null, error); //Android
$cordovaBluetoothLE.disable().then(null, error); //Android
$cordovaBluetoothLE.startScan(params).then(null, error, success);
$cordovaBluetoothLE.stopScan().then(success, error);
$cordovaBluetoothLE.retrieveConnected(params).then(success, error); //iOS
$cordovaBluetoothLE.connect(params).then(null, error, success);
$cordovaBluetoothLE.reconnect(params).then(null, error, success);
$cordovaBluetoothLE.disconnect(params).then(null, error, success);
$cordovaBluetoothLE.close(params).then(success, error);
$cordovaBluetoothLE.discover(params).then(success, error); //Android
$cordovaBluetoothLE.services(params).then(success, error); //iOS
$cordovaBluetoothLE.characteristics(params).then(success, error); //iOS
$cordovaBluetoothLE.descriptors(params).then(success, error); //iOS
$cordovaBluetoothLE.read(params).then(success, error);
$cordovaBluetoothLE.subscribe(params).then(null, error, success);
$cordovaBluetoothLE.unsubscribe(params).then(success, error);
$cordovaBluetoothLE.write(params).then(success, error);
$cordovaBluetoothLE.readDescriptor(params).then(success, error);
$cordovaBluetoothLE.writeDescriptor(params).then(success, error);
$cordovaBluetoothLE.rssi(params).then(success, error);
$cordovaBluetoothLE.mtu(params).then(success, error); //Android
$cordovaBluetoothLE.requestConnectionPriority(params).then(success, error); //Android
$cordovaBluetoothLE.isInitialized(params).then(success, error);
$cordovaBluetoothLE.isEnabled(params).then(success, error);
$cordovaBluetoothLE.isScanning(params).then(success, error);
$cordovaBluetoothLE.isConnected(params).then(success, error);
$cordovaBluetoothLE.isDiscovered(params).then(success, error); //Android
$cordovaBluetoothLE.encodedStringToBytes(encodedString);
$cordovaBluetoothLE.bytesToEncodedString(bytes);
$cordovaBluetoothLE.stringToBytes(string);
$cordovaBluetoothLE.bytesToString(bytes);

## Have a question or found a bug?

[Open an issue](https://github.com/jewelbots/ng-cordova-bluetoothle/issues).

## Resources

AngularJS - [http://www.angularjs.org](http://www.angularjs.org)

Apache Cordova - [http://cordova.apache.org](http://cordova.apache.org)

### License and Source

The code that powers the 'build generation' is a carbon copy (with minimal changes) of [Nic Raboy's ngCordovaBeacon project](https://github.com/nraboy/ng-cordova-beacon).  As of the Fork, it was licensed under the MIT license;  The Cordova Wrapper was written by myself, and my employer and I retain the copyright for that; but this project is also licensed under the [MIT License](LICENSE.md).

If you want to follow more of Nic's work, his blog is located [here](https://blog.nraboy.com). If you want to know more about me or Jewelbots, you can follow [Jewelbots](http://twitter.com/jewelbots) on twitter, [our Ink](https://medium.com/jewelbots-weblog), or [me](http://twitter.com/gortok).

### Contributing

