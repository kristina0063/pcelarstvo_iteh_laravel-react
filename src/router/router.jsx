import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from './../components/layouts/DefaultLayout';
import GuestLayout from './../components/layouts/GuestLayout';
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import {ActivitiesPage} from "../pages/ActivitiesPage";
import { ApiariesPage } from "../pages/ApiariesPage";
import { BeehivesPage } from "../pages/BeehivesPage";
import { BeeColoniesPage } from "../pages/BeeColoniesPage";
import { NotificationsPage } from "../pages/NotificationsPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: '',
                element: <ActivitiesPage/>
            },
            {
                path: 'aktivnosti',
                element: <ActivitiesPage/>
            },
            {
                path: 'pcelinjaci',
                element: <ApiariesPage/>
            },
            {
                path: 'kosnice',
                element: <BeehivesPage/>
            },
            {
                path: 'drustva',
                element: <BeeColoniesPage/>
            },
            {
                path: 'notifikacije',
                element: <NotificationsPage/>
            },
            {
                path: 'notifikacije/:id',
                element: <NotificationsPage/>
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout/>,
        children: [
            {
                path: '',
                element: <LoginPage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            }
        ]
    }
]);

export default router;