import { render } from '@testing-library/react';
import NftDetailsModal from './NftDetailsModal';

test('<NftDetailsModal />: takes a snapshot', () => {
  const { asFragment } = render(<NftDetailsModal />);
  expect(asFragment(<NftDetailsModal />)).toMatchSnapshot();
});

const mockNft = {
  id: '1',
  meta: {
    name: 'NFT',
    image: {
      url: {
        PREVIEW: 'https://example.com/preview.png',
        ORIGINAL: 'https://example.com/original.png',
      },
    },
  },
};
