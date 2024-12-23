import { useParams } from "react-router-dom";
import { UserInformationComponent } from "../../shared/components/UserInformation.component";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import {
  fetchUserAsync,
  ManagedUser,
  resetManagedUser,
  UserManagedAction,
} from "../../shared/redux/managed.user.slice";
import { Roles } from "../../shared/redux/role.slice";
import { Backdrop, CircularProgress } from "@mui/material";

export const UserInformationContainer: React.FC<any> = () => {

  const { userId } = useParams();

  const dispatch = useAppDispatch();

  const userManagementAction = useAppSelector((state): UserManagedAction => {
    return state?.managedUser.action;
  });

  useEffect(() => {
    if (userManagementAction !== UserManagedAction.CREATE_USER) {
      dispatch(fetchUserAsync(Number(userId)));
    }
    dispatch(resetManagedUser());
  }, [dispatch, userId, userManagementAction]);

  const roles = useAppSelector((state): Roles | undefined => {
    return state?.roles;
  });

  const managedUser = useAppSelector((state): ManagedUser => {
    return state?.managedUser;
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
    } else {
      return (<>
       <Backdrop
          className="diagnose-loader"
          sx={{
            color: "primary.main",
            marginRight: "20%",
            position: "absolute",
            inset: "0",
            zIndex: "10",
            backgroundColor: "primary.contrastText",
          }}
          open={managedUser?.isLoading || roles?.isLoading || false}
        >
          <CircularProgress
            color="inherit"
            sx={{ marginLeft: "250px", textAlign: "center" }}
          />
        </Backdrop>
      </>)
    }
    
  };

  return <>{view()}</>;
};
