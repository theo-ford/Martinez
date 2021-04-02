import React, { useRef } from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";
import { orderBy, compare } from 'natural-orderby';
import { useMeasure } from "react-use";
// import "../components/styles/index.css";


const ImgCon = (e) => {
  return (
    <div className="img_con">
      <p>Hello </p>
    </div>
  )
}

const TestDOM2 = () => {
  console.log('test testDOM');
  const node = ReactDOM.findDOMNode(this);
  console.log(node);  
  return (
      <div className='testDOM' >
        <p>Test</p>
      </div>
    )
}


const Index = ({ data }) => {
  const handleClickTwo = (height) => {
    console.log(height);
  }
  const handleScroll = (f) => {
    console.log(f.currentTarget);
    console.log(f.currentTarget.clientHeight);
  }  
  
  const TestRef = (props) => {
    const refTest = useRef(null);
    // this is being really buggy can't get it to work
    // consistently returning null
    console.log(refTest.current);
    // console.log(refTest.current.clientHeight);
    return (
      <div className='testRef' ref={refTest}>
        <p>Test</p>
      </div>
    )
  }

  const ThisTestFunction = function(g) {
    console.log('Function: ' + this);
    return (
      <div>
        <p>This Function</p>
      </div>
    )
  }

  const ThisTestArrow = (h) => {
    console.log(h);
    return (
      <div className='arrow'>
        <p>This Arrow</p>
      </div>
    )
  }  

  // const sortedArtists = orderBy(data.allPrismicArtist.edges)
  // const sortedArtists = orderBy(data.allPrismicArtist.edges, [(v) => v.node.data.artist_title.text], ["asc"]);
  const sortedArtists = orderBy(data.allPrismicArtist.edges, [(v) => v.node.data.artist_title.text], ["asc"]);
  const comparedArtists = sortedArtists.sort((a, b) => compare()(a.node.data.artist_title.text, b.node.data.artist_title.text));
  // const localCompare = sortedArtists.localeCompare({numeric: true, sensitivity: 'base'});
  // const localCompare = sortedArtists.localeCompare();

  const localeCompareArray = data.allPrismicArtist.edges.sort((a, b) =>
  a.node.data.artist_title.text.localeCompare(b.node.data.artist_title.text, undefined, {
     numeric: true,
      sensitivity: 'base'
    })
  );

  const artists = localeCompareArray.map(
    (content, index) => {
      // const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();
      return (

      <div key={index} className="artist" >      
          <div 
            onClick={() => handleClickTwo()} 
            className="artist_title"
            dangerouslySetInnerHTML={{
              __html: content.node.data.artist_title.html,
            }}
          />
        <img className="artist_index_img"
          src={content.node.data.index_image.fluid.srcWebp}
          srcSet={content.node.data.index_image.fluid.srcSetWebp}
          // alt={content.index_image.alt}
          loading="lazy"
        />  
      </div>
    )});


  return (   
    <div className="index_page_con" >  
      
      
      <div className="artist_list_con">
        <div className="artist_list">
          {artists}
        </div>
      </div>
    </div>
  );
};

export default withPreview(Index);
export const query = graphql`
{
    allPrismicArtist(sort: {order: ASC, fields: data___artist_title___text}) {
      edges {
        node {
          uid
          data {
            artist_title {
              html
              text
            }
            index_image {
              fluid {
                srcSetWebp
                srcWebp
              }
            }
            artist_location {
              html
            }
            artist_year {
              html
            }
            gallery {
              artist_image {
                fluid {
                  srcSetWebp
                  srcWebp
                }
              }
              artist_image_location {
                html
              }
              artist_image_year {
                html
              }
            }
          }
        }
      }
    }
  }
`;
