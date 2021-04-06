import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";
// import { Gallery } from '../components/images/gallery';

import { GalleryTwo } from "../components/images/galleryTwo";
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../components/styles/artist.css";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

// const images = data.prismicArtist.data.gallery.map(
//   (content, index) => {
//     console.log(content);
//     return (
//       <p> hello </p>
//     );
//   }
// );

const GalleryThree = ({ data }) => {
  return (
    <div>
      <p>hey</p>
    </div>
  );
};

const Artist = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(null);

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    setTotalSlides(data.prismicArtist.data.gallery.length);
  }, []);

  const updateCurrentSlide = index => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  // console.log(data.prismicArtist.data.gallery);

  const artistGallery = data.prismicArtist.data.gallery.map((artist, index) => (
    <img
      key={`artist_image_${index}`}
      className="index-image"
      src={artist.artist_image.fluid.srcWebp}
      srcSet={artist.artist_image.fluid.srcSetWebp}
      // alt={content.index_image.alt}
      loading="lazy"
    />
  ));

  return (
    <div>
      <div className="exit-artist-button-con">
        <Link to={`/`}>
          <img src="icons/exit-black.png" />
        </Link>
      </div>

      <Carousel
        showIndicators={false}
        showThumbs={false}
        infiniteLoop={true}
        transitionTime={0}
        onChange={index => updateCurrentSlide(index)}
      >
        {artistGallery}
        {/* <div>
          <img className="carousel-img" src="img/9 VOLT.jpg" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img className="carousel-img" src="img/9 VOLT2.jpg" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img className="carousel-img" src="img/9VOLT1.jpg" />
          <p className="legend">Legend 3</p>
        </div> */}
      </Carousel>

      <div className="artist-artist-title-and-counter-con">
        <p>
          TEST{" "}
          <span>
            {currentSlide + 1}/{totalSlides}
          </span>
        </p>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: data.prismicArtist.data.artist_title.html,
        }}
      />
      <img
        className="index-image"
        src={data.prismicArtist.data.index_image.fluid.srcWebp}
        srcSet={data.prismicArtist.data.index_image.fluid.srcSetWebp}
        // alt={content.index_image.alt}
        loading="lazy"
      />
    </div>
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
        }
      }
    }
  }
`;
