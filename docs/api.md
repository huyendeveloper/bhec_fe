## API wrapper
```javascript
const {api} from "~/lib/api";

// Là wrapper handle api request
// Ngoài api.post() có thể dùng  api.get() api.put() api.delete()

const [data, errors] = await api.post("sign_in", {
  email: "foo@example.com",
  password: "barbaz",
});

if (errors.length) {
  trường hợp có lỗi có thể dùng nguyên chuỗi để trả về cho client
  return errors.map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
}

```

## Response 

- Trả về JSON 
- `data` trả về response
- `errors` trả về lỗi 

vd: dưới đây sẽ là response cho trường hợp sign_in (/users/sign_in)

```json
{
    "data": {
        "id": 68,
        "email": "bhec@gmail.com",
        "created_at": "2021-08-13T05:06:18.794Z",
        "updated_at": "2021-08-21T05:59:35.814Z",
        "name": null,
        "name_kana": null,
        "phone_no": null,
        "dob": null,
        "gender": null,
        "company_name": null,
        "company_address": null,
        "zipcode": null,
        "city": null,
        "district": null,
    },
    "errors": [
        { "message": "error message"},
    ],
    "other": 1
}
```

Cách request sẽ như sau : 

```javascript
import {api} from "~/lib/api";

const [result, errors] = api("/users/sign_in", {
    /* params */
});
```

trường hợp này giá trị `result` như sau:

```json
{
    "id": 68,
    "email": "bhec@gmail.com",
    "created_at": "2021-08-13T05:06:18.794Z",
    "updated_at": "2021-08-21T05:59:35.814Z",
    "name": null,
    "name_kana": null,
    "phone_no": null,
    "dob": null,
    "gender": null,
    "company_name": null,
    "company_address": null,
    "zipcode": null,
    "city": null,
    "district": null,
}
```
> chú ý chỉ trả về nội dung ứng với key data của response

giá trị `errors` như sau

```json
[
    { "message": "error1", "extensions": {} },
    { "message": "予期しないエラーが発生しました" }
]
```

## Hiển thị loading 

Trường hợp muốn hiển thị loading thì thêm `{ progress: true }` vào tham số thứ 3 của request

```javascript
const [data, errors] = await api.post(
  "url",
  { /* some variables */ },
  { progress: true }
);
```
