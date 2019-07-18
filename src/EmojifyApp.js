import React from 'react';
import './App.css';
import { EMOJI_MAP } from './data/emojis';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class EmojifyApp extends React.PureComponent {
  state = {
    emojiString: "",
    copied: false,
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

    this.setState({ emojiString, copied: false });
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
        <span className="emoji-string">
          {this.state.emojiString}
        </span>
        {this.state.emojiString.length ? (
          <div className="copy-button-container">
            <CopyToClipboard
              className="copy-button"
              text={this.state.emojiString}
              onCopy={() => this.setState({ copied: true })}>
              <button>Copy Emoji!</button>
            </CopyToClipboard>
          </div>
        ) : null}
        {this.state.copied ? (
          <span
            className="copied-string"
            role="img"
            aria-label="Copied">
            Copied! 👌
          </span>) : null}
        <div className="bottom-left" />
      </div >
    );
  }
}

export default EmojifyApp;
