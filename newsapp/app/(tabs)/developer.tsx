import { Text, View, XStack, Button, H3, H4 } from "tamagui";
import { Globe, Github } from "@tamagui/lucide-icons";
import { Linking } from "react-native";

export default function DeveloperScreen() {
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      bg="$background"
      padding="$4"
    >
      <H3 fontSize={20} color="$red" marginBottom="$4" textAlign="center">
        Developed by github/enesuur
      </H3>
      <H4 fontSize={20} color="$red" marginBottom="$4" textAlign="center">
        ^^ Reach me out ^^
      </H4>
      <XStack space="$2" justifyContent="center">
        <Button
          onPress={() => Linking.openURL("https://enesugur.cloud")}
          icon={<Globe />}
          backgroundColor="red"
          color="white"
          pressStyle={{
            bg: "red",
            scale: 0.95,
            borderColor: "red",
          }}
        >
          enesugur.cloud
        </Button>

        <Button
          onPress={() => Linking.openURL("https://github.com/enesuur")}
          icon={<Github />}
          backgroundColor="red"
          color="white"
          pressStyle={{
            bg: "red",
            scale: 0.95,
            borderColor: "red",
          }}
        >
          github/enesuur
        </Button>
      </XStack>
    </View>
  );
}
