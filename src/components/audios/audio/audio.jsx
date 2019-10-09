import React, { Component } from "react";
import { getAudio } from "../../../services/audioService";
import Comments from "../../comments/comments";
class Audio extends Component {
  state = {
    audio: {}
  };

  async componentDidMount() {
    const audioId = this.props.match.params.id;
    const audio = await getAudio(audioId);
    this.setState({ audio });
  }

  render() {
    console.log(this.state.audio);
    const { title, singers, likes, auditions, genres } = this.state.audio;
    return (
      <div>
        {singers && (
          <h2>
            {singers.join(", ")} - {title}
          </h2>
        )}
        <h3>Информация:</h3>
        {genres && <p>Жанры: {genres.join(", ")}</p>}
        <p>Количество лайков: {likes}</p>
        <p>Количество прослушиваний: {auditions}</p>

        <Comments audioId={this.props.match.params.id} />
      </div>
    );
  }
}

export default Audio;
