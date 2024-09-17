import { createContext, useContext, useState, ReactNode } from "react";
import NewsArticle from "types/News";

interface NewsContextType {
  news: NewsArticle[];
  setNews: (newArticles: NewsArticle[]) => void;
  getNews: () => NewsArticle[];
  filteredNews: NewsArticle[];
  setFilteredNews: (newArticles: NewsArticle[]) => void;
  getFilteredNews: () => NewsArticle[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);

  const getNews = () => {
    return news;
  };

  const getFilteredNews = () => {
    return filteredNews;
  };

  return (
    <NewsContext.Provider value={{ news, setNews, getNews, filteredNews, setFilteredNews, getFilteredNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
};

export default NewsContext;
