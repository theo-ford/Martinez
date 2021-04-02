import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";
// import { Gallery } from '../components/images/gallery';
import { GalleryTwo } from '../components/images/galleryTwo';




const PageContainer = styled.div`
width: 100vw;
height:100vh;
`
const ImgContainer = styled.div`
  width: 200px;
  height:auto;
`

// const images = data.prismicArtist.data.gallery.map(
//   (content, index) => {
//     console.log(content);
//     return (
//       <p> hello </p>
//     );
//   }
// );


const GalleryThree = ({ data }) => {
  console.log(data.prismicArtist.data.gallery);

  return (
    <p>hey</p>
  )
}

const Artist = ({ data }) => {
  return (
    <PageContainer>
      <div
        dangerouslySetInnerHTML={{
          __html: data.prismicArtist.data.artist_title.html,
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: data.prismicArtist.data.artist_location.html,
        }}
      />
        <div
          className="artist_year"
          dangerouslySetInnerHTML={{
            __html: data.prismicArtist.data.artist_year.html,
          }}
        /> 
        <ImgContainer>
          <img
                src={data.prismicArtist.data.index_image.fluid.srcWebp}
                srcSet={data.prismicArtist.data.index_image.fluid.srcSetWebp}
                // alt={content.index_image.alt}
                loading="lazy"
              /> 
        </ImgContainer>  
        
        <GalleryTwo images={data.prismicArtist.data.gallery}/> 


    </PageContainer>
  );
};

export default withPreview(Artist);


export const query = graphql`
  query Artists($uid: String!) {
    prismicArtist(uid: { eq: $uid }) {
      data {
        artist_title {
          html
        }
        artist_location {
          html
        }
        artist_year {
          html
        }
        index_image {
          fluid {
            srcSetWebp
            srcWebp
          }
        }
        gallery {
          artist_image {
            fluid {
              srcSetWebp
              srcWebp
            }
            dimensions {
              width
              height
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
`;