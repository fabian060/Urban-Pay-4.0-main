// Simulación rápida de la lógica de marcado de cuotas por casa
const computePaidSets = ({ pagos, houseUsers }) => {
  const userIds = new Set(houseUsers.map(u => u.id));
  const paid = new Set();
  const pending = new Set();
  for (const pago of pagos) {
    if (userIds.has(pago.user_id)) {
      if (pago.status === 'accepted') paid.add(pago.cuota_id);
      if (pago.status === 'pending') pending.add(pago.cuota_id);
    }
  }
  return { paid, pending };
};

const pagosAll = [
  { user_id: 1, cuota_id: 10, status: 'accepted' },
  { user_id: 2, cuota_id: 11, status: 'accepted' },
  { user_id: 3, cuota_id: 10, status: 'accepted' },
];

const house1Users = [{ id: 1 }, { id: 2 }];
const house2Users = [{ id: 3 }, { id: 4 }];

console.log('Pagos:', pagosAll);

console.log('\n-- Casa 1 --');
const res1 = computePaidSets({ pagos: pagosAll, houseUsers: house1Users });
console.log('Pagadas (casa 1):', Array.from(res1.paid));
console.log('Pendientes (casa 1):', Array.from(res1.pending));

console.log('\n-- Casa 2 --');
const res2 = computePaidSets({ pagos: pagosAll, houseUsers: house2Users });
console.log('Pagadas (casa 2):', Array.from(res2.paid));
console.log('Pendientes (casa 2):', Array.from(res2.pending));

// Asserts (simple)
console.log('\nAsserts:');
console.log('Casa1 debe ver cuota 10 pagada ->', res1.paid.has(10));
console.log('Casa2 NO debe ver cuota 10 pagada ->', !res2.paid.has(10));
console.log('Casa2 debe ver cuota 10 pagada si usuario 3 esta en casa2 -> testing...');

// now simulate user 3 paying cuota 10 and being in casa2
const pagosAll2 = [
  { user_id: 1, cuota_id: 10, status: 'accepted' },
  { user_id: 2, cuota_id: 11, status: 'accepted' },
  { user_id: 3, cuota_id: 12, status: 'accepted' },
];
const res2b = computePaidSets({ pagos: pagosAll2, houseUsers: house2Users });
console.log('Casa2 pagadas (después de pago de user3):', Array.from(res2b.paid));
