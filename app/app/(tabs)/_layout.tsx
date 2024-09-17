import { Link, Tabs } from "expo-router";
import { Button, useTheme } from "tamagui";
import { Newspaper, Bot, Filter } from "@tamagui/lucide-icons";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.background.val,
        },
        headerTintColor: theme.black1.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "News",
          tabBarIcon: ({ color }) => <Newspaper color={color} />,
          headerTitleStyle: {
            textAlignVertical: "center",
            alignSelf: "center",
          },
          headerRight: () => (
            <Link href="/FilterModal" asChild>
              <Button
                mr="$2"
                bg="red"
                color="white"
                size="$4"
                gap={0}
                icon={<Filter size={16} />}
                pressStyle={{
                  bg: "red",
                  scale: 0.95,
                  borderColor: "red",
                }}
              >
                Filter
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="developer"
        options={{
          title: "Developer",
          tabBarIcon: ({ color }) => <Bot color={color} />,
        }}
      />
    </Tabs>
  );
}
