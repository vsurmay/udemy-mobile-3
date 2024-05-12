import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpenses from "./screens/ManageExpenses";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import {GlobalStyles} from "./constans/styles";
import {Ionicons} from '@expo/vector-icons';
import IconButton from "./components/UI/IconButton";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const App = () => {

    const Stack = createStackNavigator();
    const BottomTab = createBottomTabNavigator();

    const store = setupStore();

    const ExpensesOverview = () => {
        return (
            <BottomTab.Navigator screenOptions={({navigation}) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500
                },
                headerTintColor: "white",
                tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: () => (<IconButton name={"add"} color={"white"} size={24} onPress={() => navigation.navigate("ManageExpense")}/>)
            })}>
                <BottomTab.Screen
                    name={"RecentExpenses"}
                    component={RecentExpenses}
                    options={{
                        title: "Recent Expenses",
                        tabBarLabel: "Recent",
                        tabBarIcon: ({color, size}) => <Ionicons color={color} size={size} name={"hourglass"}/>,
                    }}
                />
                <BottomTab.Screen
                    name={"AllExpenses"}
                    component={AllExpenses}
                    options={{
                        title: "All Expenses",
                        tabBarLabel: "All Expenses",
                        tabBarIcon: ({color, size}) => <Ionicons color={color} size={size} name={"calendar"}/>,
                    }}
                />
            </BottomTab.Navigator>
        )
    }

    return (
        <>
            <StatusBar style="auto"/>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: GlobalStyles.colors.primary500
                            },
                            headerTintColor: "white",
                        }}>
                        <Stack.Screen
                            name={"ExpensesOverview"}
                            component={ExpensesOverview}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name={"ManageExpense"}
                            component={ManageExpenses}
                        />

                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>

        </>
    );
}

export default App;