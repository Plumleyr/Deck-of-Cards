import {useState, useEffect} from 'react';
import Card from './Card';
import axios from 'axios'
import './Game.css'

const Game = () => {
  const [deckId, setDeckId] = useState(null)
  const [cards, setCards] = useState([]);
  const [shuffling, setShuffling] = useState(false)

  useEffect(() => {
    const getDeckId = async () => {
      let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle')
      setDeckId(res.data.deck_id)
    }
    getDeckId();
  }, [])

  const drawCard = async (deckId) => {
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw`)
    let cardData = res.data.cards[0]
    let newCard = {...cardData, transform: `rotate(${Math.random() * 360}deg)`}
    setCards(cards => [...cards, newCard])
  }

  const shuffle = async (deckId) => {
    setShuffling(true)
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    setDeckId(res.data.deck_id);
    setCards([])
    setShuffling(false)
  }

  return (
    <div>
      <div className='Game-btnDiv'>
        {cards.length !== 52 && (
          <button className="Game-btn" onClick={() => drawCard(deckId)} disabled={shuffling}>
            Draw
          </button>
        )}
        <button className='Game-btn' onClick={() => shuffle(deckId)} disabled={shuffling}>
          {shuffling ? 'Shuffling...' : 'Shuffle'}
        </button>
      </div>
      <div className='Game-cards'>
        {cards.map(card => {
          return(
            <div 
              style={{transform: card.transform}}
              className='Game-card' 
              key={card.code}
            >
              <Card
                image={card.image}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Game;