import { AppDispatch, AppState } from '..'
import {
  toggleURLWarning,
  updateUserArcherETHTip,
  updateUserArcherGasEstimate,
  updateUserArcherGasPrice,
  updateUserArcherTipManualOverride,
  updateUserArcherUseRelay,
  updateUserDarkMode,
} from './actions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useSelector<
    AppState,
    { userDarkMode: boolean | null; matchesDarkMode: boolean }
  >(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual
  )

  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useURLWarningVisible(): boolean {
  return useSelector((state: AppState) => state.user.URLWarningVisible)
}

export function useURLWarningToggle(): () => void {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(toggleURLWarning()), [dispatch])
}


export function useUserArcherUseRelay(): [boolean, (newUseRelay: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()

  const useRelay = useSelector<AppState, AppState['user']['userArcherUseRelay']>(
    (state) => state.user.userArcherUseRelay
  )

  const setUseRelay = useCallback(
    (newUseRelay: boolean) => {
      dispatch(updateUserArcherUseRelay({ userArcherUseRelay: newUseRelay }))
    },
    [dispatch]
  )

  return [useRelay, setUseRelay]
}

export function useUserArcherGasPrice(): [string, (newGasPrice: string) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userGasPrice = useSelector<AppState, AppState['user']['userArcherGasPrice']>((state) => {
    return state.user.userArcherGasPrice
  })

  const setUserGasPrice = useCallback(
    (newGasPrice: string) => {
      dispatch(updateUserArcherGasPrice({ userArcherGasPrice: newGasPrice }))
    },
    [dispatch]
  )

  return [userGasPrice, setUserGasPrice]
}

export function useUserArcherETHTip(): [string, (newETHTip: string) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userETHTip = useSelector<AppState, AppState['user']['userArcherETHTip']>((state) => {
    return state.user.userArcherETHTip
  })

  const setUserETHTip = useCallback(
    (newETHTip: string) => {
      dispatch(updateUserArcherETHTip({ userArcherETHTip: newETHTip }))
    },
    [dispatch]
  )

  return [userETHTip, setUserETHTip]
}

export function useUserArcherGasEstimate(): [string, (newGasEstimate: string) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userGasEstimate = useSelector<AppState, AppState['user']['userArcherGasEstimate']>((state) => {
    return state.user.userArcherGasEstimate
  })

  const setUserGasEstimate = useCallback(
    (newGasEstimate: string) => {
      dispatch(
        updateUserArcherGasEstimate({
          userArcherGasEstimate: newGasEstimate,
        })
      )
    },
    [dispatch]
  )

  return [userGasEstimate, setUserGasEstimate]
}

export function useUserArcherTipManualOverride(): [boolean, (newManualOverride: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userTipManualOverride = useSelector<AppState, AppState['user']['userArcherTipManualOverride']>((state) => {
    return state.user.userArcherTipManualOverride
  })

  const setUserTipManualOverride = useCallback(
    (newManualOverride: boolean) => {
      dispatch(
        updateUserArcherTipManualOverride({
          userArcherTipManualOverride: newManualOverride,
        })
      )
    },
    [dispatch]
  )

  return [userTipManualOverride, setUserTipManualOverride]
}

