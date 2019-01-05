<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    protected $fillable = [
    	'name', 'project_id', 'status', 'comment'
    ];

    protected $with = ['project'];

    public function project()
    {
    	return $this->belongsTo('App\Project', 'project_id');
    }
}
