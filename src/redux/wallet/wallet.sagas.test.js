import { runSaga } from 'redux-saga';
import { call, put } from '@redux-saga/core/effects';
import * as actions from './wallet.actions';
import {
  handleSetAddressStart,
  handleGetTotalGasUsedStart,
} from './wallet.sagas';
import { getEthTransactions } from './wallet.utils';

test('wallet.sagas: handleSetAddressStart success', async () => {
  const dispatched = [];
  const result = await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
    },
    handleSetAddressStart,
    { payload: '0x0000000000000000000000000000000000000000' }
  ).toPromise();

  expect(dispatched).toEqual([
    actions.setAddressSuccess('0x0000000000000000000000000000000000000000'),
  ]);
});

test('wallet.sagas: handleSetAddressStart failure', async () => {
  const dispatched = [];
  const result = await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
    },
    handleSetAddressStart,
    { payload: '0x000000000000000000000000000000000000000z' }
  ).toPromise();

  expect(dispatched).toEqual([
    actions.setAddressFailure(
      'Ethereum address provided is invalid.  Please check and try again.'
    ),
  ]);
});

test('wallet.sagas: handleGetTotalGasUsedStart failure', async () => {
  const dispatched = [];

  const result = await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
    },
    handleGetTotalGasUsedStart,
    { payload: '0' }
  ).toPromise();

  expect(dispatched).toEqual([
    actions.getTotalGasUsedFailure('Error retrieving transactions: '),
  ]);
});

// test('wallet.sagas: handleGetTotalGasUsedStart success', async () => {
//   const mockTransactions = {
//     data: {
//       result: [
//         {
//           from: '0x3cd751e6b0078be393132286c442345e5dc49699',
//           gasPrice: '61154253728',
//           gasUsed: '21000',
//         },
//         {
//           from: '0x3cd751e6b0078be393132286c442345e5dc49699',
//           gasPrice: '200000000000',
//           gasUsed: '817570',
//         },
//       ],
//     },
//   };
// });
