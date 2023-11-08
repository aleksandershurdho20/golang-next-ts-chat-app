
import Home from "@/pages/Home/Index";
import Auth from "@/pages/Auth/Index";
import CreateCourse from "@/pages/Courses/CreateCourse";
import ViewCourse from "@/pages/Courses/ViewCourse";
import UpdateCourse from "@/pages/Dashboard/Courses/UpdateCourse";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Courses from "@/pages/Dashboard/Courses/Courses";
import Profile from "@/pages/Profile/Index";

type RoutesConfig = {
    path:string
    component:React.ComponentType
    // component:React.ReactNode

}

export const routes : RoutesConfig[] = [
    {
        path:"/",
        component:Home
    },
    {
        path:'/auth',
        component:Auth
    },
    {
        path:"dashboard",
        component:Dashboard
    },
    {
        path:"courses",
        component:Courses
    },
    {
        path:"course/create",
        component:CreateCourse
    },
    {
        path:"course/:id",
        component:ViewCourse
    },
    {
        path:"update/course/:id",
        component:UpdateCourse
    },
    {
        path:"profile",
        component:Profile
    },

]


export const privateRoutesConfig  :RoutesConfig[] = [
    {
        path:"dashboard",
        component:Dashboard
    },
    {
        path:"courses",
        component:Courses
    },
    {
        path:"course/create",
        component:CreateCourse
    },
    {
        path:"course/:id",
        component:ViewCourse
    },
    {
        path:"update/course/:id",
        component:UpdateCourse
    },


]

