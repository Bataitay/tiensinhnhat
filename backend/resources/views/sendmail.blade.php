<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1 style="text-align: center">ĐƠN HÀNG SERI SINH NHẬT NGÀY {{$date}}</h1>
    <p>Bình thân mến,</p>
    <p >Thông tin đơn hàng</p>
    <p>Tên người mua: {{$data['name']}}</p>
    <p>Số điện thoại: <a href="">{{$data['phone']}}</a></p>
    <p>Địa chỉ:{{$data['address']}}</p>
    <p>Ghi chú: {{$data['note'] ?? ''}}</p>
    <p><b>Nội dung mua:<b></p>
        @foreach ($data['ifOrder'] as $value)
            <p>Seri: {{$value['code']}} {{$value['seri']}} Mệnh giá: {{$value['displayValue']}} Giá: {{$value['price']}}</p>
        @endforeach
    <p>Phương thức thanh toán: {{$data['pay_method'] == 1 ? 'COD' : 'Chuyển khoản' }}</p>
    <p>Tổng tiền: {{$total}}</p>
</body>
</html>
