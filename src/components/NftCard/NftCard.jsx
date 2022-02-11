import './NftCard.css';
import NftDetailsModal from '../NftDetailsModal/NftDetailsModal';
import { useState } from 'react';

const NftCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="nftcard__wrapper" onClick={() => setShowDetails(true)}>
        <div className="nftcard__info-wrapper">
          <h5>{props.meta?.name}</h5>
        </div>
        <img
          className="nftcard__img"
          src={props.meta?.image.url.PREVIEW || props.meta?.image.url.ORIGINAL}
          loading="lazy"
          title="Picture of NFT"
          alt={props.meta?.name}
        />
      </div>
      {showDetails && (
        <NftDetailsModal setShowDetails={setShowDetails} props={props} />
      )}
    </>
  );
};
export default NftCard;
