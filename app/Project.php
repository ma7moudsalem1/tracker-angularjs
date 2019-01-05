<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';
    protected $fillable = [
    	'name', 'user_id'
    ];

    protected $with = ['user'];
    protected $withCount = ['tasks', 'doneTasks'];

    public function tasks()
    {
    	return $this->hasMany('App\Task', 'project_id');
    }

    public function doneTasks()
    {
        return $this->hasMany('App\Task', 'project_id')->whereStatus('done');
    }

    public function user()
    {
    	return $this->belongsTo('App\User', 'user_id')->withDefault(['name' => 'unknown']);
    }

    public function getStatusAttribute()
    {
    	$tasks = $this->tasks()->count();
    	$done  = $this->tasks()->whereStatus('done')->count();
    	
    	$p 	   = 0;
    	if($tasks != 0 && $done != 0){
    		$p = ($done/$tasks) *100;
    	}
    	return round($p);
    }

}
