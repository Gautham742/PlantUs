import React from 'react';

interface LimitedParagraphProps {
  content: string;
  limit: number;
}

const LimitedParagraph: React.FC<LimitedParagraphProps> = ({ content, limit }) => {
  const words = content.split(' ');

  if (words.length <= limit) {
    return <p>{content}</p>;
  }

  const limitedContent = words.slice(0, limit).join(' ');
  return (
    <p>
      {limitedContent}...
    </p>
  );
};

export default LimitedParagraph;
