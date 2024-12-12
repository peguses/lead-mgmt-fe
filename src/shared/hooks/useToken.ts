import { useAppSelector } from "../redux/hooks";

const useToken = () => {
  
  const token = useAppSelector((state) => state.applicationUser.authToken)
  const getToken = () => {
    return token;
  };

  return {
    token: getToken,
  };
};

export default useToken;
