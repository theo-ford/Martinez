import React, { useRef } from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";
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
  
  const x = [];

  const handleClickTwo = (e) => {
    console.log(e.currentTarget);

  }
  const handleScroll = (f) => {
    console.log(f.currentTarget);
    console.log(f.currentTarget.clientHeight);
  }  

  const TestRef = (props) => {
    const refTest = useRef(null);
    console.log(refTest.current.clientHeight);
    return (
      <div className='testRef' ref={refTest}>
        <p>Test</p>
      </div>
    )
  }
  const artists = data.allPrismicArtist.edges.map(
    (content, index) => (
      <div key={index} className="artist" >
            <div  
              onClick={handleClickTwo}
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
    ));
  return (

    <div>
      
      <div className="index_page_con" >
        <TestRef />
        <ImgCon>
          
        </ImgCon>
        <div className="artist_list_con" onScroll={handleScroll} >
          <div className="artist_list">
            {artists}
          </div>
        </div>
      </div>

    </div>

    
  );
};

export default withPreview(Index);
export const query = graphql`
{
    allPrismicArtist(sort: {order: ASC, fields: data___artist_title___html}) {
      edges {
        node {
          uid
          data {
            artist_title {
              html
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
