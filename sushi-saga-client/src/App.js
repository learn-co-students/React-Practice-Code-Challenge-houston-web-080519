import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

export default class App extends Component {
  state = {
    sushiPool: [],
    currentSushis: [],
    sushiIndex: 0,
    plates: [],
    currentMonies: 100
  }

  // So this is effectively getting a chunk of 4 at a time with the slice method, populating the sushis with setState.
  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(sushis => {
      let randSushi = sushis.slice(this.state.sushiIndex,this.state.sushiIndex + 4)
      this.setState({
        sushiPool: sushis,
        currentSushis: randSushi,
        sushiIndex: this.state.sushiIndex + 4
      })
    })
  }

  addPlates = (name, price) => {
    this.setState({
      plates: [name, ...this.state.plates],
      currentMonies: this.state.currentMonies - price
    })
  }

  moreSushi = () => {
    let newSushis = this.state.sushiPool.slice(this.state.sushiIndex, this.state.sushiIndex + 4)
    this.setState({
      currentSushis: newSushis,
      sushiIndex: this.state.sushiIndex + 4
    })
  }

  addMoney = (amount) => {
    this.setState({
      currentMonies: this.state.currentMonies + amount
    })
  }




  render() {
    return (
      <div className="app">
        <SushiContainer fourSushis={this.state.currentSushis} moreSushi={this.moreSushi} addPlates={this.addPlates} 
        currentWallet={this.state.currentMonies} addMoney={this.addMoney}
        />
        <Table currentPlates={this.state.plates} currentMonies={this.state.currentMonies} />
      </div>
    );
  }
}

