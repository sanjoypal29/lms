import { clerkClient } from "@clerk/express";

export const protectEducator=async (req,res,next)=>{
    try{
      const userId=req.auth.userId;
      const user=await clerkClient.users.getUser(userId);
      const role=user.publicMetadata.role;
      if(role!=='educator'){
        return res.status(403).json({success:false,message:"Access denied. Educator role required."});
      }     
      next();
    }catch(error){
      res.status(500).json({success:false,message:error.message});
    }       
}