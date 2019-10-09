import React, { Component } from "react";
import "../../styles/player.scss";
import auth from "../../services/authService";
import { saveAudio } from "../../services/audioService";

class Player extends Component {
  player = new Audio();

  state = {
    player: "paused"
  };

  componentDidMount = () => {
    document.onkeydown = e => {
      if (e.keyCode === "K".charCodeAt(0)) {
        this.prevAudio();
      }
      if (e.keyCode === "L".charCodeAt(0)) {
        this.nextAudio();
      }
    };
    this.player.addEventListener("timeupdate", () => {
      // Изменение ползунка
      let position = this.player.currentTime / this.player.duration;
      if (document.getElementById("fill"))
        document.getElementById("fill").style.width = position * 100 + "%";

      // Изменение времени
      const duration = this.formatTime(this.player.duration);
      const currentTime = this.formatTime(this.player.currentTime);
      if (duration && document.getElementById("audioDuration"))
        document.getElementById(
          "audioDuration"
        ).textContent = `${currentTime} / ${duration}`;

      if (currentTime === duration) this.nextAudio();
    });
  };

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
    this.player.pause();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentAudio !== prevProps.currentAudio) {
      let track = this.props.currentAudio;
      console.log(track);
      if (track) {
        /* 
        Запись воспроизводится, нужно увеличить количество прослушиваний
        Изменить аудио на сервере
        Изменить количество прослушиваний на клиенте
        */
        if (!auth.getCurrentUser()) this.props.changeLimit();
        track.auditions++;
        saveAudio(track);
        this.props.onPlayAudio(track);

        this.player.src = `http://localhost:3000/audios/${track._id}`;
        this.player.play();
        this.setState({ player: "playing" }, () => {
          document.getElementById("audioTitle").textContent =
            track.singers.join(", ") + " - " + track.title;
        });
      }
    }

    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

  formatTime = time => {
    if (!isNaN(time)) {
      return (
        ("0" + Math.floor(time / 60)).slice(-2) +
        ":" +
        ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  };

  rewindAudio = event => {
    const { clientX: x, currentTarget: target } = event;
    const { currentAudio } = this.props;

    console.log(document.body.clientWidth, target.offsetWidth, x);
    // Погрешность, связана с тем, что clientX отсчитывается от левого края экрана
    const fault = Math.trunc(
      (document.body.clientWidth - target.offsetWidth) / 2 + 4
    );
    console.log(fault);
    const position = ((x - fault) / target.offsetWidth) * 100 + "%";
    document.getElementById("fill").style.width = position;

    this.player.src = `http://localhost:3000/audios/${
      currentAudio._id
    }#t=${((x - fault) * this.player.duration) / target.offsetWidth}`;
    this.player.play();
  };

  playAudio = () => {
    console.log(this.props.currentAudio);
    this.player.src = `http://localhost:3000/audios/${
      this.props.currentAudio._id
    }`;
    this.player.play();
  };

  nextAudio = async () => {
    await this.props.onChangeAudio("next");
    this.player.play();
  };

  prevAudio = async () => {
    await this.props.onChangeAudio("prev");
    this.player.play();
  };

  setVolume = val => {
    this.player.volume = val / 100;
  };

  render() {
    if (!this.player.src) return <div />;
    return (
      <div id="audio-player">
        {/*<div id="image">
          <img src="Poster1.jpg" />
    </div>*/}
        <div>
          <div id="audioTitle">Название песни</div>

          <div id="audio-navigation">
            <span id="seek-bar" onClick={event => this.rewindAudio(event)}>
              <span id="fill" />
              <span id="handle" />
            </span>

            <div id="audioDuration" />
          </div>
          <span id="volume-controller">
            <i className="fa fa-volume-down" />
            <input
              id="volume"
              type="range"
              min="0"
              step="1"
              max="100"
              onChange={e => this.setVolume(e.target.value)}
              onInput={e => this.setVolume(e.target.value)}
            />
            <i className="fa fa-volume-up" />
          </span>

          <div id="controls">
            <button id="prev" onClick={this.prevAudio}>
              <i className="fas fa-arrow-left" />
            </button>

            {this.state.player === "paused" && (
              <button onClick={() => this.setState({ player: "playing" })}>
                <i className="fas fa-play" />
              </button>
            )}
            {this.state.player === "playing" && (
              <button onClick={() => this.setState({ player: "paused" })}>
                <i className="fas fa-pause" />
              </button>
            )}

            <button id="next" onClick={this.nextAudio}>
              <i className="fas fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
