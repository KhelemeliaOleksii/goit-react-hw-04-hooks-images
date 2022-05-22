// import { PureComponent } from "react";
import { useState, useEffect, useRef } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery'
import Loader from './Loader'
import Button from "./Button";
import Modal from "./Modal";

import styles from './App.module.css'
import { requestImages } from "../services/pixabayAPI";
import { mapper } from "utils/mapper";

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [gallaryList, setGallaryList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [showItem, setShowItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadMoreActive, setIsLoadMoreActive] = useState(false);
  const alwaysOnViewRef = useRef(null);
  useEffect(() => {
    async function fetchData(searchValue, page) {
      if (searchValue.trim() === '') {
        setStatus('idle');
        return;
      }
      setError(false);
      setLoading(true);
      setStatus('idle');
      try {
        const data = await requestImages(searchValue, page);
        const { hits, total } = data;
        const itemOnCurrentPage = hits.length;

        //answer is empty
        if (itemOnCurrentPage === 0) {
          console.log('List of search result is empty');
          return;
        }
        //is enought item for next request
        // false button "Load more" not rendered
        // true button "Load more" is rendered
        if (!isRemainingItem(total, page, 12)) {
          setIsLoadMoreActive(false);
          console.log('No more photos');
        }
        setIsLoadMoreActive(true);
        // window.scrollTo(0, alwaysOnViewRef.current.offsetTop)
        //answer is not empty
        setGallaryList((prev) => mapper(hits, prev));
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
      } finally {
        setLoading(false);
      }
    }
    function isRemainingItem(total, page, perPage) {
      const showedItem = page * perPage;
      if (total <= showedItem) {
        return false;
      }
      return true;
    }
    fetchData(searchValue, page);
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

          {isLoadMoreActive && <Button ref={alwaysOnViewRef} onClick={onLoadMoreClick} />}
        </>
      }

      {(status === "rejected") && <div>ERROR</div>}

      {loading && <Loader />}

      {showItem && <Modal url={showItem.largeImageURL} description={showItem.tags} onClose={resetShowItem} />}
    </div>
  )

}
// export class App extends PureComponent {
//   state = {
//     searchValue: '',
//     gallaryList: [],
//     page: 1,
//     loading: false,
//     status: "idle", //resolve, reject
//     showItem: null,
//     error: null,
//   }

//   async componentDidUpdate(prevProps, prevState) {

//     // if searchValue is empty
//     if (this.state.searchValue.trim() === '') {
//       console.log('Inputed keyword is empty! Try again!');
//       this.setState({ status: "idle" })
//       return;
//     }

//     // if serchValue is reassigned by new value
//     const { page: currentPage, searchValue: currentSearchValue } = this.state;
//     const { page: prevPage, searchValue: prevSearchValue } = prevState;
//     const isNewRequest = currentSearchValue !== prevSearchValue;
//     const isLoadMoreRequest = currentPage > prevPage;

//     if (isNewRequest) {
//       this.setState({
//         loading: true,
//         status: "idle",
//       });

//       try {
//         const data = await requestImages(currentSearchValue, currentPage);
//         const { hits } = data;
//         const itemOnCurrentPage = hits.length;

//         // if answer is empty
//         if (itemOnCurrentPage === 0) {
//           console.log('List of search result is empty');
//           return;
//         }

//         // if answer is not empty
//         this.setState(
//           {
//             gallaryList: mapper(hits),
//             status: "resolved",
//           }
//         );
//       } catch (error) {
//         this.setState({
//           error,
//           status: "rejected",
//         });
//         console.log(error);
//       } finally {
//         this.setState({
//           loading: false
//         })
//       }
//     }

//     // if button 'load more' have been clicked
//     if (isLoadMoreRequest) {
//       this.setState({ loading: true });

//       try {
//         const data = await requestImages(currentSearchValue, currentPage);
//         const { hits } = data;
//         const itemOnCurrentPage = hits.length;

//         // if answer is empty
//         if (itemOnCurrentPage === 0) {
//           console.log('No more photos');
//           return;
//         }

//         // if answer is not empty
//         this.setState(
//           {
//             gallaryList: mapper(hits, prevState.gallaryList),
//             status: "resolved",
//           }
//         );
//       } catch (error) {
//         this.setState({
//           error,
//           status: "rejected",
//         });
//         console.log(error);
//       } finally {
//         this.setState({
//           loading: false
//         })
//       }
//     }
//   }

//   showGallaryItem = (id) => {
//     const item = this.state.gallaryList.find((item) => item.id === id);
//     this.setState({
//       showItem: {
//         largeImageURL: item.largeImageURL,
//         tags: item.tags,
//       }
//     });
//   }

//   resetShowItem = () => {
//     this.setState({ showItem: null });
//   }

//   onSubmit = (searchValue) => {
//     this.setState({
//       searchValue: searchValue.toLowerCase(),
//       page: 1,
//       error: null,
//     });
//   }

//   onLoadMoreClick = () => {
//     this.setState(({ page: prevPage }) => ({ page: prevPage + 1 }))
//   }

//   render() {
//     const { gallaryList, loading, status, showItem } = this.state;
//     return (
//       <div className={styles.App}>
//         <Searchbar onSubmit={this.onSubmit} />
//         {(status === "resolved") &&
//           <>
//             <ImageGallery gallaryList={gallaryList} showPoster={this.showGallaryItem} />
//             <Button onClick={this.onLoadMoreClick} />
//           </>
//         }
//         {(status === "rejected") &&
//           <div>ERROR</div>
//         }

//         {loading && <Loader />}

//         {showItem && <Modal url={showItem.largeImageURL} description={showItem.tags} onClose={this.resetShowItem} />}
//       </div>
//     )

//   }
// }
