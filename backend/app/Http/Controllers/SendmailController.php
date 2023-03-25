<?php

namespace App\Http\Controllers;

use App\Mail\OrderShipped;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
class SendmailController extends Controller
{
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
             'name' => 'required',
             'phone' => 'required',
             'address' => 'required',
        ],[
            'name.required' => 'Vui lòng điền tên',
            'phone.required' => 'Vui lòng điền số điện thoại',
            'address.required' => 'Vui lòng điền địa chỉ',
        ]);

        if ($validator->fails()) {
            return new JsonResponse(['success' => false, 'message' => $validator->errors()], 422);
        }

        $data = $request->all();
        $email = 'ngocduongn191@gmail.com';
        try {
            if ($data) {
                Mail::to($email)->send(new OrderShipped($data));
                return new JsonResponse(
                    [
                        'success' => true,
                        'data' => $data,
                    ],
                    200
                );
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return new JsonResponse(
                [
                    'error' => true,
                    'data' => $data,
                ],
                400
            );
        }

    }
}
