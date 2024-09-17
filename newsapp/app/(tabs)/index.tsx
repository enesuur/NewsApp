import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import NewsCard from "components/NewsCard";
import NewsArticle from "types/News";
import { ScrollView, YStack, H1, Button, XStack } from "tamagui";
import { useNewsContext } from "context/NewsContext";
import { FilterX } from "@tamagui/lucide-icons";
import Pagination from "components/Pagination";

const PAGE_SIZE = 2;

export default function NewsScreen() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const { setNews, filteredNews, setFilteredNews } = useNewsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCollectionRef = collection(db, "News");
        const newsSnapshot = await getDocs(newsCollectionRef);

        const newsList = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsArticle[];

        setNewsData(newsList);
        setNews(newsList);
        setTotalPages(Math.ceil(newsList.length / PAGE_SIZE));
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
    };

    fetchNews();
  }, [setNews]);

  const removeFilters = () => {
    setFilteredNews([]);
  };

  const newsToDisplay = filteredNews.length > 0 ? filteredNews : newsData;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedNews = newsToDisplay.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
 <ScrollView
      width="100%"
      height="100%"
      contentContainerStyle={{ background: 'none' }}
      marginBottom="$4"
    >
      <YStack width="100%" gap={24} flexDirection="column" backgroundColor="$background" borderRadius="$4" elevation={2}>
        <H1 alignSelf="center" marginVertical="$4">
          Headlines That Matter: Your Daily News Update
        </H1>

        <YStack>
          {paginatedNews.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              id={newsItem.id}
              title={newsItem.title}
              url={newsItem.url}
              category={newsItem.category}
              date={newsItem.date}
            />
          ))}
        </YStack>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </YStack>
    </ScrollView>
  );
}
