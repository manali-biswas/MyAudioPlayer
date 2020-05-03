import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const criminal="https://docs.google.com/uc?export=download&id=1P0eJNITfc3iVwrlglZmaRIARHf-6u60k";
const hangover="https://docs.google.com/uc?export=download&id=1IpAKF1T_FQqg4IADDPf1rbah9wxPnYle";
const dheere="https://docs.google.com/uc?export=download&id=1Hfxu_JT0qwvz_Ni1nmYHzru4A94D62Hz";
const naach="https://docs.google.com/uc?export=download&id=1XHILlUSrgCRHkh8dk3p1I12nrjWQpynV";

function getTime(time) {
  if(!isNaN(time)) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }
}

class App extends React.Component{
	state={
		selectedTrack:null,
		player: "stopped",
		currentTime: null,
		duration: null
	};

	componentDidMount(){
		this.player.addEventListener("timeupdate",e=>{
			this.setState({
				currentTime:e.target.currentTime,
				duration:e.target.duration
			});
		});
	}

componentWillUnmount(){
	this.player.removeEventListener("timeupdate",()=>{});
}

	componentDidUpdate(prevProps,prevState){
		if(this.state.selectedTrack!==prevState.selectedTrack){
			let track;
			switch(this.state.selectedTrack){
				case "Criminal":track=criminal;
					break;
				case "Hangover":track=hangover;
					break;
				case "Dheere Dheere":track= dheere;
					break;
				case "Naach Meri Jaan Naach":track= naach;
					break;
				default: break;
			}
			if(track){
				this.player.src=track;
				this.player.play();
				this.setState({player:"playing",duration:this.player.duration});
			}
		}
		if(this.state.player!==prevState.player){
			if(this.state.player==="paused"){
				this.player.pause();
			}else if(this.state.player==="stopped"){
				this.player.pause();
				this.player.currentTime=0;
				this.setState({selectedTrack:null});
			} else if(this.state.player==="playing"&&prevState.player==="paused"){
				this.player.play();
			}
		}
	}

render(){
	const list=[{ id:1, title:"Criminal"},
				{ id:2, title:"Hangover"},
				{id:3, title:"Dheere Dheere"},
				{id:4, title:"Naach Meri Jaan Naach"}
			   ].map(item=>{
				   return(
					   <li key={item.id}
						   >{item.title} : <button onClick={()=>this.setState({selectedTrack: item.title})}>Start</button></li>
				   );
			   });
	const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);
	return(
	<div className="frame">
		<h1 className="title">My Audio Player</h1>
		<div className="list">
		<ol>{list}</ol>
		<div>
			{this.state.player==="paused" && (
				<button onClick={()=>this.setState({player:"playing"})}>Play</button>
			)}
			{this.state.player==="playing" && (
				<button onClick={()=>this.setState({player:"paused"})}>Pause</button>
			)}
			{this.state.player==="paused"|| this.state.player==="playing" ? (
				<button onClick={()=>this.setState({player:"stopped"})}>Stop</button>
			):("")}
		</div>
		{this.state.player === "playing" || this.state.player === "paused" ? (
          <div>
            {currentTime} / {duration}
          </div>
        ) : (
          ""
        )}</div>
		<audio ref={ref => (this.player = ref)}/>
	</div>
);
}
}

ReactDOM.render(<App />,document.getElementById("root"));