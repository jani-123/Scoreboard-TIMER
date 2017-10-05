class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: true,
			date: 0
		}
	}
	render() {
		const start = (e) => {
			this.startTimer();
		}
		const stop = (e) => {
			this.stopTimer();
		}
		const reset = (e) => {
			this.resetTimer();
		}
		return (
			<div>
				<p className='stopwatch-time'>{this.state.date}</p>
				{this.state.active && <button onClick={start}>START</button>}
				{!this.state.active && <button onClick={stop}>STOP</button>}
				<button onClick={reset}>RESET</button>

			</div>
		);
	}
	startTimer() {
		this.timer = setInterval(() => {
			this.setState({
				active: false,
				date: this.state.date + 1
			});
		}, 1000);
	}
	stopTimer() {
		clearInterval(this.timer);
		this.setState({
			active: true
		});
	}
	resetTimer() {
		this.timer = setInterval(() => {
			this.setState({
				date: 0
			});
		}, 1000);
	}
}

// Modelo
class Model {
	constructor(props) {
		this.text = "";
		this.players = [
			{ name: "Jim Hoskins", score: 31, id: 1 },
			{ name: "Andree Hoskins", score: 35, id: 2 },
			{ name: "Alena Hoskins", score: 42, id: 3 },
		];
		this.callback = null;
	}

	subscribe(render) {
		this.callback = render;
	}

	notify() {
		this.callback();
	}
	addName(text) {
		this.players.push({
			id: Utils.uuid(),
			name: text,
			score: 0
		});
		this.notify();
	}
	decrement(index) {
		if (this.players[index].score >= 0) {
			this.players[index].score--;
		}
		this.notify();
	}
	increase(index) {
		if (this.players[index].score >= 0) {
			this.players[index].score++;
		}
		this.notify();
	}

}

//Vista
const Header = ({ model }) => {
	let totalScore = model.players.map(e => e.score).reduce((a, b) => { return a + b });
	return (
		<div>
			<header className='header'>
				<table className='stats'>
					<tbody>
						<tr><td>PLAYERS:</td><td>{model.players.length}</td></tr>
						<tr><td>TOTAL POINTS:</td><td>{totalScore}</td></tr>
					</tbody>
				</table>
				<div className='stopwatch'>
					<h2>STOPWATH</h2>
					<Timer />

				</div>
			</header>
		</div>
	)
}
const PlayerList = ({ model }) => {
	return (
		<div>
			{
				model.players.map((value, index) => {
					return (
						<div key={Utils.uuid()} className="player">
							<div className="player-name">{value.name}</div>
							<div className="player-score">
								<button className="counter counter-action decrement" onClick={() => model.decrement(index)}>-</button>
								<span className="counter-score">{value.score}</span>
								<button className="counter counter-action increment" onClick={() => model.increase(index)}>+</button>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}
const PlayerForm = ({ model }) => {
	return (
		<div className="add-player-form">
			<form
				onSubmit={e => {
					e.preventDefault();
					model.addName(model.text);
				}}>

				<input type="text" placeholder="ENTER TO NAME" onChange={e => (model.text = e.target.value)} />

				<input type="submit" value="ADD PLAYER" />
			</form>
		</div>
	)
}
const Application = ({ model }) => {
	return (
		<div className='scoreboard'>
			<Header model={model} />
			<PlayerList model={model} />
			<PlayerForm model={model} />
		</div>
	);
}

// Controlador

let model = new Model();
let counter = 1;

let render = () => {
	console.log('render times: ', counter++);
	ReactDOM.render(
		<Application model={model} />,
		document.getElementById('container')
	);
};

model.subscribe(render);

render();








