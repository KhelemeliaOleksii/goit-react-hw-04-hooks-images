// import { PureComponent } from "react";
import { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery'
import Loader from './Loader'
import Button from "./Button";
import Modal from "./Modal";

import styles from './App.module.css'
import { pixabayAPI } from "../services/pixabayAPI";
import { mapper } from "utils/mapper";

const PER_PAGE = 12;

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [gallaryList, setGallaryList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [showItem, setShowItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadMoreActive, setIsLoadMoreActive] = useState(false);
  useEffect(() => {
    fetchData(searchValue, page);

    // setError(false);

    function fetchData(searchValue, page) {
      if (isSearchValueEmpty(searchValue)) {
        return;
      }
      setLoading(true);
      try {
        pixabayAPI
          .requestImages(searchValue, page)
          .then(({ hits, total }) => {

            //answer is empty
            if (isSerchResultEmpty(total)) { return }

            //answer is not empty
            gallaryRender(hits);
            loadMoreButtonRender(total, page, PER_PAGE);

            setStatus('resolved');

          });
      } catch (error) {
        setError(error);
        setStatus('rejected');
      } finally {
        setLoading(false);
      }
    }
    function gallaryRender(hits) {
      setGallaryList((prev) => [...prev, ...mapper(hits)]);
    }

    /*  function loadMoreButtonSwitcher
      in: total - total amount,
          page - page number
          perPage - count of items per one page
      do: is enought item for next request
       false button "Load more" is  not rendered
       true button "Load more" is rendered */
    function loadMoreButtonRender(total, page, perPage) {
      if (!isRemainingItem(total, page, perPage)) {
        setIsLoadMoreActive(false);
        console.log('No more photos');
      } else {
        setIsLoadMoreActive(true);
      }
    }
    /* function isSerchResultEmpty
      in: total - total amount 
     */
    function isSerchResultEmpty(total) {
      if (total === 0) {
        setStatus('idle');
        // setIsLoadMoreActive(false);
        console.log('List of search result is empty');
        return true;
      }
      return false;
    }
    function isRemainingItem(total, page, perPage) {
      const showedItem = page * perPage;
      if (total <= showedItem) {
        return false;
      }
      return true;
    }
    function isSearchValueEmpty(searchValue) {
      if (searchValue.trim() === '') {
        setStatus('idle');
        return true;
      }
      return false;
    }

  }, [searchValue, page])


  const onSubmit = (value) => {
    setSearchValue(value);
    setError(null);
    setPage(1);
    setGallaryList([]);
  }
  const onLoadMoreClick = () => {
    setPage(prev => prev + 1);
  }

  const showGallaryItem = (id) => {
    const item = gallaryList.find((item) => item.id === id);
    setShowItem({
      largeImageURL: item.largeImageURL,
      tags: item.tags,
    });
  }
  const resetShowItem = () => {
    setShowItem(null);
  }
  // const { gallaryList, loading, status, showItem } = this.state;
  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onSubmit} />
      {(status === "resolved") &&
        <>
          <ImageGallery gallaryList={gallaryList} showPoster={showGallaryItem} />

          {isLoadMoreActive && <Button onClick={onLoadMoreClick} />}
        </>
      }

      {(status === "rejected") && <div>ERROR:{console.log(error)}</div>}

      {loading && <Loader />}

      {showItem && <Modal url={showItem.largeImageURL} description={showItem.tags} onClose={resetShowItem} />}
    </div>
  )

}
