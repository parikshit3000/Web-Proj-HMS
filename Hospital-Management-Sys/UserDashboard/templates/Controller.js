(function () {
  angular.module("UserApp").controller("mainController", mainController);
  angular.module("UserApp").controller("homeController", homeController);
  angular
    .module("UserApp")
    .controller("appointmentController", appointmentController);
  angular.module("UserApp").controller("historyController", historyController);
  angular.module("UserApp").controller("listController", listController);
  angular.module("UserApp").controller("profileController", profileController);

  // main controller
  mainController.$inject = ["$scope", "$http"];
  function mainController($scope, $http) {
    sessionStorage.setItem("PatientId", JSON.stringify({ id: JSON.parse(sessionStorage.getItem("PatientUsername")).username}));
    var idObj = sessionStorage.getItem("PatientId");

    // $scope.appStatus = [{id:"A1", status:"Confirmed",date:"20-10-2021"},
    // {id:"A2", status:"On Hold",date:"25-10-2021"},
    // {id:"A3", status:"Rejected",date:"29-10-2021"},
    // {id:"A4", status:"Confirmed",date:"16-11-2021"}];

    $http({
      method: "POST",
      url: "http://localhost:4100/patient/appointment_request/",
      data: idObj,
    }).then(
      function Success(response) {
        $scope.appStatus = response.data;
        console.log($scope.appStatus);
        // var Resp = $scope.myWelcome;
        // console.log(Resp[0].name);
        // $scope.PatientName = Resp[0].name;
        // sessionStorage.setItem("PatientId", JSON.stringify({"id": Resp[0].id}));
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
  }

  // home controller
  homeController.$inject = ["$scope", "$http"];
  function homeController($scope, $http) {
    var usernameObj = sessionStorage.getItem("PatientUsername");
    $scope.PatientName = "Garv Tandon";

    $http({
      method: "POST",
      url: "http://localhost:4100/patient/basic_details/",
      data: usernameObj,
    }).then(
      function Success(response) {
        $scope.myWelcome = response.data;
        console.log($scope.myWelcome);
        var Resp = $scope.myWelcome;
        console.log(Resp[0].name);
        $scope.PatientName = Resp[0].name;
        sessionStorage.setItem("PatientId", JSON.stringify({ id: Resp[0].username }));
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
  }

  // appointment controller
  appointmentController.$inject = ["$scope", "$http"];
  function appointmentController($scope, $http) {
    var usernameObj = sessionStorage.getItem("PatientUsername");
    // var Resp = [
    //   {
    //     name: "Garv Tandon",
    //     username: "Garv",
    //     phone_no: 1234567890,
    //     email: "mailofgarv@gmail.com",
    //     id: "P1",
    //   },
    // ];
    // $scope.PatientName = Resp[0].name;
    // $scope.PatientUsername = Resp[0].username;
    // $scope.PatientContact = Resp[0].phone_no;
    // $scope.PatientEmail = Resp[0].email;
    // $scope.PatientId = Resp[0].id;

    $http({
      method: "POST",
      url: "http://localhost:4100/patient/basic_details/",
      data: usernameObj,
    }).then(
      function Success(response) {
        $scope.myWelcome = response.data;
        console.log($scope.myWelcome);
        var Resp = $scope.myWelcome;
        $scope.PatientName = Resp[0].name;
        $scope.PatientUsername = Resp[0].username;
        $scope.PatientContact = Resp[0].phone_no;
        $scope.PatientEmail = Resp[0].email;
        $scope.PatientId = Resp[0].id;
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );

    $scope.inputDep = "";
    $scope.inputName = "";
    $scope.inputDid = "";
    $scope.inputProblem = "";
    // $scope.inputPayment = "";

    $scope.appointment = function () {
      console.log($scope.inputDid);

      var Did = $scope.inputDid;
      console.log(Did);
      console.log(Did.id);

      var date = document.getElementById("inputDate").value;
      var time = document.getElementById("inputTime").value;
      var appointmentObj = {
        patient_id: $scope.PatientUsername,
        doctor_id: $scope.inputName.username,
        problem: $scope.inputProblem,
        payment_status: $scope.inputPaymentpaid,
        date: date,
        time: time,
      };
      var appointmentJsn = JSON.stringify(appointmentObj);
      console.log(appointmentJsn);
      // window.alert("Appointment Confirmed");

      $http({
        method: "POST",
        url: "http://localhost:4100/appointment/patient/",
        data: appointmentJsn,
      }).then(
        function Success(response) {
          $scope.myWelcome = response.data;
          console.log($scope.myWelcome);
          window.alert($scope.myWelcome);
        },
        function Error(response) {
          $scope.myWelcome = response.statusText;
          window.alert("cannot process request");
          console.log($scope.myWelcome);
        }
      );
    };

    $scope.docNames = function () {
      var departmentJsn = JSON.stringify({ department: $scope.inputDep });
      console.log(departmentJsn);
      // $scope.depDoctors = [
      //   { name: "Dr Hardik", id: "D1" },
      //   { name: "Dr Ramesh", id: "D2" },
      //   { name: "Dr Priyanka", id: "D3" },
      // ];
      $http({
        method: "POST",
        url: "http://localhost:4100/doctor/list_by_department/",
        data: departmentJsn,
      }).then(
        function Success(response) {
          $scope.depDoctors = response.data;
          console.log($scope.depDoctors);
          console.log($scope.depDoctors[0].id);
        },
        function Error(response) {
          $scope.myWelcome = response.statusText;
          window.alert("cannot process request");
          console.log($scope.myWelcome);
        }
      );
      // }
      // $scope.docId = function() {
      // 	$scope.inputDid =
    };
  }

  // medical-history controller
  historyController.$inject = ["$scope", "$http"];
  function historyController($scope, $http) {
    var idObj = sessionStorage.getItem("PatientId");
    console.log(idObj);
    // $scope.MedicalHistory = [{doctord.name:"Dr. Garv Tandon",id:"A2", date: "29-10-2021"},
    // {doctord.name:"Dr. Parikshit Juneja",id:"A1", date: "19-09-2021"},
    // {doctord.name:"Dr. Shreyas Chitransh",id:"A3", date: "09-08-2021"},
    // {doctord.name:"Dr. Manan Pandey",id:"A4", date: "05-07-2021"}];

    $http({
      method: "POST",
      url: "http://localhost:4100/patient/medical_history/",
      data: idObj,
    }).then(
      function Success(response) {
        $scope.MedicalHistory = response.data;
        console.log($scope.MedicalHistory);
        // var Resp = $scope.myWelcome;
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
  }

  // doctors list controller
  listController.$inject = ["$scope", "$http"];
  function listController($scope, $http) {
    var usernameObj = sessionStorage.getItem("username");

    $http({
      method: "POST",
      url: "http://localhost:4100/login/",
      data: usernameObj,
    }).then(
      function Success(response) {
        $scope.myWelcome = response.data;
        console.log($scope.myWelcome);
        var Resp = $scope.myWelcome;
        if (Resp == "patient") {
          window.alert("Login Successful");
          window.location.assign("UserDashboard.html");
        } else {
          window.alert("wrong credientials");
        }
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
  }

  // profile controller
  profileController.$inject = ["$scope", "$http"];
  function profileController($scope, $http) {
    var usernameObj = sessionStorage.getItem("PatientUsername");
    // var Resp = [
    //   {
    //     name: "Garv Tandon",
    //     username: "Garv",
    //     phone_no: 1234567890,
    //     email: "mailofgarv@gmail.com",
    //     dob: "01-06-2002",
    //     weight: "50kg",
    //     height: "170cm",
    //     blood: "B+",
    //     address: "11th St, Worli Road, Mumbai",
    //   },
    // ];
    // $scope.PatientName = Resp[0].name;
    // $scope.PatientUsername = Resp[0].username;
    // $scope.PatientContact = Resp[0].phone_no;
    // $scope.PatientEmail = Resp[0].email;
    // $scope.PatientDob = Resp[0].dob;
    // $scope.PatientWeight = Resp[0].weight;
    // $scope.PatientHeight = Resp[0].height;
    // $scope.PatientBlood = Resp[0].blood;
    // $scope.PatientAddress = Resp[0].address;
    $http({
      method: "POST",
      url: "http://localhost:4100/patient/basic_details/",
      data: usernameObj,
    }).then(
      function Success(response) {
        $scope.myWelcome = response.data;
        console.log($scope.myWelcome);
        var Resp = $scope.myWelcome;
        $scope.PatientName = Resp[0].name;
        $scope.PatientUsername = Resp[0].username;
        $scope.PatientContact = Resp[0].phone_no;
        $scope.PatientEmail = Resp[0].email;
        $scope.PatientDob = Resp[0].dob;
        $scope.PatientWeight = Resp[0].weight;
        $scope.PatientHeight = Resp[0].height;
        $scope.PatientBlood = Resp[0].blood;
        $scope.PatientAddress = Resp[0].address;
      },
      function Error(response) {
        $scope.myWelcome = response.statusText;
        window.alert("cannot process request");
        console.log($scope.myWelcome);
      }
    );
  }
})();
