import { screen, fireEvent } from '@testing-library/react';
import {
  renderWithRedux,
  initialStateWalletStore,
  editWalletStore,
} from '../../test/testing.utils';
import Header from './Header';

test('<Header />: takes a snapshot', () => {
  const { asFragment } = renderWithRedux(<Header />, {
    initialState: initialStateWalletStore,
  });
  expect(
    asFragment(<Header />, {
      initialState: initialStateWalletStore,
    })
  ).toMatchSnapshot();
});

test('<Header />: address input box should update in on input correctly from handleFormChange', () => {
  renderWithRedux(<Header />, { initialState: initialStateWalletStore });

  fireEvent.change(screen.getByLabelText('address-input'), {
    target: { value: '0x123' },
  });
  expect(screen.getByLabelText('address-input')).toHaveValue('0x123');
});

test('<Header />: should display correct gas used value, (0.02 Eth), from supplied redux state', () => {
  const walletStoreWithGasUsed = editWalletStore({ totalGasUsed: 200000 });
  renderWithRedux(<Header />, { initialState: walletStoreWithGasUsed });

  expect(screen.getByRole('heading')).toHaveTextContent(
    'Total gas spent on transactions: 0.02 Eth'
  );
});
