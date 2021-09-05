const order = {
  status: {
    ordered: 0,
    shipPreparing: 1,
    arrival: 2,
  },
  label: {
    ordered: '注文完了',
    shipPreparing: '発送準備中',
    arrival: '発送済み',
  },
  paymentMethods: [
    {
      id: 1,
      label: 'クレジットカード払い',
    },
    {
      id: 2,
      label: '銀聯カード（UnionPay）払い',
    },
    {
      id: 3,
      label: 'コンビニ払い',
    },
  ],
};

export default order;
