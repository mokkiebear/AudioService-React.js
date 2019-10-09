import React, { Component } from "react";
import { connect } from "react-redux";
import * as audiosActions from "../../../store/actions/audiosActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import audiosService from "../../../services/audioService";
import { saveUser, getUser } from "../../../services/userService";
import auth from "../../../services/authService";
import { getGenres } from "../../../services/genreService";
import Player from "../../common/player";
import AudiosTable from "../audiosTable/audiosTable";
import SearchBox from "../../common/searchBox/searchBox";
import ListGroup from "../../common/list-group/listGroup";
import _ from "lodash";

import styles from "./audios.module.scss";

export class Audios extends Component {
  async componentDidMount() {
    const genres = [{ _id: "", name: "Все жанры" }, ...getGenres()];

    const categories = [
      { _id: "", name: "Все" },
      { _id: 1, name: "Топ 3 популярные аудио" },
      { _id: 2, name: "Топ 3 по рейтингу" }
    ];
    const { data: audios } = await audiosService.getAudios();

    const user = auth.getCurrentUser();
    if (user && user._id) {
      categories.push({ _id: 3, name: "Понравившиеся аудио" });
      const { data: userData } = await getUser(user._id);
      this.props.setLikedAudios(userData.likedAudios);
    }

    this.props.setCategories(categories);
    this.props.setGenres(genres);
    this.props.setAudios(audios);
  }

  changeLimit = () => {
    const { limit } = this.props.audiosStore;
    if (limit > 0) this.props.changeLimit();
    return limit;
  };

  handleDelete = async audio => {
    if (
      window.confirm(
        `Вы уверены, что хотите удалить аудиозапись '${audio.title}'?`
      )
    ) {
      const originalAudios = this.props.audiosStore.audios;
      const audios = originalAudios.filter(a => a._id !== audio._id);
      this.props.setAudios(audios);
      try {
        await audiosService.deleteAudio(audio._id);
      } catch (ex) {
        toast.warn("Во время удаления произошла ошибка!");
        this.props.setAudios(originalAudios);
      }
    }
  };

  handleLike = async audio => {
    const audios = [...this.props.audiosStore.audios];
    const index = audios.indexOf(audio);
    const userId = auth.getCurrentUser()._id;
    const { data: user } = await getUser(userId);

    audios[index] = { ...audios[index] };

    if (user.likedAudios.indexOf(audios[index]._id) === -1) {
      audios[index].likes++;
      user.likedAudios.push(audios[index]._id);
    } else {
      audios[index].likes--;
      user.likedAudios = user.likedAudios.filter(a => a !== audios[index]._id);
    }
    this.props.setLikedAudios(user.likedAudios);
    await audiosService.saveAudio(audios[index]);
    await saveUser(user);
    this.props.setAudios(audios);
  };

  handleGenreSelect = genre => {
    this.props.selectGenre(genre);
  };

  handleCategorySelect = async category => {
    this.props.selectCategory(category);
    this.props.selectSortColumn({ path: "title", order: "asc" });
    this.props.changeSearchQuery("");

    if (category._id === 1) {
      const { data: audios } = await audiosService.getPopularAudios();
      this.props.setAudios(audios);
      this.props.selectSortColumn({ path: "auditions", order: "desc" });
    } else if (category._id === 2) {
      const { data: audios } = await audiosService.getRatingAudios();
      this.props.setAudios(audios);
      this.props.selectSortColumn({ path: "likes", order: "desc" });
    } else if (category._id === 3) {
      const { data: audios } = await audiosService.getLikedAudios();
      this.props.setAudios(audios);
    } else {
      const { data: audios } = await audiosService.getAudios();
      this.props.setAudios(audios);
    }
  };

  handleSort = sortColumn => {
    this.props.selectSortColumn(sortColumn);
  };

  handleSearch = query => {
    this.props.changeSearchQuery(query);
    this.props.selectGenre(null);
  };

