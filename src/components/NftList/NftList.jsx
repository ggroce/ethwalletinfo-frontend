import './NftList.css';
import { useSelector } from 'react-redux';
import { getNfts } from '../../redux/wallet/wallet.selectors';
import NftCard from '../NftCard/NftCard';

const NftList = () => {
  const nfts = useSelector(getNfts);

  const renderNfts = () => {
    if (!nfts) {
      return <h3>Connect wallet to view NFTs</h3>;
    } else if (nfts.length === 0) {
      return <h3>No NFTs found</h3>;
    }
    return nfts.map(({ id, ...otherNftProps }) => (
      <NftCard key={id} {...otherNftProps} />
    ));
  };

  return (
    <>
      <div className="nftlist__scroll-wrapper">{renderNfts()}</div>
    </>
  );
};
export default NftList;
