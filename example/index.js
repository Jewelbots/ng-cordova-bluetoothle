//TODO possibly issue with unsubscribe when not subscribeable
//TODO add log to app

angular.module('myApp', ['ionic', 'ngCordovaBluetoothLE'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app', {
    abstract: true,
    templateUrl: ''
  })

  .state('home', {
    parent: 'app',
    url: '/',
    controller: "HomeCtrl",
    templateUrl: "home.html",
  })

  .state('device', {
    url: '/:address',
    templateUrl: 'device.html',
    controller: "DeviceCtrl"
  })

  .state('service', {
    url: '/:address/:serviceUuid',
    templateUrl: 'service.html',
    controller: "ServiceCtrl"
  })

  .state('characteristic', {
    url: '/:address/:serviceUuid/:characteristicUuid',
    templateUrl: 'characteristic.html',
    controller: "CharacteristicCtrl"
  });

  $urlRouterProvider.otherwise('/');
})

.controller('HomeCtrl', function($scope, $rootScope, $state, $cordovaBluetoothLE) {
  $rootScope.devices = {};

  $scope.goToDevice = function(device) {
    $state.go("device", {address:device.address});
  };

  $scope.isEmpty = function() {
    if (Object.keys($rootScope.devices).length === 0) {
      return true;
    }
    return false;
  };

  $rootScope.initialize = function() {
    var params = {request:true};

    console.log("Initialize : " + JSON.stringify(params));

    $cordovaBluetoothLE.initialize(params).then(null, initializeError, initializeSuccess);
  };

  function initializeSuccess(obj) {
    console.log("Initialize Success : " + JSON.stringify(obj));

    if (obj.status == "enabled")
    {
      console.log("Enabled");
    }
    else
    {
      console.log("Unexpected Initialize Status");
    }
  }

  function initializeError(obj) {
    console.log("Initialize Error : " + JSON.stringify(obj));
  }

  $rootScope.enable = function() {
    console.log("Enable");

    $cordovaBluetoothLE.enable().then(enableSuccess, enableError);
  };

  function enableSuccess(obj) {
    console.log("Enable Success : " + JSON.stringify(obj));

    if (obj.status == "enabled")
    {
      console.log("Enabled");
    }
    else
    {
      console.log("Unexpected Enable Status");
    }
  }

  function enableError(obj) {
    console.log("Enable Error : " + JSON.stringify(obj));
  }

  $rootScope.disable = function() {
    console.log("Disable");

    $cordovaBluetoothLE.disable().then(disableSuccess, disableError);
  };

  function disableSuccess(obj) {
    console.log("Disable Success : " + JSON.stringify(obj));

    if (obj.status == "disabled")
    {
      console.log("Disabled");
    }
    else
    {
      console.log("Unexpected Disable Status");
    }
  }

  function disableError(obj) {
    console.log("Disable Error : " + JSON.stringify(obj));
  }

  $rootScope.startScan = function() {
    var params = {serviceUuids:[], allowDuplicates: false};

    console.log("Start Scan : " + JSON.stringify(params));

    $cordovaBluetoothLE.startScan(params).then(null, startScanError, startScanSuccess);
  };

  function startScanSuccess(obj) {
    console.log("Start Scan Success : " + JSON.stringify(obj));

    if (obj.status == "scanResult")
    {
      console.log("Scan Result");

      addDevice(obj);
    }
    else if (obj.status == "scanStarted")
    {
      console.log("Scan Started");
    }
    else
    {
      console.log("Unexpected Start Scan Status");
    }
  }

  function startScanError(obj) {
    console.log("Start Scan Error : " + JSON.stringify(obj));
  }

  $rootScope.stopScan = function() {
    console.log("Stop Scan");

    $cordovaBluetoothLE.stopScan().then(stopScanSuccess, stopScanError);
  };

  function stopScanSuccess(obj) {
    console.log("Stop Scan Success : " + JSON.stringify(obj));

    if (obj.status == "scanStopped")
    {
      console.log("Scan Stopped");
    }
    else
    {
      console.log("Unexpected Stop Scan Status");
    }
  }

  function stopScanError(obj) {
    console.log("Stop Scan Error : " + JSON.stringify(obj));
  }

  $rootScope.retrieveConnected = function() {
    var params = {serviceUuids:[]};

    console.log("Retrieve Connected : " + JSON.stringify(params));

    $cordovaBluetoothLE.retrieveConnected(params).then(retrieveConnectedSuccess, retrieveConnectedError);
  };

  function retrieveConnectedSuccess(obj) {
    console.log("Retrieve Connected Success : " + JSON.stringify(obj));

    for (var i = 0; i < obj.length; i++)
    {
      addDevice(obj[i]);
    }
  }

  function retrieveConnectedError(obj) {
    console.log("Retrieve Connected Error : " + JSON.stringify(obj));
  }

  $rootScope.isInitialized = function() {
    console.log("Is Initialized");

    $cordovaBluetoothLE.isInitialized().then(isInitializedSuccess, isInitializedError);
  };

  function isInitializedSuccess(obj) {
    console.log("Is Initialized Success : " + JSON.stringify(obj));

    if (obj.isInitialized)
    {
      console.log("Is Initialized : true");
    }
    else
    {
      console.log("Is Initialized : false");
    }
  }

  function isInitializedError(obj) {
    console.log("Is Initialized Error : " + JSON.stringify(obj));
  }

  $rootScope.isEnabled = function() {
    console.log("Is Enabled");

    $cordovaBluetoothLE.isEnabled().then(isEnabledSuccess, isEnabledError);
  }

  function isEnabledSuccess(obj) {
    console.log("Is Enabled Success : " + JSON.stringify(obj));

    if (obj.isEnabled)
    {
      console.log("Is Enabled : true");
    }
    else
    {
      console.log("Is Enabled : false");
    }
  }

  function isEnabledError(obj) {
    console.log("Is Enabled Error : " + JSON.stringify(obj));
  }

  $rootScope.isScanning = function() {
    console.log("Is Scanning");

    $cordovaBluetoothLE.isScanning().then(isScanningSuccess, isScanningError);
  }

  function isScanningSuccess(obj) {
    console.log("Is Scanning Success : " + JSON.stringify(obj));

    if (obj.isScanning)
    {
      console.log("Is Scanning : true");
    }
    else
    {
      console.log("Is Scanning : false");
    }
  }

  function isScanningError(obj) {
    console.log("Is Scanning Error : " + JSON.stringify(obj));
  }

  function addDevice(obj) {
    if ($rootScope.devices[obj.address] !== undefined) {
      return;
    }

    obj.services = {};
    $rootScope.devices[obj.address] = obj;
  }
})

