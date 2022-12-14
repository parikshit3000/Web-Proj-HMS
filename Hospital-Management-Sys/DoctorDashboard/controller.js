(function () {
  angular.module("DoctorApp").controller("mainController", mainController);
  angular.module("DoctorApp").controller("homeController", homeController);
  angular
    .module("DoctorApp")
    .controller("patientListController", patientListController);
  angular
    .module("DoctorApp")
    .controller("patientEditController", patientEditController);
  angular
    .module("DoctorApp")
    .controller("medicalReportController", medicalReportController);
  // angular.module('DoctorApp')
  // .controller('listController', listController);
  angular
    .module("DoctorApp")
    .controller("patientInfoController", patientInfoController);
  angular
    .module("DoctorApp")
    .controller("appointmentRequestController", appointmentRequestController);
  angular
    .module("DoctorApp")
    .controller("appFixedController", appFixedController);

  // main controller

  mainController.$inject = ["$scope", "$http"];
  function mainController($scope, $http) {
    var idObj = sessionStorage.setItem("doctorId",JSON.stringify({id: JSON.parse(sessionStorage.getItem("doctorUsername")).username}));
    var idObj = sessionStorage.getItem("doctorId");
    console.log(idObj);

    $http({
      method: "POST",
      url: "http://localhost:4100/appointment/doctor/requests/",
      data: idObj,
    }).then(
      function Success(response) {
        $scope.appList = response.data;
        console.log($scope.appList);
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
    $scope.view = function (id) {
      sessionStorage.setItem("id", JSON.stringify({ id: id }));
      // console.log(sessionStorage.getItem("id"));
    };
  }

  // home controller
  homeController.$inject = ["$scope", "$http"];
  function homeController($scope, $http) {
    var usernameObj = sessionStorage.getItem("doctorUsername");
    // console.log(usernameObj);

    // $scope.docDetails=[{name:"Dr. Garv",id:"123"}];
    $http({
      method: "POST",
      url: "http://localhost:4100/doctor/dashboard/",
      data: usernameObj,
    }).then(
      function Success(response) {
        $scope.docDetails = response.data;
        // console.log($scope.docDetails);
        var id = JSON.stringify({ id: $scope.docDetails[0].id });
        // console.log(id);


        // sessionStorage.setItem("doctorId", id);

        sessionStorage.setItem("doctorId",JSON.stringify({id: JSON.parse(sessionStorage.getItem("doctorUsername")).username}));
        // console.log(sessionStorage.getItem("doctorId"));
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
  }

  // patientListController
  patientListController.$inject = ["$scope", "$http"];
  function patientListController($scope, $http) {
    var idObj = sessionStorage.getItem("doctorId");
    console.log(idObj);

    // $scope.patientList=[{name:"Garv Tandon",id:"A2", gender:"Male", status: "Approved"},
    // {name:"Parikshit Juneja",id:"A1", gender:"Male", status: "Approved"},
    // {name:"Shreyas Chitransh",id:"A3", gender:"Male", status: "Approved"},
    // {name:"Manan Pandey",id:"A4", gender:"Male", status: "Rejected"}];
    $http({
      method: "POST",
      url: "http://localhost:4100/doctor/patient_list/",
      data: idObj,
    }).then(
      function Success(response) {
        $scope.patientList = response.data;
        console.log($scope.patientList);
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
  }

  // patientEditController
  patientEditController.$inject = ["$scope", "$http"];
  function patientEditController($scope, $http) {}

  appointmentRequestController.$inject = ["$scope", "$http"];
  function appointmentRequestController($scope, $http) {
    var id = sessionStorage.getItem("id");
    // console.log(id);
    // sessionStorage.removeItem("id");
    $http({
      method: "POST",
      url: "http://localhost:4100/appointment/doctor/appointment_details/",
      data: id,
    }).then(
      function Success(response) {
        $scope.appDetail = response.data;
        console.log($scope.appDetail);
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );

    $scope.regMsg = "";

    $scope.reject = function () {
      var id = JSON.parse(sessionStorage.getItem("id"));
      // console.log(id.id);
      var reg = {
        id: id.id,
        doctor_response: "rejected",
        doctor_reason: $scope.regMsg,
        status: "rejected",
      };

      $http({
        method: "POST",
        url: "http://localhost:4100/appointment/update_response/",
        data: reg,
      }).then(
        function Success(response) {
          $scope.appDetail = response.data;
          console.log($scope.appDetail);
        },
        function Error(response) {
          $scope.myWelcome = response.statusText;
          window.alert("cannot process request");
          console.log($scope.myWelcome);
        }
      );
    };

    $scope.forward = function () {
      var id = JSON.parse(sessionStorage.getItem("id"));
      // console.log(id.id);
      var reg = { id: id.id, status: "Active", doctor_response: "approved" };

      $http({
        method: "POST",
        url: "http://localhost:4100/appointment/update_response/",
        data: reg,
      }).then(
        function Success(response) {
          $scope.appDetail = response.data;
          console.log($scope.appDetail);
        },
        function Error(response) {
          $scope.myWelcome = response.statusText;
          window.alert("cannot process request");
          console.log($scope.myWelcome);
        }
      );
    };
  }

  appFixedController.$inject = ["$scope", "$http"];
  function appFixedController($scope, $http) {
    var idObj = sessionStorage.getItem("doctorId");
    console.log(idObj);

    // $scope.appFixed = [{id:"A1", patientd.name:"Parikshit Juneja", date:"20-10-2021", time:"07:00 PM", problem:"Cough"},
    // {id:"A2", patientd.name:"Garv Tandon", date:"22-10-2021", time:"05:00 PM", problem:"Cold"},
    // {id:"A3", patientd.name:"Shreyas chitransh", date:"23-10-2021", time:"11:00 AM", problem:"Fever"}]
    $http({
      method: "POST",
      url: "http://localhost:4100/appointment/doctor/live_appointments_list/",
      data: idObj,
    }).then(
      function Success(response) {
        $scope.appFixed = response.data;
        console.log($scope.appFixed);
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
    $scope.view = function (id) {
      sessionStorage.setItem("AppConfId", JSON.stringify({ id: id }));
    };
  }

  medicalReportController.$inject = ["$scope", "$http"];
  function medicalReportController($scope, $http) {
    $scope.prescription = "";
    $scope.disease = "";
    $scope.report = "";

    $scope.reportCreate = function () {
      var AppId = sessionStorage.getItem("AppConfId");
      var id = JSON.parse(AppId).id;
      console.log(id);
      var reportObj = {
        id: id,
        after_disease: $scope.disease,
        report: $scope.report,
        prescription: $scope.prescription,
        status: "Done"
      };
      $http({
        method: "POST",
        url: "http://localhost:4100/doctor/medical_report/add/",
        data: JSON.stringify(reportObj),
      }).then(
        function Success(response) {
          $scope.appDetail = response.data;
          console.log($scope.appDetail);
        },
        function Error(response) {
          $scope.myWelcome = response.statusText;
          window.alert("cannot process request");
          console.log($scope.myWelcome);
        }
      );
    };
  }

  patientInfoController.$inject = ["$scope", "$http"];
  function patientInfoController($scope, $http) {
    var AppId = sessionStorage.getItem("AppConfId");
    console.log(AppId);

    $http({
      method: "POST",
      url: "http://localhost:4100/appointment/doctor/live_appointment_details/",
      data: AppId,
    }).then(
      function Success(response) {
        $scope.patientDetail = response.data;
        console.log($scope.patientDetail);
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
  }
})();
