import React from 'react';
import './App.css';
import { EMOJI_MAP } from './data/emojis';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class EmojifyApp extends React.PureComponent {
  state = {
    emojiString: "",
    copied: false,
  };


  // def find_bigrams(text):
  // char_list = []
  // previous_bigram = False
  // for i in range(len(text)):
  //     if previous_bigram:
  //         previous_bigram = False
  //         continue
  //     curr_char = text[i]
  //     if i < len(text)-1:
  //         bigram = curr_char + text[i+1]
  //         if bigram in bigram_map.keys() and random.random() > 0.5:
  //             char_list.append(bigram)
  //             previous_bigram = True
  //         else:
  //             char_list.append(curr_char)
  //     else:
  //         char_list.append(curr_char)
  // print(char_list)
  // return char_list

  // def emoji_text(text):
  // text = find_bigrams(text)
  // out = [get_char(x) for x in text]
  // return "".join(out)

  // def get_char(char):
  // if len(char) == 1:
  //     return random.choice(emoji_map[char]) if char in emoji_map.keys() else char
  // elif len(char) == 2:
  //     return random.choice(bigram_map[char])
  // return char

  updateEmojiString = e => {
    const inputString = e.target.value;
    const inputList = inputString.split('');
    let emojiString = '';
    let quoteCount = 0;

    inputList.forEach(letter => {
      if (letter === '"') {
        if (quoteCount === 0) {
          emojiString += ':airquote-open:';
          quoteCount++;
        } else {
          emojiString += ':airquote-close:';
          quoteCount--;
        }
      } else if (EMOJI_MAP[letter.toLowerCase()]) {
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
