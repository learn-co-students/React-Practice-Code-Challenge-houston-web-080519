import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    allSushi: [],
    startingSushi: 0,
    endingSushi: 4,
    plates: [],
    myBankAccount: 100
  }

  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(response => {
      this.setState({
        allSushi: response
      })
    })
  }

  revolveSushi = () => {
    this.setState({
      startingSushi: this.state.startingSushi + 4,
      endingSushi: this.state.endingSushi + 4
    })
  }

  eatSushi = (selectedSushi) => {
    this.setState({
      allSushi: this.state.allSushi.map( sushi => {
        if (sushi === selectedSushi && selectedSushi.eaten !== true && this.state.myBankAccount >= sushi.price) {
          this.setState({myBankAccount: (this.state.myBankAccount - sushi.price)})
          return {...sushi, plates: this.state.plates.push('plate'), eaten: true}
        } else {
          return sushi
        }
      })
    })
    console.log('sushi was eaten')
  }

  render() {
    console.log('plates:', this.state.plates)
    console.log('my bank account:', this.state.myBankAccount)
    return (
      <div className="app">
        <SushiContainer 
          allSushi={this.state.allSushi.slice(this.state.startingSushi,this.state.endingSushi)} 
          revolveSushi={() => this.revolveSushi()} 
          eatSushi={(selectedSushi) => this.eatSushi(selectedSushi)}
        />
        <Table plates={this.state.plates} myBankAccount={this.state.myBankAccount}/>
      </div>
    );
  }
}

export default App;