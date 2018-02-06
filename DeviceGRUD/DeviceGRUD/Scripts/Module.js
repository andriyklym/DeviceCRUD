var app = angular.module("ListDev",[]);

app.controller("listCtrl", function ($scope, $http, DeviceService) {
    $scope.devicesData = null;
    DeviceService.GetAllRecords().then(function (d) {
        $scope.devicesData = d.data;
    }),
        function () {
            alert('Error reading data');
        };

    $scope.Device =
        {
            Id: '',
            Name: '',
            Category: ''
        };

    $scope.Clear = function () {
        $scope.Device.Id = '';
        $scope.Device.Name = '';
        $scope.Device.Category = '';
    }

    $scope.Save = function () {
        if ($scope.Device.Name != '' && $scope.Device.Category != '') {
            $http({
                method: 'POST',
                url: '/api/devices',
                data: $scope.Device
            }).then(function successCallback(response) {
                $scope.devicesData.push(response.data);
                $scope.Clear();
            }, function errorCallback(response) {
                alert("Error: " + response.data.ExceptionMessage);
            });
        }
    };

    $scope.Edit = function (data) {
        $scope.Device = { Id: data.Id, Name: data.Name, Category: data.Category };
    }

    $scope.Cancel = function () {
        $scope.Clear();
    }

    $scope.Update = function () {
        if ($scope.Device.Name != '' && $scope.Device.Category != '') {
            $http({
                method: 'PUT',
                url: '/api/devices/' + $scope.Device.Id,
                data: $scope.Device
            }).then(function successCallback(response) {
                $scope.devicesData = response.data;
                $scope.Clear();
            }, function errorCallback(response) {
                alert("Error: " + response.data.ExceptionMessage);
            });
        }
        else {
            alert("Enter all values");
        }
    };

    $scope.Delete = function (index) {
        $http({
            method: 'DELETE',
            url: '/api/devices/' + $scope.devicesData[index].Id,
        }).then(function successCallback(response) {
            $scope.devicesData.splice(index, 1);
        }, function errorCallback(response) {
            alert("Error: " + response.data.ExceptionMessage);
        });
    };
});

app.factory("DeviceService", function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/api/devices');
    }
    return fac;
});