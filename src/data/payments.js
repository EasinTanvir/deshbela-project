const payments = [
  {
    id: "payment-1",
    membershipId: "membership-1",
    amount: 899,
    gatewayRef: "SSL-260302-48213",
    status: "PAID",
    paidAt: "2026-03-02T10:28:00+06:00",
  },
  {
    id: "payment-2",
    membershipId: "membership-2",
    amount: 99,
    gatewayRef: "SSL-260901-11872",
    status: "PAID",
    paidAt: "2026-09-01T08:58:00+06:00",
  },
  {
    id: "payment-3",
    membershipId: "membership-3",
    amount: 99,
    gatewayRef: "SSL-260801-90314",
    status: "FAILED",
    paidAt: "2026-08-01T08:51:00+06:00",
  },
  {
    id: "payment-4",
    membershipId: "membership-3",
    amount: 99,
    gatewayRef: "SSL-260801-90377",
    status: "PAID",
    paidAt: "2026-08-01T08:55:00+06:00",
  },
];

export default payments;
