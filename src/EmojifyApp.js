import React from 'react';
import './App.css';
import { EMOJI_MAP } from './data/emojis';

class EmojifyApp extends React.PureComponent {
  state = {
    emojiString: "",
  };

  updateEmojiString = e => {
    const inputString = e.target.value;
    const inputList = inputString.split('');
    let emojiString = '';

    inputList.forEach(letter => {
      if (EMOJI_MAP[letter.toLowerCase()]) {
        const emojiList = EMOJI_MAP[letter.toLowerCase()];
        emojiString += emojiList[Math.floor(Math.random() * emojiList.length)];
      } else {
        emojiString += letter;
      }
    });

    this.setState({ emojiString });
  }

  render() {
    return (
      <div className="App">
        <span
          className="header"
          role="img"
          aria-label="The HubSpot Emoji Phrase Generator"
        >
          🔥The HubSpot Emoji Phrase Generator🔥
        </span>
        <input
          className="emoji-string-input"
          placeholder="Enter a phrase"
          onChange={this.updateEmojiString}
        />
        <span className="title">Your custom emoji</span>
        <div className="emoji-string">
          {this.state.emojiString}
        </div>
      </div>
    );
  }
}

export default EmojifyApp;
