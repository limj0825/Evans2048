import { Grid, Button } from 'antd-mobile';
import React from 'react'
import { Swipe } from 'react-swipe-component'
import { Animated } from 'react-animated-css'
class ChessBoard extends React.Component{
  state = {
    best: 0,
    step: 0,
    history: [{sco: 0, num: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}]
  }

  ChessData = (data) => {
    return data.map((_) => {
      if (_ != 0)
      {
        return {icon: require(`../public/number/${_}.gif`)};
      }
      else {
        return {icon: require(`../public/number/${_}.jpg`)};
      }
    })
  }

  get = (i, j) => {
    return i * 4 + j;
  }

  ClickUp = () => {
    let current = this.state.step;
    let arr = this.state.history[current].num.concat();
    let sco = this.state.history[current].sco;
    for (let j = 0; j < 4; j++)
    {
      let now = 0;
      for (let i = 1; i < 4; i++)
      {
        if (now === i || arr[this.get(i, j)] === 0)
        {
          continue;
        }
        if (arr[this.get(now, j)] === arr[this.get(i, j)])
        {
          sco += arr[this.get(now, j)];
          arr[this.get(now, j)] *= 2;
          arr[this.get(i, j)] = 0;
          now++;
        }
        else if (arr[this.get(now, j)] === 0)
        {
          arr[this.get(now, j)] = arr[this.get(i, j)];
          arr[this.get(i, j)] = 0;
        }
        else
        {
          now++;
          i--;
        }
      }
    }
    if (arr.toString() === this.state.history[current].num.toString())
    {
      return ;
    }
    let NewData = {sco: sco, num: arr};
    this.start(NewData);
  }

  ClickDown = () => {
    let current = this.state.step;
    let arr = this.state.history[current].num.concat();
    let sco = this.state.history[current].sco;
    for (let j = 0; j < 4; j++)
    {
      let now = 3;
      for (let i = 2; i >= 0; i--)
      {
        if (now === i || arr[this.get(i, j)] === 0)
        {
          continue;
        }
        if (arr[this.get(now, j)] === arr[this.get(i, j)])
        {
          sco += arr[this.get(now, j)];
          arr[this.get(now, j)] *= 2;
          arr[this.get(i, j)] = 0;
          now--;
        }
        else if (arr[this.get(now, j)] === 0)
        {
          arr[this.get(now, j)] = arr[this.get(i, j)];
          arr[this.get(i, j)] = 0;
        }
        else
        {
          now--;
          i++;
        }
      }
    }
    if (arr.toString() === this.state.history[current].num.toString())
    {
      return ;
    }
    let NewData = {sco: sco, num: arr};
    this.start(NewData);
  }

  ClickLeft = () => {
    let current = this.state.step;
    let arr = this.state.history[current].num.concat();
    let sco = this.state.history[current].sco;
    for (let i = 0; i < 4; i++)
    {
      let now = 0;
      for (let j = 1; j < 4; j++)
      {
        if (now === j || arr[this.get(i, j)] === 0)
        {
          continue;
        }
        if (arr[this.get(i, now)] === arr[this.get(i, j)])
        {
          sco += arr[this.get(i, now)];
          arr[this.get(i, now)] *= 2;
          arr[this.get(i, j)] = 0;
          now++;
        }
        else if (arr[this.get(i, now)] === 0)
        {
          arr[this.get(i, now)] = arr[this.get(i, j)];
          arr[this.get(i, j)] = 0;
        }
        else
        {
          now++;
          j--;
        }
      }
    }
    if (arr.toString() === this.state.history[current].num.toString())
    {
      return ;
    }
    let NewData = {sco: sco, num: arr};
    this.start(NewData);
  }

  ClickRight = () => {
    let current = this.state.step;
    let arr = this.state.history[current].num.concat();
    let sco = this.state.history[current].sco;
    for (let i = 0; i < 4; i++)
    {
      let now = 3;
      for (let j = 2; j >= 0; j--)
      {
        if (now === j || arr[this.get(i, j)] === 0)
        {
          continue;
        }
        if (arr[this.get(i, now)] === arr[this.get(i, j)])
        {
          sco += arr[this.get(i, now)];
          arr[this.get(i, now)] *= 2;
          arr[this.get(i, j)] = 0;
          now--;
        }
        else if (arr[this.get(i, now)] === 0)
        {
          arr[this.get(i, now)] = arr[this.get(i, j)];
          arr[this.get(i, j)] = 0;
        }
        else
        {
          now--;
          j++;
        }
      }
    }
    if (arr.toString() === this.state.history[current].num.toString())
    {
      return ;
    }
    let NewData = {sco: sco, num: arr};
    this.start(NewData);
  }

