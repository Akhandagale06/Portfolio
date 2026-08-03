import React from 'react';
import { ARTICLES } from '../../data/portfolioData';

export const ArticlesSection: React.FC = () => {
  // If articles are commented out or empty, do not render the section
  if (!ARTICLES || ARTICLES.length === 0) return null;

  return null;
};
