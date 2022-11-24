import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
      country: 'in',
      category: 'general'
    }

    static propTypes = {
      country: PropTypes.string,
      category: PropTypes.string
    }

    capitaliseFirstCharacter = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor (props){
      super(props);
      console.log("Hello I am a constructor from news component");
      this.state = {
        articles: [],
        loading: true,
        page:1,
        totalResults:0
      }
      document.title = `${this.capitaliseFirstCharacter(this.props.category)} - Newsonkey`
    }

    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c170a399894c4169bf91ff32220b6f97&page=${this.state.page}&pageSize=20`
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false
      })
    }

    async componentDidMount(){
      this.updateNews()
    }
    handlePreviousClick = async () =>{
      this.setState({
        page: this.state.page - 1
      })
      this.updateNews()

    }
    handleNextClick = async () =>{
     
      this.setState({
        page: this.state.page + 1
      })
      this.updateNews()
    }
    fetchMoreData = async () => {
      this.setState({page: this.state.page + 1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c170a399894c4169bf91ff32220b6f97&page=${this.state.page}&pageSize=20`
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults
      })
    }
    
  render() {
    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines from {this.capitaliseFirstCharacter(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
        <div className='row my-3'>
          {this.state.articles.map((element)=>{
            return <div className='col-md-4 my-2' key={element.url}>
            <NewsItem title={element.title ? element.title:" "} description={element.description? element.description: ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
          
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    )
  }
}

export default News
