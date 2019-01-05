var mainController = angular.module("mainController",[]);
var baseUrl        = document.head.querySelector('meta[name="api-base-url"]').content;

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

// Dashboard
mainController.controller("DashboardController", function  ($scope,$http) {

    $http.get(baseUrl + '/dashboard').then(function(jsonData){
        $scope.stats = jsonData.data;
    });

});

// Users
mainController.controller("UserController", function  ($scope,$http) {
    // Determine if is create or update type.
    $scope.isCreate = true;

    $scope.form   = {
        'name': '',
        'email': '',
        'password': '',
        'type': ''
    };

    // Get All Users
    $http.get(baseUrl + '/user').then(function(jsonData){
        $scope.users = jsonData.data;
    });


    /* Functions */

    // Reset Form
    $scope.resetForm = function(){
        $scope.form   = {
            'name': '',
            'email': '',
            'password': '',
            'type': ''
        };
    };

    // Open Modal For Create
    $scope.openCreateModal = function(){
        $scope.isCreate = true;
        $scope.resetForm();
        $('#modalData').modal();
    };

    // Open model For Edit
    $scope.openEditModal = function(user){
        $scope.isCreate = false;
        $http.get(baseUrl + '/user/' + user.id).then(function(jsonData){
            $scope.form = jsonData.data;
            $scope.editingIndex = $scope.users.indexOf(user);
            $('#modalData').modal();
        });
    };

    // Create User
    $scope.createUser = function(){
        $http.post(baseUrl + '/user', $scope.form).then(function(jsonData){
            $scope.users.unshift(jsonData.data);
            $('#modalData').modal('hide');
            toast({
                type: 'success',
                title: 'User created successfully'
            });
        });
    };

    // Update User
    $scope.UpdateUser = function(){
        $http.patch(baseUrl + '/user/' + $scope.form.id, $scope.form).then(function(jsonData){
            $('#modalData').modal('hide');
            $scope.users[$scope.editingIndex] = jsonData.data;
            toast({
                type: 'success',
                title: 'User Updated successfully'
            });
        });
    };

    // Delete User
    $scope.deleteUser = function (id, index) {
        Swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $http.delete(baseUrl + '/user/' + id).then(() => {
                    Swal(
                        'Deleted!',
                        'the user has been deleted.',
                        'success'
                    )
                    $scope.users.splice(index, 1);
                }).catch(() => {
                    Swal(
                        'Failed!',
                        'Something went wrong.',
                        'warning'
                    )
                });

            }
        });
    }


});

// Projects
mainController.controller("ProjectController", function  ($scope,$http) {

    // Determine if is create or update type.
    $scope.isCreate = true;

    $scope.form   = {
        'name': '',
    };

    // Get All Projects
    $http.get(baseUrl + '/project').then(function(jsonData){
        $scope.projects = jsonData.data;
    });

    /* Functions */

    // Calculte project status
    $scope.clcStatus = function (task, done) {
        if(done == 0 || task == 0){
            return 0;
        }
        return Math.round((done / task) * 100);
    }

    // Reset Form
    $scope.resetForm = function(){
        $scope.form   = {
            'name': '',
        };
    };

    // Open Modal For Create
    $scope.openCreateModal = function(){
        $scope.isCreate = true;
        $scope.resetForm();
        $('#modalData').modal();
    };

    // Open model For Edit
    $scope.openEditModal = function(project){
        $scope.isCreate = false;
        $http.get(baseUrl + '/project/' + project.id).then(function(jsonData){
            $scope.form = jsonData.data;
            $scope.editingIndex = $scope.projects.indexOf(project);
            $('#modalData').modal();
        });
    };

    // Create Project
    $scope.createProject = function(){
        $http.post(baseUrl + '/project', $scope.form).then(function(jsonData){
            $scope.projects.unshift(jsonData.data);
            $('#modalData').modal('hide');
            toast({
                type: 'success',
                title: 'Project created successfully'
            });
        });
    };

    // Update Project
    $scope.UpdateProject = function(){
        $http.patch(baseUrl + '/project/' + $scope.form.id, $scope.form).then(function(jsonData){
            $('#modalData').modal('hide');
            $scope.projects[$scope.editingIndex] = jsonData.data;
            toast({
                type: 'success',
                title: 'Project Updated successfully'
            });
        });
    };

    // Delete Project
    $scope.deleteProject = function (id, index) {
        Swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $http.delete(baseUrl + '/project/' + id).then(() => {
                    Swal(
                        'Deleted!',
                        'the project has been deleted.',
                        'success'
                    )
                    $scope.projects.splice(index, 1);
                }).catch(() => {
                    Swal(
                        'Failed!',
                        'Something went wrong.',
                        'warning'
                    )
                });

            }
        });
    }


});

// Tasks
mainController.controller("TaskController", ['$scope','$routeParams','$http',function  ($scope,$routeParams,$http) {
    $scope.project_id = $routeParams.id;

    // Determine if is create or update type.
    $scope.isCreate = true;

    $scope.form   = {
        'name': '',
        'comment': '',
        'project_id': $scope.project_id,
        'status': ''
    };

    // Get All Tasks
    $http.get(baseUrl + '/' +$scope.project_id + '/tasks/get').then(function(jsonData){
        $scope.tasks = jsonData.data;
    });

    /* Functions */

    // Reset Form
    $scope.resetForm = function(){
        $scope.form   = {
            'name': '',
            'comment': '',
            'project_id': $scope.project_id,
            'status': ''
        };
    };

    // Open Modal For Create
    $scope.openCreateModal = function(){
        $scope.isCreate = true;
        $scope.resetForm();
        $('#modalData').modal();
    };

    // Open model For Edit
    $scope.openEditModal = function(task){
        $scope.isCreate = false;
        $http.get(baseUrl + '/task/' + task.id).then(function(jsonData){
            $scope.form = jsonData.data;
            $scope.editingIndex = $scope.tasks.indexOf(task);
            $('#modalData').modal();
        });
    };


    // Create Task
    $scope.createTask = function(){
        $http.post(baseUrl + '/task', $scope.form).then(function(jsonData){
            $scope.tasks.length == 0 ? $scope.tasks.push(jsonData.data) : $scope.tasks.unshift(jsonData.data);
            $('#modalData').modal('hide');
            toast({
                type: 'success',
                title: 'Task created successfully'
            });
        });
    };

    // Update Task
    $scope.UpdateTask = function(){
        $http.patch(baseUrl + '/task/' + $scope.form.id, $scope.form).then(function(jsonData){
            $('#modalData').modal('hide');
            $scope.tasks[$scope.editingIndex] = jsonData.data;
            toast({
                type: 'success',
                title: 'Task Updated successfully'
            });
        });
    };

    // Delete Task
    $scope.deleteTask = function (id, index) {
        Swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $http.delete(baseUrl + '/task/' + id).then(() => {
                    Swal(
                        'Deleted!',
                        'the task has been deleted.',
                        'success'
                    )
                    $scope.tasks.splice(index, 1);
                }).catch(() => {
                    Swal(
                        'Failed!',
                        'Something went wrong.',
                        'warning'
                    )
                });

            }
        });
    }


}]);