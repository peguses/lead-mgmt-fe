import { useParams } from "react-router-dom";
import { UserInformationComponent } from "../../shared/components/UserInformation.component";
import { useEffect } from "react";
import { fetchRolesAsync, Roles } from "../../shared/redux/role.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { fetchUserAsync, ManagedUser } from "../../shared/redux/managed.user.slice";

export const UserInformationContainer: React.FC<any> = () => {

  const { userId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchUserAsync(Number(userId)));
  }, [userId]);

  const roles = useAppSelector((state):  Roles | undefined => {
    return state?.roles;
  });

  const managedUser = useAppSelector((state):  ManagedUser => {
    return state?.managedUser;
  });

  const view = () => {
    if (userId && !managedUser.isLoading && !roles?.isLoading) {
      return <>{!roles?.isLoading && (<UserInformationComponent roles={roles?.roles || []} user={managedUser.user || undefined}/>)}</>
    }

    if (!roles?.isLoading) {
      return <>{!roles?.isLoading && (<UserInformationComponent roles={roles?.roles || []} user={undefined}/>)}</>
    }
  }
  
  return (
    <>{view()}</>
  );
};

