import React, { useState } from "react";
import {
  Button,
  View,
  XStack,
  H3,
  useTheme,
  YStack,
  H4,
  Paragraph,
} from "tamagui";
import { useNewsContext } from "../context/NewsContext";
import { categoryColors } from "constants/Colors";
import { Calendar, Check } from "@tamagui/lucide-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const CATEGORIES = Object.keys(categoryColors);

export default function ModalScreen() {
  const theme = useTheme();
  const { news } = useNewsContext();
  console.log(news);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

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

  return (
    <View flex={1} padding="$4">
      <H3 marginVertical="$4">Filter the events by category and date.</H3>
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
        <Button backgroundColor="red" color="white" iconAfter={<Check />}>
          Apply
        </Button>
      </YStack>
    </View>
  );
}
