import React, { useState } from "react";
import { Button, View, XStack, H3, YStack, H4, Paragraph } from "tamagui";
import { useNewsContext } from "../context/NewsContext";
import { categoryColors } from "constants/Colors";
import { Calendar, Check } from "@tamagui/lucide-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";

const CATEGORIES = Object.keys(categoryColors);

export default function ModalScreen() {
  const { getNews, setFilteredNews, filteredNews } = useNewsContext();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const router = useRouter();
  const toast = useToastController();
  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((item) => item !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const applyFilters = () => {
    const newsData = getNews();

    const hasCategories = selectedCategory.length > 0;
    const hasDate = !!selectedDate;

    let filteredNews = newsData;

    if (hasCategories) {
      filteredNews = filteredNews.filter((news) =>
        selectedCategory.includes(news.category)
      );
    }

    if (hasDate) {
      const selectedTimestampStart = new Date(
        selectedDate.setHours(0, 0, 0, 0)
      ).getTime();
      const selectedTimestampEnd = new Date(
        selectedDate.setHours(23, 59, 59, 999)
      ).getTime();

      filteredNews = filteredNews.filter((news) => {
        const newsDateObject = new Date(
          news.date.seconds * 1000 + news.date.nanoseconds / 1000000
        );
        const newsTimestamp = newsDateObject.getTime();
        return (
          newsTimestamp >= selectedTimestampStart &&
          newsTimestamp <= selectedTimestampEnd
        );
      });
    }

    if (filteredNews.length === 0) {
      toast.show("No news to show.", {
        message: "Try another options.",
      });
    } else {
      setFilteredNews(filteredNews);
      router.push("/");
    }
  };

  return (
    <View flex={1} padding="$4">
      <H3 marginVertical="$4">Filter the news by category and date.</H3>
      <XStack flexWrap="wrap" space="$4" rowGap="$2">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            onPress={() => handleCategoryClick(category)}
            backgroundColor={
              selectedCategory.includes(category)
                ? categoryColors[category as keyof typeof categoryColors]
                : "$background"
            }
            borderColor={
              categoryColors[category as keyof typeof categoryColors]
            }
            color={selectedCategory.includes(category) ? "#fff" : "#000"}
          >
            {category}
          </Button>
        ))}
      </XStack>

      <YStack>
        <H4 marginVertical="$4">Filter by date.</H4>
        <Button
          onPress={() => setShowPicker(true)}
          icon={<Calendar />}
          backgroundColor="white"
          borderColor="red"
          width="200px"
          color="red"
          pressStyle={{
            bg: "white",
            scale: 0.95,
            borderColor: "red",
          }}
        >
          Select Date
        </Button>
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Paragraph marginTop="$2" textAlign="center">
          Selected Date: {selectedDate.toDateString()}
        </Paragraph>
      </YStack>

      <YStack marginTop="auto">
        <Button
          backgroundColor="red"
          color="white"
          iconAfter={<Check />}
          onPress={applyFilters}
          pressStyle={{
            bg: "red",
            scale: 0.95,
            borderColor: "red",
          }}
        >
          Apply
        </Button>
      </YStack>
    </View>
  );
}
