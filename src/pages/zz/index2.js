import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";

const ImageContainer = styled.div`
  width: 400px;
  height: auto
`

const Index = ({ data }) => {
  console.log(data);  

  const artists = data.allPrismicArtist.edges.map(
    (content, index) => (

      
      <div key={index}>
        <Link to={content.node.uid} >
          <ImageContainer>
            <img
                  src={content.node.data.index_image.fluid.srcWebp}
                  srcSet={content.node.data.index_image.fluid.srcSetWebp}
                  // alt={content.index_image.alt}
                  loading="lazy"
                />
          </ImageContainer>
          <div
            className="artist_title"
            dangerouslySetInnerHTML={{
              __html: content.node.data.artist_title.html,
            }}
          /> 
          <div
            className="artist_year"
            dangerouslySetInnerHTML={{
              __html: content.node.data.artist_year.html,
            }}
          /> 
          <div
            className="artist_location"
            dangerouslySetInnerHTML={{
              __html: content.node.data.artist_location.html,
            }}
          />  
        </Link>                  
      </div>
    ));

  return (

    <div>
      
      {artists}

    </div>

    
  );
};

export default withPreview(Index);
export const query = graphql`
{
    allPrismicArtist {
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
