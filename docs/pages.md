# Cách tạo pages

## Đặt tên file theo convention sau foo-bar.js

Lý do đối với URL thì /foo-bar được dùng nhiều hơn /fooBar hay /foo_bar

//see https://developers.google.com/search/docs/advanced/guidelines/url-structure?visit_id=637623986983959425-1951893976&rd=1

| ??  | Tên file          | Note                                       |
| --- | ----------------- | ------------------------------------------ |
| OK  | foo.js            |                                            |
| OK  | foo-bar.js        |                                            |
| NG  | Foo.js            | Tên file dùng toàn bộ chữ thường           |
| NG  | fooBar.js         | Tên file dùng toàn bộ chữ thường           |
| NG  | foo_bar.js        | Không dùng _ mà dùng -                     |

## Đối với component được export default thì đặt tên theo rule sau

| Tên file                    | Tên component                       |
| ----------------------------| ------------------------------------|
| `pages/foo/bar/index.js`    | `FooBar`                            |
| `pages/foo/bar/baz-qux.js`  | `FooBarBazQux`                      |
| `pages/foo/[id]/index.js`   | `FooDetail`                         | 
| `pages/foo/[id]/baz-qux.js` | `FooIdBazQux`                       |
