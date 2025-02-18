import React, {useEffect} from 'react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Caveat_400Regular, Caveat_600SemiBold, useFonts } from '@expo-google-fonts/caveat'
import GlobalProvider from '../context/GlobalProvider'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
	const [loaded, error] = useFonts({
		Caveat_400Regular, Caveat_600SemiBold
	})

	useEffect(() => {
		if (loaded || error){
			SplashScreen.hideAsync()
		}
	}, [loaded, error])

	if (!loaded && !error) return null

	return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='(auth)' options={{headerShown: false}}/>
        <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
        <Stack.Screen name='(data)' options={{headerShown: false}}/>
      </Stack>
    </GlobalProvider> 
	)
}

export default RootLayout