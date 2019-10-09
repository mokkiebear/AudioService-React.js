import React from "react";
import Form from "../../common/form/form";
import Joi from "joi-browser";

import { getGenres } from "../../../services/genreService";
import {
  getAudio,
  saveAudio,
  deleteAudio
} from "../../../services/audioService";

class AudioForm extends Form {
  state = {
    audio: {},
    data: { title: "", singers: [], file: "" },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Название композиции"),
    singers: Joi.string().allow(""),
    file: Joi.object()
  };

  async componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const audioId = this.props.match.params.id;
    if (audioId === "new") return;

    const audio = await getAudio(audioId);
    if (!audio) return this.props.history.replace("/not-found");

    this.setState({ audio, data: this.mapToViewModel(audio) });
  }

  mapToViewModel(audio) {
    return {
      _id: audio._id,
      title: audio.title,
      singers: audio.singers
    };
  }

  doSubmit = async () => {
    const audio = { ...this.state.audio, ...this.state.data };
    console.log(audio);
    // Нужно для того, чтобы перезаписать файл аудио
    if (document.getElementById("file").files[0] && this.state.data._id) {
      await deleteAudio(audio._id);
      delete audio._id;
    }
    await saveAudio(audio);
    this.props.history.push("/audios");
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Аудиозапись</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Название композиции")}
          {this.renderInput("singers", "Исполнители")}
          <p>
            Если исполнителей несколько, необходимо указать их через запятую
          </p>
          {this.renderFileInput("file")}
          {this.renderButton("Сохранить")}
        </form>
      </div>
    );
  }
}

export default AudioForm;
