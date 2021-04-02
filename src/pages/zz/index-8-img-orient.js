import React, { useRef } from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";
import { orderBy, compare } from 'natural-orderby';
import { useMeasure } from "react-use";
import { ImageOrientation } from "../../components/utils/image-orientation";
// import "../components/styles/index.css";





const Index = ({ data }) => {

  
 

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

  const SingleArtist = ({ index, content }) => {
    const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();
    return (
      <div key={index} className="artist" ref={ref}>      
          <div 

            className="artist_title"
            dangerouslySetInnerHTML={{
              __html: content.node.data.artist_title.html,
            }}
          />
        <img className={`${ImageOrientation(content.node.data.index_image)} art_index_img`}
          src={content.node.data.index_image.fluid.srcWebp}
          srcSet={content.node.data.index_image.fluid.srcSetWebp}
          // alt={content.index_image.alt}
        />  
      </div>
    );
  };

  const artists = localeCompareArray.map(
    (content, index) => {
      return (
        <SingleArtist
          content={content}
          index={index}
          key={index}
        >
        </SingleArtist>

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
