import { useParams } from "react-router-dom";
import { UserInformationComponent } from "../../shared/components/UserInformation.component";
import { useEffect } from "react";
import { fetchRolesAsync, Roles } from "../../shared/redux/role.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { fetchUserAsync, ManagedUser, UserManagedAction } from "../../shared/redux/managed.user.slice";

export const UserInformationContainer: React.FC<any> = () => {

  const { userId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchUserAsync(Number(userId)));
  }, [userId]);

  const roles = useAppSelector((state):Roles | undefined => {
    return state?.roles;
  });

  const managedUser = useAppSelector((state):ManagedUser => {
    return state?.managedUser;
  });

  const serManagementAction = useAppSelector((state):UserManagedAction => {
    return state?.managedUser.action;
  })

  const view = () => {
    if (userId && !managedUser.isLoading && !roles?.isLoading && serManagementAction === UserManagedAction.UPDATE_USER) {
      console.log("view user")
      return <>{!roles?.isLoading && (<UserInformationComponent roles={roles?.roles || []} user={managedUser.user || undefined}/>)}</>
    } else if (!roles?.isLoading && serManagementAction === UserManagedAction.CREATE_USER ) {
      return <>{!roles?.isLoading && (<UserInformationComponent roles={roles?.roles || []} user={undefined}/>)}</>
    } else if (!roles?.isLoading && !managedUser.isLoading && userId && serManagementAction === UserManagedAction.VIEW_USER) {
      return <>{!roles?.isLoading && (<UserInformationComponent readonly={true} roles={roles?.roles || []} user={managedUser.user || undefined}/>)}</>
    }
  }
  
  return (
    <>{view()}</>
  );
};

