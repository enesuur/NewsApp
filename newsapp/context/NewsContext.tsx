import { createContext, useContext, useState, ReactNode } from "react";

interface NewsArticle {
  id:string;
  title: string;
  description?: string;
  category: string;
  date: number | string;
  imageUrl: string;
}

interface NewsContextType {
  news: NewsArticle[];
  setNews: (newArticles: NewsArticle[]) => void;
  getNews: () => NewsArticle[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);

  const getNews = () => {
    return news;
  };

  return (
    <NewsContext.Provider value={{ news, setNews, getNews }}>
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
