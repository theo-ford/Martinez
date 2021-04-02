import React from "react";
import { graphql } from "gatsby";
import { withPreview } from "gatsby-source-prismic";

const About = ({ data }) => {
  return (
		<>
			<div
				dangerouslySetInnerHTML={{
					__html: data.prismicAboutPage.data.about_title.html,
				}}
			/>
		</>
	);
};
export default withPreview(About);

export const query = graphql`
  {
    prismicAboutPage {
      data {
        about_title {
          html
        }
      }
    }
  }
`;