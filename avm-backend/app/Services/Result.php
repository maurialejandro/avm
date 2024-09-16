<?php

namespace App\Services;

class Result
{
    protected $value;
    private $error;
    private $isSuccess;

    public function __construct($value = null, $error = null, $isSuccess = true)
    {
        $this->value = $value;
        $this->error = $error;
        $this->isSuccess = $isSuccess;
    }

    public static function success($value)
    {
        return new self($value, null, true);
    }

    public function failure($error)
    {
        return new self(null, $error, false);
    }

    public function isSuccess()
    {
        return $this->isSuccess;
    }

    public function isFailure()
    {
        return !$this->isSuccess;
    }

    public function getValue()
    {
        if($this->isFailure()){
            throw new \Exception("Cannot get value from failure result");
        }
        return $this->value;
    }

    public function getError(){
        if($this->isFailure()){
            throw new \Exception("Cannot get error from failure result");
        }
        return $this->error;
    }

}
