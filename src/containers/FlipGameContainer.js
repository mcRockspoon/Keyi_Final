import React, { useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";

// import { generate } from "rxjs";

const shuffleArray = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const generatedId = () => Math.random();

const generateList = (listFlipData) => {
  const cards = shuffleArray(listFlipData);
  return cards.map((e) => {
    const singleCard = Object.assign({}, e);
    singleCard.id = generatedId();
    singleCard.flipped = false;
    return singleCard;
  });
};

const resetList = (listFlipData) => {
  return listFlipData.map((e) => {
    const singleCard = Object.assign({}, e);
    singleCard.id = generatedId();
    singleCard.flipped = false;
    return singleCard;
  });
};

const FlipGameContainers = ({ cards }) => {
  const [state, setState] = useState({
    cards: generateList(cards),
    gameTurn: 1,
    doneFlipping: false,
    onAnimation: false,
    isDone: 0
  });

  useEffect(() => {
    if (!state.doneFlipping && state.isDone === 3) {
      setState({ ...state, doneFlipping: true, onAnimation: true });
    }
  }, [state]);

  const viewFlipCard = (id) => {
    const cardsUpdate = state.cards.map((card) => {
      const copyCard = { ...card };
      if (copyCard.id === id) copyCard.flipped = true;
      return copyCard;
    });

    if (!state.onAnimation) {
      setState({
        ...state,
        cards: cardsUpdate,
        isDone: state.isDone + 1,
        onAnimation: state.gameTurn === 2
      });
    }
    return cardsUpdate;
  };

  const findCardsWin = (cardsUpdate, id) => {
    return {
      cardsToUpdate: cardsUpdate.map((card) => {
        const copyCard = { ...card };
        state.isDone++;
        return copyCard;
      })
    };
  };

  const toggleFlippedCard = (id, cardsUpdate) => {
    const { cardsToUpdate } = findCardsWin(cardsUpdate, id);

    state.isDone++;

    if (!state.onAnimation && state.gameTurn === 2) {
      setTimeout(() => {
        setState({
          ...state,
          cards: cardsToUpdate,
          gameTurn: state.gameTurn === 1 ? 2 : 1,
          onAnimation: false
        });
      }, 650);
    }
  };

  const handleChange = (id) => {
    const cardUpdate = viewFlipCard(id);
    toggleFlippedCard(id, cardUpdate);
  };

  const generateCards = () => {
    return Array.from(state.cards).map((cardInfo, id) => {
      return (
        <CardComponent
          key={id}
          handleChange={handleChange}
          cardInfo={cardInfo}
        />
      );
    });
  };

  const resetCards = () => {
    if (state.doneFlipping === true) {
      // generateCards();
      setState({
        ...state,
        gameTurn: 1,
        doneFlipping: false,
        onAnimation: false,
        isDone: 0,
        cards: resetList(state.cards)
      });
      setTimeout(() => {
        setState({
          ...state,
          gameTurn: 1,
          doneFlipping: false,
          onAnimation: false,
          isDone: 0,
          cards: generateList(state.cards)
        });
      }, 500);
    }
  };

  const giveFortune = () => {
    var char1 = [];
    var fortune1 = [];
    var desc1 = [];
    var location = [];
    for (let i = state.cards.length - 1; i > 0; i--) {
      if (state.cards[i].flipped === true) {
        // fortune = fortune.concat(state.cards[i].fortune.concat("\n"));
        char1.push(state.cards[i].character);
        desc1.push(state.cards[i].description);
        fortune1.push(state.cards[i].fortune);
        location.push(state.cards[i].location);
      }
    }

    return (
      <span>
        <h2> {char1[0]} </h2>
        <h4>{location[0]}</h4>
        <h4>{desc1[0]}</h4>
        <h3>{fortune1[0]}</h3>
        <h2> {char1[1]} </h2>
        <h4>{location[1]}</h4>
        <h4>{desc1[1]}</h4>
        <h3>{fortune1[1]}</h3>
        <h2> {char1[2]} </h2>
        <h4>{location[2]}</h4>
        <h4>{desc1[2]}</h4>
        <h3>{fortune1[2]}</h3>
        <div class="modal">
          <div class="modal-content">
            <span class="close-btn">&times;</span>
            <p>this is the text inside the modal</p>
          </div>
        </div>
      </span>
    );
  };

  return (
    <div className="App">
      <h1>KEYI CARD READER</h1>
      {!state.doneFlipping && (
        <span>
          <h2>How to play </h2>
          <h3> 1. Pick 3 cards</h3> <h3> 2. Read your fortune </h3>{" "}
          <h3> Press RESET to repeat</h3>
        </span>
      )}

      {state.doneFlipping && <div>{giveFortune()}</div>}
      <h4>{generateCards()}</h4>
      <h1>
        <button type="reset" className="button" onClick={() => resetCards()}>
          Reset Card
        </button>
      </h1>
    </div>
  );
};

export default FlipGameContainers;
