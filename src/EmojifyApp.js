import React from 'react';
import './App.css';
import { EMOJI_MAP, BIGRAM_MAP } from './data/emojis';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class EmojifyApp extends React.PureComponent {
  state = {
    emojiString: "",
    copied: false,
    announce: false,
  };

  findBigrams = text => {
    const inputList = text.split('');
    const charList = [];
    let previousBigram = false;
    inputList.forEach((letter, index) => {
      if (previousBigram) {
        previousBigram = false;
      } else {
        if (index < inputList.length - 1) {
          const bigram = letter + inputList[index + 1];
          if (Object.keys(BIGRAM_MAP).indexOf(bigram) >= 0 && Math.random() < 0.5) {
            charList.push(bigram);
            previousBigram = true;
          } else {
            charList.push(letter);
          }
        } else {
          charList.push(letter);
        }
      }
    })
    return charList;
  }

  updateEmojiString = e => {
    const inputString = e.target.value;
    const text = this.findBigrams(inputString.toLowerCase());
    let emojiString = '';

    if (this.state.announce) {
      emojiString += ':speaking_head_in_silhouette::mega-reversed::transparent:';
    }

    let quoteCount = 0;

    text.forEach(letter => {
      if (letter === '"') {
        if (quoteCount === 0) {
          emojiString += ':airquote-close:';
          quoteCount++;
        } else {
          emojiString += ':airquote-open:';
          quoteCount--;
        }
      } else {
        if (letter.length === 1) {
          if (EMOJI_MAP[letter.toLowerCase()]) {
            const emojiList = EMOJI_MAP[letter];
            emojiString += emojiList[Math.floor(Math.random() * emojiList.length)];
          } else {
            emojiString += letter;
          }
        } else if (letter.length === 2) {
          const bigramList = BIGRAM_MAP[letter];
          emojiString += bigramList[Math.floor(Math.random() * bigramList.length)];
        }
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
        <span className="toggles">
          <label>
            <input
              id="announce"
              type="checkbox"
              checked={this.state.announce}
              onChange={() => this.setState({ announce: !this.state.announce })} />
            <span> Announce mode </span>
          </label>
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
