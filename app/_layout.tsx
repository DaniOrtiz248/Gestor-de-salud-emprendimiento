// app/_layout.tsx
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Menu from "../components/Menu";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";

export default function Layout() {
  return (
    <AuthProvider>
      <DataProvider>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "#A5D8FF"}}>
          <StatusBar style="auto" />
          <AppStack />
        </SafeAreaProvider>
      </DataProvider>
    </AuthProvider>
  );
}

function AppStack() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Pantallas públicas */}
        <Stack.Screen
          name="index"
          options={{ animation: "slide_from_left", animationDuration: 300 }}
        />
        <Stack.Screen
          name="signUp/index"
          options={{ animation: "slide_from_right", animationDuration: 300 }}
        />

        {/* Pantallas privadas */}
        <Stack.Screen
          name="dashboardFamily/index"
          options={{ animation: "slide_from_bottom", animationDuration: 300 }}
        />
        <Stack.Screen
          name="viewPatientsFamily/index"
          options={{ animation: "fade", animationDuration: 300 }}
        />
        <Stack.Screen
          name="createPatientFamily/index"
          options={{ animation: "fade", animationDuration: 300 }}
        />
        <Stack.Screen
          name="profile/index"
          options={{ animation: "fade", animationDuration: 300 }}
        />
        <Stack.Screen
          name="linkCaregiver/index"
          options={{ animation: "fade", animationDuration: 300 }}
        />
        <Stack.Screen
          name="appointments/index"
          options={{ animation: "slide_from_right", animationDuration: 300 }}
        />
        <Stack.Screen
          name="appointments/schedule"
          options={{ animation: "slide_from_bottom", animationDuration: 300 }}
        />
        <Stack.Screen
          name="appointments/browse"
          options={{ animation: "slide_from_right", animationDuration: 300 }}
        />
        <Stack.Screen
          name="medications/index"
          options={{ animation: "slide_from_right", animationDuration: 300 }}
        />
        <Stack.Screen
          name="medications/daily"
          options={{ animation: "slide_from_right", animationDuration: 300 }}
        />
        <Stack.Screen
          name="medical-history/index"
          options={{ animation: "slide_from_right", animationDuration: 300 }}
        />
        <Stack.Screen
          name="support/index"
          options={{ animation: "slide_from_right", animationDuration: 300 }}
        />
        <Stack.Screen
          name="premium-tips/index"
          options={{ animation: "slide_from_right", animationDuration: 300 }}
        />
        <Stack.Screen
          name="news/index"
          options={{ animation: "fade", animationDuration: 300 }}
        />
        <Stack.Screen
          name="centers/index"
          options={{ animation: "fade", animationDuration: 300 }}
        />
      </Stack>

      {isLoggedIn && (
        <SafeAreaView  style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
          <Menu />
        </SafeAreaView>
      )}
    </>
  );
}
