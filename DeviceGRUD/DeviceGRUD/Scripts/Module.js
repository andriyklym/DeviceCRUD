var app = angular.module("ListDev", ['ui.bootstrap']);

app.controller("listCtrl", function ($scope, $http, DeviceService) {
    $scope.devicesData = null;
    $scope.dict = new Array();

    $scope.filteredData = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 4;
    $scope.maxSize = 3;

    $scope.sCurrentPage = 1;
    $scope.sNumPerPage = 3;
    $scope.sMaxSize = 3;



    DeviceService.GetAllRecords().then(function (d) {
        $scope.devicesData = d.data;
        Stat();

    }), function () {
        showInfo('Error reading data');
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
                showInfo("Element <b>" + $scope.Device.Name + "</b> added in category <b>" + $scope.Device.Category + "</b>");
                $scope.Clear();
                Stat();
                
            }, function errorCallback(response) {
                showInfo("Error: " + response.data.ExceptionMessage);
            });
        }
    };

    $scope.Edit = function (index) {
        var a = index + (($scope.currentPage - 1) * $scope.numPerPage);
        var data = $scope.devicesData[a];
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
                showInfo("Update success");
                $scope.devicesData = response.data;
                $scope.Clear();
            }, function errorCallback(response) {
                showInfo("Error: " + response.data.ExceptionMessage);
            });
        }
        else {
            showInfo("Enter all values");
        }
    };


    var Stat = function () {
        $scope.dict = new Array();
        $scope.devicesData.forEach(function (item, i, arr) {
            $scope.dict.push({ key: item.Category, value: 0 });
        })
        $scope.devicesData.forEach(function (item, i, arr) {
            $scope.dict.forEach(function (d, j, ar) {
                if (item.Category == d.key) {
                    d.value++;
                }
            })
        })
        $scope.dict = Unique($scope.dict);
    };

    function Unique(A) {
        var n = A.length, k = 0, B = [];
        for (var i = 0; i < n; i++) {
            var j = 0;
            while (j < k && B[j].key !== A[i].key) j++;
            if (j == k) B[k++] = A[i];
        }
        return B;
    }

    $scope.Delete = function (index) {
        var a = (index) + (($scope.currentPage-1) * $scope.numPerPage);
        $http({
            method: 'DELETE',
            url: '/api/devices/' + $scope.devicesData[a].Id,
        }).then(function successCallback(response) {
            showInfo("Delete success");
            $scope.devicesData.splice(a, 1);
            Stat();
        }, function errorCallback(response) {
            showInfo("Error: " + response.data.ExceptionMessage);
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



function showInfo(text) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = text;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}