import './NftDetailsModal.css';

const NftDetailsModal = ({ setShowDetails, props }) => {
    const imageUrls = props?.meta?.content?.reduce((prev, curr, index) => {
    return { ...prev, 
      [curr?.representation]: curr?.url,
    }
  }, {});

  return (
    <>
      <div
        className="nftdetails__background--darken"
        onClick={() => setShowDetails(false)}
      >
        <div className="nftdetails__wrapper--center">
          <div className="nftdetails__outerwrapper">
            <div className="nftdetails__innerwrapper">
              <h5>{props?.meta?.name || 'Name N/A'}</h5>
              <img
                className="nftdetails__img"
                src={imageUrls?.ORIGINAL}
                loading="lazy"
                title="Picture of NFT"
                alt={props?.meta?.name || 'Name N/A'}
              />
              <h6>From contract: {props?.contract}</h6>
              <h6>Description: {props?.meta?.description || 'Description N/A'}</h6>
              <h6>Minted at: {props?.mintedAt}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftDetailsModal;
