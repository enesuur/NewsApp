import { ScrollView } from "react-native";
import { Text, YStack, XStack, H3, Paragraph, Spinner } from "tamagui";
import { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import NewsArticle from "types/News";
import formatDate from "helpers/formatDate";
import { categoryColors } from "constants/Colors";
import { useNavigation } from "expo-router";
import { Image } from "expo-image";
import blurhash from "../../constants/Hashes";

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const [postData, setPostData] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  navigation.setOptions({ title: "Details" });

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const documentId = Array.isArray(id) ? id[0] : id;
        const docRef = doc(db, "News", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPostData(docSnap.data() as NewsArticle);
        } else {
          setError("No such document!");
        }
      } catch (error) {
        console.error("Error fetching news: ", error);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id]);

  return (
    <ScrollView>
      {loading ? (
        <YStack
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%", marginTop: 20 }}
        >
          <Spinner size="large" />
        </YStack>
      ) : error ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>
          {error}
        </Text>
      ) : postData ? (
        <YStack gap="$2">
          <Image
            source={{ uri: postData.url }}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            style={{
              width: "100%",
              height: 256,
              objectFit: "cover",
              marginBottom: 16,
            }}
          />
          <YStack padding="$3">
            <H3 fontWeight="bold" marginBottom="$2">
              {postData.title}
            </H3>

            <XStack justifyContent="space-between" marginVertical="$2">
              <Text
                fontSize="$4"
                color={categoryColors[postData.category] || "blue"}
                marginBottom="$1"
              >
                {postData.category}
              </Text>

              <XStack alignItems="center" marginTop="$2">
                <Text fontSize="$2" color="#999" marginLeft="$1">
                  {formatDate(postData.date)}
                </Text>
              </XStack>
            </XStack>

            <Paragraph fontSize={16} marginVertical="$4">
              {postData.description}
            </Paragraph>
          </YStack>
        </YStack>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No content available.
        </Text>
      )}
    </ScrollView>
  );
}

export const options = {
  title: "Details",
};
