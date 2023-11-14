import { useAppSelector } from '../redux/hooks';

export function useCustomReduxState() {
  const user = useAppSelector(state => state.user)
  
  return user
  
}


