# ng-cordova-bluetoothle

This wraps the [Bluetooth Low Energy Phonegap Plugin](https://github.com/randdusing/BluetoothLE) by Rand Dusing in AngularJS code so it can be used more easily in AngularJS mobile applications.

## Using ngCordovaBluetoothLE In Your Project

The core Apache Cordova plugin is required to use this wrapper:

```
cordova plugin add https://github.com/randdusing/BluetoothLE
```

### Example Usage

#### Scanning all BLE devices in range

```
var params = {
  request: true,
  time : 10000 //in milliseconds, time to scan defaults to 5000ms if not provided
};
$cordovaBluetoothle.startScan(params).then(function(success) {
	console.log(device.name);
	console.log(device.address);
});

```

The Scan method will stop as soon as it finds its first device. This is probably not what you want; and is a limitation of wrapping a continuous operation (like scan) into a one-time promise resolution.  This is definitely open for improvement.  I use 'find' instead to find a specific device.


#### Scanning for Specific Device using .find()
```
var params = {
  request: true, //ask user to enable bluetooth
  name: 'Jewelbot' //device name to look for
};


$ionicPlatform.ready()
        .then(function () {
          return $cordovaBluetoothle.initialize(params)
            .then(function () {
              //successfully initialized
              return $cordovaBluetoothle.find(params);
            }, function (err) {
              //error trying to initialiez
            });
        })
        .then(function (data) {
          // Scanning for specific device
          if (data.status === 'scanResult') {
            $scope.model.status = 'Found device: ' + data.name;
            $scope.model.devices.push(data);
            return $cordovaBluetoothle.stopScan();
          }
        }, function (error) {
          $scope.model.status = 'Error while scanning.' + JSON.stringify(error);
          return $cordovaBluetoothle.stopScan();
        }, function (notify) {
          // found other devices; but not the device you're looking
        })
        .then(function () {
          $scope.model.status = 'ending scan...';
          return $cordovaBluetoothle.isScanning().then(function(isScanning) {
            $scope.model.status = isScanning ? 'Scan Not Ended' : 'Scan Ended';
            if (isScanning) {
              return $cordovaBluetoothle.stopScan();
            }
          });
        });
```

#### Pairing (assumes address found during scan)

```
.controller("ExampleController", ['$cordovaBluetoothle', '$ionicPlatform', '$scope', function($cordovaBluetoothle,$ionicPlatform, $scope ) {
    
    $ionicPlatform.ready()
          .then(function () {
            return $cordovaBluetoothle.connect({address: $scope.model.address})
              .then( function (success) {
                //successfully paired
              })
              .error(function (err) {
                //error while pairing, return promise that invokes disconnect.
                return $cordovaBluetoothle.disconnect(address);
              })
              .notify(function (notify) {
                //still trying to connect. 
              });
          });```

## Available Functions

Here are a list of available functions:

```
$cordovaBluetoothle.initalize() //ios
$cordovaBluetoothle.enable() //android
$cordovaBluetoothle.disable() //android
$cordovaBluetoothle.startScan()
$cordovaBluetoothle.stopScan()
$cordovaBluetoothle.retrieveConnected()
$cordovaBluetoothle.connect()
$cordovaBluetoothle.disconnect()
$cordovaBluetoothle.reconnect()
$cordovaBluetoothle.close() // android
$cordovaBluetoothle.discover() //android
$cordovaBluetoothle.characteristics() 
$cordovaBluetoothle.descriptors() 
$cordovaBluetoothle.read() 
$cordovaBluetoothle.subscribe() 
$cordovaBluetoothle.unsubscribe() 
$cordovaBluetoothle.write()

$cordovaBluetoothle.readDescriptor()
$cordovaBluetoothle.writeDescriptor()
$cordovaBluetoothle.rssi()
$cordovaBluetoothle.isInitialized()
$cordovaBluetoothle.isEnabled()
$cordovaBluetoothle.isScanning()
$cordovaBluetoothle.isConnected()
$cordovaBluetoothle.isDiscovered()
$cordovaBluetoothle.find()
```


## Have a question or found a bug?

[Open an issue](https://github.com/jewelbots/ng-cordova-bluetoothle/issues).

## Resources

AngularJS - [http://www.angularjs.org](http://www.angularjs.org)

Apache Cordova - [http://cordova.apache.org](http://cordova.apache.org)

### License and Source

The code that powers the 'build generation' is a carbon copy (with minimal changes) of [Nic Raboy's ngCordovaBeacon project](https://github.com/nraboy/ng-cordova-beacon).  As of the Fork, it was licensed under the MIT license;  The Cordova Wrapper was written by myself, and my employer and I retain the copyright for that; but this project is also licensed under the [MIT License](LICENSE.md).

If you want to follow more of Nic's work, his blog is located [here](https://blog.nraboy.com). If you want to know more about me or Jewelbots, you can follow [Jewelbots](http://twitter.com/jewelbots) on twitter, [our Ink](https://medium.com/jewelbots-weblog), or [me](http://twitter.com/gortok).

### Contributing

