import React, { useRef, useState } from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { withPreview } from "gatsby-source-prismic";
import { orderBy, compare } from 'natural-orderby';
import { useMeasure } from "react-use";
import { ImageOrientation } from "../components/utils/image-orientation";
import { useInView } from 'react-intersection-observer';
import "../components/styles/index.css";
import { Open } from "../components/icons/menu-toggle.js";
import Scrollspy from 'react-scrollspy';





const Index = ({ data }) => {

  const About = () => {
    const [isActive, setActive] = useState("false");
    const hangleToggle = () => {
      setActive(!isActive);
    }
    return (
      <div>
        <div onClick={hangleToggle} className='about-button-con'>
          <img src='icons/burger-black.png'/>
        </div> 

        <div className={` about-con ${isActive ? "" : "active"}`}>
          <div onClick={hangleToggle} className="about-exit-button-con">
            <img src='icons/exit-white.png' />            
          </div>
          <div className='about-text-con'>
            <p className='about-text'>{data.prismicAboutPage.data.about_content.text}</p>
          </div>          
        </div>
      </div>
    );
  };

  const AlphabetNav = () => {
    return (
        <ul className='alphabet-nav'>
          <li onClick={() =>
            document.querySelector("#group-A").scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }>
            A
          </li>
          <li onClick={() =>
            document.querySelector("#group-B").scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }>
            B
          </li>
          <li onClick={() =>
            document.querySelector("#group-C").scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }>
            C
          </li>
          <li onClick={() =>
            document.querySelector("#group-1").scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }>
            0-9
          </li>                              
        </ul>
    )
  }

  // SCROLL SPY
  const scrollSpyArtistsItemsArray = data.allPrismicArtist.edges.map((content, index) =>
    content.node.data.artist_title.text
  ) 
  const scrollSpyArtistsListLi = data.allPrismicArtist.edges.map((content, index) => {
      return (
        <li
          key={index} 
          className={content.node.data.artist_title.text }
        >
          <p className='artist-title'>{ content.node.data.artist_title.text }</p>
            <img className={`artist-img ${ImageOrientation(content.node.data.index_image)}`} src={content.node.data.index_image.fluid.srcWebp } />
        </li>
      )    
    }
  );


  const SingleArtist = ({ index, data, content }) => {
    return (
      <a className='artist-link' href={content.node.uid}>
        <h1
          className='artist-title'
          id={content.node.data.artist_title.text}
        >
          {content.node.data.artist_title.text}
        </h1>
        <br/>
      </a>
    );
  };

  const artistList = data.allPrismicArtist.edges.map((content, index) => {
      return (
        <SingleArtist
          key={`artist_${index}`}
          index={index}
          data={data}
          content={content}
        />
      )
    }
  );


  // const array = ['10 FOOT', '45 RPM', '9 VOLT', '910D0', 'AGUA', 'BEAST', 'KEN 5', 'NEMCO'];
  const arrayTwo = data.allPrismicArtist.edges.map((content, index) => {
    return content.node.data.artist_title.text;
  });
  const arrayThree = Array.from(data.allPrismicArtist.edges);
  console.log(arrayThree)
  arrayThree.sort((a, b) => isFinite(a[0]) - isFinite(b[0])
      || a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );  

  console.log(arrayTwo);


  // https://stackoverflow.com/questions/51009090/sort-and-group-objects-alphabetically-by-first-letter-javascript
  let dataTwo = data.allPrismicArtist.edges.reduce((r, e) => {
  // let dataTwo = arrayTwo.reduce((r, e) => {
    // get first letter of name of current element
    let group = e.node.data.artist_title.text[0];
    // if there is no property in accumulator with this letter create it
    if(!r[group]) r[group] = {group, children: [e]}
    // if there is push current element to children array for that letter
    else r[group].children.push(e);
    // return accumulator
    return r;
  }, {})

  // since data at this point is an object, to get array of values
  // we use Object.values method
  let result = Object.values(dataTwo)

  const alphabet = result.map((content, index) => {
    const alphabetChildren = content.children.map((content, index) => {
      return (
        <div key={index}>
          <a href={content.node.uid}>
            <h1 className='artist-title' id={content.node.data.artist_title.text}> {content.node.data.artist_title.text}</h1>
          </a>
        </div>
      );
    });
    return (
      <div id={`group-${content.group}`} key={content.group} >
        {alphabetChildren}
      </div>
    )
  });


  return (
    <div>
      <About />
      <AlphabetNav />

      <div className='img-con'>
        <Scrollspy 
          items={ scrollSpyArtistsItemsArray } 
          currentClassName="is-current"
        >
          {scrollSpyArtistsListLi}       
        </Scrollspy>
      </div>

      <div className='artist-list-con'>
        <div className='artist-list'>
          
          {alphabet}   
        </div>     
      </div>




      

      


      






    </div>
  )

}


export default withPreview(Index);

export const query = graphql`
{
  prismicAboutPage {
    data {
      about_content {
        text
      }
    }
  }  
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