.controller('DeviceCtrl', function($scope, $rootScope, $state, $stateParams, $ionicHistory, $cordovaBluetoothLE) {
  $scope.$on("$ionicView.beforeEnter", function () {
    if ($rootScope.devices === undefined) {
      $rootScope.devices = {};
    }
    var device = $rootScope.devices[$stateParams.address];
    if (device === undefined) {
      device = {address: "123", name: "LOL"}
      //$ionicHistory.goBack();
      //return;
    }

    $rootScope.selectedDevice = device;
  });

  $scope.goToService = function(service) {
    $state.go("service", {address:$rootScope.selectedDevice.address, serviceUuid: service.uuid});
  };

  $rootScope.connect = function(address) {
    var params = {address:address};

    console.log("Connect : " + JSON.stringify(params));

    $cordovaBluetoothLE.connect(params).then(null, connectError, connectSuccess);
  }

  function connectSuccess(obj) {
    console.log("Connect Success : " + JSON.stringify(obj));

    if (obj.status == "connected")
    {
      console.log("Connected");
    }
    else if (obj.status == "connecting")
    {
      console.log("Connecting");
    }
    else
    {
      console.log("Unexpected Connect Status");
    }
  }

  function connectError(obj) {
    console.log("Connect Error : " + JSON.stringify(obj));
  }

  $rootScope.reconnect =function(address) {
    var params = {address:address};

    console.log("Reconnect : " + JSON.stringify(params));

    $cordovaBluetoothLE.reconnect(params).then(null, reconnectError, reconnectSuccess);
  }

  function reconnectSuccess(obj) {
    console.log("Reconnect Success : " + JSON.stringify(obj));

    if (obj.status == "connected")
    {
      console.log("Connected");
    }
    else if (obj.status == "connecting")
    {
      console.log("Connecting");
    }
    else
    {
      console.log("Unexpected Reconnect Status");
    }
  }

  function reconnectError(obj) {
    console.log("Reconnect Error : " + JSON.stringify(obj));
  }

  $rootScope.disconnect = function(address) {
    var params = {address:address};

    console.log("Disconnect : " + JSON.stringify(params));

    $cordovaBluetoothLE.disconnect(params).then(null, disconnectError, disconnectSuccess);
  }

  function disconnectSuccess(obj) {
    console.log("Disconnect Success : " + JSON.stringify(obj));

    if (obj.status == "disconnected")
    {
      console.log("Disconnected");
    }
    else if (obj.status == "disconnecting")
    {
      console.log("Disconnecting");
    }
    else
    {
      console.log("Unexpected Disconnect Status");
    }
  }

  function disconnectError(obj) {
    console.log("Disconnect Error : " + JSON.stringify(obj));
  }

  $rootScope.close = function(address) {
    var params = {address:address};

    console.log("Close : " + JSON.stringify(params));

    $cordovaBluetoothLE.close(params).then(closeSuccess, closeError);

    var device = $rootScope.devices[address];
    device.services = {};
  }

  function closeSuccess(obj) {
    console.log("Close Success : " + JSON.stringify(obj));

    if (obj.status == "closed")
    {
      console.log("Closed");
    }
    else
    {
      console.log("Unexpected Close Status");
    }
  }

  function closeError(obj) {
    console.log("Close Error : " + JSON.stringify(obj));
  }

  $rootScope.discover = function(address) {
    var params = {address:address};

    console.log("Discover : " + JSON.stringify(params));

    $cordovaBluetoothLE.discover(params).then(discoverSuccess, discoverError);
  }

  function discoverSuccess(obj) {
    console.log("Discover Success : " + JSON.stringify(obj));

    if (obj.status == "discovered")
    {
      console.log("Discovered");

      var device = $rootScope.devices[obj.address];

      var services = obj.services;

      for (var i = 0; i < services.length; i++)
      {
        var service = services[i];

        $rootScope.addService(service.serviceUuid, device)

        var serviceNew = device.services[service.serviceUuid];

        var characteristics = service.characteristics;

        for (var j = 0; j < characteristics.length; j++)
        {
          var characteristic = characteristics[j];

          $rootScope.addCharacteristic(characteristic.characteristicUuid, serviceNew);

          var characteristicNew = serviceNew.characteristics[characteristic.characteristicUuid];

          var descriptors = characteristic.descriptors;

          for (var k = 0; k < descriptors.length; k++)
          {
            var descriptor = descriptors[k];

            $rootScope.addDescriptor(descriptor.descriptorUuid, characteristicNew);
          }
        }
      }
    }
    else
    {
      console.log("Unexpected Discover Status");
    }
  }

  function discoverError(obj) {
    console.log("Discover Error : " + JSON.stringify(obj));
  }

  $rootScope.addService = function(uuid, device) {
    //Check for new advertisement data?
    if (device.services[uuid] !== undefined) {
      return;
    }
    device.services[uuid] = {uuid : uuid, characteristics: {}};
  }

  $rootScope.addCharacteristic = function(uuid, service) {
    if (service.characteristics[uuid] !== undefined) {
      return;
    }
    service.characteristics[uuid] = {uuid: uuid, descriptors: {}};
  }

  $rootScope.addDescriptor = function(uuid, characteristic) {
    if (characteristic.descriptors[uuid] !== undefined) {
      return;
    }
    characteristic.descriptors[uuid] = {uuid : uuid};
  }

  $rootScope.services = function(address) {
    var params = {address:address, serviceUuids:[]};

    console.log("Services : " + JSON.stringify(params));

    $cordovaBluetoothLE.services(params).then(servicesSuccess, servicesError);
  }

  function servicesSuccess(obj) {
    console.log("Services Success : " + JSON.stringify(obj));

    if (obj.status == "services")
    {
      console.log("Services");

      var device = $rootScope.devices[obj.address];

      var services = obj.serviceUuids;

      for (var i = 0; i < services.length; i++)
      {
        $rootScope.addService(services[i], device);
      }
    }
    else
    {
      console.log("Unexpected Services Status");
    }
  }

  function servicesError(obj) {
    console.log("Services Error : " + JSON.stringify(obj));
  }

  $rootScope.characteristics = function(address, serviceUuid) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuids:[]};

    console.log($rootScope.selectedService);

    console.log("Characteristics : " + JSON.stringify(params));

    $cordovaBluetoothLE.characteristics(params).then(characteristicsSuccess, characteristicsError);
  }

  function characteristicsSuccess(obj) {
    console.log("Characteristics Success : " + JSON.stringify(obj));

    if (obj.status == "characteristics")
    {
      console.log("Characteristics");

      var device = $rootScope.devices[obj.address];
      var service = device.services[obj.serviceUuid];

      var characteristics = obj.characteristics;

      for (var i = 0; i < characteristics.length; i++)
      {
        $rootScope.addCharacteristic(characteristics[i].characteristicUuid, service);
      }
    }
    else
    {
      console.log("Unexpected Characteristics Status");
    }
  }

  function characteristicsError(obj) {
    console.log("Characteristics Error : " + JSON.stringify(obj));
  }

  $rootScope.descriptors = function(address, serviceUuid, characteristicUuid) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

    console.log("Descriptors : " + JSON.stringify(params));

    $cordovaBluetoothLE.descriptors(params).then(descriptorsSuccess, descriptorsError);
  }

  function descriptorsSuccess(obj) {
    console.log("Descriptors Success : " + JSON.stringify(obj));

    if (obj.status == "descriptors")
    {
      console.log("Descriptors");

      var device = $rootScope.devices[obj.address];
      var service = device.services[obj.serviceUuid];
      var characteristic = service.characteristics[obj.characteristicUuid];

      var descriptors = obj.descriptors;

      for (var i = 0; i < descriptors.length; i++)
      {
        $rootScope.addDescriptor(descriptors[i].descriptorUuid, characteristic);
      }
    }
    else
    {
      console.log("Unexpected Descriptors Status");
    }
  }

  function descriptorsError(obj) {
    console.log("Descriptors Error : " + JSON.stringify(obj));
  }

  $rootScope.rssi = function(address) {
    var params = {address:address};

    console.log("RSSI : " + JSON.stringify(params));

    $cordovaBluetoothLE.rssi(parmas).then(rssiSuccess, rssiError);
  }

  function rssiSuccess(obj) {
    console.log("RSSI Success : " + JSON.stringify(obj));

    if (obj.status == "rssi")
    {
      console.log("RSSI");
    }
    else
    {
      console.log("Unexpected RSSI Status");
    }
  }

  function rssiError(obj) {
    console.log("RSSI Error : " + JSON.stringify(obj));
  }

  $rootScope.mtu = function(address) {
    var params = {address:address, mtu: 10};

    console.log("MTU : " + JSON.stringify(params));

    $cordovaBluetoothLE.mtu(params).then(mtuSuccess, mtuError);
  }

  function mtuSuccess(obj) {
    console.log("MTU Success : " + JSON.stringify(obj));

    if (obj.status == "mtu")
    {
      console.log("MTU");
    }
    else
    {
      console.log("Unexpected MTU Status");
    }
  }

  function mtuError(obj) {
    console.log("MTU Error : " + JSON.stringify(obj));
  }

  $rootScope.isConnected = function(address) {
    var params = {address:address};

    console.log("Is Connected : " + JSON.stringify(params));

    $cordovaBluetoothLE.isConnected(params).then(isConnectedSuccess, isConnectedError);
  }

  function isConnectedSuccess(obj) {
    console.log("Is Connected Success : " + JSON.stringify(obj));

    if (obj.isConnected)
    {
      console.log("Is Connected : true");
    }
    else
    {
      console.log("Is Connected : false");
    }
  }

  function isConnectedError(obj) {
    console.log("Is Connect Error : " + JSON.stringify(obj));
  }

  $rootScope.isDiscovered = function(address) {
    var params = {address:address};

    console.log("Is Discovered : " + JSON.stringify(params));

    $cordovaBluetoothLE.isDiscovered(params).then(isDiscoveredSuccess, isDiscoveredError);
  }

  function isDiscoveredSuccess(obj) {
    console.log("Is Discovered Success : " + JSON.stringify(obj));

    if (obj.isDiscovered)
    {
      console.log("Is Discovered : true");
    }
    else
    {
      console.log("Is Discovered : false");
    }
  }

  function isDiscoveredError(obj) {
    console.log("Is Discovered Error : " + JSON.stringify(obj));
  }

  $rootScope.requestConnectionPriority = function(address) {
    var params = {address:address, connectionPriority:"high"};

    console.log("Request Connection Priority : " + JSON.stringify(params));

    $cordovaBluetoothLE.requestConnectionPriority(params).then(requestConnectionPrioritySuccess, requestConnectionPriorityError);
  }

  function requestConnectionPrioritySuccess(obj) {
    console.log("Request Connection Priority Success : " + JSON.stringify(obj));

    if (obj.status == "connectionPriorityRequested")
    {
      console.log("ConnectionPriorityRequested");
    }
    else
    {
      console.log("Unexpected Request Connection Priority Status");
    }
  }

  function requestConnectionPriorityError(obj) {
    console.log("Request Connection Priority Error : " + JSON.stringify(obj));
  }

  $rootScope.read = function(address, serviceUuid, characteristicUuid) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

    console.log("Read : " + JSON.stringify(params));

    $cordovaBluetoothLE.read(params).then(readSuccess, readError);
  }

  function readSuccess(obj) {
    console.log("Read Success : " + JSON.stringify(obj));

    if (obj.status == "read")
    {
      //var bytes = $cordovaBluetoothLE.encodedStringToBytes(obj.value);
      //console.log("Read : " + bytes[0]);

      console.log("Read");
    }
    else
    {
      console.log("Unexpected Read Status");
    }
  }

  function readError(obj) {
    console.log("Read Error : " + JSON.stringify(obj));
  }

  $rootScope.subscribe = function(address, serviceUuid, characteristicUuid) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

    console.log("Subscribe : " + JSON.stringify(params));

    $cordovaBluetoothLE.subscribe(params).then(null, subscribeError, subscribeSuccess);
  }

  function subscribeSuccess(obj) {
    console.log("Subscribe Success : " + JSON.stringify(obj));

    if (obj.status == "subscribedResult")
    {
      console.log("Subscribed Result");
    }
    else if (obj.status == "subscribed")
    {
      console.log("Subscribed");
    }
    else
    {
      console.log("Unexpected Subscribe Status");
    }
  }

  function subscribeError(obj) {
    console.log("Subscribe Error : " + JSON.stringify(obj));
  }

  $rootScope.unsubscribe = function(address, serviceUuid, characteristicUuid) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

    console.log("Unsubscribe : " + JSON.stringify(params));

    $cordovaBluetoothLE.unsubscribe(params).then(unsubscribeSuccess, unsubscribeError);
  }

  function unsubscribeSuccess(obj) {
    console.log("Unsubscribe Success : " + JSON.stringify(obj));

    if (obj.status == "unsubscribed")
    {
      console.log("Unsubscribed");
    }
    else
    {
      console.log("Unexpected Unsubscribe Status");
    }
  }

  function unsubscribeError(obj) {
    console.log("Unsubscribe Error : " + JSON.stringify(obj));
  }

  $rootScope.write =function(address, serviceUuid, characteristicUuid, value) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, value:value};

    console.log("Write : " + JSON.stringify(params));

    $cordovaBluetoothLE.write(params).then(writeSuccess, writeError);
  }

  function writeSuccess(obj) {
    console.log("Write Success : " + JSON.stringify(obj));

    if (obj.status == "written")
    {
      console.log("Written");
    }
    else
    {
      console.log("Unexpected Write Status");
    }
  }

  function writeError(obj) {
    console.log("Write Error : " + JSON.stringify(obj));
  }

  $rootScope.readDescriptor = function(address, serviceUuid, characteristicUuid, descriptorUuid) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, descriptorUuid:descriptorUuid};

    console.log("Read Descriptor : " + JSON.stringify(params));

    $cordovaBluetoothLE.readDescriptor(params).then(readDescriptorSuccess, readDescriptorError);
  }

  function readDescriptorSuccess(obj) {
    console.log("Read Descriptor Success : " + JSON.stringify(obj));

    if (obj.status == "readDescriptor")
    {
      console.log("Read Descriptor");
    }
    else
    {
      console.log("Unexpected Read Descriptor Status");
    }
  }

  function readDescriptorError(obj) {
    console.log("Read Descriptor Error : " + JSON.stringify(obj));
  }

  $rootScope.writeDescriptor = function(address, serviceUuid, characteristicUuid, descriptorUuid, value) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, descriptorUuid:descriptorUuid, value:value};

    console.log("Write Descriptor : " + JSON.stringify(params));

    $cordovaBluetoothLE.writeDescriptor(params).then(writeDescriptorSuccess, writeDescriptorError);
  }

  function writeDescriptorSuccess(obj) {
    console.log("Write Descriptor Success : " + JSON.stringify(obj));

    if (obj.status == "writeDescriptor")
    {
      console.log("Write Descriptor");
    }
    else
    {
      console.log("Unexpected Write Descriptor Status");
    }
  }

  function writeDescriptorError(obj) {
    console.log("Write Descriptor Error : " + JSON.stringify(obj));
  }
})

.controller('ServiceCtrl', function($scope, $rootScope, $state, $stateParams, $cordovaBluetoothLE) {
  $scope.$on("$ionicView.beforeEnter", function () {
    $rootScope.selectedService = $rootScope.selectedDevice.services[$stateParams.serviceUuid];
  });

  $scope.goToCharacteristic = function(characteristic) {
    $state.go("characteristic", {address:$rootScope.selectedDevice.address, serviceUuid: $rootScope.selectedService.uuid, characteristicUuid: characteristic.uuid});
  };
})

.controller('CharacteristicCtrl', function($scope, $rootScope, $stateParams, $cordovaBluetoothLE) {
  $scope.$on("$ionicView.beforeEnter", function () {
    $scope.selectedCharacteristic = $rootScope.selectedService.characteristics[$stateParams.characteristicUuid];
  });
})

.filter('null', function() {
  return function(value) {
    if (value === null || value === undefined) {
      return "<null>";
    }
    return value;
  };
});

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number)
  {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
}
