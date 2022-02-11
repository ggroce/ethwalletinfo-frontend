import * as actions from './wallet.actions';

test('wallet.actions: resetWallet', () => {
  expect(actions.resetWallet()).toEqual({
    type: 'RESET_WALLET',
  });
});

test('wallet.actions: setAddressStart', () => {
  expect(actions.setAddressStart('0x123')).toEqual({
    type: 'SET_ADDRESS_START',
    payload: '0x123',
  });
});

test('wallet.actions: setAddressSuccess', () => {
  expect(actions.setAddressSuccess('0x123')).toEqual({
    type: 'SET_ADDRESS_SUCCESS',
    payload: '0x123',
  });
});

test('wallet.actions: setAddressFailure', () => {
  const error = new Error('test error');
  expect(actions.setAddressFailure(error)).toEqual({
    type: 'SET_ADDRESS_FAILURE',
    payload: error,
  });
});

test('wallet.actions: getTotalGasUsedStart', () => {
  expect(actions.getTotalGasUsedStart('0x123')).toEqual({
    type: 'GET_TOTAL_GAS_USED_START',
    payload: '0x123',
  });
});

test('wallet.actions: getTotalGasUsedSuccess', () => {
  expect(actions.getTotalGasUsedSuccess('2030212')).toEqual({
    type: 'GET_TOTAL_GAS_USED_SUCCESS',
    payload: '2030212',
  });
});

test('wallet.actions: getTotalGasUsedFailure', () => {
  const error = new Error('test error');
  expect(actions.getTotalGasUsedFailure(error)).toEqual({
    type: 'GET_TOTAL_GAS_USED_FAILURE',
    payload: error,
  });
});

test('wallet.actions: getNftsStart', () => {
  expect(actions.getNftsStart()).toEqual({
    type: 'GET_NFTS_START',
  });
});

test('wallet.actions: getNftsSuccess', () => {
  const nfts = [{ nft1: 'details' }, { nft2: 'details' }];
  expect(actions.getNftsSuccess(nfts)).toEqual({
    type: 'GET_NFTS_SUCCESS',
    payload: nfts,
  });
});

test('wallet.actions: getNftsFailure', () => {
  const error = new Error('test error');
  expect(actions.getNftsFailure(error)).toEqual({
    type: 'GET_NFTS_FAILURE',
    payload: error,
  });
});
