import { validateAddress } from './wallet.utils';

test('wallet.utils: validateAddress() testing valid address', () => {
  expect(validateAddress('0x0000000000000000000000000000000000000000')).toBe(
    '0x0000000000000000000000000000000000000000'
  );
});

test('wallet.utils: validateAddress() testing valid address sans beginning "0x"', () => {
  expect(validateAddress('0000000000000000000000000000000000000000')).toBe(
    '0x0000000000000000000000000000000000000000'
  );
});

test('wallet.utils: validateAddress() testing invalid address', () => {
  const correctError = new Error(
    'Ethereum address provided is invalid.  Please check and try again.'
  );
  expect(() =>
    validateAddress('0x000000000000000000000000000000000000000z')
  ).toThrow(correctError);
});
