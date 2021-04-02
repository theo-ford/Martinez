import React from "react";
import { findDOMNode } from "react-dom";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";
// import "../components/styles/index.css";

const ImageContainer = styled.div`
  width: 400px;
  height: auto;
  display: none;
`;

const ImgCon = (e) => {
   //ReactDOM.findDOMNode(<img>).getElementsByClassName("artist_index_img");
  // console.log('hello world');
  // var $t = $('img.artist_index_img');
  // console.log($t);

  return (
    <div className="img_con">
      <p>Hello </p>
    </div>
  )
}

const Index = ({ data }) => {
  // console.log(data);  
  const x = [];

  const handleClickTwo = (e) => {
    console.log(e.currentTarget);

  }

  const onScrollB = () => {
    console.log('scrolling');
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
        <ImgCon>
          
        </ImgCon>
        <div className="artist_list_con" onScroll={onScrollB} >
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
