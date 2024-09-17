import { Card, Image, YStack, XStack, Text, H4 } from "tamagui";
import { Calendar } from "@tamagui/lucide-icons";
import NewsArticle from "../types/News";
import { categoryColors } from "constants/Colors";
import formatDate from "helpers/formatDate";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

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
          width="100%"
          height={256}
          marginBottom="$2"
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

export default NewsCard;
