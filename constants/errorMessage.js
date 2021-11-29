const errorMessage = [
  {code: 1800, message: '予期しないエラーが発生しました。'}, // Exception, Common error
  {code: 1801, message: 'Order not found'},
  {code: 1802, message: 'Shipping address is required!'},
  {code: 1803, message: 'Shipping address ID is required! You must choice a shipping address'},
  {code: 1804, message: 'Card is required!'},
  {code: 1805, message: 'Card ID is required! You must choice a Card'},
  {code: 1806, message: 'Fullname in invoice is required'},
  {code: 1807, message: 'User is required'},
  {code: 1808, message: 'You can not choice the Product of multiple Seller!'},
  {code: 1809, message: 'ERR_ORD_EXPORT_PDF'},
  {code: 1810, message: 'Quantity is required and > 0'},
  {code: 1811, message: 'この数量の在庫がありません。'},
  {code: 1812, message: 'Order quantiy > maximun quantity'},
  {code: 1813, message: 'Order can not cancel(status is delivering, canceled, received)'},
  {code: 1500, message: '予期しないエラーが発生しました。'}, // Exception, system error
  {code: 1501, message: 'You can not choice the Product of multiple Seller!'},
  {code: 1600, message: '予期しないエラーが発生しました。'}, // Exception, system error
  {code: 1601, message: 'Address not found'},
  {code: 1602, message: 'create error'},
  {code: 1603, message: 'update error'},
  {code: 1604, message: 'delete error'},
  {code: 1900, message: '予期しないエラーが発生しました。'}, // Exception, system error
  {code: 1901, message: 'not found'},
  {code: 1902, message: 'create error'},
  {code: 1903, message: 'update error'},
  {code: 1904, message: 'delete error'},
  {code: 2000, message: '予期しないエラーが発生しました。'}, // Exception, system error
  {code: 2001, message: 'not found'},
  {code: 2002, message: 'create error'},
  {code: 2003, message: 'update error'},
  {code: 2004, message: 'delete error'},
  {code: 2005, message: 'Description is required'},
  {code: 2006, message: 'Add contact product error'},
  {code: 2200, message: '予期しないエラーが発生しました。'}, // Exception, system error
  {code: 2201, message: 'not found'},
  {code: 2300, message: '該当のクーポンが見つかりませんでした。'}, // COUPON_NOT_FOUND
  {code: 2301, message: '入力されたクーポンは利用できません。'}, // COUPON_CREATE_FAILED
  {code: 2302, message: '該当のクーポンは更新できませんでした。'}, // COUPON_UPDATE_FAILED
  {code: 2303, message: '該当のクーポンは削除できませんでした。'}, // COUPON_DESTROY_FAILED
  {code: 2304, message: 'クーポンを入力してください'}, // COUPON_CODE_REQUIRE
  {code: 2305, message: '入力されたクーポンは利用期限が切れました。'}, // COUPON_CODE_EXPIRED
  {code: 2306, message: 'クーポンの利用期限が切れました。'},
  {code: 2400, message: '予期しないエラーが発生しました。'}, // Exception, system error
  {code: 2401, message: '該当のクーポンは既に登録されています。'}, // Coupon Code is already existed
  {code: 2309, message: '入力されたクーポンはまだ利用できません。'},
];

export default errorMessage;
