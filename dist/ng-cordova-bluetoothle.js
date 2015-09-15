
// install  :     cordova plugin add https://github.com/randdusing/BluetoothLE.git
// link     :     https://github.com/randdusing/BluetoothLE

angular.module('ngCordovaBluetoothle', [])

  .factory('$cordovaBluetoothle', ['$q', '$timeout', function($q, $timeout){
  'use strict';
    return {
      initialize: function (params) {
        var q = $q.defer();
        if (!bluetoothle) {
          q.resolve(null);
          return q.promise;
        }

        bluetoothle.initialize(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },

      enable: function () {
        var q = $q.defer();
        bluetoothle.enable(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        });
        return q.promise;
      },

      disable: function () {
        var q = $q.defer();
        bluetoothle.disable(function (result) {
          q.resolve(result);
        }, function (error){
          q.reject(error);
        });
        return q.promise;
      },
      startScan: function (params) {
        if (!params.hasOwnProperty('time')) {
          params.time = 5000;
        }
        var q = $q.defer();
        bluetoothle.startScan(function (result) {
          if (result.hasOwnProperty('status') && result.status === 'scanResult') {
            $timeout(function () {
              q.resolve(result);
            }, params.time);
          } else {
            q.notify(result);
          }
        }, function (error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      stopScan: function() {
        var q = $q.defer();
        bluetoothle.stopScan(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        });
        return q.promise;
      },
      retrieveConnected: function(params) {
        var q = $q.defer();
        bluetoothle.retrieveConnected(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      connect: function(params) {
        var q = $q.defer();
        bluetoothle.connect(function(result){
          if (result.hasOwnProperty('status') && result.status === 'connected') {
            q.resolve(result);
          }
          else if(result.hasOwnProperty('status') && result.status === 'connecting') {
            q.notify(result);
          }
          else if (result.hasOwnProperty('status') && result.status === 'disconnected') {
            q.reject(result);
          }
          else {
            q.notify(result);
          }
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      reconnect: function(params) {
        var q = $q.defer();
        bluetoothle.reconnect(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      disconnect: function(params) {
        var q = $q.defer();
        bluetoothle.disconnect(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      close: function(params) {
        var q = $q.defer();
        bluetoothle.close(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      discover: function(params) {
        var q = $q.defer();
        bluetoothle.discover(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      services: function(params) {
        var q = $q.defer();
        bluetoothle.services(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      characteristics: function(params) {
        var q = $q.defer();
        bluetoothle.characteristics(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      descriptors: function(params) {
        var q = $q.defer();
        bluetoothle.descriptors(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      read: function(params) {
        var q = $q.defer();
        bluetoothle.read(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      subscribe: function(params) {
        var q = $q.defer();
        bluetoothle.subscribe(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      unsubscribe: function(params) {
        var q = $q.defer();
        bluetoothle.unsubscribe(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      write: function(params) {
        var q = $q.defer();
        bluetoothle.write(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      readDescriptor: function(params) {
        var q = $q.defer();
        bluetoothle.readDescriptor(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      writeDescriptor: function(params) {
        var q = $q.defer();
        bluetoothle.writeDescriptor(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      rssi: function(params) {
        var q = $q.defer();
        bluetoothle.rssi(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      isInitialized: function() {
        var q = $q.defer();
        bluetoothle.isInitialized(function(result){
          q.resolve(result);
        });
        return q.promise;
      },
      isEnabled: function() {
        var q = $q.defer();
        bluetoothle.isEnabled(function(result){
          q.resolve(result);
        });
        return q.promise;
      },
      isScanning: function() {
        var q = $q.defer();
        bluetoothle.isScanning(function(result){
          q.resolve(result);
        });
        return q.promise;
      },

      isConnected: function(params) {
        var q = $q.defer();
        bluetoothle.isConnected(function(result){
          q.resolve(result);
        }, params);
        return q.promise;
      },

      isDiscovered: function(params) {
        var q = $q.defer();
        bluetoothle.isDiscovered(function(result){
          q.resolve(result);
        }, params);
        return q.promise;
      },

      requestConnectionPriority: function(params) {
        var q = $q.defer();
        bluetoothle.requestConnectionPriority(function(result){
          q.resolve(result);
        }, function(error) {
          q.reject(error);
        }, params);
        return q.promise;
      },
      /*
        params: used to find a specific device by name or address.
      */
      find: function (params) {
        var q = $q.defer();
        if ((params.hasOwnProperty('address') && params.address.length > 0) || (params.hasOwnProperty('name') && params.name.length > 0)) {
          bluetoothle.startScan(function (result) {
            if ((result.hasOwnProperty('status') && result.status === 'scanResult') && (result.hasOwnProperty('address') && result.address === params.address) || (result.hasOwnProperty('name') && result.name.toLowerCase() === params.name.toLowerCase())) {
                q.resolve(result);
            } else {
              q.notify(result);
            }
          }, function (error) {
            q.reject(error);
          }, params);
        } else {
          q.reject({ error: 'find requires \'name\' or \'address\' params ', params: params});
        }
        return q.promise;
      },

      encodedStringToBytes : function(string){
        return bluetoothle.encodedStringToBytes(string);
      },

      bytesToEncodedString : function(string) {
        return bluetoothle.bytesToEncodedString(string);
      },

      stringToBytes : function(string) {
        return bluetoothle.stringToBytes(string);
      },

      bytesToString: function(bytes) {
        return bluetoothle.bytesToString(bytes);
      }
    };
  }]);