import { useAppSelector } from '../redux/hooks';

export function getUserState() {
  const user = useAppSelector(state => state.user)
  return user
}


