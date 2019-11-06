import { Grid, Button } from 'antd-mobile';
import React from 'react'
class ChessBoard extends React.Component{
  state = {
    num: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    now: 0,
    best: 0
  }

  ChessData = (data) => {
    return data.map((_) => {
      return {icon: require(`../public/number/${_}.jpg`)};
    })
  }

  get = (i, j) => {
    return i * 4 + j;
  }
  ClickUp = () => {
    let arr = this.state.num.concat();
    let sco = this.state.now;
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
    if (arr.toString() === this.state.num.toString())
    {
      return ;
    }
    this.setState({num: arr, now: sco}, this.start);
  }
  ClickDown = () => {
    let arr = this.state.num.concat();
    let sco = this.state.now;
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
    if (arr.toString() === this.state.num.toString())
    {
      return ;
    }
    this.setState({num: arr, now: sco}, this.start);
  }
  ClickLeft = () => {
    let arr = this.state.num.concat();
    let sco = this.state.now;
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
    if (arr.toString() === this.state.num.toString())
    {
      return ;
    }
    this.setState({num: arr, now: sco}, this.start);
  }
  ClickRight = () => {
    let arr = this.state.num.concat();
    let sco = this.state.now;
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
    if (arr.toString() === this.state.num.toString())
    {
      return ;
    }
    this.setState({num: arr, now: sco}, this.start);
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
    let arr = new Array(16);
    for (let i = 0; i < 16; i++)
    {
      arr[i] = 0;
    }
    this.setState({num: arr, now: 0});
  }
  start = () => {
    let flag = false;
    let arr = this.state.num;
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
    let be = this.state.best > this.state.now ? this.state.best: this.state.now;
    this.setState({num: arr, best: be});
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
  render() {
    const check = this.checkStart(this.state.num);
    const IsEnd = this.GameEnd(this.state.num);
    return (
      <div style={{marginTop: '100px'}}>
        <h1>当前分数: {this.state.now}<br/>最高分数: {this.state.best}</h1>
        <Grid data={this.ChessData(this.state.num) } columnNum={4}
          renderItem={dataItem => (
            <img src={dataItem.icon} style={{height: '100%', width: '100%'}}/>
          )}
        />
        <Button inline size="large" onClick={this.ClickUp} disabled={!check || IsEnd}>↑</Button>
        <br/>
        <Button inline size="large" onClick={this.ClickLeft} disabled={!check || IsEnd}>←</Button>
        <Button inline size="large" onClick={this.ClickDown} disabled={!check || IsEnd}>↓</Button>
        <Button inline size="large" onClick={this.ClickRight} disabled={!check || IsEnd}>→</Button>
        <br/>
        <Button inline size="large" type={"primary"} disabled={check} style={{marginTop: '20px'}} onClick={this.start}>开始</Button>
        <Button inline size="large" type={"primary"} disabled={!check} onClick={this.clear}>重来</Button>
      </div>
    )
  }
}
export default ChessBoard;