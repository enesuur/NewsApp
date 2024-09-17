import { Card, YStack, XStack, Text, H4 } from "tamagui";
import { Image } from "expo-image";
import { Calendar } from "@tamagui/lucide-icons";
import { categoryColors } from "constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import NewsArticle from "../types/News";
import formatDate from "helpers/formatDate";
import { StyleSheet } from "react-native";
import blurhash from "constants/hashes";

const NewsCard: React.FC<NewsArticle> = ({
  url,
  title,
  category,
  date,
  id,
}) => {
  const router = useRouter();
  const categoryColor = categoryColors[category] || "#000";

  const handlePress = () => {
    router.push(`/post/${id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card
        padding="$2"
        borderRadius="$2"
        backgroundColor="#fff"
        shadowColor="rgba(0, 0, 0, 0.1)"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.2}
        shadowRadius={3}
        marginBottom="$3"
      >
        <Image
          source={{ uri: url }}
          alt={title}
          style={imageStyles.image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />

        <YStack>
          <H4 fontWeight="bold" marginBottom="$2">
            {title}
          </H4>

          <XStack justifyContent="space-between" marginVertical="$2">
            <Text fontSize="$4" color={categoryColor} marginBottom="$1">
              {category}
            </Text>

            <XStack alignItems="center" marginTop="$2">
              <Calendar size={12} color="#999" />
              <Text fontSize="$2" color="#999" marginLeft="$1">
                {formatDate(date)}
              </Text>
            </XStack>
          </XStack>
        </YStack>
      </Card>
    </TouchableOpacity>
  );
};

const imageStyles = StyleSheet.create({
  image: {
    width: "100%",
    height: 256,
    backgroundColor: "#0553",
    marginBottom: 8,
  },
});

export default NewsCard;