  checkStart = (props) => {
    let flag = false;
    for (let i = 0; i < props.length; i++)
    {
      if (props[i] !== 0)
      {
        flag = true;
      }
    }
    return flag;
  }

  clear = () => {
    if (!window.confirm("确定重来吗?"))
    {
      return ;
    }
    this.setState({step: 0});
    // console.log(window.innerWidth, window.innerHeight);
    // let grid = document.getElementsByClassName("test").item(0);
    // console.log(grid.clientWidth, grid.clientHeight)
  }

  start = (data) => {
    let flag = false;
    let arr = data.num.concat();
    while (!flag)
    {
      let lab = Math.floor((Math.random()*16));
      if (arr[lab] !== 0)
      {
        continue;
      }
      arr[lab] = Math.random() >= 0.1 ? 2 : 4;
      flag = true;
    }
    let be = this.state.best > data.sco ? this.state.best: data.sco;
    let history = this.state.history.slice(0, this.state.step + 1).concat({num: arr, sco: data.sco})
    this.setState({history: history, best: be, step: this.state.step + 1});
    let date = {name: 'ax', text: `当前分数是${data.sco}`};
    fetch(`http://101.132.131.241:825/api/message`,{
      method: 'POST',
      body: JSON.stringify(date)
    })
  }
  GameEnd = (props) => {
    let arr = props;
    for (let i = 0; i < 16; i++)
    {
      if (arr[i] === 0)
      {
        return false;
      }
    }
    for (let i = 0; i < 4; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        if (arr[this.get(i, j)] === arr[this.get(i, j + 1)])
        {
          return false;
        }
      }
    }
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 4; j++)
      {
        if (arr[this.get(i, j)] === arr[this.get(i + 1, j)])
        {
          return false;
        }
      }
    }
    return true;
  }

  Withdraw = (step) => {
    this.setState({step});
    // let x = document.getElementsByClassName("Up");
    // this.setState({step}, () => Simulate.click(x[0]));
  }

  render() {
    const current = this.state.step;
    const check = this.checkStart(this.state.history[current].num);
    const IsEnd = this.GameEnd(this.state.history[current].num);
    return (
      <div style={{marginTop: '100px'}}>
        <h1>当前分数: {this.state.history[current].sco}<br/>最高分数: {this.state.best}</h1>
        {
          (IsEnd || !check) ?
            <Grid data={this.ChessData(this.state.history[current].num)} columnNum={4}
                  renderItem={dataItem => (
                    <div>
                      <img src={dataItem.icon} style={{height: '100%', width: '100%'}} alt={"empty"}/>
                    </div>
                  )}
            />
            :
            <Swipe detectTouch={true} onSwipedLeft={this.ClickLeft} onSwipedRight={this.ClickRight} onSwipedUp={this.ClickUp} onSwipedDown={this.ClickDown}>
              <Grid data={this.ChessData(this.state.history[current].num)} columnNum={4}
                    renderItem={(dataItem, index) => (
                      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.history[current].num[index] !== 0}>
                        <div>
                          {
                            this.state.history[current].num[index] !== 0
                            &&
                            <img src={dataItem.icon} style={{height: '100%', width: '100%'}} alt={"empty"}/>
                          }
                        </div>
                      </Animated>
                    )}
              />
            </Swipe>
        }
        <br/>
        <Button inline size="large" type={"primary"} disabled={current < 1} onClick={() => {this.Withdraw(current - 1)}}>上一步</Button>
        <Button inline size="large" type={"primary"} disabled={check} style={{marginTop: '20px'}} onClick={() => {this.start(this.state.history[0])}}>开始</Button>
        <Button inline size="large" type={"primary"} disabled={!check} onClick={this.clear}>重来</Button>
      </div>
    )
  }
}
export default ChessBoard;