<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppreciationController;
use App\Http\Controllers\CommuneController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Login user
Route::post('login-admin', [AuthController::class, 'loginAdmin']);
Route::post('login-client', [AuthController::class, 'loginClient']);
Route::post('login-admin-postman', [AuthController::class, 'loginAdminPostman']);

// Register user
Route::post('register-client', [UserController::class, 'registerClient']);
Route::post('register-admin-coordinator', [UserController::class, 'registerAdminCoordinator']);
Route::post('register-admin-supervisor', [UserController::class, 'registerAdminSupervisor']);

// Update user
Route::patch('update-client/{id}', [UserController::class, 'updateClient'])->middleware('auth:sanctum');
Route::patch('update-coordinator/{id}', [UserController::class, 'updateAdminCoordinator'])->middleware('auth:sanctum');
Route::patch('update-supervisor/{id}', [UserController::class, 'updateSupervisor'])->middleware('auth:sanctum');

// Delete user
Route::delete('delete-client/{id}', [UserController::class, 'deleteClient'])->middleware('auth:sanctum');
Route::delete('delete-coordinator/{id}', [UserController::class, 'deleteCoordinator'])->middleware('auth:sanctum');
Route::delete('delete-supervisor/{id}', [UserController::class, 'deleteSupervisor'])->middleware('auth:sanctum');

// Logout
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Appreciation
Route::get('appreciations', [AppreciationController::class, 'getAppreciations'])->middleware('auth:sanctum');
Route::get('appreciations-client', [AppreciationController::class, 'getAppreciationByClient'])->middleware('auth:sanctum');
Route::post('create-appreciation', [AppreciationController::class, 'createAppreciation'])->middleware('auth:sanctum');

// User
Route::get('clients', [UserController::class, 'getClients'])->middleware('auth:sanctum');
Route::post('search-client', [UserController::class, 'searchClient'])->middleware('auth:sanctum');

// Commune
Route::post('search-commune', [CommuneController::class, 'searchCommune'])->middleware('auth:sanctum');

// Path file
Route::get('file/{id}/{file}', [FileController::class, 'getFile']);
Route::post('store-file', [FileController::class, 'storeFile'])->middleware('auth:sanctum');
