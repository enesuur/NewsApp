import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import NewsCard from "components/NewsCard";
import NewsArticle from "types/News";
import { ScrollView, YStack, H1 } from "tamagui";

export default function NewsScreen() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);

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
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <ScrollView
      width="100%"
      height="100%"
      contentContainerStyle={{
        background: "none",
      }}
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

        {newsData.map((news) => (
          <NewsCard
            id={news.id}
            key={news.id}
            title={news.title}
            category={news.category}
            date={news.date}
            url={news.url}
          />
        ))}
      </YStack>
    </ScrollView>
  );
}
