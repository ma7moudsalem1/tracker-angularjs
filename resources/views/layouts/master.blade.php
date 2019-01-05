<!DOCTYPE html>
<html lang="en" ng-app="app">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="api-base-url" content="{{ url('/api') }}" />
    <title>AngularJs Tracker</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="{{ asset('temp/vendors/iconfonts/mdi/css/materialdesignicons.min.css')}}">
    <link rel="stylesheet" href="{{ asset('temp/vendors/css/vendor.bundle.base.css')}}">
    <link rel="stylesheet" href="{{ asset('temp/vendors/css/vendor.bundle.addons.css')}}">
    <!-- endinject -->
    <!-- plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="{{ asset('temp/css/style.css')}}">
    <!-- endinject -->
    <link rel="shortcut icon" href="{{ asset('temp/images/favicon.png')}}" />
</head>

<body>

<div class="container-scroller">
    @include('layouts.nav')
    <div class="container-fluid page-body-wrapper">
        @include('layouts.sidebar')
        <div class="main-panel">
            <div class="content-wrapper">
                <div ng-view></div>
            </div>
        </div>

    </div>
</div>

<!-- plugins:js -->
<script src="{{ asset('temp/vendors/js/vendor.bundle.base.js')}}"></script>
<script src="{{ asset('temp/vendors/js/vendor.bundle.addons.js')}}"></script>
<!-- endinject -->
<!-- Plugin js for this page-->
<!-- End plugin js for this page-->
<!-- inject:js -->
<script src="{{ asset('temp/js/off-canvas.js')}}"></script>
<script src="{{ asset('temp/js/misc.js')}}"></script>
<!-- endinject -->
<!-- Custom js for this page-->
<script src="{{ asset('temp/js/dashboard.js')}}"></script>
<!-- End custom js for this page-->
<script type="text/javascript" src="{{ asset('temp/js/sweetalert2.all.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('sys/core/angular.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('sys/core/angular-route.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('sys/app.js')}}"></script>
<script type="text/javascript" src="{{ asset('sys/controllers.js')}}"></script>
</body>

</html>