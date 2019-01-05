<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Auth::routes();

Route::group(['middleware' => ['auth'], 'namespace' => 'Api', 'prefix' => 'api'], function(){
    Route::apiResources([
        'user'     => 'UserController',
        'project'  => 'ProjectController',
        'task'     => 'TaskController'
    ]);
    Route::get('{project}/tasks/get', 'TaskController@getProjectTasks')->name('project.tasks');
    Route::get('projects/option', 'TaskController@ProjectOption')->name('project.option');

    Route::get('dashboard', 'SettingController@dashboard')->name('dashoard');
});

Route::get('/', 'HomeController@index')->name('home');
