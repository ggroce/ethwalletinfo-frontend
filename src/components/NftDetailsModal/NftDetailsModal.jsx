import './NftDetailsModal.css';

const NftDetailsModal = ({ setShowDetails, props }) => {
  return (
    <>
      <div
        className="nftdetails__background--darken"
        onClick={() => setShowDetails(false)}
      >
        <div className="nftdetails__wrapper--center">
          <div className="nftdetails__outerwrapper">
            <div className="nftdetails__innerwrapper">
              <h5>{props?.meta.name}</h5>
              <img
                className="nftdetails__img"
                src={props?.meta.image.url.ORIGINAL}
                loading="lazy"
                title="Picture of NFT"
                alt={props?.meta.name}
              />
              <h6>From contract: {props?.contract}</h6>
              <h6>Description: {props?.meta.description}</h6>
              <h6>Minted at: {props?.mintedAt}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftDetailsModal;
