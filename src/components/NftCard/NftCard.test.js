import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NftCard from './NftCard';

const mockNft = {
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
};

test('<NftCard />: takes a snapshot', () => {
  const { asFragment } = render(<NftCard />);
  expect(asFragment(<NftCard />)).toMatchSnapshot();
});

test('<NftCard />: checks for correct name on NFT title', () => {
  render(<NftCard {...mockNft} />);
  expect(screen.getByRole('heading')).toHaveTextContent('Random NFT');
});

test('<NftCard />: checks for correct modal information and open/close on click', async () => {
  render(<NftCard {...mockNft} />);
  userEvent.click(screen.getByRole('heading'));
  await waitFor(() =>
    expect(
      screen.getByText("Description: This NFT is the bee's knees")
    ).toBeInTheDocument()
  );
  userEvent.click(screen.getByText("Description: This NFT is the bee's knees"));
  await waitFor(() =>
    expect(
      screen.queryByText("Description: This NFT is the bee's knees")
    ).not.toBeInTheDocument()
  );
});
