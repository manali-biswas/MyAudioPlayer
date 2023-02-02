import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';


const criminal="https://pagalsong.in/uploads/systemuploads/mp3/Ra-One/Criminal%20-%20Ra-One%20128%20Kbps.mp3";
const hangover="https://pagalsong.in/uploads/systemuploads/mp3/Kick/Hangover%20-%20Kick%20128%20Kbps.mp3";
const dheere="https://songs6.vlcmusic.com/mp3/org/4552.mp3";
const naach="https://pagalsong.in/uploads/systemuploads/mp3/ABCD%202/Naach%20Meri%20Jaan.mp3";
const khudaJaane="https://pagalsong.in/uploads/systemuploads/mp3/Bachna%20Ae%20Haseeno/Khuda%20Jaane.mp3";
const mahiya = "https://pagalsong.in/uploads/systemuploads/mp3/Awarapan/Mahiya.mp3";
const lovehit="https://pagalsong.in/uploads/systemuploads/mp3/Billu%20Barber/Love%20Mera%20Hit%20Hit.mp3";
const ankhonmein="https://pagalsong.in/uploads/systemuploads/mp3/Om%20Shanti%20Om/Ajab%20Si%20-%20Om%20Shanti%20Om%20128%20Kbps.mp3";
const neeleambar="https://dns4.pendusaab.com/download/128k-apwjp/Neele-Neele-Ambar-Par-(Version--2).mp3";
const wolamhein="https://pwdown.info/14156/Woh%20Lamhe%20-%20Zeher%20Atif%20Aslam%20320Kbps.mp3"
const list=[{ id:0, title:"Criminal", track: criminal},
				{ id:1, title:"Hangover", track: hangover},
				{id:2, title:"Dheere Dheere", track: dheere},
				{id:3, title:"Naach Meri Jaan Naach", track: naach},
				{id:4, title:"Khuda Jaane Ye", track: khudaJaane},
				{id:5, title: "Mahiya", track: mahiya},
				{id:6, title: "Love Mera Hit Hit", track: lovehit},
				{id:7, title: "Aankhon Mein Teri", track: ankhonmein},
				{id:8, title: "Wo Lamhein", track: wolamhein},
				{id:9, title: "Neele Neele Ambar Par", track: neeleambar}
			   ];

function getTime(time) {
  if(!isNaN(time)) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }
}

class App extends React.Component{
	state={
		selectedTrack:-2,
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
			if (e.target.currentTime == e.target.duration)
			{
				this.setState({
					selectedTrack: this.state.selectedTrack + 1
				});
			}
		});

		this.player.addEventListener("pause", e=>{
			if (this.state.player !== "stopped")
			{
			this.setState({
				player:"paused"
			})
		}
		});

		this.player.addEventListener("play",e=>{
			this.setState({
				player:"playing"
			})
		});
	}

componentWillUnmount(){
	this.player.removeEventListener("timeupdate",()=>{});
}

	componentDidUpdate(prevProps,prevState){
		if(this.state.selectedTrack!==prevState.selectedTrack && this.state.player !== "stopped"){
			let track;
			if (this.state.selectedTrack>=0 && this.state.selectedTrack < list.length)
			{
				track = list[this.state.selectedTrack].track;
			}
			else if (this.state.selectedTrack == list.length)
			{
				this.setState({
					selectedTrack: 0
				});
				track = list[0].track;
			}
			else if (this.state.selectedTrack == -1)
			{
				this.setState({
					selectedTrack: list.length - 1
				});
				track = list[list.length - 1].track;
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
			} else if(this.state.player==="playing"&&prevState.player==="paused"){
				this.player.play();
			}
		}
	}

render(){
	const displayList = list.map(item=>{
				   return(
					   <li key={item.id} className="row">
							<div className='column1'>
								{item.id + 1})  {item.title}
							</div>
							<div className='column2'>
								: {this.state.selectedTrack == item.id ? 
							(
							<button className='gifButton' onClick={()=>this.setState({selectedTrack:-2, player: "stopped"})}>
									<img className='gif' src={process.env.PUBLIC_URL + '/audio.gif'}/>
								</button>
							) :
							(
								<button onClick={()=>this.setState({selectedTrack: item.id, player: "playing"})}>Play</button>
								)
							}
							</div>
						</li>
				   );
			   });
	return(
	<div className="frame">
		<h1 className="title">My Audio Player</h1>
		<div className="list">
			<ol>{displayList}</ol>
			<div className='center-align controls'>
				{this.state.player==="paused"|| this.state.player==="playing" ? (
					<button onClick={()=>this.setState({selectedTrack: this.state.selectedTrack - 1})}>
						<img src={process.env.PUBLIC_URL + '/angles-left.svg'} color="black" height="15px"/>
					</button>
				):("")}
				{this.state.player==="paused" && (
					<button onClick={()=>this.setState({player:"playing"})}>
						<img src={process.env.PUBLIC_URL + '/play.svg'} color="black" height="15px"/>
					</button>
				)}
				{this.state.player==="playing" && (
					<button onClick={()=>this.setState({player:"paused"})}>
						<img src={process.env.PUBLIC_URL + '/pause.svg'} color="black" height="15px"/>
					</button>
				)}
				{this.state.player==="paused"|| this.state.player==="playing" ? (
					<button onClick={()=>this.setState({selectedTrack: this.state.selectedTrack + 1})}>
						<img src={process.env.PUBLIC_URL + '/angles-right.svg'} color="black" height="15px"/>
					</button>
				):("")}
				{this.state.player==="paused"|| this.state.player==="playing" ? (
					<button onClick={()=>this.setState({selectedTrack:-2, player:"stopped"})}>Stop</button>
				):("")}
			</div>
		</div>
		<br/>
		<audio controls = {this.state.player === "playing" || this.state.player === "paused"} ref={ref => (this.player = ref)} preload="auto"/>
		<br/>
		{this.state.player==="paused"|| this.state.player==="playing" && this.state.selectedTrack>=0 && this.state.selectedTrack<list.length ? (
		<div className='linear-wipe'>
			<h2 color='white'>Playing "{list[this.state.selectedTrack].title}"</h2>
		</div>
		) : ("") }
	</div>
);
}
}

ReactDOM.render(<App />,document.getElementById("root"));