// import {Tabs} from "expo-router";
//
// export default function RootLayout() {
//     return (
//         <Tabs>
//             <Tabs.Screen name={"home"} options={{href: "/pages/home"}}/>
//             <Tabs.Screen name={"pages/settings"} options={{href: "/pages/settings"}}/>
//             <Tabs.Screen name={"settings"} ></Tabs.Screen>
//             <Tabs.Screen name={"pages/home"} options={{href: null}}/>
//             <Tabs.Screen name={"services/AuthService"} options={{href: null}}/>
//             <Tabs.Screen name={"pages/welcome"} options={{href: null}}/>
//         </Tabs>
//     );
// }

import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="pages/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="pages/welcome" options={{ headerShown: false }} />
        </Stack>
    );
}

