import './NftCard.css';
import NftDetailsModal from '../NftDetailsModal/NftDetailsModal';
import { useState } from 'react';

const NftCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const imageUrls = props.meta.content.reduce((prev, curr, index) => {
    return { ...prev, 
      [curr.representation]: curr.url,
    }
  }, {});

  return (
    <>
      <div className="nftcard__wrapper" onClick={() => setShowDetails(true)}>
        <div className="nftcard__info-wrapper">
          <h5>{props.meta?.name}</h5>
        </div>
        <img
          className="nftcard__img"
          src={imageUrls.PREVIEW || imageUrls.ORIGINAL}
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
