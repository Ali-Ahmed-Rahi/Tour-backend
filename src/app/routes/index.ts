import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router=Router()

const moduleRoutes=[
  {
    path:"/user",
    router:UserRoutes,
  },
  {
    path:"/auth",
    router:AuthRoutes,
  },
  // {
  //   path:"/tour",
  //   router:UserRoutes,
  // },
  
]

moduleRoutes.forEach((route)=>{
router.use(route.path,route.router)
})