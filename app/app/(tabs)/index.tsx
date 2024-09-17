import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import NewsCard from "components/NewsCard";
import NewsArticle from "types/News";
import { ScrollView, YStack, H1, Button, XStack, Spinner } from "tamagui";
import { useNewsContext } from "context/NewsContext";
import { FilterX } from "@tamagui/lucide-icons";
import Pagination from "components/Pagination";
import { Timestamp } from "firebase/firestore";

const PAGE_SIZE = 2;

export default function NewsScreen() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const { setNews, filteredNews, setFilteredNews } = useNewsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const newsCollectionRef = collection(db, "News");
        const newsSnapshot = await getDocs(newsCollectionRef);

        const newsList = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsArticle[];

        const sortedNewsList = newsList.sort((a, b) => {
          const dateA =
            a.date instanceof Timestamp ? a.date.toDate() : new Date(a.date);
          const dateB =
            b.date instanceof Timestamp ? b.date.toDate() : new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });

        setNewsData(sortedNewsList);
        setNews(sortedNewsList);
      } catch (error) {
        console.error("Error fetching news: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [setNews]);

  const removeFilters = () => {
    setFilteredNews([]);
    setCurrentPage(1);
  };

  const newsToDisplay = filteredNews.length > 0 ? filteredNews : newsData;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedNews = newsToDisplay.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(newsToDisplay.length / PAGE_SIZE));
    setCurrentPage(1);
  }, [newsToDisplay]);

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
      contentContainerStyle={{ background: "none" }}
      marginBottom="$4"
    >
      <YStack
        width="100%"
        gap={24}
        flexDirection="column"
        backgroundColor="$background"
        borderRadius="$4"
        elevation={2}
      >
        <H1 alignSelf="center" marginVertical="$4">
          Headlines That Matter: Your Daily News Update
        </H1>

        {loading ? (
          <YStack justifyContent="center" alignItems="center" height={400}>
            <Spinner size="large" />
          </YStack>
        ) : (
          <YStack>
            {filteredNews.length > 0 && (
              <XStack alignItems="flex-start">
                <Button
                  onPress={removeFilters}
                  marginBottom="$4"
                  icon={<FilterX />}
                  backgroundColor="red"
                  marginLeft="$2"
                  color="white"
                  pressStyle={{
                    bg: "red",
                    scale: 0.95,
                    borderColor: "red",
                  }}
                >
                  Remove Filters
                </Button>
              </XStack>
            )}

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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
}
