import { screen } from '@testing-library/react';

import NftList from './NftList';

import {
  renderWithRedux,
  initialStateWalletStore,
  editWalletStore,
} from '../../test/testing.utils';

test('<NftList />: takes a snapshot', () => {
  const { asFragment } = renderWithRedux(<NftList />, {
    initialState: initialStateWalletStore,
  });
  expect(
    asFragment(<NftList />, {
      initialState: initialStateWalletStore,
    })
  ).toMatchSnapshot();
});

test('<NftList />: no wallet connected', async () => {
  renderWithRedux(<NftList />, { initialState: initialStateWalletStore });
  expect(screen.queryByText('Connect wallet to view NFTs')).toBeInTheDocument();
});

test('<NftList />: tests list with no NFTs', async () => {
  const walletStoreZeroNft = editWalletStore({ nfts: [] });

  renderWithRedux(<NftList />, { initialState: walletStoreZeroNft });
  expect(screen.queryByText('No NFTs found')).toBeInTheDocument();
});

test('<NftList />: tests list with one NFT', async () => {
  const walletStoreOneNft = editWalletStore({
    nfts: [
      {
        id: '1',
        meta: {
          name: 'Random NFT',
          description: "This NFT is the bee's knees",
          image: {
            url: {
              PREVIEW: 'https://example.com/preview.png',
              ORIGINAL: 'https://example.com/original.png',
            },
          },
        },
      },
    ],
  });

  renderWithRedux(<NftList />, { initialState: walletStoreOneNft });
  expect(screen.queryByText('No NFTs found')).not.toBeInTheDocument();
  expect(
    screen.queryByText('Connect wallet to view NFTs')
  ).not.toBeInTheDocument();
  expect(screen.queryByText('Random NFT')).toBeInTheDocument();
});
