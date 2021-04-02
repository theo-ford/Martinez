import React, { useRef } from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";
import { orderBy, compare } from 'natural-orderby';
import { useMeasure } from "react-use";
import { ImageOrientation } from "../../components/utils/image-orientation";
import "../../components/styles/index.css";





const Index = ({ data }) => {

  
  const SingleArtist = () => {

    return (
      <div>

      </div>
    );
  };


  const artistList = data.allPrismicArtist.edges.map((content, index) => { 

      return (  

        <div 
          className="artist_title"
          dangerouslySetInnerHTML={{
            __html: content.node.data.artist_title.html,
          }}
        />  

      );

    }
  );


  return (
    <div>
      {artistList}
    </div>
  )

}

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
              dimensions {
                width
                height
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