  playAudio = async audio => {
    const { limit, audios } = this.props.audiosStore;
    if (limit === 0) {
      toast.warn(
        "Зарегистрируйтесь!\n для прослушивания неограниченного количества записей.",
        { position: toast.POSITION.BOTTOM_CENTER }
      );
      return;
    }
    if (audios.indexOf(audio) !== -1) {
      this.props.setCurrentAudio(audio);
    }
  };

  changeAudio = async decision => {
    const { limit, currentAudio } = this.props.audiosStore;
    if (limit === 0) {
      toast.warn(
        "Зарегистрируйтесь для прослушивания неограниченного количества записей.",
        { position: toast.POSITION.BOTTOM_CENTER }
      );
      return;
    }
    const { data: audios } = this.getPagedData();

    if (decision === "next") {
      const audio = audios[audios.indexOf(currentAudio) + 1];
      console.log(audio);
      if (audios.indexOf(audio) !== -1) {
        this.props.setCurrentAudio(audio);
      }
    }
    if (decision === "prev") {
      const audio = audios[audios.indexOf(currentAudio) - 1];
      if (audios.indexOf(audio) !== -1) {
        this.props.setCurrentAudio(audio);
      }
    }
  };

  getPagedData = () => {
    const {
      audios: allAudios,
      sortColumn,
      selectedGenre,
      searchQuery
    } = this.props.audiosStore;

    let filtered = allAudios;
    if (searchQuery) {
      filtered = allAudios.filter(a =>
        a.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allAudios.filter(
        a => a.genres.indexOf(selectedGenre.name) !== -1
      );
    //filtered = allAudios.filter(a => a.genres._id === selectedGenre._id);

    let sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: filtered.length, data: sorted };
  };

  render() {
    const { length: audiosCount } = this.props.audiosStore.audios;
    const {
      sortColumn,
      searchQuery,
      currentAudio,
      categories,
      genres,
      likedAudios,
      selectedCategory,
      selectedGenre
    } = this.props.audiosStore;
    const { user } = this.props;
    const { totalCount, data: audios } = this.getPagedData();

    return (
      <div id={styles["container"]}>
        {audiosCount === 0 && (
          <p className="warning">Нету аудиозаписей в базе данных.</p>
        )}
        <div id={styles["parameters-list"]}>
          <div>
            <label>Жанры: </label>
            <ListGroup
              id="genres-list"
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div>
            <label>Категории: </label>
            <ListGroup
              id="categories-list"
              items={categories}
              selectedItem={selectedCategory}
              onItemSelect={this.handleCategorySelect}
            />
          </div>
        </div>
        <div>
          <div>
            {user && user.isAdmin && (
              <Link to="/audios/edit/new">Добавить аудио</Link>
            )}
          </div>
          <p>Найдено {totalCount} аудиозаписей</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <AudiosTable
            audios={audios}
            likedAudios={likedAudios}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onClick={this.playAudio}
          />
        </div>
        <Player
          onPlayAudio={this.playAudio}
          onChangeAudio={this.changeAudio}
          currentAudio={currentAudio}
          changeLimit={this.changeLimit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  audiosStore: state.audiosStore
});

const mapDispatchToProps = dispatch => ({
  setAudios: audios => dispatch(audiosActions.setAudios(audios)),
  setLikedAudios: audios => dispatch(audiosActions.setLikedAudios(audios)),
  setCurrentAudio: audio => dispatch(audiosActions.setCurrentAudio(audio)),
  setGenres: genres => dispatch({ type: audiosActions.SET_GENRES, genres }),
  setCategories: categories =>
    dispatch({ type: audiosActions.SET_CATEGORIES, categories }),
  changeLimit: () => dispatch({ type: audiosActions.CHANGE_LIMIT }),
  selectGenre: (selectedGenre, searchQuery = "") =>
    dispatch({ type: audiosActions.SELECT_GENRE, selectedGenre, searchQuery }),
  selectCategory: selectedCategory =>
    dispatch({ type: audiosActions.SELECT_CATEGORY, selectedCategory }),
  selectSortColumn: sortColumn =>
    dispatch({ type: audiosActions.SELECT_SORT_COLUMN, sortColumn }),
  changeSearchQuery: query =>
    dispatch({ type: audiosActions.CHANGE_SEARCH_QUERY, query })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Audios);
