angular
.module("doctorsApp", ["ngRoute"])
.config (($routeProvider , $locationProvider) => {
  $locationProvider.hashPrefix("");
  $routeProvider
  .when ("/" ,{
    controller: "RootCtrl",
    templateUrl: "partials/doctors.html"
  })
  .when ("/doctor/:doctorSelected",{
    controller: "PatientCtrl",
    templateUrl: "partials/patients.html"
  })

})

.controller ("RootCtrl" ,function ($scope, doctorFactory) {
  doctorFactory.getPatients ()
  .then ((value)=> {
    console.log(value)
    $scope.doctorsList = value.doctors
    // $location.path(`/doctor/${$scope.last_name}`)
  })
})
.controller ("PatientCtrl", function ($http,$scope,$routeParams){
  $scope.doctor_id = $routeParams.doctorSelected
  $http.get(`https://doctor-patient-priya.firebaseio.com/patients.json?orderBy="doctor_id"&equalTo("${$scope.doctor_id}")`)
  .then((value) => {
    console.log(value)
    $scope.patientsList = value.data
    console.log($scope.patientsList)})


  })



.factory("doctorFactory", function ($http) {
  return{ getPatients () {
            return $http.get(`https://doctor-patient-priya.firebaseio.com/.json`)
                    .then ((value) => {
                      return value.data
                     })
             }
           }
})

// .factory("patientFactory", function ($http,$scope) {
//   return {
//     getPatient (){

//       return $http.get(`https://doctor-patient-priya.firebaseio.com/.json?orderBy="doctor_id"&equalTo="${$scope.patient.doctor_id}`)
//               .then ((value)=> {
//                 console.log(data)
//               })
//     }
//   }
// })





























// angular
// .module("doctorsApp", ["ngRoute"])
// .config(($routeProvider)=>{
//   $routeProvider
//     .when("/", {
//       controller: "RootCtrl",
//       templateUrl: "partials/doctors.html"
//     })
//     .when("#/doctor:doctorSelected", {
//       controller: "PatientCtrl",
//       templateUrl: "partials/patients.html"
//     })

// })
// .controller ("RootCtrl", function ($scope, doctorFactory,$location){
//   // $scope.doctor.last_name
//   doctorFactory.getDoctor()


//     .then ((response) => {
//       // console.log(response)
//       $scope.doctorsList = response
//           // console.log($scope.doctorsList[key][i])

//         // }
// })

//   })



// .controller ("PatientCtrl", function ( $scope,$routeParams, patientFactory){
//   console.log("im in patients page")
//   patientFactory.getPatients($routeParams.doctorSelected)
//   .then(console.log)
// })


// .factory("doctorFactory", function ($http) {
//   return {
//     getDoctor() {
//       return $http.get(`https://doctor-patient-priya.firebaseio.com/.json`)
//       .then ((response)=> {
//         return response.data.doctors
//       }

//       })

//     }
//   }
// })
// .factory("patientFactory", function ($http){
//   return {
//     getPatients(doctorSelected) {
//       return $http.get(`https://doctor-patient-priya.firebaseio.com//patients.json?orderBy="doctor_id"&equalTo="${doctor_id}"`)
//       .then ((response)=>{
//         console.log("response from patientFactory", response)
//         return response
//       })
//    }
//   }
// })
