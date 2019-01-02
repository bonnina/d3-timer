import * as React from 'react';
import Circle from './Circle';

interface State {
  session: number;
  length: number;
  time: string;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    
    this.showTime = this.showTime.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.countdown = this.countdown.bind(this);
    this.reset = this.reset.bind(this);
  }

  public state: State = {
    session: 5,
    length: 0, 
    time: ""
  };

  componentDidMount() {
    this.showTime();
  }

  public showTime(): void {
    const hrs: number = Math.floor(this.state.session / 60);
    const min: number = Math.floor(this.state.session) % 60;
    const sec: number =  Math.floor((this.state.session * 60) % 60);
    const t: string = (hrs > 0 ? hrs + ":" : "00:") + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    this.setState({ time: t });
  };

  public async onIncrement() {
    await this.setState({ session: this.state.session + 1 });
    this.showTime();
  };

  public async onDecrement() {
    if (this.state.session > 0.1) {
      await this.setState({ session: this.state.session - 1 });
      this.showTime();
    } else return
  };

  public countdown(): void {
    if (this.state.session == 0) return
    
    this.setState({ 
      length: this.state.session * 60
    });

    let interval = setInterval(() => {
      this.setState({ length: this.state.length - 1 });

      if (this.state.length <= 0) {
        clearInterval(interval);
        this.reset();
      }
    }, 1000);
  };

  public reset(): void {
    this.setState({ 
      session: 0,
      length: 0
    });
    this.showTime();
  };

  public wikiRedirect(): void {
    window.open("https://en.wikipedia.org/wiki/Pomodoro_Technique");
  }

  public render() {
    return (
      <div id='area'>
        <h1> Timer </h1>
        <div className='controls'>
          <button id='start' onClick={this.countdown}> &#8227; </button>
          <button id='reset' onClick={this.reset}> &#10006; </button>
          <button id='about' onClick={this.wikiRedirect}> &#63; </button>
        </div>

        <Circle progress={ 1 - (this.state.length / 60 / this.state.session) } />

        <div className='clock'>
          <button id='plus' onClick={this.onIncrement}> + </button>
          <p id='time'> {this.state.time} </p>
          <button id='minus' onClick={this.onDecrement}> - </button>
        </div>
      </div>
    );
  }
}

export default App;
