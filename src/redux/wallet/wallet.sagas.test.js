import { runSaga } from 'redux-saga';
import * as actions from './wallet.actions';
import {
  handleSetAddressStart,
  handleGetTotalGasUsedStart,
} from './wallet.sagas';

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
    actions.getTotalGasUsedFailure(
      'Error calculating or retrieving total gas used: '
    ),
  ]);
});
