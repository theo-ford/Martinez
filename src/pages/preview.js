import * as React from "react";
import { withPreviewResolver } from "gatsby-source-prismic";

const PreviewPage = ({ isPreview, isLoading }) => {
  if (isPreview === false) return "Not a preview!";

  return (
    <>
      <p>Loading</p>
    </>
  );
};

export default withPreviewResolver(PreviewPage, {
  repositoryName: `Martinez-2`,
  linkResolver: ({ node, key, value }) => (post) => `/${post.uid}`,
});
