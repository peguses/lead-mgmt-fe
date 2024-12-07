import { useParams } from "react-router-dom";
import { UserInformationComponent } from "../../shared/components/UserInformation.component";
import { useEffect } from "react";
import { fetchRolesAsync, Roles } from "../../shared/redux/role.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import {
  fetchUserAsync,
  ManagedUser,
  UserManagedAction,
} from "../../shared/redux/managed.user.slice";

export const UserInformationContainer: React.FC<any> = () => {
  const { userId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchUserAsync(Number(userId)));
  }, [userId]);

  const roles = useAppSelector((state): Roles | undefined => {
    return state?.roles;
  });

  const managedUser = useAppSelector((state): ManagedUser => {
    return state?.managedUser;
  });

  const userManagementAction = useAppSelector((state): UserManagedAction => {
    return state?.managedUser.action;
  });

  const view = () => {
    if (
      userId &&
      !managedUser.isLoading &&
      !roles?.isLoading &&
      userManagementAction === UserManagedAction.UPDATE_USER
    ) {
      return (
        <>
          {!roles?.isLoading && (
            <UserInformationComponent
              userManagementAction={userManagementAction}
              roles={roles?.roles || []}
              user={managedUser.user || undefined}
            />
          )}
        </>
      );
    } else if (
      !roles?.isLoading &&
      userManagementAction === UserManagedAction.CREATE_USER
    ) {
      return (
        <>
          {!roles?.isLoading && (
            <UserInformationComponent
              userManagementAction={userManagementAction}
              roles={roles?.roles || []}
              user={undefined}
            />
          )}
        </>
      );
    } else if (
      !roles?.isLoading &&
      !managedUser.isLoading &&
      userId &&
      userManagementAction === UserManagedAction.VIEW_USER
    ) {
      return (
        <>
          {!roles?.isLoading && (
            <UserInformationComponent
              userManagementAction={userManagementAction}
              readonly={true}
              roles={roles?.roles || []}
              user={managedUser.user || undefined}
            />
          )}
        </>
      );
    } else if (
      !roles?.isLoading &&
      !managedUser.isLoading &&
      userId &&
      userManagementAction === UserManagedAction.DELETE_USER
    ) {
      return (
        <>
          {!roles?.isLoading && (
            <UserInformationComponent
              userManagementAction={userManagementAction}
              readonly={true}
              roles={roles?.roles || []}
              user={managedUser.user || undefined}
            />
          )}
        </>
      );
    }
    
  };

  return <>{view()}</>;
};
