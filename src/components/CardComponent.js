import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import backCard from "../../public/backcard.png";

class CardComponent extends React.Component {
  render() {
    const {
      handleChange,
      cardInfo: { flipped, content, id, win }
    } = this.props;

    return (
      <div className="card">
        <Flippy
          className="flippyContainer"
          style={{ display: "block", width: "150px", height: "210px" }}
          isFlipped={flipped}
        >
          <FrontSide
            onClick={handleChange.bind(null, id)}
            className="containerFrontSide"
            animationDuration="400"
          >
            <img className="backCardImage" alt="" src={backCard} />
          </FrontSide>
          <BackSide
            className="containerFlipImage"
            animationDuration="400"
            style={{ backgroundColor: win ? "#bfad11" : "#175852" }}
          >
            {win && <div className="winFlipImage" />}
            <img className="flipImage" alt="" src={content} />
          </BackSide>
        </Flippy>
      </div>
    );
  }
}

export default CardComponent;
